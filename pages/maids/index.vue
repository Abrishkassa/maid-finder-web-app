<template>
  <!--Hero section-->
  <section
    class="flex mx-auto bg-cover bg-center justify-center max-w-7xl min-h-screen px-14 items-center bg-[url('/public/heromaid.png')] bg-gray-100 text-center"
  >
    <div class="hero-content">
      <h1 class="text-4xl font-bold text-white mb-4">
        Looking for a Maid? Find the Best Match Here!
      </h1>
    </div>
  </section>
  <!--How it works section-->
  <section class="py-12 bg-white dark:bg-gray-900">
    <div class="container mx-auto px-4">
      <h2
        class="text-3xl font-bold text-center text-lime-500 dark:text-[#B9FF66] mb-8"
      >
        How it Works
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Step 1 -->
        <div class="text-center">
          <div
            class="bg-blue-100 dark:bg-[#20233f] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"
          >
            <span class="text-blue-600 dark:text-[#B9FF66] text-2xl">1</span>
          </div>
          <h3
            class="text-xl font-semibold text-gray-800 dark:text-[#F3F3F3] mb-2"
          >
            Post Your Job
          </h3>
          <p class="text-gray-600 dark:text-[#F3F3F3]">
            Describe your requirements
          </p>
        </div>

        <!-- Step 2 -->
        <div class="text-center">
          <div
            class="bg-blue-100 dark:bg-[#20233f] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"
          >
            <span class="text-blue-600 dark:text-[#B9FF66] text-2xl">2</span>
          </div>
          <h3
            class="text-xl font-semibold text-gray-800 dark:text-[#F3F3F3] mb-2"
          >
            Browse Maids
          </h3>
          <p class="text-gray-600 dark:text-[#F3F3F3]">
            Check profiles, experience & reviews
          </p>
        </div>

        <!-- Step 3 -->
        <div class="text-center">
          <div
            class="bg-blue-100 dark:bg-[#20233f] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"
          >
            <span class="text-blue-600 dark:text-[#B9FF66] text-2xl">3</span>
          </div>
          <h3
            class="text-xl font-semibold text-gray-800 dark:text-[#F3F3F3] mb-2"
          >
            Hire with Confidence
          </h3>
          <p class="text-gray-600 dark:text-[#F3F3F3]">
            Connect & finalize the job
          </p>
        </div>
      </div>
    </div>
  </section>
  <!---Why hire section-->
  <section class="py-12 bg-gray-50 dark:bg-gray-900">
    <div class="container mx-auto px-4">
      <h2
        class="text-3xl font-bold text-center text-lime-500 dark:text-lime-400 mb-8"
      >
        Find a Maid Now
      </h2>

      <!-- Search Bar -->
      <div
        class="mb-8 flex flex-col md:flex-row justify-center items-center gap-4"
      >
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by category (e.g., Cooking, Cleaning)"
          class="w-full md:w-1/2 p-2 border border-lime-300 dark:border-lime-600 rounded-lg focus:border-lime-300 dark:focus:border-lime-400 outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
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

      <!-- Filters Section -->
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
          <option value="Gonder">Gonder</option>
          <option value="Bahrdar">Bahrdar</option>
          <option value="Hawassa">Hawassa</option>
          <option value="Hossana">Hossana</option>
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

      <!-- Selected Filters -->
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

      <!-- Maid List -->
      <div>
        <div
          :class="{
            'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8':
              viewMode === 'grid',
            'space-y-4': viewMode === 'list',
          }"
        >
          <div
            v-for="maid in paginatedMaids"
            :key="maid.id"
            :class="{
              'bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg':
                viewMode === 'grid',
              'bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center justify-between':
                viewMode === 'list',
            }"
          >
            <div>
              <h3
                class="text-xl font-semibold text-gray-800 dark:text-gray-100"
              >
                Name: {{ maid.name }}
              </h3>
              <p class="text-gray-600 dark:text-gray-300">
                Category: {{ maid.category }}
              </p>
              <p class="text-gray-600 dark:text-gray-300">
                {{ maid.reviews }} Reviews
              </p>
              <p class="text-gray-600 dark:text-gray-300">
                Gender: {{ maid.gender }}
              </p>
              <p class="text-gray-600 dark:text-gray-300">
                Price: {{ maid.price }} ETB/hr
              </p>
            </div>
            <button
              class="mt-4 md:mt-0 text-white bg-black hover:text-black hover:bg-lime-400 dark:bg-[#B9FF66] dark:text-[#191A23] px-6 py-2 rounded-lg"
            >
              Hire Now
            </button>
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

const maids = ref([
  {
    id: 1,
    name: "Chala Wame",
    reviews: 10,
    gender: "Male",
    price: "10",
    location: "Addis Ababa",
    category: "Cooking",
    type: "Full Time",
  },
  {
    id: 2,
    name: "Alemitu Kebede",
    reviews: 15,
    gender: "Female",
    price: "15",
    location: "Gonder",
    category: "Cleaning",
    type: "Part Time",
  },
  {
    id: 3,
    name: "Tigist Hailu",
    reviews: 8,
    gender: "Female",
    price: "12",
    location: "Bahrdar",
    category: "Childcare",
    type: "Contract",
  },
  {
    id: 4,
    name: "Meron Abebe",
    reviews: 20,
    gender: "Female",
    price: "18",
    location: "Hawassa",
    category: "Cooking",
    type: "Full Time",
  },
  {
    id: 5,
    name: "Selamawit Tesfaye",
    reviews: 5,
    gender: "Female",
    price: "10",
    location: "Hossana",
    category: "Cleaning",
    type: "Part Time",
  },
  {
    id: 6,
    name: "Yordanos Assefa",
    reviews: 12,
    gender: "Female",
    price: "14",
    location: "Addis Ababa",
    category: "Childcare",
    type: "Contract",
  },
]);

const searchQuery = ref("");
const filters = ref({
  city: "",
  type: "",
  rate: "",
});
const activeFilters = ref([]);
const showFilters = ref(false);
const viewMode = ref("grid");
const currentPage = ref(1);
const itemsPerPage = 3;

const filteredMaids = computed(() => {
  return maids.value.filter((maid) => {
    // Search by category
    const matchesSearch = maid.category
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());

    // Filter by city
    const matchesCity = filters.value.city
      ? maid.location === filters.value.city
      : true;

    // Filter by type
    const matchesType = filters.value.type
      ? maid.type === filters.value.type
      : true;

    // Filter by rate
    const maidPrice = parseFloat(maid.price);
    const rateFilter = filters.value.rate;
    let matchesRate = true;

    if (rateFilter) {
      const [min, max] = rateFilter.split("-").map(Number);
      if (rateFilter.endsWith("+")) {
        matchesRate = maidPrice >= min;
      } else {
        matchesRate = maidPrice >= min && maidPrice <= max;
      }
    }

    // Combine all filters
    return matchesSearch && matchesCity && matchesType && matchesRate;
  });
});

const paginatedMaids = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredMaids.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredMaids.value.length / itemsPerPage);
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
