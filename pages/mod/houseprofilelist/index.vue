<template>
  <section class="ml-0 md:ml-64 dark:bg-gray-900 dark:text-gray-100">
    <!-- Filters Section -->
    <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold">Household Profiles Management</h2>
        <div class="flex space-x-2">
          <button
            @click="printUserList"
            class="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center"
            :disabled="loading"
          >
            <Icon
              name="mdi:printer"
              class="h-5 w-5 mr-1 text-black dark:text-white"
            />
            Print List
          </button>
        </div>
      </div>
      <div
        class="flex flex-col md:flex-row md:space-y-0 md:space-x-4 space-y-4"
      >
        <!-- Search Filter -->
        <div class="flex-1">
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >Search</label
          >
          <input
            v-model.lazy="searchQuery"
            type="text"
            placeholder="Search by name or address"
            class="mt-1 p-2 border rounded-lg w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            :disabled="loading"
          />
        </div>

        <!-- Date Range Filter -->
        <div class="flex-1">
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >Registration Date (Range)</label
          >
          <div
            class="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2"
          >
            <input
              type="date"
              v-model.lazy="startDate"
              class="mt-1 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 w-full"
              :disabled="loading"
            />
            <input
              type="date"
              v-model.lazy="endDate"
              class="mt-1 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 w-full"
              :disabled="loading"
            />
          </div>
        </div>

        <!-- Verification Filter -->
        <div class="flex-1">
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >Verification</label
          >
          <select
            v-model.lazy="verificationFilter"
            class="mt-1 p-2 border rounded-lg w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            :disabled="loading"
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="verified">Verified</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <!-- Clear Filters Button -->
        <div class="flex items-end">
          <button
            @click="clearFilters"
            class="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 w-full md:w-auto"
            :disabled="loading"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-8">
      <div
        class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"
      ></div>
      <p class="text-gray-500 dark:text-gray-400">
        Loading household profiles...
      </p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-8">
      <Icon
        name="mdi:alert-circle"
        class="h-12 w-12 text-red-500 mx-auto mb-2"
      />
      <p class="text-red-500 dark:text-red-400 mb-2">
        Failed to load household profiles
      </p>
      <button
        @click="fetchHouseholds"
        class="p-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 dark:bg-blue-700 dark:text-blue-100 dark:hover:bg-blue-600"
      >
        Retry
      </button>
    </div>

    <!-- Households Table -->
    <div
      v-else
      class="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow mb-6 overflow-x-auto"
    >
      <table class="w-full min-w-[1000px]" id="userListTable">
        <thead>
          <tr class="border-b dark:border-gray-700">
            <th class="text-left p-2 cursor-pointer" @click="sortBy('name')">
              <div class="flex items-center">
                Name
                <Icon
                  v-if="sortColumn === 'name'"
                  :name="
                    sortDirection === 'asc'
                      ? 'mdi:chevron-up'
                      : 'mdi:chevron-down'
                  "
                  class="ml-1"
                />
              </div>
            </th>

            <th class="text-left p-2">Location</th>
            <th
              class="text-left p-2 cursor-pointer"
              @click="sortBy('created_at')"
            >
              <div class="flex items-center">
                Registered
                <Icon
                  v-if="sortColumn === 'created_at'"
                  :name="
                    sortDirection === 'asc'
                      ? 'mdi:chevron-up'
                      : 'mdi:chevron-down'
                  "
                  class="ml-1"
                />
              </div>
            </th>
            <th
              class="text-left p-2 cursor-pointer"
              @click="sortBy('verification_status')"
            >
              <div class="flex items-center">
                Verification
                <Icon
                  v-if="sortColumn === 'verification_status'"
                  :name="
                    sortDirection === 'asc'
                      ? 'mdi:chevron-up'
                      : 'mdi:chevron-down'
                  "
                  class="ml-1"
                />
              </div>
            </th>
            <th class="text-left p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="household in households.data"
            :key="household.id"
            class="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <td class="p-2">{{ getFullName(household) }}</td>
            <td class="p-2">{{ household.address || "N/A" }}</td>
            <td class="p-2">{{ formatDate(household.created_at) }}</td>
            <td class="p-2">
              <span :class="verificationClass(household.verification_status)">
                {{ formatVerificationStatus(household.verification_status) }}
              </span>
            </td>
            <td class="p-2 space-x-2 whitespace-nowrap">
              <NuxtLink
                :to="`/maod/${household.id}`"
                class="p-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 dark:bg-blue-700 dark:text-blue-100 dark:hover:bg-blue-600 inline-block"
              >
                View
              </NuxtLink>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Empty State -->
      <div v-if="households.data.length === 0" class="text-center py-8">
        <p class="text-gray-500 dark:text-gray-400">
          No household profiles found matching your criteria
        </p>
      </div>

      <!-- Pagination -->
      <div
        v-if="households.data.length > 0"
        class="flex flex-col md:flex-row items-center justify-between mt-4"
      >
        <div class="mb-2 md:mb-0">
          <span class="text-sm text-gray-700 dark:text-gray-300">
            Showing {{ households.from }} to {{ households.to }} of
            {{ households.total }} entries
          </span>
        </div>
        <div class="flex space-x-1">
          <button
            @click="prevPage"
            :disabled="households.current_page === 1"
            class="px-3 py-1 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            v-for="(link, index) in households.links"
            :key="index"
            @click="link.url ? goToPageFromUrl(link.url) : null"
            :disabled="!link.url || link.active"
            :class="[
              'px-3 py-1 border rounded-lg',
              link.active
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-100'
                : link.url
                ? 'hover:bg-gray-100 dark:hover:bg-gray-700'
                : 'opacity-50 cursor-not-allowed',
            ]"
          ></button>
          <button
            @click="nextPage"
            :disabled="households.current_page === households.last_page"
            class="px-3 py-1 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
        <div class="mt-2 md:mt-0">
          <select
            v-model="perPage"
            class="p-1 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            @change="fetchHouseholds"
          >
            <option value="5">5 per page</option>
            <option value="10">10 per page</option>
            <option value="20">20 per page</option>
            <option value="50">50 per page</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Reject Modal -->
    <div
      v-if="showRejectModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div
        class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h3 class="text-lg font-semibold mb-4">Reject Household Profile</h3>
        <textarea
          v-model="rejectReason"
          placeholder="Enter reason for rejection..."
          class="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 mb-4"
          rows="4"
        ></textarea>
        <div class="flex justify-end space-x-2">
          <button
            @click="showRejectModal = false"
            class="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            @click="confirmReject"
            class="p-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 dark:bg-red-700 dark:text-red-100 dark:hover:bg-red-600"
          >
            Confirm Reject
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import backendApi from "@/networkServices/api/backendApi.js";
import { useAuthStore } from "@/stores/auth";

// State
const loading = ref(true);
const error = ref(null);
const households = ref({
  data: [],
  current_page: 1,
  from: 0,
  to: 0,
  total: 0,
  last_page: 1,

  per_page: 1,
});

const authStore = useAuthStore();

// Filters
const startDate = ref("");
const endDate = ref("");
const verificationFilter = ref("");
const searchQuery = ref("");
const perPage = ref(10);

// Sorting
const sortColumn = ref("created_at");
const sortDirection = ref("desc");

// Reject Modal
const showRejectModal = ref(false);
const rejectReason = ref("");
const selectedHouseholdId = ref(null);

// Fetch household profiles from API
const fetchHouseholds = async (page = 1) => {
  try {
    loading.value = true;
    error.value = null;
    if (!authStore._hydrated) {
      await authStore.hydrate();
    }

    const params = {
      page,
      per_page: perPage.value,
    };

    if (searchQuery.value) {
      params.search = searchQuery.value;
    }
    if (verificationFilter.value) {
      params.verification_status = verificationFilter.value;
    }
    if (startDate.value) {
      params.start_date = startDate.value;
    }
    if (endDate.value) {
      params.end_date = endDate.value;
    }
    if (sortColumn.value) {
      params.sort_by = sortColumn.value;
      params.sort_direction = sortDirection.value;
    }

    const response = await backendApi.get("/household-profiles", {
      params,
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    });

    households.value = response.data;
  } catch (err) {
    console.error("Error fetching household profiles:", err);
    error.value = "Failed to load household profiles. Please try again later.";
  } finally {
    loading.value = false;
  }
};

// Format full name
const getFullName = (household) => {
  return `${household.first_name} ${
    household.middle_name ? household.middle_name + " " : ""
  }${household.last_name}`;
};

// Format date for display
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Format verification status for display
const formatVerificationStatus = (status) => {
  if (!status) return "Pending";
  return status.charAt(0).toUpperCase() + status.slice(1);
};

// Navigation methods
const prevPage = () => {
  if (households.value.current_page > 1) {
    fetchHouseholds(households.value.current_page - 1);
  }
};

const nextPage = () => {
  if (households.value.current_page < households.value.last_page) {
    fetchHouseholds(households.value.current_page + 1);
  }
};

const goToPage = (page) => {
  if (page >= 1 && page <= households.value.last_page) {
    fetchHouseholds(page);
  }
};

const goToPageFromUrl = (url) => {
  const page = new URL(url).searchParams.get("page");
  if (page) {
    fetchHouseholds(parseInt(page));
  }
};

// Sorting method
const sortBy = (column) => {
  if (sortColumn.value === column) {
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  } else {
    sortColumn.value = column;
    sortDirection.value = "asc";
  }
  fetchHouseholds();
};

// Verification Class
const verificationClass = (status) => {
  if (!status) status = "pending";

  switch (status.toLowerCase()) {
    case "verified":
      return "bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs dark:bg-green-700 dark:text-green-100";
    case "pending":
      return "bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs dark:bg-yellow-700 dark:text-yellow-100";
    case "rejected":
      return "bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm dark:bg-red-700 dark:text-red-100";
    default:
      return "bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs dark:bg-gray-700 dark:text-gray-100";
  }
};

// Clear Filters
const clearFilters = () => {
  startDate.value = "";
  endDate.value = "";
  verificationFilter.value = "";
  searchQuery.value = "";
  fetchHouseholds();
};

// Print Household List
const printUserList = () => {
  const printWindow = window.open("", "", "width=800,height=600");
  printWindow.document.write(`
    <html>
      <head>
        <title>Household Profiles Report</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          h1 { color: #333; text-align: center; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
          .verification-verified { background-color: #d4edda; color: #155724; }
          .verification-pending { background-color: #fff3cd; color: #856404; }
          .verification-rejected { background-color: #f8d7da; color: #721c24; }
          .print-date { text-align: right; margin-bottom: 20px; }
          .print-header { display: flex; justify-content: space-between; margin-bottom: 20px; }
          .print-filters { margin-bottom: 20px; font-size: 0.9em; }
        </style>
      </head>
      <body>
        <div class="print-header">
          <div>
            <h1>Household Profiles Report</h1>
            <div class="print-date">Generated on: ${new Date().toLocaleString()}</div>
          </div>
        </div>
        
        <div class="print-filters">
          <strong>Filters Applied:</strong><br>
          ${
            verificationFilter.value
              ? `Verification: ${formatVerificationStatus(
                  verificationFilter.value
                )}<br>`
              : ""
          }
          ${
            startDate.value || endDate.value
              ? `Date Range: ${startDate.value} to ${endDate.value}<br>`
              : ""
          }
          ${searchQuery.value ? `Search: "${searchQuery.value}"` : ""}
        </div>
        
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Gender</th>
              <th>Address</th>
              <th>Registered</th>
              <th>Verification</th>
            </tr>
          </thead>
          <tbody>
            ${households.value.data
              .map(
                (household) => `
              <tr>
                <td>${getFullName(household)}</td>
                <td>${household.phone_number1 || "N/A"}</td>
                <td>${household.gender || "N/A"}</td>
                <td>${household.address || "N/A"}</td>
                <td>${formatDate(household.created_at)}</td>
                <td class="verification-${
                  household.verification_status
                    ? household.verification_status.toLowerCase()
                    : "pending"
                }">
                  ${formatVerificationStatus(household.verification_status)}
                </td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 500);
};

// Watchers for filters that should trigger API calls
watch([searchQuery, verificationFilter, startDate, endDate], () => {
  fetchHouseholds();
});

// Initialize
onMounted(() => {
  fetchHouseholds();
});

definePageMeta({
  layout: "mod",
});
</script>
