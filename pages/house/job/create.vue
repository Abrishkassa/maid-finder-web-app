<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-[#F3F3F3] dark:bg-[#191A23] p-2"
  >
    <div
      class="bg-white dark:bg-[#20233f] p-8 font-serif rounded-lg shadow-lg text-center max-w-2xl w-full"
    >
      <h1 class="text-2xl font-bold mb-6 dark:text-[#F3F3F3]">
        Post a New Job
      </h1>

      <!-- Stepper Component -->
      <div class="flex justify-between items-center mb-8">
        <div
          v-for="(step, index) in steps"
          :key="index"
          class="flex flex-col items-center"
        >
          <div
            class="w-8 h-8 rounded-full flex items-center justify-center"
            :class="{
              'bg-[#B9FF66] text-[#191A23]': currentStep > index,
              'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-[#F3F3F3]':
                currentStep <= index,
            }"
          >
            {{ index + 1 }}
          </div>
          <span
            class="text-xs mt-1"
            :class="{
              'text-[#B9FF66] font-medium': currentStep > index,
              'text-gray-500 dark:text-gray-400': currentStep <= index,
            }"
          >
            {{ step }}
          </span>
        </div>
      </div>

      <!-- Job Posting Form -->
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Step 1: Job Details -->
        <div v-if="currentStep === 1" class="slide-in">
          <h2 class="text-xl font-semibold mb-4 text-left dark:text-[#F3F3F3]">
            Job Details
          </h2>

          <!-- Job Title -->
          <div class="relative mb-4">
            <label
              class="block text-left text-gray-700 dark:text-[#F3F3F3] mb-2"
            >
              Job Title <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.job_title"
              type="text"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B9FF66] dark:bg-[#191A23] dark:text-[#F3F3F3] dark:border-[#F3F3F3]"
              placeholder="e.g. Housekeeper, Nanny, Cook"
              required
            />
          </div>

          <!-- Job Description -->
          <div class="relative mb-4">
            <label
              class="block text-left text-gray-700 dark:text-[#F3F3F3] mb-2"
            >
              Job Description <span class="text-red-500">*</span>
            </label>
            <textarea
              v-model="form.job_description"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B9FF66] dark:bg-[#191A23] dark:text-[#F3F3F3] dark:border-[#F3F3F3]"
              rows="4"
              placeholder="Describe the responsibilities and duties..."
              required
            ></textarea>
          </div>

          <!-- Job Type -->
          <div class="relative mb-4">
            <label
              class="block text-left text-gray-700 dark:text-[#F3F3F3] mb-2"
            >
              Job Type <span class="text-red-500">*</span>
            </label>
            <select
              v-model="form.job_type"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B9FF66] dark:bg-[#191A23] dark:text-[#F3F3F3] dark:border-[#F3F3F3]"
              required
            >
              <option value="" disabled selected>Select Job Type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Live-in">Live-in</option>
              <option value="Live-out">Live-out</option>
            </select>
          </div>
          <div class="relative">
            <label
              class="block text-left text-gray-700 dark:text-[#F3F3F3] mb-2"
            >
              Number of Maids<span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.num_of_maids"
              type="number"
              min="1"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B9FF66] dark:bg-[#191A23] dark:text-[#F3F3F3] dark:border-[#F3F3F3]"
              placeholder=""
              required
            />
          </div>

          <!-- Required Skills -->
          <div class="relative mb-4">
            <label
              class="block text-left text-gray-700 dark:text-[#F3F3F3] mb-2"
            >
              Required Skills <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.required_skills"
              type="text"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B9FF66] dark:bg-[#191A23] dark:text-[#F3F3F3] dark:border-[#F3F3F3]"
              placeholder="e.g. Cooking, Childcare, Laundry (separate with commas)"
              required
            />
          </div>
        </div>

        <!-- Step 2: Requirements -->
        <div v-if="currentStep === 2" class="slide-in">
          <h2 class="text-xl font-semibold mb-4 text-left dark:text-[#F3F3F3]">
            Requirements
          </h2>

          <!-- Language Requirements -->
          <div class="relative mb-4">
            <label
              class="block text-left text-gray-700 dark:text-[#F3F3F3] mb-2"
            >
              Language Requirements <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.language_requirements"
              type="text"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B9FF66] dark:bg-[#191A23] dark:text-[#F3F3F3] dark:border-[#F3F3F3]"
              placeholder="e.g. English, Amharic (separate with commas)"
              required
            />
          </div>

          <!-- Gender Preference -->
          <div class="relative mb-4">
            <label
              class="block text-left text-gray-700 dark:text-[#F3F3F3] mb-2"
            >
              Gender Preference
            </label>
            <select
              v-model="form.gender_preference"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B9FF66] dark:bg-[#191A23] dark:text-[#F3F3F3] dark:border-[#F3F3F3]"
            >
              <option value="" selected>No preference</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <!-- Religion Preference -->
          <div class="relative mb-4">
            <label
              class="block text-left text-gray-700 dark:text-[#F3F3F3] mb-2"
            >
              Religion Preference
            </label>
            <select
              v-model="form.religion_preference"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B9FF66] dark:bg-[#191A23] dark:text-[#F3F3F3] dark:border-[#F3F3F3]"
            >
              <option value="" selected>No preference</option>
              <option value="Christianity">Christian</option>
              <option value="Islam">Muslim</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <!-- Start Date -->
          <div class="relative mb-4">
            <label
              class="block text-left text-gray-700 dark:text-[#F3F3F3] mb-2"
            >
              Expected Start Date <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.expecected_start_date"
              type="date"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B9FF66] dark:bg-[#191A23] dark:text-[#F3F3F3] dark:border-[#F3F3F3]"
              required
            />
          </div>
        </div>

        <!-- Step 3: Compensation & Location -->
        <div v-if="currentStep === 3" class="slide-in">
          <h2 class="text-xl font-semibold mb-4 text-left dark:text-[#F3F3F3]">
            Compensation & Location
          </h2>

          <!-- Min Salary -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div class="relative">
              <label
                class="block text-left text-gray-700 dark:text-[#F3F3F3] mb-2"
              >
                Min Salary (ETB) <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.salary_min"
                type="number"
                min="1"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B9FF66] dark:bg-[#191A23] dark:text-[#F3F3F3] dark:border-[#F3F3F3]"
                placeholder="e.g. 3000"
                required
              />
            </div>
            <!-- Max Salary -->

            <div class="relative">
              <label
                class="block text-left text-gray-700 dark:text-[#F3F3F3] mb-2"
              >
                Max Salary (ETB) <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.salary_max"
                type="number"
                min="500"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B9FF66] dark:bg-[#191A23] dark:text-[#F3F3F3] dark:border-[#F3F3F3]"
                placeholder="e.g. 3000"
                required
              />
            </div>
          </div>

          <!-- Benefits -->
          <div class="relative mb-4">
            <label
              class="block text-left text-gray-700 dark:text-[#F3F3F3] mb-2"
            >
              Benefits (optional)
            </label>
            <input
              v-model="form.benefits"
              type="text"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B9FF66] dark:bg-[#191A23] dark:text-[#F3F3F3] dark:border-[#F3F3F3]"
              placeholder="e.g. Accommodation, Meals, Transportation"
            />
          </div>

          <!-- Location -->
          <div class="relative mb-4">
            <label
              class="block text-left text-gray-700 dark:text-[#F3F3F3] mb-2"
            >
              Location <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.location"
              type="text"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B9FF66] dark:bg-[#191A23] dark:text-[#F3F3F3] dark:border-[#F3F3F3]"
              placeholder="e.g. Bole, Addis Ababa"
              required
            />
          </div>
        </div>

        <!-- Step 4: Review & Submit -->
        <div v-if="currentStep === 4" class="slide-in">
          <h2 class="text-xl font-semibold mb-4 text-left dark:text-[#F3F3F3]">
            Review Your Job Posting
          </h2>

          <div class="text-left space-y-6">
            <!-- Job Details -->
            <div>
              <h3 class="font-medium text-lg dark:text-[#F3F3F3] mb-2">
                Job Details
              </h3>
              <div class="bg-gray-100 dark:bg-[#191A23] p-4 rounded-lg">
                <p class="text-gray-700 dark:text-gray-300">
                  <span class="font-medium">Title:</span> {{ form.job_title }}
                </p>
                <p class="text-gray-700 dark:text-gray-300">
                  <span class="font-medium">Type:</span> {{ form.job_time }}
                </p>
                <p class="text-gray-700 dark:text-gray-300">
                  <span class="font-medium">Description:</span>
                  {{ form.job_description }}
                </p>
                <p class="text-gray-700 dark:text-gray-300">
                  <span class="font-medium">Required Skills:</span>
                  {{ form.required_skills }}
                </p>
              </div>
            </div>

            <!-- Requirements -->
            <div>
              <h3 class="font-medium text-lg dark:text-[#F3F3F3] mb-2">
                Requirements
              </h3>
              <div class="bg-gray-100 dark:bg-[#191A23] p-4 rounded-lg">
                <p class="text-gray-700 dark:text-gray-300">
                  <span class="font-medium">Experience:</span>
                  {{ form.experience_level }}
                </p>
                <p class="text-gray-700 dark:text-gray-300">
                  <span class="font-medium">Languages:</span>
                  {{ form.language_requirements }}
                </p>
                <p class="text-gray-700 dark:text-gray-300">
                  <span class="font-medium">Gender Preference:</span>
                  {{ form.gender_preference || "No preference" }}
                </p>
                <p class="text-gray-700 dark:text-gray-300">
                  <span class="font-medium">Religion Preference:</span>
                  {{ form.religion_preference || "No preference" }}
                </p>
              </div>
            </div>

            <!-- Compensation & Location -->
            <div>
              <h3 class="font-medium text-lg dark:text-[#F3F3F3] mb-2">
                Compensation & Location
              </h3>
              <div class="bg-gray-100 dark:bg-[#191A23] p-4 rounded-lg">
                <p class="text-gray-700 dark:text-gray-300">
                  <span class="font-medium">Salary:</span> {{ form.salary }} ETB
                  per {{ form.salary_period?.toLowerCase() }}
                </p>
                <p class="text-gray-700 dark:text-gray-300">
                  <span class="font-medium">Benefits:</span>
                  {{ form.benefits || "None specified" }}
                </p>
                <p class="text-gray-700 dark:text-gray-300">
                  <span class="font-medium">Location:</span> {{ form.location }}
                </p>
                <p class="text-gray-700 dark:text-gray-300">
                  <span class="font-medium">Expected start Date:</span>
                  {{ form.expecected_start_date }}
                </p>
              </div>
            </div>
          </div>

          <!-- Terms & Conditions -->
          <div class="flex items-center mt-6 mb-4">
            <input
              type="checkbox"
              v-model="form.agreeTerms"
              class="mr-2 accent-[#B9FF66]"
              required
            />
            <label class="text-gray-700 dark:text-[#F3F3F3]">
              I agree to the
              <a href="#" class="text-[#B9FF66] hover:underline"
                >Terms of Service & Conditions</a
              >.
            </label>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="errorMessage" class="text-red-500 text-sm text-left">
          {{ errorMessage }}
        </div>

        <!-- Navigation Buttons -->
        <div class="flex justify-between mt-6">
          <button
            v-if="currentStep > 1"
            @click="prevStep"
            type="button"
            class="px-4 py-2 border border-gray-300 dark:border-[#F3F3F3] rounded-lg text-gray-700 dark:text-[#F3F3F3] hover:bg-gray-100 dark:hover:bg-[#191A23] transition duration-300"
          >
            Previous
          </button>
          <div v-else></div>
          <!-- Empty div to maintain space -->

          <button
            v-if="currentStep < steps.length"
            @click="nextStep"
            type="button"
            class="px-4 py-2 bg-[#B9FF66] text-[#191A23] font-semibold rounded-lg hover:bg-[#A0E55C] transition duration-300"
          >
            Next
          </button>
          <button
            v-else
            type="submit"
            class="px-4 py-2 bg-[#B9FF66] text-[#191A23] font-semibold rounded-lg hover:bg-[#A0E55C] transition duration-300"
            :disabled="!isFormComplete || isLoading"
          >
            <span v-if="isLoading">Posting...</span>
            <span v-else>Post Job</span>
          </button>
        </div>
      </form>
    </div>
  </div>
  0
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import backendApi from "@/networkServices/api/backendApi.js";

import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

// Stepper configuration
const steps = ref(["Job Details", "Requirements", "Compensation", "Review"]);
const currentStep = ref(1);
const isLoading = ref(false);
const errorMessage = ref("");

// Form data
const form = ref({
  // Job Details
  job_title: "",
  job_description: "",
  job_time: "",
  required_skills: "",
  num_of_maids: "",

  // Requirements

  language_requirements: "",
  gender_preference: "",

  religion_preference: "",

  // Compensation & Location
  salary: "",
  salary_period: "",
  benefits: "",
  location: "",
  expecected_start_date: "",
  salary_min: "",
  salary_max: "",

  // Terms
  agreeTerms: false,
});

// Navigation functions
const nextStep = () => {
  if (currentStep.value === 1 && !validateJobDetails()) {
    errorMessage.value = "Please fill all required fields in Job Details";
    return;
  }
  if (currentStep.value === 2 && !validateRequirements()) {
    errorMessage.value = "Please fill all required fields in Requirements";
    return;
  }
  if (currentStep.value === 3 && !validateCompensation()) {
    errorMessage.value =
      "Please fill all required fields in Compensation & Location";
    return;
  }
  errorMessage.value = "";
  currentStep.value++;
};

const prevStep = () => {
  errorMessage.value = "";
  currentStep.value--;
};

// Validation functions
const validateJobDetails = () => {
  return (
    form.value.job_title &&
    form.value.job_description &&
    form.value.job_type &&
    form.value.required_skills &&
    form.value.num_of_maids
  );
};

const validateRequirements = () => {
  return (
    form.value.language_requirements &&
    form.value.gender_preference &&
    form.value.religion_preference &&
    form.value.expecected_start_date
  );
};

const validateCompensation = () => {
  return (
    form.value.salary_max &&
    form.value.salary_min &&
    form.value.benefits &&
    form.value.location
  );
};

// Computed properties
const isFormComplete = computed(() => {
  return (
    validateJobDetails() &&
    validateRequirements() &&
    validateCompensation() &&
    form.value.agreeTerms
  );
});

// API Submission
const handleSubmit = async () => {
  if (!isFormComplete.value) {
    errorMessage.value =
      "Please complete all form steps and agree to the terms";
    return;
  }

  isLoading.value = true;
  errorMessage.value = "";

  try {
    // Check if token needs refresh
    // const isTokenValid = await authStore.refreshToken();
    // if (!isTokenValid) {
    //   alert("Session expired. Please login again.");
    //   throw new Error("Session expired. Please login again.");
    // }

    const response = await backendApi.post("/jobs/create", form.value, {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    });

    if (response.data) {
      router.push({ name: "jobs" });
    } else {
      throw new Error(response.data.message || "Job posting failed");
    }
  } catch (error) {
    console.error("Job posting error:", error);
    errorMessage.value =
      error.response?.data?.message ||
      error.message ||
      "Job posting failed. Please try again.";
  } finally {
    isLoading.value = false;
  }
};

definePageMeta({
  layout: "house",
});
</script>

<style scoped>
.slide-in {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
