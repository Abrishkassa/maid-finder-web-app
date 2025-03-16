<template>
  <section class="ml-0 md:ml-64 dark:bg-gray-900 dark:text-gray-100">
    <!-- Filters Section -->
    <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
      <h2 class="text-lg font-semibold mb-4">Filters</h2>
      <div
        class="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4"
      >
        <!-- Job Type Filter -->
        <div class="flex-1">
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Job Type
          </label>
          <select
            v-model="jobTypeFilter"
            class="mt-1 p-2 border rounded-lg w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          >
            <option value="">All</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Contract">Contract</option>
          </select>
        </div>

        <!-- Salary Range Filter -->
        <div class="flex-1">
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Salary Range
          </label>
          <div
            class="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2"
          >
            <!-- Minimum Salary Input -->
            <div class="flex-1">
              <input
                type="number"
                v-model="minSalary"
                placeholder="Min Salary"
                class="mt-1 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 w-full"
                :class="{ 'border-red-500': errors.minSalary }"
              />
              <span v-if="errors.minSalary" class="text-red-500 text-sm">
                {{ errors.minSalary }}
              </span>
            </div>

            <!-- Maximum Salary Input -->
            <div class="flex-1">
              <input
                type="number"
                v-model="maxSalary"
                placeholder="Max Salary"
                class="mt-1 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 w-full"
                :class="{ 'border-red-500': errors.maxSalary }"
              />
              <span v-if="errors.maxSalary" class="text-red-500 text-sm">
                {{ errors.maxSalary }}
              </span>
            </div>
          </div>
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

    <!-- Job Offers Table -->
    <div
      class="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow mb-6 overflow-x-auto"
    >
      <h2 class="text-lg font-semibold mb-4">Job Offers</h2>
      <table class="w-full min-w-[600px]">
        <thead>
          <tr class="border-b dark:border-gray-700">
            <th class="text-left p-2">Job Title</th>
            <th class="text-left p-2">Company</th>
            <th class="text-left p-2">Job Type</th>
            <th class="text-left p-2">Salary</th>
            <th class="text-left p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="offer in filteredJobOffers"
            :key="offer.id"
            class="border-b dark:border-gray-700"
          >
            <td class="p-2">{{ offer.jobTitle }}</td>
            <td class="p-2">{{ offer.company }}</td>
            <td class="p-2">{{ offer.jobType }}</td>
            <td class="p-2">{{ offer.salary }}</td>
            <td class="p-2">
              <NuxtLink
                :to="`/maids/dashboard/offers/${offer.id}`"
                class="p-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 dark:bg-blue-700 dark:text-blue-100 dark:hover:bg-blue-600"
              >
                View Details
              </NuxtLink>
              <button
                @click="applyForJob(offer.id)"
                class="p-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 dark:bg-green-700 dark:text-green-100 dark:hover:bg-green-600 ml-2"
              >
                Apply
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
import { useField, useForm } from "vee-validate";
import * as yup from "yup";

// Sample Job Offers Data
const jobOffers = ref([
  {
    id: 1,
    jobTitle: "Cooking",
    company: "Tech Corp",
    jobType: "Full-Time",
    salary: "$30,000 - $40,000",
  },
  {
    id: 2,
    jobTitle: "Cleaning",
    company: "Data Inc",
    jobType: "Part-Time",
    salary: "$20,000 - $25,000",
  },
  {
    id: 3,
    jobTitle: "ChildCare",
    company: "Innovate LLC",
    jobType: "Contract",
    salary: "$15/hour",
  },
  {
    id: 4,
    jobTitle: "ElderCare",
    company: "Design Co",
    jobType: "Full-Time",
    salary: "$35,000 - $45,000",
  },
]);

// Filters
const jobTypeFilter = ref("");

// Filtered Job Offers
const filteredJobOffers = computed(() => {
  return jobOffers.value.filter((offer) => {
    const matchesJobType = jobTypeFilter.value
      ? offer.jobType === jobTypeFilter.value
      : true;
    const matchesSalaryRange =
      (!minSalary.value ||
        parseFloat(offer.salary.replace(/[^0-9.-]+/g, "")) >=
          parseFloat(minSalary.value)) &&
      (!maxSalary.value ||
        parseFloat(offer.salary.replace(/[^0-9.-]+/g, "")) <=
          parseFloat(maxSalary.value));
    return matchesJobType && matchesSalaryRange;
  });
});
const validationSchema = yup.object({
  minSalary: yup
    .number()
    .min(0, "Minimum salary cannot be negative.")
    .typeError("Minimum salary must be a number."),
  maxSalary: yup
    .number()
    .min(0, "Maximum salary cannot be negative.")
    .typeError("Maximum salary must be a number."),
});

// Initialize form validation
const { errors, handleSubmit } = useForm({
  validationSchema,
});

// Define fields
const { value: minSalary } = useField("minSalary");
const { value: maxSalary } = useField("maxSalary");

// Submit handler (optional)
const onSubmit = handleSubmit((values) => {
  console.log("Filters applied:", values);
});
// Clear Filters
const clearFilters = () => {
  jobTypeFilter.value = "";
  minSalary.value = "";
  maxSalary.value = "";
};

// Apply for Job
const applyForJob = (id) => {
  // TODO: Call API to apply for the job
  const index = jobOffers.value.findIndex((offer) => offer.id === id);
  if (index !== -1) {
    alert(`Applied for job: ${jobOffers.value[index].jobTitle}`);
  }
};

definePageMeta({
  layout: "maid",
});
</script>

<style scoped>
/* Add custom styles if needed */
</style>
