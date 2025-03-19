<template>
  <section class="py-12 bg-gray-50 dark:bg-gray-900">
    <div class="container mx-auto px-4">
      <!-- Back Button -->
      <button
        @click="$router.push('/jobs')"
        class="mb-6 p-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
      >
        ← Back to Job Listings
      </button>

      <!-- Job Details -->
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 class="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          {{ job.category }}
        </h1>
        <p class="text-gray-600 dark:text-gray-300 mb-2">
          <strong>Location:</strong> {{ job.location }}
        </p>
        <p class="text-gray-600 dark:text-gray-300 mb-2">
          <strong>Job Type:</strong> {{ job.type }}
        </p>
        <p class="text-gray-600 dark:text-gray-300 mb-2">
          <strong>Salary:</strong> {{ job.salary }}
        </p>
        <p class="text-gray-600 dark:text-gray-300 mb-4">
          <strong>Description:</strong> {{ job.description }}
        </p>

        <!-- Household Details -->
        <div class="mt-6">
          <h2
            class="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4"
          >
            Household Details
          </h2>
          <div class="flex items-center space-x-4">
            <div
              class="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center"
            >
              <span
                class="text-xl font-semibold text-gray-800 dark:text-gray-100"
              >
                {{ job.household.name.charAt(0) }}
              </span>
            </div>
            <div>
              <h3
                class="text-xl font-semibold text-gray-800 dark:text-gray-100"
              >
                {{ job.household.name }}
              </h3>
              <p class="text-gray-600 dark:text-gray-300">
                {{ job.household.location }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Review and Rating Section -->
      <div class="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2
          class="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4"
        >
          Reviews & Ratings
        </h2>

        <!-- Average Rating -->
        <div class="flex items-center mb-6">
          <span
            class="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2"
          >
            {{ averageRating.toFixed(1) }}
          </span>
          <div class="flex items-center">
            <span
              v-for="star in 5"
              :key="star"
              class="text-2xl"
              :class="{
                'text-yellow-400': star <= averageRating,
                'text-gray-300': star > averageRating,
              }"
            >
              ★
            </span>
          </div>
          <span class="text-gray-600 dark:text-gray-300 ml-2">
            ({{ reviews.length }} reviews)
          </span>
        </div>

        <!-- Review Form -->
        <div class="mb-8">
          <h3
            class="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4"
          >
            Leave a Review
          </h3>
          <form @submit.prevent="submitReview">
            <div class="mb-4">
              <label
                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Rating
              </label>
              <div class="flex items-center">
                <span
                  v-for="star in 5"
                  :key="star"
                  class="text-2xl cursor-pointer"
                  :class="{
                    'text-yellow-400': star <= newReview.rating,
                    'text-gray-300': star > newReview.rating,
                  }"
                  @click="newReview.rating = star"
                >
                  ★
                </span>
              </div>
            </div>
            <div class="mb-4">
              <label
                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Review
              </label>
              <textarea
                v-model="newReview.comment"
                class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                rows="4"
                placeholder="Write your review..."
              ></textarea>
            </div>
            <button
              type="submit"
              class="px-6 py-2 bg-black hover:bg-lime-400 hover:text-black text-white rounded-lg"
            >
              Submit Review
            </button>
          </form>
        </div>

        <!-- Reviews List -->
        <div>
          <h3
            class="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4"
          >
            All Reviews
          </h3>
          <div v-if="reviews.length > 0" class="space-y-4">
            <div
              v-for="(review, index) in reviews"
              :key="index"
              class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
            >
              <div class="flex items-center mb-2">
                <div class="flex items-center">
                  <span
                    v-for="star in 5"
                    :key="star"
                    class="text-xl"
                    :class="{
                      'text-yellow-400': star <= review.rating,
                      'text-gray-300': star > review.rating,
                    }"
                  >
                    ★
                  </span>
                </div>
                <span class="text-gray-600 dark:text-gray-300 ml-2">
                  {{ review.rating }}.0
                </span>
              </div>
              <p class="text-gray-800 dark:text-gray-100">
                {{ review.comment }}
              </p>
            </div>
          </div>
          <p v-else class="text-gray-600 dark:text-gray-300">
            No reviews yet. Be the first to leave a review!
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

// Sample Job Data
const jobs = [
  {
    id: 1,
    category: "Cooking",
    location: "Addis Ababa",
    description:
      "We are seeking a skilled and passionate Cook to join our culinary team. The ideal candidate will have experience in food preparation and cooking, a strong understanding of kitchen operations, and a commitment to delivering high-quality dishes.",
    type: "Full Time",
    salary: "21 ETB/hr",
    household: {
      name: "John Doe",
      location: "Addis Ababa",
    },
  },
  {
    id: 2,
    category: "Cleaning",
    location: "Hawassa",
    description:
      "We are looking for a reliable cleaner to maintain cleanliness in our office spaces.",
    type: "Part Time",
    salary: "20 ETB/hr",
    household: {
      name: "Jane Smith",
      location: "Hawassa",
    },
  },
];

// Fetch Job Details
const route = useRoute();
const jobId = parseInt(route.params.id);
const job = ref(jobs.find((job) => job.id === jobId));

// Reviews and Ratings
const reviews = ref([
  { rating: 4, comment: "Great experience working with this household!" },
  { rating: 5, comment: "Very professional and friendly." },
]);

const newReview = ref({
  rating: 0,
  comment: "",
});

// Average Rating
const averageRating = computed(() => {
  if (reviews.value.length === 0) return 0;
  const total = reviews.value.reduce((sum, review) => sum + review.rating, 0);
  return total / reviews.value.length;
});

// Submit Review
const submitReview = () => {
  if (newReview.value.rating > 0 && newReview.value.comment.trim()) {
    reviews.value.push({ ...newReview.value });
    newReview.value = { rating: 0, comment: "" }; // Reset form
  } else {
    alert("Please provide a rating and a comment.");
  }
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>
