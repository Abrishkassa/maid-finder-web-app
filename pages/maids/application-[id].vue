<template>
  <section class="mx-auto max-w-7xl dark:bg-gray-900 min-h-screen dark:text-gray-100 py-6 px-4">
    <!-- Back Button -->
    <div class="mb-6">
      <button
        @click="router.go(-1)"
        class="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
      >
        <Icon name="mdi:arrow-left" class="mr-1" />
        Back to Applications
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      <p class="mt-4 text-gray-600 dark:text-gray-400">Loading application details...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-12">
      <Icon name="mdi:alert-circle-outline" class="h-12 w-12 text-red-500 mx-auto" />
      <p class="mt-4 text-red-600 dark:text-red-400">{{ error }}</p>
      <button
        @click="fetchApplication"
        class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
      >
        Retry
      </button>
    </div>

    <!-- Application Details -->
    <div v-else class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      <!-- Header Section -->
      <div
        class="px-6 py-4 border-b dark:border-gray-700 flex flex-col md:flex-row md:items-center md:justify-between"
        :class="{
          'bg-yellow-50 dark:bg-gray-700': application.status === 'pending',
          'bg-green-50 dark:bg-green-900': application.status === 'selected',
          'bg-red-50 dark:bg-red-900': application.status === 'rejected',
        }"
      >
        <div>
          <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {{ application.job.job_title }}
          </h1>
          <div class="flex items-center mt-2">
            <span
              class="px-3 py-1 rounded-full text-sm font-medium"
              :class="{
                'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100':
                  application.status === 'pending',
                'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100':
                  application.status === 'selected',
                'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100':
                  application.status === 'rejected',
              }"
            >
              {{ formatStatus(application.status) }}
            </span>
            <span class="ml-4 text-gray-600 dark:text-gray-300">
              Applied on {{ formatDate(application.applied_at) }}
            </span>
          </div>
        </div>
        <div class="mt-4 md:mt-0">
          <button
            v-if="application.status === 'pending'"
            class="px-4 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 dark:bg-red-700 dark:text-red-100 dark:hover:bg-red-600 mr-2"
            @click="withdrawApplication"
          >
            Withdraw Application
          </button>
          <NuxtLink
            :to="`/jobs/${application.job.id}`"
            class="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 dark:bg-blue-700 dark:text-blue-100 dark:hover:bg-blue-600 inline-block"
          >
            View Job Posting
          </NuxtLink>
        </div>
      </div>

      <!-- Main Content -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        <!-- Job Details -->
        <div class="lg:col-span-2">
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
            <h2 class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Job Details</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Job Description</h3>
                <p class="mt-1 text-gray-800 dark:text-gray-200">
                  {{ application.job.job_description || 'No description provided' }}
                </p>
              </div>
              
              <div>
                <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Location</h3>
                <p class="mt-1 text-gray-800 dark:text-gray-200 flex items-center">
                  <Icon name="mdi:map-marker" class="mr-1" />
                  {{ application.job.location || 'Not specified' }}
                </p>
              </div>
              
              <div>
                <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Job Type</h3>
                <p class="mt-1 text-gray-800 dark:text-gray-200">
                  {{ formatJobTime(application.job.job_time) }}
                </p>
              </div>
              
              <div>
                <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Expected Start Date</h3>
                <p class="mt-1 text-gray-800 dark:text-gray-200">
                  {{ application.job.expected_start_date ? formatDate(application.job.expected_start_date) : 'Flexible' }}
                </p>
              </div>
              
              <div>
                <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Salary Range</h3>
                <p class="mt-1 text-gray-800 dark:text-gray-200">
                  {{ formatSalary(application.job) }}
                </p>
              </div>
              
              <div>
                <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Job Status</h3>
                <p class="mt-1 text-gray-800 dark:text-gray-200 capitalize">
                  {{ application.job.status }}
                </p>
              </div>
            </div>
          </div>

          <!-- Application Timeline -->
          <div class="mt-6 bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
            <h2 class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Application Timeline</h2>
            
            <div class="relative">
              <!-- Timeline -->
              <div class="border-l-2 border-gray-300 dark:border-gray-600 pl-6 pb-6 space-y-8">
                <!-- Applied -->
                <div class="relative">
                  <div class="absolute -left-8 top-0 w-4 h-4 rounded-full bg-blue-500"></div>
                  <div class="ml-2">
                    <h3 class="font-medium text-gray-800 dark:text-gray-200">Application Submitted</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      {{ formatDateTime(application.applied_at) }}
                    </p>
                  </div>
                </div>
                
                <!-- Status Updates -->
                <div class="relative">
                  <div class="absolute -left-8 top-0 w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-500"></div>
                  <div class="ml-2">
                    <h3 class="font-medium text-gray-800 dark:text-gray-200">Application Review</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      Your application is under review by the household
                    </p>
                  </div>
                </div>
                
                <!-- Final Status (conditional) -->
                <div v-if="application.status !== 'pending'" class="relative">
                  <div
                    class="absolute -left-8 top-0 w-4 h-4 rounded-full"
                    :class="{
                      'bg-green-500': application.status === 'selected',
                      'bg-red-500': application.status === 'rejected',
                    }"
                  ></div>
                  <div class="ml-2">
                    <h3 class="font-medium text-gray-800 dark:text-gray-200">
                      {{ application.status === 'selected' ? 'Application Accepted' : 'Application Not Selected' }}
                    </h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      {{ application.status === 'selected' ? 'Congratulations! Your application has been accepted.' : 'Thank you for your application, but it was not selected this time.' }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Household Information -->
        <div>
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 sticky top-6">
            <h2 class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Household Information</h2>
            
            <div class="flex flex-col items-center mb-6">
              <img
                :src="application.household.image_url || '/placeholder-user.jpg'"
                alt="Household photo"
                class="w-24 h-24 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
              />
              <h3 class="mt-3 text-lg font-medium text-gray-800 dark:text-gray-200">
                {{ application.household.name }}
              </h3>
              <div class="flex items-center mt-1">
                <Icon name="mdi:star" class="text-yellow-500" />
                <span class="ml-1 text-gray-700 dark:text-gray-300">
                  {{ application.household.rating }} ({{ application.household.total_reviews }} reviews)
                </span>
              </div>
            </div>
            
            <div class="space-y-4">
              <div>
                <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Contact Name</h3>
                <p class="mt-1 text-gray-800 dark:text-gray-200">
                  {{ application.household.first_name }} 
                  {{ application.household.middle_name ? application.household.middle_name + ' ' : '' }}
                  {{ application.household.last_name }}
                </p>
              </div>
              
              <div>
                <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Gender</h3>
                <p class="mt-1 text-gray-800 dark:text-gray-200 capitalize">
                  {{ application.household.gender }}
                </p>
              </div>
              
              <div>
                <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Phone Number</h3>
                <p class="mt-1 text-gray-800 dark:text-gray-200">
                  {{ application.household.phone_number1 }}
                </p>
              </div>
              
              <div>
                <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Address</h3>
                <p class="mt-1 text-gray-800 dark:text-gray-200">
                  {{ application.household.address }}
                </p>
              </div>
            </div>
            
            <!-- Reviews Section -->
            <div v-if="application.household.reviews && application.household.reviews.length > 0" class="mt-6">
              <h3 class="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">Household Reviews</h3>
              <div class="space-y-4">
                <div
                  v-for="review in application.household.reviews"
                  :key="review.id"
                  class="bg-white dark:bg-gray-600 p-4 rounded-lg shadow-sm"
                >
                  <div class="flex items-center">
                    <div class="flex">
                      <Icon
                        v-for="star in 5"
                        :key="star"
                        :name="star <= review.rating ? 'mdi:star' : 'mdi:star-outline'"
                        class="text-yellow-500"
                      />
                    </div>
                    <span class="text-xs text-gray-500 dark:text-gray-300 ml-2">
                      {{ formatDate(review.created_at) }}
                    </span>
                  </div>
                  <p class="mt-2 text-gray-700 dark:text-gray-200">
                    {{ review.review }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import backendApi from '@/networkServices/api/backendApi.js';
import { useAuthStore } from '@/stores/auth';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

// State
const loading = ref(true);
const error = ref(null);
const application = ref({
  application_id: null,
  status: '',
  applied_at: '',
  job: {
    id: null,
    job_title: '',
    job_description: '',
    location: '',
    salary_min: '',
    salary_max: '',
    expected_start_date: '',
    job_time: '',
    status: '',
    required_skills: ''
  },
  household: {
    id: null,
    name: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    gender: '',
    phone_number1: '',
    address: '',
    image_url: '',
    rating: 0,
    total_reviews: 0,
    reviews: []
  }
});

// Helper functions
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const formatDateTime = (dateString) => {
  if (!dateString) return 'N/A';
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const formatJobTime = (jobTime) => {
  if (!jobTime) return 'N/A';
  return jobTime
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const formatStatus = (status) => {
  if (!status) return 'N/A';
  return status.charAt(0).toUpperCase() + status.slice(1);
};

const formatSalary = (job) => {
  if (!job.salary_min && !job.salary_max) return 'Negotiable';
  if (job.salary_min && job.salary_max) {
    return `ETB ${job.salary_min} - ETB ${job.salary_max}`;
  }
  return job.salary_min ? `ETB ${job.salary_min}` : `ETB ${job.salary_max}`;
};

// Fetch application details
const fetchApplication = async () => {
  try {
    loading.value = true;
    error.value = null;

    // Ensure auth store is hydrated
    if (!authStore._hydrated) {
      await authStore.hydrate();
    }

    const response = await backendApi.get(`/maid/applications/${route.params.id}`, {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`
      }
    });

    // Map the API response to our local structure
    application.value = {
      application_id: response.data.application_id,
      status: response.data.status,
      applied_at: response.data.applied_at,
      job: {
        id: response.data.job.id,
        job_title: response.data.job.title,
        job_description: response.data.job.description,
        location: response.data.job.location,
        salary_min: response.data.job.salary_min,
        salary_max: response.data.job.salary_max,
        expected_start_date: response.data.job.expected_start_date,
        job_time: response.data.job.job_time,
        status: response.data.job.status
      },
      household: {
        id: response.data.household.id,
        name: response.data.household.name,
        first_name: response.data.household.first_name,
        middle_name: response.data.household.middle_name,
        last_name: response.data.household.last_name,
        gender: response.data.household.gender,
        phone_number1: response.data.household.phone_number1,
        address: response.data.household.address,
        image_url: response.data.household.image_url,
        rating: response.data.household.rating,
        total_reviews: response.data.household.total_reviews,
        reviews: response.data.household.reviews || []
      }
    };

  } catch (err) {
    console.error('Error fetching application:', err);
    error.value = 'Failed to load application details. Please try again later.';
  } finally {
    loading.value = false;
  }
};

// Withdraw application
const withdrawApplication = async () => {
  if (confirm('Are you sure you want to withdraw this application?')) {
    try {
      loading.value = true;
      await backendApi.delete(`/maid/applications/${route.params.id}`, {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`
        }
      });
      
      // Update the status locally
      application.value.status = 'withdrawn';
      alert('Application withdrawn successfully');
    } catch (err) {
      console.error('Error withdrawing application:', err);
      alert('Failed to withdraw application. Please try again.');
    } finally {
      loading.value = false;
    }
  }
};

// Initialize
onMounted(() => {
  fetchApplication();
});

definePageMeta({
  layout: "house",
});
</script>

<style scoped>
/* Add any custom styles here */
</style>