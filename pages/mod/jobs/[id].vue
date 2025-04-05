<template>
  <section
    class="ml-0 md:ml-64 dark:bg-gray-900 min-h-screen dark:text-gray-100"
  >
    <div class="container mx-auto px-4 py-6">
      <!-- Back Button -->
      <button
        @click="$router.push('/mod/jobs')"
        class="mb-6 flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      >
        <NuxtIcon name="mdi:arrow-left" class="h-5 w-5" />
        Back to Job Listings
      </button>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div
          class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"
        ></div>
        <p class="text-gray-600 dark:text-gray-300">Loading job details...</p>
      </div>

      <!-- Error State -->
      <div
        v-else-if="error"
        class="bg-red-100 dark:bg-red-900/30 p-4 rounded-lg mb-6 border border-red-200 dark:border-red-800"
      >
        <div class="flex items-start gap-3">
          <NuxtIcon
            name="warning"
            class="h-6 w-6 text-red-500 dark:text-red-400 mt-0.5 flex-shrink-0"
          />
          <div>
            <p class="text-red-700 dark:text-red-300 font-medium">
              {{ error }}
            </p>
            <button
              @click="fetchJobDetails"
              class="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <NuxtIcon name="mdi:refresh" class="h-5 w-5" />
              Retry
            </button>
          </div>
        </div>
      </div>

      <!-- Job Details -->
      <div v-else-if="jobData" class="space-y-6">
        <!-- Job Header with Status and Actions -->
        <div
          class="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <h1
              class="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100"
            >
              {{ jobData.job.job_title || "N/A" }}
            </h1>
            <div class="flex items-center gap-3 mt-2">
              <span :class="statusBadgeClass">
                {{ jobData.job.status || "N/A" }}
              </span>
              <span class="text-sm text-gray-500 dark:text-gray-400">
                Posted
                {{
                  jobData.job.created_at
                    ? formatDate(jobData.job.created_at)
                    : "N/A"
                }}
              </span>
            </div>
          </div>

          <!-- Moderation Actions -->
          <div
            v-if="jobData.job.status === 'pending'"
            class="flex flex-wrap gap-3"
          >
            <button
              @click="approveJob"
              :disabled="processing"
              class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-70"
            >
              <NuxtIcon
                v-if="!processing || currentAction !== 'approve'"
                name="mdi:check"
                class="h-5 w-5"
              />
              <NuxtIcon
                v-if="processing && currentAction === 'approve'"
                name="loading"
                class="h-5 w-5 animate-spin"
              />
              Approve
            </button>
            <button
              @click="showRejectDialog = true"
              :disabled="processing"
              class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 disabled:opacity-70"
            >
              <NuxtIcon name="mdi:cancel" class="h-5 w-5" />
              Reject
            </button>
          </div>
        </div>

        <!-- Job Details Card -->
        <div
          class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
        >
          <div class="p-6">
            <!-- Basic Info Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div class="space-y-4">
                <div>
                  <h3
                    class="text-sm font-medium text-gray-500 dark:text-gray-400"
                  >
                    Location
                  </h3>
                  <p class="mt-1 text-gray-900 dark:text-gray-100">
                    {{ jobData.job.location || "N/A" }}
                  </p>
                </div>
                <div>
                  <h3
                    class="text-sm font-medium text-gray-500 dark:text-gray-400"
                  >
                    Job Type
                  </h3>
                  <p class="mt-1 text-gray-900 dark:text-gray-100">
                    {{ jobData.job.job_time || "N/A" }}
                  </p>
                </div>
                <div>
                  <h3
                    class="text-sm font-medium text-gray-500 dark:text-gray-400"
                  >
                    Number of Maids Needed
                  </h3>
                  <p class="mt-1 text-gray-900 dark:text-gray-100">
                    {{ jobData.job.num_of_maids || "N/A" }}
                  </p>
                </div>
              </div>
              <div class="space-y-4">
                <div>
                  <h3
                    class="text-sm font-medium text-gray-500 dark:text-gray-400"
                  >
                    Salary Range
                  </h3>
                  <p class="mt-1 text-gray-900 dark:text-gray-100">
                    {{
                      jobData.job.salary_min
                        ? formatCurrency(jobData.job.salary_min)
                        : "N/A"
                    }}
                    -
                    {{
                      jobData.job.salary_max
                        ? formatCurrency(jobData.job.salary_max)
                        : "N/A"
                    }}
                  </p>
                </div>
                <div>
                  <h3
                    class="text-sm font-medium text-gray-500 dark:text-gray-400"
                  >
                    Expected Start Date
                  </h3>
                  <p class="mt-1 text-gray-900 dark:text-gray-100">
                    {{
                      jobData.job.expected_start_date
                        ? formatDate(jobData.job.expected_start_date)
                        : "N/A"
                    }}
                  </p>
                </div>
                <div>
                  <h3
                    class="text-sm font-medium text-gray-500 dark:text-gray-400"
                  >
                    Benefits
                  </h3>
                  <p class="mt-1 text-gray-900 dark:text-gray-100">
                    {{ jobData.job.benefit || "N/A" }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Description -->
            <div class="mb-6">
              <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">
                Job Description
              </h3>
              <div class="mt-2 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                <p class="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                  {{ jobData.job.job_description || "N/A" }}
                </p>
              </div>
            </div>

            <!-- Requirements -->
            <div class="mb-6">
              <h3
                class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4"
              >
                Requirements
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                  <h4
                    class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2"
                  >
                    Skills Required
                  </h4>
                  <p class="text-gray-700 dark:text-gray-300">
                    {{ jobData.job.required_skills || "N/A" }}
                  </p>
                </div>
                <div class="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                  <h4
                    class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2"
                  >
                    Language Requirements
                  </h4>
                  <p class="text-gray-700 dark:text-gray-300">
                    {{ jobData.job.language_requirement || "N/A" }}
                  </p>
                </div>
                <div class="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                  <h4
                    class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2"
                  >
                    Gender Preference
                  </h4>
                  <p class="text-gray-700 dark:text-gray-300">
                    {{ jobData.job.gender_preference || "N/A" }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Rejection Reason (if rejected) -->
            <div
              v-if="
                jobData.job.status === 'rejected' &&
                jobData.job.rejection_reason
              "
              class="mb-6"
            >
              <h3
                class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2"
              >
                Rejection Reason
              </h3>
              <div
                class="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-800"
              >
                <p class="text-red-700 dark:text-red-300">
                  {{ jobData.job.rejection_reason }}
                </p>
              </div>
            </div>

            <!-- Employer Details -->
            <div
              class="pt-6 mt-6 border-t border-gray-200 dark:border-gray-700"
            >
              <h2
                class="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4"
              >
                Employer Information
              </h2>
              <div class="flex items-start gap-4">
                <div
                  v-if="jobData.household.image_url"
                  class="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-600"
                >
                  <img
                    :src="jobData.household.image_url"
                    :alt="fullName"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div
                  v-else
                  class="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center border-2 border-gray-200 dark:border-gray-600"
                >
                  <span
                    class="text-xl font-semibold text-gray-800 dark:text-gray-100"
                  >
                    {{ jobData.household.first_name?.charAt(0) || "E" }}
                  </span>
                </div>
                <div class="flex-1">
                  <h3
                    class="text-lg font-semibold text-gray-800 dark:text-gray-100"
                  >
                    {{ fullName }}
                  </h3>
                  <p class="text-gray-600 dark:text-gray-400">
                    {{ jobData.job.location || "N/A" }}
                  </p>

                  <div
                    v-if="jobData.job.household"
                    class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <div>
                      <h4
                        class="text-sm font-medium text-gray-500 dark:text-gray-400"
                      >
                        Contact
                      </h4>
                      <p class="text-gray-700 dark:text-gray-300">
                        {{ jobData.job.household.phone_number1 || "N/A" }}
                      </p>
                    </div>
                    <div>
                      <h4
                        class="text-sm font-medium text-gray-500 dark:text-gray-400"
                      >
                        Verification Status
                      </h4>
                      <span :class="verificationStatusClass">
                        {{ jobData.job.household.verification_status || "N/A" }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- No job found -->
      <div v-else-if="!loading" class="text-center py-12">
        <NuxtIcon
          name="emoji-sad"
          class="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500"
        />
        <h3 class="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">
          Job not found
        </h3>
        <p class="mt-1 text-gray-600 dark:text-gray-400">
          The job you're looking for doesn't exist or may have been removed.
        </p>
        <button
          @click="$router.push('/mod/jobs')"
          class="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Browse Jobs
        </button>
      </div>

      <!-- Rejection Dialog -->
      <div
        v-if="showRejectDialog"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      >
        <div
          class="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6"
        >
          <h3
            class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4"
          >
            Reject Job Posting
          </h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Please provide a reason for rejecting this job posting.
          </p>

          <textarea
            v-model="rejectionReason"
            placeholder="Enter rejection reason..."
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
            rows="4"
          ></textarea>

          <div class="mt-6 flex justify-end gap-3">
            <button
              @click="showRejectDialog = false"
              class="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              @click="rejectJob"
              :disabled="!rejectionReason || processing"
              class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-70 flex items-center gap-2"
            >
              <NuxtIcon
                v-if="processing && currentAction === 'reject'"
                name="loading"
                class="h-5 w-5 animate-spin"
              />
              <span>Confirm Rejection</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import backendApi from "@/networkServices/api/backendApi.js";
import { useAuthStore } from "@/stores/auth";

const route = useRoute();
const jobId = route.params.id;
const jobData = ref(null);
const loading = ref(true);
const error = ref(null);
const processing = ref(false);
const currentAction = ref(null);
const showRejectDialog = ref(false);
const rejectionReason = ref("");

const authStore = useAuthStore();

// Computed properties
const fullName = computed(() => {
  if (!jobData.value?.household) return "N/A";
  const { first_name, middle_name, last_name } = jobData.value.household;
  return (
    [first_name, middle_name, last_name].filter(Boolean).join(" ") || "N/A"
  );
});

const statusBadgeClass = computed(() => {
  if (!jobData.value) return "";
  const status = (jobData.value.job.status || "").toLowerCase();
  const baseClasses = "px-3 py-1 rounded-full text-sm font-medium";

  switch (status) {
    case "open":
      return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400`;
    case "closed":
      return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400`;
    case "pending":
      return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400`;
    case "rejected":
      return `${baseClasses} bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400`;
    default:
      return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300`;
  }
});

const verificationStatusClass = computed(() => {
  if (!jobData.value?.job?.household?.verification_status) return "";
  const status = (
    jobData.value.job.household.verification_status || ""
  ).toLowerCase();
  const baseClasses =
    "inline-block px-2.5 py-0.5 rounded-full text-xs font-medium";

  switch (status) {
    case "verified":
      return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400`;
    case "pending":
      return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400`;
    case "rejected":
      return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400`;
    default:
      return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300`;
  }
});

// Helper functions
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const formatCurrency = (amount) => {
  if (!amount) return "N/A";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "ETB",
    minimumFractionDigits: 2,
  }).format(amount);
};

// API functions
const fetchJobDetails = async () => {
  try {
    loading.value = true;
    error.value = null;

    if (!authStore._hydrated) {
      await authStore.hydrate();
    }

    const response = await backendApi.get(`/employee/jobs/${jobId}`, {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    });

    jobData.value = response.data;
  } catch (err) {
    error.value =
      err.response?.data?.message ||
      err.message ||
      "Failed to fetch job details";
    console.error("Error fetching job details:", err);
  } finally {
    loading.value = false;
  }
};

const approveJob = async () => {
  try {
    processing.value = true;
    currentAction.value = "approve";

    const response = await backendApi.patch(
      `/mod/jobs/${jobId}/approve`,
      {},
      {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`,
        },
      }
    );

    jobData.value.job.status = "open";
    jobData.value.job.rejection_reason = null;
  } catch (err) {
    error.value =
      err.response?.data?.message || err.message || "Failed to approve job";
    console.error("Error approving job:", err);
  } finally {
    processing.value = false;
    currentAction.value = null;
  }
};

const rejectJob = async () => {
  try {
    processing.value = true;
    currentAction.value = "reject";

    const response = await backendApi.patch(
      `/mod/jobs/${jobId}/reject`,
      { rejection_reason: rejectionReason.value },
      {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`,
        },
      }
    );

    jobData.value.job.status = "rejected";
    jobData.value.job.rejection_reason = rejectionReason.value;
    showRejectDialog.value = false;
    rejectionReason.value = "";
  } catch (err) {
    error.value =
      err.response?.data?.message || err.message || "Failed to reject job";
    console.error("Error rejecting job:", err);
  } finally {
    processing.value = false;
    currentAction.value = null;
  }
};

// Initial fetch
onMounted(() => {
  fetchJobDetails();
});

definePageMeta({
  layout: "mod",
});
</script>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.whitespace-pre-line {
  white-space: pre-line;
}
</style>
