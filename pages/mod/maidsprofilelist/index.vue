<template>
  <section class="ml-0 md:ml-64 dark:bg-gray-900 dark:text-gray-100">
    <!-- Filters Section -->
    <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold">Maid Profiles Management</h2>
        <div class="flex space-x-2">
          <button
            @click="printUserList"
            class="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center"
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
        class="flex items-center justify-center md:flex-row md:space-y-0 md:space-x-4"
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
            placeholder="Search by name or location"
            class="mt-1 p-2 border rounded-lg w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          />
        </div>

        <!-- Date Range and Verification Filters -->

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
              v-model="startDate"
              class="mt-1 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 w-full"
            />
            <input
              type="date"
              v-model="endDate"
              class="mt-1 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 w-full"
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
            v-model="verificationFilter"
            class="mt-1 p-2 border rounded-lg w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          >
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="Verified">Verified</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <!-- Clear Filters Button -->
        <div class="flex items-end">
          <button
            @click="clearFilters"
            class="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 w-full md:w-auto"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>

    <!-- Users Table -->
    <div
      class="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow mb-6 overflow-x-auto"
    >
      <table class="w-full min-w-[1000px]" id="userListTable">
        <thead>
          <tr class="border-b dark:border-gray-700">
            <th class="text-left p-2">Name</th>

            <th class="text-left p-2">Location</th>
            <th class="text-left p-2">Registered</th>
            <th class="text-left p-2">Verification</th>

            <th class="text-left p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in filteredUsers"
            :key="user.id"
            class="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <td class="p-2">{{ user.name }}</td>

            <td class="p-2">{{ user.location || "N/A" }}</td>
            <td class="p-2">{{ formatDate(user.registered) }}</td>
            <td class="p-2">
              <span :class="verificationClass(user.verificationStatus)">
                {{ user.verificationStatus }}
              </span>
            </td>

            <td class="p-2 space-x-2 whitespace-nowrap">
              <NuxtLink
                :to="`/maids/dashboard/users/${user.id}`"
                class="p-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 dark:bg-blue-700 dark:text-blue-100 dark:hover:bg-blue-600 inline-block"
              >
                View
              </NuxtLink>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Empty State -->
      <div v-if="filteredUsers.length === 0" class="text-center py-8">
        <p class="text-gray-500 dark:text-gray-400">
          No users found matching your criteria
        </p>
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
        <h3 class="text-lg font-semibold mb-4">Reject User</h3>
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
import { ref, computed } from "vue";

// Sample Users Data with enhanced fields
const users = ref([
  {
    id: 1,
    name: "John Doe",

    phone: "1234567890",
    location: "New York, USA",
    registered: "2023-10-01",
    verificationStatus: "Verified",
    status: "Pending",
    bio: "Experienced maid with 5 years in residential cleaning.",
    documents: ["ID_Proof.pdf", "Background_Check.pdf"],
  },
  {
    id: 2,
    name: "Jane Smith",

    phone: "9876543210",
    location: "Los Angeles, USA",
    registered: "2023-10-05",
    verificationStatus: "Verified",
    status: "Verified",
    company: "Smith Household",
    address: "123 Main St, Los Angeles",
  },
  {
    id: 3,
    name: "Robert Johnson",

    phone: "5551234567",
    location: "Chicago, USA",
    registered: "2023-10-10",
    verificationStatus: "Pending",
    status: "Rejected",
    bio: "Specialized in elderly care and housekeeping.",
    rejectionReason: "Incomplete documentation",
  },
  {
    id: 4,
    name: "Emily Davis",

    phone: "4445556666",
    location: "Miami, USA",
    registered: "2023-10-15",
    verificationStatus: "Rejected",

    company: "Davis Residence",
    address: "456 Beach Ave, Miami",
  },
  {
    id: 5,
    name: "Michael Wilson",

    phone: "7778889999",
    location: "Austin, USA",
    registered: "2023-10-20",
    verificationStatus: "Verified",

    suspensionReason: "Policy violation",
  },
]);

// Filters
const startDate = ref("");
const endDate = ref("");

const verificationFilter = ref("");
const searchQuery = ref("");

// Reject Modal
const showRejectModal = ref(false);
const rejectReason = ref("");

// Format date for display
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Filtered Users
const filteredUsers = computed(() => {
  return users.value.filter((user) => {
    // Date range filter
    const matchesDateRange =
      (!startDate.value || user.registered >= startDate.value) &&
      (!endDate.value || user.registered <= endDate.value);

    // Verification filter
    const matchesVerification = verificationFilter.value
      ? user.verificationStatus === verificationFilter.value
      : true;

    // Search filter
    const matchesSearch = searchQuery.value
      ? user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        (user.location &&
          user.location.toLowerCase().includes(searchQuery.value.toLowerCase()))
      : true;

    return matchesDateRange && matchesVerification && matchesSearch;
  });
});

// Clear Filters
const clearFilters = () => {
  startDate.value = "";
  endDate.value = "";

  verificationFilter.value = "";
  searchQuery.value = "";
};

// Verification Class
const verificationClass = (status) => {
  switch (status) {
    case "Verified":
      return "bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs dark:bg-green-700 dark:text-green-100";

    case "Pending":
      return "bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs dark:bg-yellow-700 dark:text-yellow-100";
    case "Rejected":
      return "bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm dark:bg-red-700 dark:text-red-100";
    default:
      return "bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs dark:bg-gray-700 dark:text-gray-100";
  }
};

// Print User List
const printUserList = () => {
  const printWindow = window.open("", "", "width=800,height=600");
  printWindow.document.write(`
    <html>
      <head>
        <title>User List Report</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          h1 { color: #333; text-align: center; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
          .status-pending { background-color: #fff3cd; color: #856404; }
          .status-approved { background-color: #d4edda; color: #155724; }
          .status-rejected { background-color: #f8d7da; color: #721c24; }
          .status-suspended { background-color: #ffe8cc; color: #804d00; }
          .verification-verified { background-color: #d4edda; color: #155724; }
          .verification-unverified { background-color: #f8d7da; color: #721c24; }
          .verification-pending { background-color: #fff3cd; color: #856404; }
          .print-date { text-align: right; margin-bottom: 20px; }
          .print-header { display: flex; justify-content: space-between; margin-bottom: 20px; }
          .print-filters { margin-bottom: 20px; font-size: 0.9em; }
        </style>
      </head>
      <body>
        <div class="print-header">
          <div>
            <h1>User Management Report</h1>
            <div class="print-date">Generated on: ${new Date().toLocaleString()}</div>
          </div>
        </div>
        
        <div class="print-filters">
          <strong>Filters Applied:</strong><br>
          
          
          ${
            verificationFilter.value
              ? `Verification: ${verificationFilter.value}<br>`
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
             
              <th>Email</th>
              <th>Location</th>
              <th>Registered</th>
              <th>Verification</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${filteredUsers.value
              .map(
                (user) => `
              <tr>
                <td>${user.name}</td>
                
                <td>${user.email}</td>
                <td>${user.location || "N/A"}</td>
                <td>${formatDate(user.registered)}</td>
                <td class="verification-${user.verificationStatus.toLowerCase()}">${
                  user.verificationStatus
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

definePageMeta({
  layout: "mod",
});
</script>
