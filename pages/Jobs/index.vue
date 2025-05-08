<template>
  <!--Hero section-->
  <section
    class="flex mx-auto bg-cover bg-center justify-center max-w-7xl min-h-screen px-14 items-center  text-center"
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

      <!-- Job Listings (only shown when authenticated) -->
      <div>
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

        <!-- Loading State -->
        <div v-if="loading" class="text-center py-12">
          <p class="text-gray-600 dark:text-gray-300">Loading jobs...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center py-12">
          <p class="text-red-500 dark:text-red-400">{{ error }}</p>
          <button
            @click="fetchJobs"
            class="mt-4 px-6 py-2 text-white bg-black hover:text-black hover:bg-lime-400 dark:bg-[#B9FF66] dark:text-[#191A23] rounded-lg"
          >
            Retry
          </button>
        </div>

        <!-- Job Listings -->
        <div v-else>
          <div
            v-if="filteredJobs.length === 0"
            class="text-center py-12 text-gray-600 dark:text-gray-300"
          >
            No jobs found matching your criteria.
          </div>

          <div
            v-else
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
              <div
                :class="{
                  'w-full': viewMode === 'grid',
                  'md:w-2/3': viewMode === 'list',
                }"
              >
                <h3
                  class="text-xl font-semibold text-gray-800 dark:text-gray-100"
                >
                  {{ job.job_title }}
                </h3>
                <div class="flex items-center mt-2 mb-3">
                  <svg
                    class="w-5 h-5 text-gray-500 dark:text-gray-400 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    ></path>
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                  <p class="text-gray-600 dark:text-gray-300">
                    {{ job.location }}
                  </p>
                </div>
                <p class="text-gray-600 dark:text-gray-300 mb-4">
                  {{ job.job_description }}
                </p>

                <div class="flex flex-wrap gap-2 mb-4">
                  <span
                    class="px-3 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 rounded-full text-sm"
                  >
                    {{ job.job_time }}
                  </span>
                  <span
                    v-if="job.gender_preference"
                    class="px-3 py-1 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 rounded-full text-sm"
                  >
                    {{ job.gender_preference }}
                  </span>
                  <span
                    v-if="job.religion_preference"
                    class="px-3 py-1 bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-100 rounded-full text-sm"
                  >
                    {{ job.religion_preference }}
                  </span>
                </div>
              </div>

              <div
                :class="{
                  'w-full': viewMode === 'grid',
                  'md:w-1/3 md:text-right': viewMode === 'list',
                }"
              >
                <div class="mb-4">
                  <p
                    class="text-lg font-semibold text-gray-800 dark:text-gray-100"
                  >
                    {{ job.salary_min }} - {{ job.salary_max }} ETB
                  </p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    {{ job.num_of_maids }} position(s) available
                  </p>
                </div>
                <button
                  @click="applyForJob(job.id)"
                  class="w-full md:w-auto text-white bg-black hover:text-black hover:bg-lime-400 dark:bg-[#B9FF66] dark:text-[#191A23] px-6 py-2 rounded-lg"
                >
                  Apply Now
                </button>
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
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import backendApi from "@/networkServices/api/backendApi.js";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

interface Job {
  id: string;
  job_title: string;
  job_description: string;
  location: string;
  job_time: string;
  gender_preference?: string;
  religion_preference?: string;
  salary_min: string;
  salary_max: string;
  num_of_maids: string;
}

interface Filter {
  city: string;
  category: string;
  type: string;
  rate: string;
}

interface ActiveFilter {
  key: string;
  label: string;
  value: string;
}

const router = useRouter();
const authStore = useAuthStore();

// State
const loading = ref<boolean>(false);
const error = ref<string | null>(null);
const jobs = ref<Job[]>([]);
const searchQuery = ref<string>("");
const filters = ref<Filter>({
  city: "",
  category: "",
  type: "",
  rate: "",
});
const activeFilters = ref<ActiveFilter[]>([]);
const showFilters = ref<boolean>(false);
const viewMode = ref<"grid" | "list">("grid");
const currentPage = ref<number>(1);
const itemsPerPage = 6;

// Computed properties
const filteredJobs = computed<Job[]>(() => {
  return jobs.value.filter((job) => {
    const matchesSearch =
      job.job_title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      job.job_description
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase());

    const matchesCity = filters.value.city
      ? job.location.includes(filters.value.city)
      : true;
    const matchesCategory = filters.value.category
      ? job.job_title.includes(filters.value.category)
      : true;
    const matchesType = filters.value.type
      ? job.job_time === filters.value.type.toLowerCase()
      : true;

    const jobSalary = parseFloat(job.salary_min);
    const rateFilter = filters.value.rate;
    let matchesRate = true;

    if (rateFilter) {
      if (rateFilter.includes("+")) {
        const min = parseFloat(rateFilter.replace("+", ""));
        matchesRate = jobSalary >= min;
      } else {
        const [min, max] = rateFilter.split("-").map(Number);
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

const paginatedJobs = computed<Job[]>(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredJobs.value.slice(start, end);
});

const totalPages = computed<number>(() => {
  return Math.ceil(filteredJobs.value.length / itemsPerPage);
});

// Methods
const fetchJobs = async (): Promise<void> => {
  loading.value = true;
  error.value = null;

  try {
    const response = await backendApi.get("/jobs/open", {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    });

    jobs.value = response.data;
  } catch (err: any) {
    // error.value = err.message || "Failed to fetch jobs";
    // if (err.response?.status === 401) {
    //   router.push("/login");
    // }
  } finally {
    loading.value = false;
  }
};

const applyForJob = async (jobId: string): Promise<void> => {
  if (!authStore.isAuthenticated) {
    router.push("/login");
    return;
  }

  try {
    await backendApi.post(
      `/jobs/${jobId}/apply`,
      {},
      {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`,
        },
      }
    );

    alert("Application submitted successfully!");
    await fetchJobs();
  } catch (err: any) {
    error.value = err.response?.data?.message || "Failed to apply for job";
    if (err.response?.status === 401) {
      router.push("/login");
    }
  }
};

const toggleFilters = (): void => {
  showFilters.value = !showFilters.value;
};

const applyFilters = (): void => {
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

const removeFilter = (key: keyof Filter): void => {
  filters.value[key] = "";
  activeFilters.value = activeFilters.value.filter(
    (filter) => filter.key !== key
  );
};

const nextPage = (): void => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = (): void => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

// Watchers
watch([searchQuery, filters], () => {
  currentPage.value = 1;
});

// Lifecycle hooks
onMounted(() => {
  fetchJobs();
});
</script>
