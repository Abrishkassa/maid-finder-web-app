<template>
  <section
    class="max-w-7xl mx-auto p-4 md:p-6 dark:bg-gray-900 dark:text-gray-100"
  >
    <div class="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow">
      <h1 class="text-2xl font-bold mb-6">Job Details</h1>

      <!-- Back Button -->
      <NuxtLink
        to="/house"
        class="p-2 items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 mb-4 inline-block"
      >
        <Icon name="mdi:arrow-left" class="w-5 h-5" />
        Back to Jobs
      </NuxtLink>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-8">
        <Spinner class="mx-auto" />
        <p class="mt-2">Loading job details...</p>
      </div>

      <!-- Error State -->
      <div
        v-else-if="error"
        class="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 p-4 rounded-lg mb-6"
      >
        {{ error }}
        <button
          @click="fetchJobDetails"
          class="ml-4 text-red-600 dark:text-red-300 hover:underline"
        >
          Retry
        </button>
      </div>

      <!-- Job Details -->
      <div v-else-if="job" class="space-y-6">
        <!-- Basic Information Section -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >Job Title</label
            >
            <p class="mt-1 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
              {{ job.job.job_title }}
            </p>
          </div>
          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >Status</label
            >
            <p class="mt-1 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <span :class="statusClass(job.job.status)">
                {{ formatStatus(job.job.status) }}
              </span>
              <span
                v-if="job.job.status === 'rejected' && job.job.rejection_reason"
                class="block text-xs text-red-500 dark:text-red-400 mt-1"
              >
                Reason: {{ job.job.rejection_reason }}
              </span>
            </p>
          </div>
          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >Job Type</label
            >
            <p class="mt-1 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
              {{ formatJobTime(job.job.job_time) }}
            </p>
          </div>
          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >Expected Start Date</label
            >
            <p class="mt-1 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
              {{ formatDate(job.job.expected_start_date) }}
            </p>
          </div>
          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >Location</label
            >
            <p class="mt-1 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
              {{ job.job.location }}
            </p>
          </div>
          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >Number of Maids Needed</label
            >
            <p class="mt-1 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
              {{ job.job.num_of_maids }}
            </p>
          </div>
          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >Salary Range</label
            >
            <p class="mt-1 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
              {{ formatSalary(job.job) }}
            </p>
          </div>
          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >Date Posted</label
            >
            <p class="mt-1 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
              {{ formatDate(job.job.created_at) }}
            </p>
          </div>
        </div>

        <!-- Description Section -->
        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >Job Description</label
          >
          <p
            class="mt-1 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg whitespace-pre-line"
          >
            {{ job.job.job_description || "No description provided." }}
          </p>
        </div>

        <!-- Requirements Section -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-if="job.job.required_skills">
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >Required Skills</label
            >
            <p class="mt-1 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
              {{ job.job.required_skills }}
            </p>
          </div>
          <div v-if="job.job.language_requirement">
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >Language Requirements</label
            >
            <p class="mt-1 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
              {{ job.job.language_requirement }}
            </p>
          </div>
          <div v-if="job.job.gender_preference">
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >Gender Preference</label
            >
            <p class="mt-1 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
              {{ formatGenderPreference(job.job.gender_preference) }}
            </p>
          </div>
          <div v-if="job.job.religion_preference">
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >Religion Preference</label
            >
            <p class="mt-1 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
              {{ formatReligionPreference(job.job.religion_preference) }}
            </p>
          </div>
          <div v-if="job.job.benefit">
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >Benefits</label
            >
            <p class="mt-1 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
              {{ job.job.benefit }}
            </p>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-wrap gap-3 mt-4">
          <!-- For Pending or Rejected jobs - Allow Update -->
          <button
            v-if="job.job.status === 'pending' || job.job.status === 'rejected'"
            @click="editJob"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Update Job
          </button>

          <!-- For Pending/Rejected/Open jobs - Show Cancel button -->
          <button
            v-if="
              job.job.status === 'pending' ||
              job.job.status === 'rejected' ||
              job.job.status === 'open'
            "
            @click="cancelJob"
            class="px-4 py-2 border border-red-600 text-red-600 dark:text-red-400 dark:border-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900 transition duration-300"
          >
            Cancel Posting
          </button>

          <!-- For Cancelled or Closed jobs - No buttons -->
          <div
            v-if="job.job.status === 'cancelled' || job.job.status === 'closed'"
            class="text-gray-500 dark:text-gray-400 italic"
          >
            No actions available for this job status
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import backendApi from "@/networkServices/api/backendApi.js";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const route = useRoute();
const jobId = route.params.id;

// State
const job = ref(null);
const loading = ref(false);
const error = ref(null);

// Format job time
const formatJobTime = (time) => {
  const timeMap = {
    "full time": "Full Time",
    "part time": "Part Time",
    "one time": "One Time",
  };
  return timeMap[time] || time;
};

// Format status
const formatStatus = (status) => {
  const statusMap = {
    open: "Open",
    rejected: "Rejected",
    pending: "Pending",
  };
  return statusMap[status] || status;
};

// Status badge classes
const statusClass = (status) => {
  const base = "px-2 py-1 rounded-full text-xs font-medium";
  switch (status.toLowerCase()) {
    case "open":
      return `${base} bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100`;
    case "rejected":
      return `${base} bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100`;
    case "pending":
      return `${base} bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100`;
    case "cancel":
      return `${base} bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100`;
    default:
      return `${base} bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100`;
  }
};

// Format date
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Format salary range
const formatSalary = (job) => {
  if (job.salary_min && job.salary_max) {
    return `$${job.salary_min} - $${job.salary_max}`;
  }
  return job.salary_min
    ? `$${job.salary_min}`
    : job.salary_max
    ? `$${job.salary_max}`
    : "Negotiable";
};

// Format gender preference
const formatGenderPreference = (gender) => {
  const genderMap = {
    male: "Male",
    female: "Female",
  };
  return genderMap[gender] || gender;
};

// Format religion preference
const formatReligionPreference = (religion) => {
  const religionMap = {
    islam: "Islam",
    christianity: "Christianity",
    other: "Other",
  };
  return religionMap[religion?.toLowerCase()] || religion;
};

// Fetch job details
const fetchJobDetails = async () => {
  try {
    loading.value = true;
    error.value = null;

    if (!authStore._hydrated) {
      await authStore.hydrate();
    }

    // Fetch job details
    const response = await backendApi.get(`/household/my-jobs/${jobId}`, {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    });

    job.value = response.data;
  } catch (err) {
    console.error("Error fetching job details:", err);
    error.value = "Failed to load job details. Please try again later.";
  } finally {
    loading.value = false;
  }
};

// Apply for job
const cancelJob = async () => {
  if (confirm("Are you sure you want to cancel this job posting?"))
    try {
      loading.value = true;
      await backendApi.patch(
        `/jobs/${jobId}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authStore.accessToken}`,
          },
        }
      );
      // Refresh job details after applying
      await fetchJobDetails();
    } catch (err) {
      console.error("Error applying for job:", err);
      error.value = "Failed to apply for job. Please try again.";
    } finally {
      loading.value = false;
    }
};

// Request review for rejected job
const requestReview = async () => {
  try {
    loading.value = true;
    await backendApi.post(
      `/jobs/${jobId}/request-review`,
      {},
      {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`,
        },
      }
    );
    // Refresh job details after requesting review
    await fetchJobDetails();
  } catch (err) {
    console.error("Error requesting review:", err);
    error.value = "Failed to request review. Please try again.";
  } finally {
    loading.value = false;
  }
};

// Initialize
onMounted(() => {
  fetchJobDetails();
});

definePageMeta({
  layout: "house",
});
</script>
