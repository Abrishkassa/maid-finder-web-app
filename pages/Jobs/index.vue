<template>
  <!--Hero section-->
  <section
    class="flex mx-auto bg-cover bg-center justify-center max-w-7xl min-h-screen px-14 items-center bg-[url('/public/cleaning.png')] bg-gray-100 text-center"
  >
    <div class="hero-content">
      <h1 class="text-4xl font-bold text-white mb-4">
        Looking for a Maid Job? Get Hired Today!
      </h1>
    </div>
  </section>
  <!--How it works section-->

  <section class="py-12 bg-white dark:bg-gray-900">
    <div class="container mx-auto px-4">
      <h2
        class="text-3xl font-bold text-lime-500 dark:text-lime-400 text-center mb-8"
      >
        How it Works
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <!-- Create a Profile -->
        <div class="text-center">
          <div
            class="bg-blue-100 dark:bg-blue-800 p-6 rounded-full w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 flex items-center justify-center"
          >
            <svg
              class="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 dark:text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              ></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2 dark:text-gray-100">
            Create a Profile
          </h3>
          <p class="text-gray-600 dark:text-gray-300">
            Showcase your skills & experience
          </p>
        </div>

        <!-- Get Hired & Start Earning -->
        <div class="text-center">
          <div
            class="bg-green-100 dark:bg-green-800 p-6 rounded-full w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 flex items-center justify-center"
          >
            <svg
              class="w-10 h-10 sm:w-12 sm:h-12 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2 dark:text-gray-100">
            Get Hired & Start Earning
          </h3>
          <p class="text-gray-600 dark:text-gray-300">
            Connect with employers and start working
          </p>
        </div>

        <!-- Apply for Jobs -->
        <div class="text-center">
          <div
            class="bg-purple-100 dark:bg-purple-800 p-6 rounded-full w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 flex items-center justify-center"
          >
            <svg
              class="w-10 h-10 sm:w-12 sm:h-12 text-purple-600 dark:text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              ></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2 dark:text-gray-100">
            Apply for Jobs
          </h3>
          <p class="text-gray-600 dark:text-gray-300">
            Browse and apply to the best-suited jobs
          </p>
        </div>
      </div>
    </div>
  </section>

  <!---Why work with us section-->
  <section class="py-12 bg-gray-50 dark:bg-gray-900">
    <div class="container mx-auto px-4">
      <h2
        class="text-3xl font-bold text-lime-500 dark:text-lime-400 text-center mb-8"
      >
        Why Work With Us?
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <!-- Thousands of Job Listings -->
        <div class="text-center">
          <div
            class="bg-blue-100 dark:bg-blue-800 p-6 rounded-full w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 flex items-center justify-center"
          >
            <svg
              class="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 dark:text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              ></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2 dark:text-gray-100">
            Thousands of Job Listings
          </h3>
          <p class="text-gray-600 dark:text-gray-300">
            Find the perfect job that matches your skills and preferences.
          </p>
        </div>

        <!-- Verified Employers -->
        <div class="text-center">
          <div
            class="bg-green-100 dark:bg-green-800 p-6 rounded-full w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 flex items-center justify-center"
          >
            <svg
              class="w-10 h-10 sm:w-12 sm:h-12 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2 dark:text-gray-100">
            Verified Employers
          </h3>
          <p class="text-gray-600 dark:text-gray-300">
            Work with trusted and verified employers for a secure experience.
          </p>
        </div>

        <!-- Flexible Work Schedules -->
        <div class="text-center">
          <div
            class="bg-purple-100 dark:bg-purple-800 p-6 rounded-full w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 flex items-center justify-center"
          >
            <svg
              class="w-10 h-10 sm:w-12 sm:h-12 text-purple-600 dark:text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2 dark:text-gray-100">
            Flexible Work Schedules
          </h3>
          <p class="text-gray-600 dark:text-gray-300">
            Choose jobs that fit your schedule and lifestyle.
          </p>
        </div>
      </div>
    </div>
  </section>
  <!---listing section-->
  <section class="py-12 bg-gray-50 dark:bg-gray-900">
    <div class="container mx-auto px-4">
      <h2
        class="text-3xl font-bold text-center text-lime-500 dark:text-lime-400 mb-8"
      >
        Find a Job
      </h2>

      <!-- Search Bar -->
      <div
        class="mb-8 flex flex-col md:flex-row justify-center items-center gap-4"
      >
        <!-- Search Bar -->
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by category (e.g., Cooking, Cleaning)"
          class="w-full md:w-1/2 p-2 border border-lime-300 dark:border-lime-600 rounded-lg focus:border-lime-300 dark:focus:border-lime-400 outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />

        <!-- Toggle Filters Button -->
        <button
          @click="toggleFilters"
          class="w-full md:w-auto py-2 px-4 text-white bg-black hover:text-black hover:bg-lime-400 dark:bg-[#B9FF66] dark:text-[#191A23] rounded-lg flex items-center justify-center gap-2 transition-all duration-300"
        >
          <Icon
            :name="
              showFilters
                ? 'ic:baseline-filter-alt-off'
                : 'ic:baseline-filter-alt'
            "
            class="transition-transform duration-300"
          />
          <span>{{ showFilters ? "Hide Filters" : "Show Filters" }}</span>
        </button>
      </div>

      <!-- Filters Section (Conditional Rendering) -->
      <div
        v-if="showFilters"
        class="flex flex-col md:flex-row justify-center gap-4 mb-8"
      >
        <!-- City Dropdown -->
        <select
          v-model="filters.city"
          class="w-full md:w-auto p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        >
          <option value="">City</option>
          <option value="Addis Ababa">Addis Ababa</option>
          <option value="Hawassa">Hawassa</option>
          <option value="ArbaMinch">ArbaMinch</option>
          <option value="Bahrdar">Bahrdar</option>
          <option value="Wello">Wello</option>
        </select>

        <!-- Category Dropdown -->
        <select
          v-model="filters.category"
          class="w-full md:w-auto p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        >
          <option value="">Category</option>
          <option value="Cooking">Cooking</option>
          <option value="Cleaning">Cleaning</option>
          <option value="Childcare">Childcare</option>
        </select>

        <!-- Type Dropdown -->
        <select
          v-model="filters.type"
          class="w-full md:w-auto p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        >
          <option value="">Type</option>
          <option value="Full Time">Full Time</option>
          <option value="Part Time">Part Time</option>
          <option value="Contract">Contract</option>
        </select>

        <!-- Rate Dropdown -->
        <select
          v-model="filters.rate"
          class="w-full md:w-auto p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        >
          <option value="">Rate</option>
          <option value="0-15">0-15 ETB/hr</option>
          <option value="15-25">15-25 ETB/hr</option>
          <option value="25-35">25-35 ETB/hr</option>
          <option value="35+">35+ ETB/hr</option>
        </select>

        <button
          @click="applyFilters"
          class="w-full md:w-auto px-6 py-2 text-white bg-black hover:text-black hover:bg-lime-400 dark:bg-[#B9FF66] dark:text-[#191A23] rounded-lg"
        >
          Apply Filters
        </button>
      </div>

      <!-- Selected Filters with Cancel Option -->
      <div v-if="activeFilters.length > 0" class="mb-8">
        <div class="flex flex-wrap gap-2">
          <div
            v-for="(filter, index) in activeFilters"
            :key="index"
            class="flex items-center bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 rounded-full px-3 py-1"
          >
            <span>{{ filter.label }}: {{ filter.value }}</span>
            <button
              @click="removeFilter(filter.key)"
              class="ml-2 text-blue-800 dark:text-blue-100 hover:text-blue-600 dark:hover:text-blue-300"
            >
              &times;
            </button>
          </div>
        </div>
      </div>

      <!-- View Toggle Buttons -->
      <div class="flex justify-end mb-8">
        <button
          @click="viewMode = 'grid'"
          :class="{
            'bg-black text-white': viewMode === 'grid',
            'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200':
              viewMode !== 'grid',
          }"
          class="p-2 rounded-l-lg hover:bg-gray-900"
        >
          Grid View
        </button>
        <button
          @click="viewMode = 'list'"
          :class="{
            'bg-black text-white': viewMode === 'list',
            'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200':
              viewMode !== 'list',
          }"
          class="p-2 rounded-r-lg hover:bg-gray-900"
        >
          List View
        </button>
      </div>

      <!-- Job Listings -->
      <div>
        <div
          :class="{
            'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8':
              viewMode === 'grid',
            'space-y-4': viewMode === 'list',
          }"
        >
          <div
            v-for="job in paginatedJobs"
            :key="job.id"
            :class="{
              'bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg':
                viewMode === 'grid',
              'bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center justify-between':
                viewMode === 'list',
            }"
          >
            <div>
              <!-- Verified/Not Verified Status -->
              <!-- <h4
                :class="{
                  'bg-lime-200 text-lime-800':
                    job.status === 'Verified Household',
                  'bg-red-200 text-red-800': job.status === 'Not Verified',
                }"
                class="text-sm border px-4 py-2 rounded-lg font-semibold"
              >
                {{ job.status }}
              </h4> -->
              <h3
                class="text-xl font-semibold text-gray-800 dark:text-gray-100 mt-4"
              >
                {{ job.category }}
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-2">
                {{ job.location }}
              </p>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                {{ job.description }}
              </p>
              <div class="flex justify-between items-center">
                <div class="flex flex-col items-center">
                  <span class="text-gray-600 dark:text-gray-300">{{
                    job.type
                  }}</span>
                  <span class="text-gray-600 dark:text-gray-300">{{
                    job.salary
                  }}</span>
                </div>
                <button
                  class="mt-4 md:mt-0 text-white bg-black hover:text-black hover:bg-lime-400 dark:bg-[#B9FF66] dark:text-[#191A23] px-6 py-2 rounded-lg"
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination Controls -->
        <div class="flex justify-center items-center mt-6 space-x-4">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-lg disabled:opacity-50"
          >
            Previous
          </button>
          <span class="text-gray-700 dark:text-gray-300 font-semibold">
            Page {{ currentPage }} of {{ totalPages }}
          </span>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const jobs = ref([
  {
    id: 1,
    // status: "Verified Household",
    category: "Cooking",
    location: "Addis Ababa",
    description:
      "We are seeking a skilled and passionate Cook to join our culinary team. The ideal candidate will have experience in food preparation and cooking, a strong understanding of kitchen operations, and a commitment to delivering high-quality dishes.",
    type: "Full Time",
    salary: "21 ETB/hr",
  },
  {
    id: 2,
    // status: "Not Verified",
    category: "Cooking",
    location: "Hawassa",
    description:
      "We are seeking a skilled and passionate Cook to join our culinary team. The ideal candidate will have experience in food preparation and cooking, a strong understanding of kitchen operations, and a commitment to delivering high-quality dishes.",
    type: "Part Time",
    salary: "20 ETB/hr",
  },
  {
    id: 3,
    // status: "Not Verified",
    category: "Cooking",
    location: "Hawassa",
    description:
      "We are seeking a skilled and passionate Cook to join our culinary team. The ideal candidate will have experience in food preparation and cooking, a strong understanding of kitchen operations, and a commitment to delivering high-quality dishes.",
    type: "Part Time",
    salary: "35 ETB/hr",
  },
  {
    id: 4,
    // status: "Verified Household",
    category: "Cleaning",
    location: "Hawassa",
    description:
      "We are seeking a skilled and passionate Cook to join our culinary team. The ideal candidate will have experience in food preparation and cooking, a strong understanding of kitchen operations, and a commitment to delivering high-quality dishes.",
    type: "Part Time",
    salary: "50 ETB/hr",
  },
  {
    id: 5,
    // status: "Verified Household",
    category: "Catering",
    location: "Hawassa",
    description:
      "We are seeking a skilled and passionate Cook to join our culinary team. The ideal candidate will have experience in food preparation and cooking, a strong understanding of kitchen operations, and a commitment to delivering high-quality dishes.",
    type: "Part Time",
    salary: "15 ETB/hr",
  },
  {
    id: 6,
    // status: "Not Verified",
    category: "Babysitting",
    location: "Hossana",
    description:
      "We are seeking a skilled and passionate Cook to join our culinary team. The ideal candidate will have experience in food preparation and cooking, a strong understanding of kitchen operations, and a commitment to delivering high-quality dishes.",
    type: "Part Time",
    salary: "15 ETB/hr",
  },
  {
    id: 7,
    // status: "Not Verified",
    category: "Cleaning",
    location: "Hawassa",
    description:
      "We are seeking a skilled and passionate Cook to join our culinary team. The ideal candidate will have experience in food preparation and cooking, a strong understanding of kitchen operations, and a commitment to delivering high-quality dishes.",
    type: "Part Time",
    salary: "15 ETB/hr",
  },
  // Add more jobs as needed
]);

const searchQuery = ref("");
const filters = ref({
  city: "",
  category: "",
  type: "",
  rate: "",
});
const activeFilters = ref([]);
const showFilters = ref(false);
const viewMode = ref("grid"); // Default to grid view
const currentPage = ref(1);
const itemsPerPage = 3;

const filteredJobs = computed(() => {
  return jobs.value.filter((job) => {
    // Search across category and description
    const matchesSearch =
      job.category.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.value.toLowerCase());

    // Apply filters
    const matchesCity = filters.value.city
      ? job.location.includes(filters.value.city)
      : true;
    const matchesCategory = filters.value.category
      ? job.category === filters.value.category
      : true;
    const matchesType = filters.value.type
      ? job.type === filters.value.type
      : true;

    // Rate Filter Logic
    const jobSalary = parseFloat(job.salary);
    const rateFilter = filters.value.rate;
    let matchesRate = true;

    if (rateFilter) {
      const [min, max] = rateFilter.split("-").map(Number);
      if (rateFilter.endsWith("+")) {
        matchesRate = jobSalary >= min;
      } else {
        matchesRate = jobSalary >= min && jobSalary <= max;
      }
    }

    return (
      matchesSearch &&
      matchesCity &&
      matchesCategory &&
      matchesType &&
      matchesRate
    );
  });
});

const paginatedJobs = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredJobs.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredJobs.value.length / itemsPerPage);
});

const toggleFilters = () => {
  showFilters.value = !showFilters.value;
};

const applyFilters = () => {
  activeFilters.value = [];
  if (filters.value.city)
    activeFilters.value.push({
      key: "city",
      label: "City",
      value: filters.value.city,
    });
  if (filters.value.category)
    activeFilters.value.push({
      key: "category",
      label: "Category",
      value: filters.value.category,
    });
  if (filters.value.type)
    activeFilters.value.push({
      key: "type",
      label: "Type",
      value: filters.value.type,
    });
  if (filters.value.rate)
    activeFilters.value.push({
      key: "rate",
      label: "Rate",
      value: filters.value.rate,
    });
};

const removeFilter = (key) => {
  filters.value[key] = "";
  activeFilters.value = activeFilters.value.filter(
    (filter) => filter.key !== key
  );
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

watch([searchQuery, filters], () => {
  currentPage.value = 1;
});
</script>
