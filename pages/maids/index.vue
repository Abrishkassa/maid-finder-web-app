<template>
  <div class="bg-[#F3F3F3] font-serif dark:bg-[#191A23] min-h-screen">
    <!--Hero section-->
    <section
      class="flex mx-auto bg-cover bg-center justify-center max-w-7xl min-h-screen px-14 items-center bg-[url('/public/heromaid.jpg')] bg-gray-100 text-center"
    >
      <div class="hero-content">
        <h1 class="text-4xl font-bold text-white mb-4">
          Looking for a Maid? Find the Best Match Here!
        </h1>
      </div>
    </section>
    <!--How it works section-->
    <section class="py-12 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center text-lime-500 mb-8">
          How it Works
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div
              class="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"
            >
              <span class="text-blue-600 text-2xl">1</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-2">
              Post Your Job
            </h3>
            <p class="text-gray-600">Describe your requirements</p>
          </div>
          <div class="text-center">
            <div
              class="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"
            >
              <span class="text-blue-600 text-2xl">2</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-2">
              Browse Maids
            </h3>
            <p class="text-gray-600">Check profiles, experience & reviews</p>
          </div>
          <div class="text-center">
            <div
              class="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"
            >
              <span class="text-blue-600 text-2xl">3</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-2">
              Hire with Confidence
            </h3>
            <p class="text-gray-600">Connect & finalize the job</p>
          </div>
        </div>
      </div>
    </section>
    <!---Why hire section-->
    <section class="py-12 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center text-lime-500 mb-8">
          Why Hire Through Us?
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div
              class="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-green-600"
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
            <h3 class="text-xl font-semibold text-gray-800 mb-2">
              Background-Checked Professionals
            </h3>
            <p class="text-gray-600">
              We ensure all professionals are thoroughly vetted.
            </p>
          </div>
          <div class="text-center">
            <div
              class="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-2">
              Transparent Pricing & Direct Hiring
            </h3>
            <p class="text-gray-600">No hidden fees, and you hire directly.</p>
          </div>
          <div class="text-center">
            <div
              class="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                ></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-2">
              Varied Skill Levels & Experience
            </h3>
            <p class="text-gray-600">
              Find professionals with the right skills for your needs.
            </p>
          </div>
        </div>
      </div>
    </section>
    <!---maids section-->
    <section class="py-12 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center text-lime-500 mb-8">
          Find a Maid Now
        </h2>

        <!-- Search Bar -->
        <div class="mb-8 flex justify-center items-center gap-4">
          <!-- Search Bar -->
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search among 1000+ maids"
            class="w-1/2 p-2 border border-lime-300 rounded-lg focus:border-lime-300"
          />

          <!-- Toggle Filters Button -->
          <button
            @click="toggleFilters"
            class="py-2 px-4 bg-lime-400 text-black rounded-lg flex items-center gap-2 transition-all duration-300"
          >
            <Icon
              :name="
                showFilters
                  ? 'ic:baseline-filter-alt-off'
                  : 'ic:baseline-filter-alt'
              "
              class="transition-transform duration-300"
            />
            <span class="hidden sm:inline">{{
              showFilters ? "Hide Filters" : "Show Filters"
            }}</span>
          </button>
        </div>

        <!-- Filters Section (Conditional Rendering) -->
        <div
          v-if="showFilters"
          class="flex flex-col justify-center md:flex-row gap-4 mb-8"
        >
          <input
            v-model="filters.city"
            type="text"
            placeholder="City"
            class="p-2 border border-gray-300 rounded-lg"
          />
          <input
            v-model="filters.category"
            type="text"
            placeholder="Category"
            class="p-2 border border-gray-300 rounded-lg"
          />
          <input
            v-model="filters.type"
            type="text"
            placeholder="Type"
            class="p-2 border border-gray-300 rounded-lg"
          />
          <input
            v-model="filters.cooking"
            type="text"
            placeholder="Cooking"
            class="p-2 border border-gray-300 rounded-lg"
          />
          <button
            @click="applyFilters"
            class="px-6 py-2 bg-lime-400 text-white rounded-lg"
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
              class="flex items-center bg-blue-100 text-blue-800 rounded-full px-3 py-1"
            >
              <span>{{ filter.label }}: {{ filter.value }}</span>
              <button
                @click="removeFilter(filter.key)"
                class="ml-2 text-blue-800 hover:text-blue-600"
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
              'bg-lime-400 text-black': viewMode === 'grid',
              'bg-gray-200 text-gray-800': viewMode !== 'grid',
            }"
            class="p-2 rounded-l-lg"
          >
            Grid View
          </button>
          <button
            @click="viewMode = 'list'"
            :class="{
              'bg-lime-400 text-white': viewMode === 'list',
              'bg-gray-200 text-gray-800': viewMode !== 'list',
            }"
            class="p-2 rounded-r-lg"
          >
            List View
          </button>
        </div>

        <!-- Maid List -->
        <div
          :class="{
            'grid grid-cols-1 md:grid-cols-3 gap-8': viewMode === 'grid',
            'space-y-4': viewMode === 'list',
          }"
        >
          <div
            v-for="maid in filteredMaids"
            :key="maid.id"
            :class="{
              'bg-white p-6 rounded-lg shadow-lg': viewMode === 'grid',
              'bg-white p-6 rounded-lg shadow-lg flex items-center justify-between':
                viewMode === 'list',
            }"
          >
            <div>
              <h3 class="text-xl font-semibold text-gray-800">
                Name: {{ maid.name }}
              </h3>
              <p class="text-gray-600">{{ maid.reviews }} Reviews</p>
              <p class="text-gray-600">Gender: {{ maid.gender }}</p>
              <p class="text-gray-600">Price: {{ maid.price }} ETB/hr</p>
            </div>
            <button
              class="mt-8 md:mt-0 bg-black text-white px-6 py-2 rounded-lg"
            >
              Hire Now
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup>
import { ref, computed, watch } from "vue";

// Sample data for maids
const maids = ref([
  { id: 1, name: "Gete Wame", reviews: 10, gender: "Amhara", price: 10 },
  { id: 2, name: "Marta Lemma", reviews: 15, gender: "Oromo", price: 12 },
  { id: 3, name: "Sara Tesfaye", reviews: 8, gender: "Tigray", price: 9 },
  // Add more maids as needed
]);

// Search query
const searchQuery = ref("");

// Filters
const filters = ref({
  city: "",
  category: "",
  type: "",
  cooking: "",
});

// Show/hide filters
const showFilters = ref(false);

// Active filters
const activeFilters = ref([]);

// View mode (grid or list)
const viewMode = ref("grid");

// Toggle filters visibility
const toggleFilters = () => {
  showFilters.value = !showFilters.value;
};

// Apply filters
const applyFilters = () => {
  activeFilters.value = Object.entries(filters.value)
    .filter(([key, value]) => value.trim() !== "")
    .map(([key, value]) => ({
      key,
      label: key.charAt(0).toUpperCase() + key.slice(1),
      value,
    }));
};

// Remove a filter
const removeFilter = (key) => {
  filters.value[key] = "";
  activeFilters.value = activeFilters.value.filter(
    (filter) => filter.key !== key
  );
};

// Computed property to filter maids based on search query and filters
const filteredMaids = computed(() => {
  return maids.value.filter((maid) => {
    const matchesSearch = maid.name
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());
    const matchesFilters = activeFilters.value.every((filter) => {
      if (filter.key === "city")
        return maid.name.toLowerCase().includes(filter.value.toLowerCase());
      if (filter.key === "category")
        return maid.gender.toLowerCase().includes(filter.value.toLowerCase());
      if (filter.key === "type")
        return maid.price.toString().includes(filter.value.toLowerCase());
      if (filter.key === "cooking") return true; // Add cooking-specific logic if needed
      return true;
    });

    return matchesSearch && matchesFilters;
  });
});

// Watch filters for changes and apply them automatically
watch(
  filters,
  () => {
    applyFilters();
  },
  { deep: true }
);
</script>
