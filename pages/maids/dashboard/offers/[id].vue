<template>
  <section class="ml-0 md:ml-64 dark:bg-gray-900 dark:text-gray-100 p-4 md:p-6">
    <!-- Back Button -->
    <button
      @click="$router.push('/maids/dashboard/offers')"
      class="mb-4 p-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
    >
      ← Back to Job Offers
    </button>

    <!-- Job Offer Details -->
    <div
      v-if="jobOffer"
      class="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow"
    >
      <h1 class="text-2xl font-semibold mb-4">{{ jobOffer.jobTitle }}</h1>
      <div class="space-y-4">
        <div>
          <h2 class="text-lg font-medium text-gray-700 dark:text-gray-300">
            Company
          </h2>
          <p class="text-gray-900 dark:text-gray-100">{{ jobOffer.company }}</p>
        </div>
        <div>
          <h2 class="text-lg font-medium text-gray-700 dark:text-gray-300">
            Job Type
          </h2>
          <p class="text-gray-900 dark:text-gray-100">{{ jobOffer.jobType }}</p>
        </div>
        <div>
          <h2 class="text-lg font-medium text-gray-700 dark:text-gray-300">
            Salary
          </h2>
          <p class="text-gray-900 dark:text-gray-100">{{ jobOffer.salary }}</p>
        </div>
        <div>
          <h2 class="text-lg font-medium text-gray-700 dark:text-gray-300">
            Description
          </h2>
          <p class="text-gray-900 dark:text-gray-100">
            {{ jobOffer.description }}
          </p>
        </div>
        <div>
          <h2 class="text-lg font-medium text-gray-700 dark:text-gray-300">
            Requirements
          </h2>
          <ul class="list-disc list-inside text-gray-900 dark:text-gray-100">
            <li
              v-for="(requirement, index) in jobOffer.requirements"
              :key="index"
            >
              {{ requirement }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Apply Button -->
      <button
        @click="applyForJob"
        class="mt-6 p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
      >
        Apply for this Job
      </button>
    </div>

    <!-- Loading State -->
    <div v-else class="text-center text-gray-700 dark:text-gray-300">
      Loading job details...
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

// Sample Job Offers Data (Replace with API call)
const jobOffers = [
  {
    id: 1,
    jobTitle: "Cooking",
    company: "Tech Corp",
    jobType: "Full-Time",
    salary: "$30,000 - $40,000",
    description:
      "We are looking for a skilled cook to prepare delicious meals for our clients.",
    requirements: [
      "2+ years of cooking experience",
      "Knowledge of various cuisines",
      "Ability to work in a fast-paced environment",
    ],
  },
  {
    id: 2,
    jobTitle: "Cleaning",
    company: "Data Inc",
    jobType: "Part-Time",
    salary: "$20,000 - $25,000",
    description:
      "We need a reliable cleaner to maintain cleanliness in our office spaces.",
    requirements: [
      "Experience in commercial cleaning",
      "Attention to detail",
      "Good physical stamina",
    ],
  },
  {
    id: 3,
    jobTitle: "ChildCare",
    company: "Innovate LLC",
    jobType: "Contract",
    salary: "$15/hour",
    description:
      "We are hiring a childcare provider to take care of children in a home setting.",
    requirements: [
      "Experience in childcare",
      "First aid certification",
      "Patience and empathy",
    ],
  },
];

const route = useRoute();
const jobOffer = ref(null);

// Fetch Job Offer Details
onMounted(() => {
  const offerId = parseInt(route.params.id);
  jobOffer.value = jobOffers.find((offer) => offer.id === offerId);
});

// Apply for Job
const applyForJob = () => {
  if (jobOffer.value) {
    alert(`Applied for job: ${jobOffer.value.jobTitle}`);
    // TODO: Call API to apply for the job
  }
};
definePageMeta({
  layout: "maid",
});
</script>

<style scoped>
/* Add custom styles if needed */
</style>
