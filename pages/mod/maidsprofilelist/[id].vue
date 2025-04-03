<template>
  <section class="ml-0 md:ml-64 p-4 md:p-6 dark:bg-gray-900 dark:text-gray-100">
    <div class="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow">
      <h1 class="text-2xl font-bold mb-6">Job Application Details</h1>

      <!-- Back Button -->
      <NuxtLink
        to="/maids/dashboard"
        class="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 mb-4 inline-block"
      >
        Back to Dashboard
      </NuxtLink>

      <!-- Job Application Details -->
      <div v-if="application" class="space-y-4">
        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >Job Title</label
          >
          <p class="mt-1 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
            {{ application.jobTitle }}
          </p>
        </div>
        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >Company</label
          >
          <p class="mt-1 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
            {{ application.company }}
          </p>
        </div>
        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >Date Applied</label
          >
          <p class="mt-1 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
            {{ application.dateApplied }}
          </p>
        </div>
        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >Status</label
          >
          <p class="mt-1 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <span :class="statusClass(application.status)">
              {{ application.status }}
            </span>
          </p>
        </div>
        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >Description</label
          >
          <p class="mt-1 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
            {{ application.description || "No description available." }}
          </p>
        </div>
      </div>

      <!-- Loading State -->
      <div v-else class="text-center">
        <p>Loading...</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";

// Get the route parameter (id)
const route = useRoute();
const id = route.params.id;

// Job Application Data
const application = ref(null);

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

// Fetch Job Application Details
onMounted(async () => {
  // TODO: Replace with API call to fetch job application details
  const applications = [
    {
      id: 1,
      jobTitle: "Software Engineer",
      company: "Tech Corp",
      dateApplied: "2023-10-01",
      status: "Pending",
      description: "Developing and maintaining web applications.",
    },
    {
      id: 2,
      jobTitle: "Data Analyst",
      company: "Data Inc",
      dateApplied: "2023-10-05",
      status: "Accepted",
      description: "Analyzing data and generating reports.",
    },
    {
      id: 3,
      jobTitle: "Product Manager",
      company: "Innovate LLC",
      dateApplied: "2023-10-10",
      status: "Rejected",
      description: "Managing product development lifecycle.",
    },
    {
      id: 4,
      jobTitle: "UX Designer",
      company: "Design Co",
      dateApplied: "2023-10-15",
      status: "Pending",
      description: "Designing user-friendly interfaces.",
    },
  ];

  application.value = applications.find((app) => app.id === parseInt(id));
});

definePageMeta({
  layout: "custom",
});
</script>
