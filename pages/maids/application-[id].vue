<template>
  <section
    class="mt-2 mx-auto max-w-7xl dark:bg-gray-900 min-h-screen dark:text-gray-100"
  >
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-8">
        <div
          class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"
        ></div>
        <p class="text-gray-500 dark:text-gray-400">
          Loading application details...
        </p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-8">
        <Icon
          name="mdi:alert-circle"
          class="h-12 w-12 text-red-500 mx-auto mb-2"
        />
        <p class="text-red-500 dark:text-red-400 mb-2">{{ error }}</p>
        <button
          @click="fetchApplication"
          class="p-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 dark:bg-blue-700 dark:text-blue-100 dark:hover:bg-blue-600"
        >
          Retry
        </button>
      </div>

      <!-- Application Details -->
      <div
        v-else-if="application"
        class="divide-y divide-gray-200 dark:divide-gray-700"
      >
        <!-- Header Section -->
        <div class="px-4 py-5 sm:px-6 bg-gray-50 dark:bg-gray-700">
          <div
            class="flex flex-col md:flex-row md:items-center md:justify-between"
          >
            <div class="mb-4 md:mb-0">
              <h2 class="text-xl font-semibold">
                {{ application.job.job_title }}
              </h2>
              <div
                class="mt-1 flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400"
              >
                <div class="flex items-center mr-4">
                  <Icon name="mdi:map-marker" class="mr-1" />
                  <span>{{ application.job.location }}</span>
                </div>
                <div class="flex items-center mr-4">
                  <Icon name="mdi:clock" class="mr-1" />
                  <span>{{ application.job.job_time }}</span>
                </div>
                <div class="flex items-center">
                  <Icon name="mdi:calendar" class="mr-1" />
                  <span
                    >Applied on {{ formatDate(application.created_at) }}</span
                  >
                </div>
              </div>
            </div>
            <div>
              <span
                class="px-3 py-1 rounded-full text-sm font-medium"
                :class="statusClasses"
              >
                {{ formatStatus(application.status) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div class="px-4 py-5 sm:p-6">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Left Column -->
            <div class="lg:col-span-2 space-y-6">
              <!-- Job Description -->
              <div>
                <h3 class="text-lg font-medium mb-2">Job Description</h3>
                <p class="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                  {{
                    application.job.job_description || "No description provided"
                  }}
                </p>
              </div>

              <!-- Requirements -->
              <div v-if="application.job.required_skills">
                <h3 class="text-lg font-medium mb-2">Required Skills</h3>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="(
                      skill, index
                    ) in application.job.required_skills.split(',')"
                    :key="index"
                    class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-sm rounded-full"
                  >
                    {{ skill.trim() }}
                  </span>
                </div>
              </div>

              <!-- Responsibilities -->
              <div v-if="application.job.responsibilities">
                <h3 class="text-lg font-medium mb-2">Responsibilities</h3>
                <ul
                  class="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300"
                >
                  <li
                    v-for="(
                      item, index
                    ) in application.job.responsibilities.split('\n')"
                    :key="index"
                  >
                    {{ item.trim() }}
                  </li>
                </ul>
              </div>
            </div>

            <!-- Right Column -->
            <div class="space-y-6">
              <!-- Job Summary -->
              <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 class="text-lg font-medium mb-3">Job Summary</h3>
                <div class="space-y-3">
                  <div class="flex justify-between">
                    <span class="text-gray-500 dark:text-gray-400"
                      >Salary:</span
                    >
                    <span class="font-medium">{{
                      formatSalary(application.job)
                    }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-500 dark:text-gray-400"
                      >Job Type:</span
                    >
                    <span class="font-medium">{{
                      formatJobTime(application.job.job_time)
                    }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-500 dark:text-gray-400"
                      >Location:</span
                    >
                    <span class="font-medium">{{
                      application.job.location
                    }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-500 dark:text-gray-400"
                      >Posted:</span
                    >
                    <span class="font-medium">{{
                      formatDate(application.job.created_at)
                    }}</span>
                  </div>
                </div>
              </div>

              <!-- Application Timeline -->
              <div>
                <h3 class="text-lg font-medium mb-3">Application Timeline</h3>
                <div class="space-y-4">
                  <div
                    v-for="(event, index) in applicationTimeline"
                    :key="index"
                    class="flex items-start"
                  >
                    <div
                      class="flex-shrink-0 mt-1 mr-3 flex flex-col items-center"
                      :class="{ 'opacity-50': !event.completed }"
                    >
                      <div
                        class="w-6 h-6 rounded-full flex items-center justify-center"
                        :class="
                          event.completed
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 dark:bg-gray-600 text-gray-500'
                        "
                      >
                        <Icon :name="event.icon" class="h-4 w-4" />
                      </div>
                      <div
                        v-if="index !== applicationTimeline.length - 1"
                        class="w-0.5 h-8 bg-gray-200 dark:bg-gray-600"
                      ></div>
                    </div>
                    <div>
                      <p class="font-medium">{{ event.title }}</p>
                      <p class="text-sm text-gray-500 dark:text-gray-400">
                        {{
                          event.date
                            ? formatDate(event.date)
                            : event.description
                        }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Actions -->
              <div class="space-y-2">
                <button
                  v-if="application.status === 'pending'"
                  @click="withdrawApplication"
                  class="w-full px-4 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 dark:bg-red-700 dark:text-red-100 dark:hover:bg-red-600"
                  :disabled="processing"
                >
                  Withdraw Application
                </button>
                <NuxtLink
                  to="/maids/applications"
                  class="block w-full px-4 py-2 text-center bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
                >
                  Back to Applications
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import backendApi from "@/networkServices/api/backendApi.js";
import { useAuthStore } from "@/stores/auth";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

// State
const loading = ref(true);
const error = ref(null);
const application = ref(null);
const processing = ref(false);

// Computed Properties
const statusClasses = computed(() => {
  const base = "px-3 py-1 rounded-full text-sm font-medium";
  switch (application.value?.status) {
    case "pending":
      return `${base} bg-orange-100 text-yellow-800 dark:bg-yellow-700 dark:text-blue-100`;
    case "selected":
      return `${base} bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100`;
    case "rejected":
      return `${base} bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100`;
    default:
      return `${base} bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-100`;
  }
});

const applicationTimeline = computed(() => {
  if (!application.value) return [];

  return [
    {
      title: "Application Submitted",
      description: "Your application has been received",
      date: application.value.created_at,
      icon: "mdi:check",
      completed: true,
    },
    {
      title: "Application Viewed",
      description: "Employer will review your application",
      date: application.value.viewed_at,
      icon: "mdi:eye",
      completed: !!application.value.viewed_at,
    },
    {
      title:
        application.value.status === "selected"
          ? "Application Accepted"
          : application.value.status === "rejected"
          ? "Application Rejected"
          : "Application Status",
      description:
        application.value.status === "pending"
          ? "Waiting for employer response"
          : "",
      date: application.value.status_updated_at,
      icon:
        application.value.status === "selected"
          ? "mdi:check-circle"
          : application.value.status === "rejected"
          ? "mdi:close-circle"
          : "mdi:clock",
      completed: application.value.status !== "pending",
    },
  ];
});

// Methods
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const formatJobTime = (jobTime) => {
  if (!jobTime) return "N/A";
  return jobTime
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const formatStatus = (status) => {
  if (!status) return "N/A";
  return status.charAt(0).toUpperCase() + status.slice(1);
};

const formatSalary = (job) => {
  if (!job.salary_min && !job.salary_max) return "Negotiable";
  if (job.salary_min && job.salary_max) {
    return `ETB${job.salary_min} - ETB${job.salary_max}`;
  }
  return job.salary_min ? `ETB${job.salary_min}` : `ETB${job.salary_max}`;
};

const fetchApplication = async () => {
  try {
    loading.value = true;
    error.value = null;

    if (!authStore._hydrated) {
      await authStore.hydrate();
    }

    const response = await backendApi.get(
      `/maid/applications/${route.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`,
        },
      }
    );

    application.value = response.data;
  } catch (err) {
    console.error("Error fetching application:", err);
    error.value =
      err.response?.data?.message ||
      "Failed to load application details. Please try again later.";
  } finally {
    loading.value = false;
  }
};

const withdrawApplication = async () => {
  try {
    processing.value = true;

    await backendApi.delete(`/maid/applications/${route.params.id}`, {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    });

    // Refresh the application data
    await fetchApplication();
  } catch (err) {
    console.error("Error withdrawing application:", err);
    error.value =
      err.response?.data?.message ||
      "Failed to withdraw application. Please try again later.";
  } finally {
    processing.value = false;
  }
};

// Initialize
onMounted(() => {
  fetchApplication();
});

definePageMeta({
  layout: "house",
});
</script>
