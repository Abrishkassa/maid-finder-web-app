<template>
  <section
    class="mt-2 mx-auto max-w-7xl dark:bg-gray-900 min-h-screen dark:text-gray-100 p-4"
  >
    <!-- Back Button -->
    <button
      @click="$router.go(-1)"
      class="mb-4 flex items-center text-blue-600 dark:text-blue-400 hover:underline"
    >
      <Icon name="mdi:arrow-left" class="mr-1" /> Back to Invitations
    </button>

    <!-- Main Job Offer Card -->
    <div
      class="bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-6 overflow-hidden border border-gray-200 dark:border-gray-700"
    >
      <div class="p-6">
        <!-- Status Badge -->
        <div class="flex justify-end mb-4">
          <span
            class="px-3 py-1 rounded-full text-xs font-medium"
            :class="{
              'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200':
                invite.status === 'pending',
              'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200':
                invite.status === 'accepted',
              'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200':
                invite.status === 'rejected',
            }"
          >
            {{ formatStatus(invite.status) }}
          </span>
        </div>

        <div class="flex flex-col md:flex-row gap-6">
          <!-- Left Column - Job Details -->
          <div class="flex-1">
            <h1 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              {{ invite.job.job_title || "No title provided" }}
            </h1>

            <!-- Job Information Section -->
            <div
              class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 mb-4"
            >
              <div class="flex items-center gap-2 mb-3">
                <Icon name="mdi:information-outline" class="text-blue-500" />
                <h3 class="font-semibold text-gray-700 dark:text-gray-300">
                  Job Information
                </h3>
              </div>

              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400"
                    >Location:</span
                  >
                  <span class="font-medium text-gray-800 dark:text-gray-200">
                    {{ invite.job.location || "Not specified" }}
                  </span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400"
                    >Job Type:</span
                  >
                  <span class="font-medium text-gray-800 dark:text-gray-200">
                    {{ formatJobTime(invite.job.job_time) || "Not specified" }}
                  </span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400"
                    >Expected Start:</span
                  >
                  <span class="font-medium text-gray-800 dark:text-gray-200">
                    {{
                      formatDate(invite.job.expected_start_date) || "Flexible"
                    }}
                  </span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400"
                    >Maids Needed:</span
                  >
                  <span class="font-medium text-gray-800 dark:text-gray-200">
                    {{ invite.job.num_of_maids || 1 }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Salary & Benefits Section -->
            <div
              class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 mb-4"
            >
              <div class="flex items-center gap-2 mb-3">
                <Icon name="mdi:cash-multiple" class="text-green-500" />
                <h3 class="font-semibold text-gray-700 dark:text-gray-300">
                  Salary & Benefits
                </h3>
              </div>

              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400"
                    >Salary Range:</span
                  >
                  <span class="font-medium text-gray-800 dark:text-gray-200">
                    {{ formatSalary(invite.job) }}
                  </span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400"
                    >Benefits:</span
                  >
                  <span class="font-medium text-gray-800 dark:text-gray-200">
                    {{ invite.job.benefit || "Not specified" }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Requirements Section -->
            <div
              class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 mb-4"
            >
              <div class="flex items-center gap-2 mb-3">
                <Icon
                  name="mdi:clipboard-list-outline"
                  class="text-purple-500"
                />
                <h3 class="font-semibold text-gray-700 dark:text-gray-300">
                  Requirements
                </h3>
              </div>

              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Skills:</span>
                  <span class="font-medium text-gray-800 dark:text-gray-200">
                    {{ invite.job.required_skills || "Not specified" }}
                  </span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400"
                    >Language:</span
                  >
                  <span class="font-medium text-gray-800 dark:text-gray-200">
                    {{ invite.job.language_requirement || "Not specified" }}
                  </span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400"
                    >Gender Preference:</span
                  >
                  <span class="font-medium text-gray-800 dark:text-gray-200">
                    {{ invite.job.gender_preference || "No preference" }}
                  </span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400"
                    >Religion Preference:</span
                  >
                  <span class="font-medium text-gray-800 dark:text-gray-200">
                    {{ invite.job.religion_preference || "No preference" }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Job Description Section -->
            <div class="mt-6">
              <div class="flex items-center gap-2 mb-3">
                <Icon name="mdi:text-box-outline" class="text-indigo-500" />
                <h3
                  class="font-semibold text-lg text-gray-700 dark:text-gray-300"
                >
                  Job Description
                </h3>
              </div>
              <div
                class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600"
              >
                <p class="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                  {{ invite.job.job_description || "No description provided" }}
                </p>
              </div>
            </div>
          </div>

          <!-- Right Column - Household Information -->
          <div class="md:w-80 flex-shrink-0">
            <div
              class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 sticky top-4"
            >
              <div class="flex flex-col items-center mb-4">
                <img
                  :src="
                    invite.household.image_url ||
                    'https://via.placeholder.com/150'
                  "
                  alt="Household profile"
                  class="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow mb-3"
                />
                <h2 class="text-xl font-semibold text-center">
                  {{ getHouseholdName(invite.household) }}
                </h2>
                <p class="text-gray-500 dark:text-gray-400 text-sm">Employer</p>
              </div>

              <div class="space-y-3">
                <div class="flex items-center">
                  <Icon
                    name="mdi:email-outline"
                    class="text-gray-500 dark:text-gray-400 mr-2"
                  />
                  <span class="text-gray-700 dark:text-gray-300 text-sm">
                    {{ invite.household.email || "No email provided" }}
                  </span>
                </div>

                <div class="flex items-center">
                  <Icon
                    name="mdi:calendar"
                    class="text-gray-500 dark:text-gray-400 mr-2"
                  />
                  <span class="text-gray-700 dark:text-gray-300 text-sm">
                    Invited on {{ formatDate(invite.invited_at) }}
                  </span>
                </div>

                <div class="flex items-center">
                  <Icon
                    name="mdi:clock-outline"
                    class="text-gray-500 dark:text-gray-400 mr-2"
                  />
                  <span class="text-gray-700 dark:text-gray-300 text-sm">
                    Posted {{ formatDate(invite.job.created_at) }}
                  </span>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="mt-6 space-y-2">
                <button
                  v-if="invite.status === 'pending'"
                  @click="respondToInvite('accept')"
                  class="w-full py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center justify-center gap-2"
                >
                  <Icon name="mdi:check" class="h-5 w-5" />
                  <span>Accept Offer</span>
                </button>

                <button
                  v-if="invite.status === 'pending'"
                  @click="respondToInvite('reject')"
                  class="w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center justify-center gap-2"
                >
                  <Icon name="mdi:close" class="h-5 w-5" />
                  <span>Reject Offer</span>
                </button>

                <button
                  @click="printJobDetails"
                  class="w-full py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 rounded-lg flex items-center justify-center gap-2"
                >
                  <Icon name="mdi:printer" class="h-5 w-5" />
                  <span>Print Details</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import backendApi from "@/networkServices/api/backendApi";
import { useAuthStore } from "@/stores/auth";

const route = useRoute();
const inviteId = route.params.id;
const authStore = useAuthStore();

// State
const invite = ref({
  invite_id: null,
  status: "pending",
  invited_at: "",
  job: {
    job_title: "",
    job_description: "",
    job_time: "",
    required_skills: "",
    language_requirement: "",
    gender_preference: "",
    religion_preference: "",
    salary_min: "",
    salary_max: "",
    benefit: "",
    location: "",
    num_of_maids: 1,
    expected_start_date: "",
    status: "open",
    created_at: "",
  },
  household: {
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    image_url: "",
  },
});

const loading = ref(true);
const error = ref(null);

// Fetch job invite details
const fetchInviteDetails = async () => {
  try {
    loading.value = true;
    error.value = null;
    if (!authStore._hydrated) {
      await authStore.hydrate();
    }

    const response = await backendApi.get(`/maid/invitation/${inviteId}`, {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    });

    invite.value = response.data;
  } catch (err) {
    error.value = "Failed to load job invitation details";
    console.error(err);
  } finally {
    loading.value = false;
  }
};

// Helper functions
const formatDate = (dateString) => {
  if (!dateString) return "Not specified";
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const formatJobTime = (jobTime) => {
  if (!jobTime) return "Not specified";
  return jobTime
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const formatSalary = (job) => {
  if (!job.salary_min && !job.salary_max) return "Negotiable";
  if (job.salary_min && job.salary_max) {
    return `ETB ${job.salary_min} - ${job.salary_max}`;
  }
  return `ETB ${job.salary_min || job.salary_max}`;
};

const getHouseholdName = (household) => {
  if (!household) return "Unknown Employer";
  return (
    `${household.first_name || ""} ${
      household.middle_name ? household.middle_name + " " : ""
    }${household.last_name || ""}`.trim() || "Unknown Employer"
  );
};

const formatStatus = (status) => {
  if (!status) return "Unknown";
  return status.charAt(0).toUpperCase() + status.slice(1);
};

// Respond to job invite
const respondToInvite = async (action) => {
  try {
    loading.value = true;
    await backendApi.post(
      `/maid/job-invites/${inviteId}/${action}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`,
        },
      }
    );

    // Update local state
    invite.value.status = action === "accept" ? "accepted" : "rejected";

    // Show success message
    alert(`Invitation ${action}ed successfully!`);
  } catch (err) {
    console.error(`Error ${action}ing job invite:`, err);
    alert(`Failed to ${action} invitation. Please try again.`);
  } finally {
    loading.value = false;
  }
};

// Print job details
const printJobDetails = () => {
  const printWindow = window.open("", "", "width=800,height=600");
  printWindow.document.write(`
    <html>
      <head>
        <title>Job Offer Details - ${
          invite.value.job.job_title || "Untitled Job"
        }</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          h1, h2 { color: #333; }
          .header { display: flex; justify-content: space-between; margin-bottom: 20px; }
          .status { padding: 4px 8px; border-radius: 12px; font-size: 14px; }
          .pending { background-color: #d1ecf1; color: #0c5460; }
          .accepted { background-color: #d4edda; color: #155724; }
          .rejected { background-color: #f8d7da; color: #721c24; }
          .section { margin-bottom: 30px; }
          .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
          .household-card { border: 1px solid #ddd; padding: 15px; border-radius: 8px; margin-top: 20px; }
          .household-img { width: 100px; height: 100px; border-radius: 50%; object-fit: cover; margin: 0 auto 10px; display: block; }
          .text-right { text-align: right; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Job Offer Details</h1>
          <div class="text-right">
            <p>Generated on: ${new Date().toLocaleString()}</p>
            <p class="status ${invite.value.status}">
              Status: ${formatStatus(invite.value.status)}
            </p>
          </div>
        </div>

        <div class="section">
          <h2>Job Information</h2>
          <div class="grid">
            <div>
              <p><strong>Job Title:</strong> ${
                invite.value.job.job_title || "Not specified"
              }</p>
              <p><strong>Location:</strong> ${
                invite.value.job.location || "Not specified"
              }</p>
              <p><strong>Job Type:</strong> ${
                formatJobTime(invite.value.job.job_time) || "Not specified"
              }</p>
            </div>
            <div>
              <p><strong>Expected Start:</strong> ${
                formatDate(invite.value.job.expected_start_date) || "Flexible"
              }</p>
              <p><strong>Maids Needed:</strong> ${
                invite.value.job.num_of_maids || 1
              }</p>
              <p><strong>Salary:</strong> ${formatSalary(invite.value.job)}</p>
            </div>
          </div>
        </div>

        <div class="section">
          <h2>Job Description</h2>
          <p>${
            invite.value.job.job_description || "No description provided"
          }</p>
        </div>

        <div class="section">
          <h2>Requirements</h2>
          <table>
            <tr>
              <th>Skills Required</th>
              <td>${invite.value.job.required_skills || "Not specified"}</td>
            </tr>
            <tr>
              <th>Language Requirement</th>
              <td>${
                invite.value.job.language_requirement || "Not specified"
              }</td>
            </tr>
            <tr>
              <th>Gender Preference</th>
              <td>${invite.value.job.gender_preference || "No preference"}</td>
            </tr>
            <tr>
              <th>Religion Preference</th>
              <td>${
                invite.value.job.religion_preference || "No preference"
              }</td>
            </tr>
          </table>
        </div>

        <div class="section">
          <h2>Employer Information</h2>
          <div class="household-card">
            <img src="${
              invite.value.household.image_url ||
              "https://via.placeholder.com/150"
            }" class="household-img" alt="Employer photo">
            <h3 style="text-align: center;">${getHouseholdName(
              invite.value.household
            )}</h3>
            <p style="text-align: center; margin-bottom: 15px;">Employer</p>
            
            <table>
              <tr>
                <th>Email</th>
                <td>${invite.value.household.email || "Not specified"}</td>
              </tr>
              <tr>
                <th>Invited On</th>
                <td>${formatDate(invite.value.invited_at)}</td>
              </tr>
              <tr>
                <th>Job Posted</th>
                <td>${formatDate(invite.value.job.created_at)}</td>
              </tr>
            </table>
          </div>
        </div>
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

// Lifecycle
onMounted(() => {
  fetchInviteDetails();
});

definePageMeta({
  layout: "house",
});
</script>

<style scoped>
/* Custom styles for dark mode */
.dark .bg-gray-50 {
  background-color: #374151;
}

/* Smooth transitions */
button,
select,
a {
  transition: all 0.2s ease;
}

/* Disabled button styles */
button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.dark ::-webkit-scrollbar-track {
  background: #374151;
}

.dark ::-webkit-scrollbar-thumb {
  background: #4b5563;
}
</style>
