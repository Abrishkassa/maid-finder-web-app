<template>
  <section
    class="mt-2 mx-auto max-w-7xl dark:bg-gray-900 min-h-screen dark:text-gray-100"
  >
    <!-- Filters Section -->
    <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold">My Applications</h2>
        <div class="flex space-x-2">
          <button
            @click="toggleViewMode"
            class="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center"
            :disabled="loading"
          >
            <Icon
              :name="viewMode === 'list' ? 'mdi:view-grid' : 'mdi:view-list'"
              class="h-5 w-5 mr-1 text-black dark:text-white"
            />
            {{ viewMode === "list" ? "Card View" : "List View" }}
          </button>
          <button
            @click="printJobList"
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
            v-model="searchQuery"
            type="text"
            placeholder="Search by job title or status"
            class="mt-1 p-2 border rounded-lg w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            :disabled="loading"
            @input="handleSearchInput"
          />
        </div>

        <!-- Date Range Filter -->
        <div class="flex-1">
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >Application Date (Range)</label
          >
          <div class="flex space-x-2">
            <input
              type="date"
              v-model="startDate"
              class="mt-1 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 w-full"
              :disabled="loading"
              @change="fetchApplications(1)"
            />
            <input
              type="date"
              v-model="endDate"
              class="mt-1 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 w-full"
              :disabled="loading"
              @change="fetchApplications(1)"
            />
          </div>
        </div>

        <!-- Status Filter -->
        <div class="flex-1">
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >Application Status</label
          >
          <select
            v-model="statusFilter"
            class="mt-1 p-2 border rounded-lg w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            :disabled="loading"
            @change="fetchApplications(1)"
          >
            <option value="">All</option>
            <option value="selected">Selected</option>
            <option value="rejected">Rejected</option>
            <option value="pending">Pending</option>
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
      <p class="text-gray-500 dark:text-gray-400">Loading applications...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-8">
      <Icon
        name="mdi:alert-circle"
        class="h-12 w-12 text-red-500 mx-auto mb-2"
      />
      <p class="text-red-500 dark:text-red-400 mb-2">
        Failed to load applications
      </p>
      <button
        @click="fetchApplications"
        class="p-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 dark:bg-blue-700 dark:text-blue-100 dark:hover:bg-blue-600"
      >
        Retry
      </button>
    </div>

    <!-- Empty State -->
    <div v-else-if="applications.data.length === 0" class="text-center py-8">
      <p class="text-gray-500 dark:text-gray-400">
        No applications found matching your criteria
      </p>
    </div>

    <!-- Card View -->
    <template v-else-if="viewMode === 'card'">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ApplicationCard
          v-for="application in applications.data"
          :key="application.id"
          :application="application"
          @click="navigateToApplication(application.id)"
        />
      </div>
      <PaginationControls
        v-if="applications.data.length > 0"
        :pagination="pagination"
        :paginationButtons="paginationButtons"
        @prev="prevPage"
        @next="nextPage"
        @go-to-page="goToPage"
      />
    </template>

    <!-- List View -->
    <template v-else>
      <div
        class="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow mb-6 overflow-x-auto"
      >
        <ApplicationTable
          :applications="applications.data"
          :sortColumn="sortColumn"
          :sortDirection="sortDirection"
          @sort="sortBy"
        />
        <PaginationControls
          v-if="applications.data.length > 0"
          :pagination="pagination"
          :paginationButtons="paginationButtons"
          @prev="prevPage"
          @next="nextPage"
          @go-to-page="goToPage"
        />
      </div>
    </template>
  </section>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { debounce } from "lodash-es";
import { useRouter } from "vue-router";
import backendApi from "@/networkServices/api/backendApi.js";
import { useAuthStore } from "@/stores/auth";

// Components
import ApplicationCard from "@/components/applications/ApplicationCard.vue";
import ApplicationTable from "@/components/applications/ApplicationTable.vue";
import PaginationControls from "@/components/common/PaginationControls.vue";

const router = useRouter();
const authStore = useAuthStore();

// State
const loading = ref(true);
const error = ref(null);
const applications = ref({
  data: [],
  from: 0,
  to: 0,
  total: 0,
});
const pagination = ref({
  current_page: 1,
  total_pages: 1,
});

// UI Preferences
const viewMode = ref("list"); // 'list' or 'card'

// Filters
const startDate = ref("");
const endDate = ref("");
const statusFilter = ref("");
const searchQuery = ref("");
const perPage = ref(10);

// Sorting
const sortColumn = ref("created_at");
const sortDirection = ref("desc");

// Computed Properties
const paginationButtons = computed(() => {
  const buttons = [];
  const current = pagination.value.current_page;
  const total = pagination.value.total_pages;

  // Always show first page
  buttons.push(1);

  // Show pages around current page
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  if (start > 2) buttons.push("...");

  for (let i = start; i <= end; i++) {
    buttons.push(i);
  }

  if (end < total - 1) buttons.push("...");

  // Always show last page if different from first
  if (total > 1) buttons.push(total);

  return buttons;
});

// Methods
const toggleViewMode = () => {
  viewMode.value = viewMode.value === "list" ? "card" : "list";
};

const debouncedSearch = debounce(() => {
  fetchApplications(1);
}, 500);

const handleSearchInput = () => {
  debouncedSearch();
};

const fetchApplications = async (page = 1) => {
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

    if (searchQuery.value.trim()) {
      params.search = searchQuery.value.trim();
    }
    if (statusFilter.value) {
      params.status = statusFilter.value;
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

    const response = await backendApi.get("/maid/applications", {
      params,
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    });

    applications.value = {
      data: response.data.data || [],
      from: response.data.from || 0,
      to: response.data.to || 0,
      total: response.data.total || 0,
    };

    pagination.value = {
      current_page: response.data.current_page || 1,
      total_pages: response.data.last_page || 1,
    };
  } catch (err) {
    console.error("Error fetching applications:", err);
    error.value =
      err.response?.data?.message ||
      "Failed to load applications. Please try again later.";
  } finally {
    loading.value = false;
  }
};

const prevPage = () => {
  if (pagination.value.current_page > 1) {
    fetchApplications(pagination.value.current_page - 1);
  }
};

const nextPage = () => {
  if (pagination.value.current_page < pagination.value.total_pages) {
    fetchApplications(pagination.value.current_page + 1);
  }
};

const goToPage = (page) => {
  if (
    page >= 1 &&
    page <= pagination.value.total_pages &&
    page !== pagination.value.current_page
  ) {
    fetchApplications(page);
  }
};

const clearFilters = () => {
  startDate.value = "";
  endDate.value = "";
  statusFilter.value = "";
  searchQuery.value = "";
  fetchApplications(1);
};

const printJobList = () => {
  const printWindow = window.open("", "", "width=800,height=600");
  printWindow.document.write(`
    <html>
      <head>
        <title>Job Applications Report</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          h1 { color: #333; text-align: center; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
          .print-date { text-align: right; margin-bottom: 20px; }
          .print-header { display: flex; justify-content: space-between; margin-bottom: 20px; }
          .print-filters { margin-bottom: 20px; font-size: 0.9em; }
          .status-pending { color: #1d4ed8; }
          .status-selected { color: #15803d; }
          .status-rejected { color: #b91c1c; }
        </style>
      </head>
      <body>
        <div class="print-header">
          <div>
            <h1>Job Applications Report</h1>
            <div class="print-date">Generated on: ${new Date().toLocaleString()}</div>
          </div>
        </div>
        <div class="print-filters">
          <strong>Filters Applied:</strong><br>
          ${statusFilter.value ? `Status: ${statusFilter.value}<br>` : ""}
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
              <th>Job Title</th>
              <th>Location</th>
              <th>Job Type</th>
              <th>Applied On</th>
              <th>Salary</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${applications.value.data
              .map(
                (application) => `
              <tr>
                <td>${application.job.job_title}</td>
                <td>${application.job.location}</td>
                <td>${application.job.job_time}</td>
                <td>${new Date(
                  application.created_at
                ).toLocaleDateString()}</td>
                <td>${
                  application.job.salary_min
                    ? `ETB${application.job.salary_min}`
                    : "Negotiable"
                }</td>
                <td class="status-${application.status}">${
                  application.status
                }</td>
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

const sortBy = (column) => {
  if (sortColumn.value === column) {
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  } else {
    sortColumn.value = column;
    sortDirection.value = "desc";
  }
  fetchApplications(pagination.value.current_page);
};

const navigateToApplication = (id) => {
  router.push(`/maids/application-${id}`);
};

// Initialize
onMounted(() => {
  fetchApplications();
});

// Watchers
watch(perPage, () => {
  fetchApplications(1);
});

definePageMeta({
  layout: "house",
});
</script>
