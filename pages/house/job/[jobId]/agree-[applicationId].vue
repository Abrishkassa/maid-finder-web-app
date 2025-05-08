<template>
  <section class="mx-auto max-w-4xl dark:bg-gray-900 min-h-screen dark:text-gray-100 p-4">
    <!-- Back Button -->
    <button
      @click="$router.go(-1)"
      class="mb-6 flex items-center text-blue-600 dark:text-blue-400 hover:underline"
    >
      <Icon name="mdi:arrow-left" class="mr-1" /> Back to Job Details
    </button>

    <!-- Agreement Form -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      <div class="p-6">
        <h1 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Create Agreement for {{ job.job_title || "Job" }}
        </h1>
        <p class="text-gray-600 dark:text-gray-300 mb-6">
          You're creating an agreement with {{ maidName }}. Please provide the
          details below.
        </p>

        <!-- Selected Maid Info -->
        <div class="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
          <h3 class="font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Selected Maid Information
          </h3>
          <div class="flex items-start gap-4">
            <img
              :src="maidProfile.image_url || 'https://via.placeholder.com/80'"
              alt="Maid profile"
              class="w-16 h-16 rounded-lg object-cover border-2 border-green-500"
            />
            <div class="flex-1">
              <h4 class="font-medium text-gray-800 dark:text-white">
                {{ maidName }}
              </h4>
              <div class="grid grid-cols-2 gap-2 mt-2 text-sm">
                <div>
                  <span class="text-gray-500 dark:text-gray-400">Phone:</span>
                  <span class="ml-2 text-gray-700 dark:text-gray-300">{{
                    maidProfile.phone_number1 || "N/A"
                  }}</span>
                </div>
                <div>
                  <span class="text-gray-500 dark:text-gray-400">Skills:</span>
                  <span class="ml-2 text-gray-700 dark:text-gray-300">{{
                    maidProfile.skill || "N/A"
                  }}</span>
                </div>
                <div>
                  <span class="text-gray-500 dark:text-gray-400">Language:</span>
                  <span class="ml-2 text-gray-700 dark:text-gray-300">{{
                    maidProfile.main_language || "N/A"
                  }}</span>
                </div>
                <div>
                  <span class="text-gray-500 dark:text-gray-400">Gender:</span>
                  <span class="ml-2 text-gray-700 dark:text-gray-300">{{
                    formatGender(maidProfile.gender) || "N/A"
                  }}</span>
                </div>
                <div>
                  <span class="text-gray-500 dark:text-gray-400">Address:</span>
                  <span class="ml-2 text-gray-700 dark:text-gray-300">{{
                    maidProfile.address || "N/A"
                  }}</span>
                </div>
                <div>
                  <span class="text-gray-500 dark:text-gray-400">Religion:</span>
                  <span class="ml-2 text-gray-700 dark:text-gray-300">{{
                    formatReligion(maidProfile.religion) || "N/A"
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Agreement Form -->
        <form @submit.prevent="submitAgreement">
          <div class="mb-6">
            <label
              for="agreementDetails"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Agreement Details *
            </label>
            <textarea
              id="agreementDetails"
              v-model="agreementDetails"
              rows="8"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
              placeholder="Describe the terms of the agreement including duties, schedule, salary, and any other important details..."
              required
            ></textarea>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Be as specific as possible. The maid will need to confirm these
              terms.
            </p>
          </div>

          <!-- Job Summary -->
          <div class="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
            <h3 class="font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Job Summary
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Job Title</p>
                <p class="font-medium text-gray-800 dark:text-gray-200">
                  {{ job.job_title || "Not specified" }}
                </p>
              </div>
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Job Type</p>
                <p class="font-medium text-gray-800 dark:text-gray-200">
                  {{ formatJobTime(job.job_time) || "Not specified" }}
                </p>
              </div>
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Expected Start Date
                </p>
                <p class="font-medium text-gray-800 dark:text-gray-200">
                  {{ formatDate(job.expected_start_date) || "Not specified" }}
                </p>
              </div>
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Location</p>
                <p class="font-medium text-gray-800 dark:text-gray-200">
                  {{ job.location || "Not specified" }}
                </p>
              </div>
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Salary</p>
                <p class="font-medium text-gray-800 dark:text-gray-200">
                  {{ formatSalary(job) }}
                </p>
              </div>
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Required Skills</p>
                <p class="font-medium text-gray-800 dark:text-gray-200">
                  {{ job.required_skills || "Not specified" }}
                </p>
              </div>
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Language Requirement</p>
                <p class="font-medium text-gray-800 dark:text-gray-200">
                  {{ job.language_requirement || "Not specified" }}
                </p>
              </div>
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Gender Preference</p>
                <p class="font-medium text-gray-800 dark:text-gray-200">
                  {{ formatGender(job.gender_preference) || "Not specified" }}
                </p>
              </div>
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Religion Preference</p>
                <p class="font-medium text-gray-800 dark:text-gray-200">
                  {{ formatReligion(job.religion_preference) || "Not specified" }}
                </p>
              </div>
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Number of Maids Needed</p>
                <p class="font-medium text-gray-800 dark:text-gray-200">
                  {{ job.num_of_maids || "Not specified" }}
                </p>
              </div>
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Benefits</p>
                <p class="font-medium text-gray-800 dark:text-gray-200">
                  {{ job.benefit || "Not specified" }}
                </p>
              </div>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              @click="$router.go(-1)"
              class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="isSubmitting"
              class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <span v-if="!isSubmitting">Create Agreement</span>
              <span v-else class="flex items-center">
                <Icon name="mdi:loading" class="animate-spin mr-2" />
                Processing...
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Success Modal -->
    <div
      v-if="showSuccessModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6">
        <div class="text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900">
            <Icon
              name="mdi:check"
              class="h-6 w-6 text-green-600 dark:text-green-400"
            />
          </div>
          <h3 class="mt-3 text-lg font-medium text-gray-900 dark:text-white">
            Agreement Created Successfully!
          </h3>
          <div class="mt-2 text-sm text-gray-500 dark:text-gray-400">
            <p>
              An email has been sent to {{ maidName }} with the agreement
              details. They will need to confirm the agreement before it becomes
              active.
            </p>
          </div>
          <div class="mt-4">
            <button
              type="button"
              @click="redirectToJobDetails"
              class="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:text-sm"
            >
              Back to Job Details
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import backendApi from "@/networkServices/api/backendApi";
import { useAuthStore } from "@/stores/auth";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const jobId = route.params.jobId;
const applicationId = route.params.applicationId;

// State
const job = ref({
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
  num_of_maids: 0,
  expected_start_date: "",
  status: ""
});

const maidProfile = ref({
  first_name: "",
  middle_name: "",
  last_name: "",
  age: null,
  gender: "",
  phone_number1: "",
  religion: "",
  skill: "",
  main_language: "",
  address: "",
  image_url: ""
});

// Initialize agreement details with template
const agreementDetails = ref("");
const isSubmitting = ref(false);
const showSuccessModal = ref(false);
const createdAgreement = ref(null);

// Computed
const maidName = computed(() => {
  return (
    `${maidProfile.value.first_name || ""} ${
      maidProfile.value.middle_name ? maidProfile.value.middle_name + " " : ""
    }${maidProfile.value.last_name || ""}`.trim() || "Maid"
  );
});

// Methods
const fetchData = async () => {
  try {
    if (!authStore._hydrated) {
      await authStore.hydrate();
    }

    // Fetch job details and applications
    const response = await backendApi.get(`/job/${jobId}/applications`, {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    });
    
    // Set job details
    job.value = response.data.job || {};
    
    // Find the specific application
    const application = response.data.applications.find(app => app.id == applicationId);
    if (application && application.maid_profile) {
      maidProfile.value = {
        ...maidProfile.value,
        ...application.maid_profile,
        image_url: application.maid_profile.image_url || ''
      };
    }

    // Initialize agreement details after data is loaded
    agreementDetails.value = generateAgreementTemplate();
  } catch (error) {
    console.error("Error fetching data:", error);
    // Handle error (show toast/message)
  }
};

const generateAgreementTemplate = () => {
  return `This agreement is made between [Your Name] and ${
    maidName.value
  } for the position of ${job.value.job_title || "Domestic Helper"}.

Job Responsibilities:
- ${job.value.job_description || '[List primary duties]'}
- [List secondary duties]

Work Schedule:
- Job Type: ${formatJobTime(job.value.job_time) || '[Full-time/Part-time]'}
- Hours: [8:00 AM to 5:00 PM]
- Rest Days: [Saturday and Sunday]

Compensation:
- Monthly Salary: ${formatSalary(job.value)}
- Payment Date: [1st of each month]
- Benefits: ${job.value.benefit || "None specified"}

Term:
- Start Date: ${formatDate(job.value.expected_start_date) || "To be determined"}
- Duration: [1 year, renewable]

Termination:
- Notice Period: [1 month]
- Conditions: [List termination conditions]

House Rules:
- [List any specific house rules]

Additional Requirements:
- Skills: ${job.value.required_skills || 'None specified'}
- Language: ${job.value.language_requirement || 'None specified'}
- Gender Preference: ${formatGender(job.value.gender_preference) || 'None'}
- Religion Preference: ${formatReligion(job.value.religion_preference) || 'None'}

Both parties agree to the terms outlined above and acknowledge receipt of a copy of this agreement.

[Your Signature] ___________________   Date: ___________
[Helper's Signature] ________________   Date: ___________`;
};

const formatDate = (dateString) => {
  if (!dateString) return null;
  try {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  } catch (e) {
    console.error("Error formatting date:", e);
    return null;
  }
};

const formatJobTime = (jobTime) => {
  if (!jobTime) return null;
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

const formatGender = (gender) => {
  if (!gender) return null;
  return gender.charAt(0).toUpperCase() + gender.slice(1);
};

const formatReligion = (religion) => {
  if (!religion) return null;
  return religion.charAt(0).toUpperCase() + religion.slice(1);
};

const submitAgreement = async () => {
  try {
    isSubmitting.value = true;

    if (!authStore._hydrated) {
      await authStore.hydrate();
    }

    const response = await backendApi.post(
      `/job/${jobId}/applications/${applicationId}/agreement`,
      {
        agreement_details: agreementDetails.value,
      },
      {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`,
        },
      }
    );

    createdAgreement.value = response.data.agreement;
    showSuccessModal.value = true;
  } catch (error) {
    console.error("Error creating agreement:", error);
    // Handle error (show toast/message)
  } finally {
    isSubmitting.value = false;
  }
};

const redirectToJobDetails = () => {
  router.push(`/house/job/applicationlist`);
};

// Lifecycle
onMounted(() => {
  fetchData();
});

definePageMeta({
  layout: "house"
});
</script>

<style scoped>
/* Custom styles */
textarea {
  min-height: 200px;
  resize: vertical;
}
</style>