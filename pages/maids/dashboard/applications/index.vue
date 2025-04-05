<template>
  <section class="ml-0 md:ml-64 dark:bg-gray-900 dark:text-gray-100">
    <!-- Filters Section -->
    <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
      <h2 class="text-lg font-semibold mb-4">Filters</h2>
      <div
        class="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4"
      >
        <!-- Date Range Filter -->
        <div class="flex-1">
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >Date Applied (Range)</label
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

        <!-- Status Filter -->
        <div class="flex-1">
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >Status</label
          >
          <select
            v-model="statusFilter"
            class="mt-1 p-2 border rounded-lg w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          >
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="Accepted">Accepted</option>
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

    <!-- Job Applications Table -->
    <div
      class="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow mb-6 overflow-x-auto"
    >
      <h2 class="text-lg font-semibold mb-4">Job Applications</h2>
      <table class="w-full min-w-[600px]">
        <thead>
          <tr class="border-b dark:border-gray-700">
            <th class="text-left p-2">Job Title</th>
            <th class="text-left p-2">Company</th>
            <th class="text-left p-2">Date Applied</th>
            <th class="text-left p-2">Status</th>
            <th class="text-left p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="application in filteredApplications"
            :key="application.id"
            class="border-b dark:border-gray-700"
          >
            <td class="p-2">{{ application.jobTitle }}</td>
            <td class="p-2">{{ application.company }}</td>
            <td class="p-2">{{ application.dateApplied }}</td>
            <td class="p-2">
              <span :class="statusClass(application.status)">
                {{ application.status }}
              </span>
            </td>
            <td class="p-2">
              <NuxtLink
                :to="`/maids/dashboard/applications/${application.id}`"
                class="p-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 dark:bg-blue-700 dark:text-blue-100 dark:hover:bg-blue-600"
              >
                View Details
              </NuxtLink>
              <button
                v-if="application.status === 'Pending'"
                @click="cancelApplication(application.id)"
                class="p-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 dark:bg-red-700 dark:text-red-100 dark:hover:bg-red-600 ml-2"
              >
                Cancel
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";

// Sample Job Applications Data
const jobApplications = ref([
  {
    id: 1,
    jobTitle: "Cooking",
    company: "Tech Corp",
    dateApplied: "2023-10-01",
    status: "Pending",
  },
  {
    id: 2,
    jobTitle: "Cleaning",
    company: "Data Inc",
    dateApplied: "2023-10-05",
    status: "Accepted",
  },
  {
    id: 3,
    jobTitle: "ChildCare",
    company: "Innovate LLC",
    dateApplied: "2023-10-10",
    status: "Rejected",
  },
  {
    id: 4,
    jobTitle: "ElderCare",
    company: "Design Co",
    dateApplied: "2023-10-15",
    status: "Pending",
  },
]);

// Filters
const startDate = ref("");
const endDate = ref("");
const statusFilter = ref("");

// Filtered Job Applications
const filteredApplications = computed(() => {
  return jobApplications.value.filter((app) => {
    const matchesDateRange =
      (!startDate.value || app.dateApplied >= startDate.value) &&
      (!endDate.value || app.dateApplied <= endDate.value);
    const matchesStatus = statusFilter.value
      ? app.status === statusFilter.value
      : true;
    return matchesDateRange && matchesStatus;
  });
});

// Clear Filters
const clearFilters = () => {
  startDate.value = "";
  endDate.value = "";
  statusFilter.value = "";
};

// Cancel Application
const cancelApplication = (id) => {
  // TODO: Call API to cancel the application
  const index = jobApplications.value.findIndex((app) => app.id === id);
  if (index !== -1) {
    jobApplications.value.splice(index, 1);
  }
};

// Status Class
const statusClass = (status) => {
  switch (status) {
    case "Pending":
      return "bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm dark:bg-yellow-700 dark:text-yellow-100";
    case "Accepted":
      return "bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm dark:bg-green-700 dark:text-green-100";
    case "Rejected":
      return "bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm dark:bg-red-700 dark:text-red-100";
    default:
      return "bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm dark:bg-gray-700 dark:text-gray-100";
  }
};

// TODO: Fetch job applications from API
// Example:
// onMounted(async () => {
//   const response = await fetch('/api/job-applications');
//   jobApplications.value = await response.json();
// });

// definePageMeta({
//   layout: "maid",
// });
</script>

<style scoped>
/* Add custom styles if needed */
</style>
