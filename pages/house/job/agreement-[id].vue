<template>
    <section class="py-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <div class="container mx-auto px-4 max-w-7xl">
        <!-- Back Button -->
        <button
          @click="router.go(-1)"
          class="mb-6 flex items-center gap-2 text-lime-600 dark:text-lime-400 hover:text-lime-700 dark:hover:text-lime-300 transition transform hover:-translate-x-1"
        >
          <Icon name="mdi:chevron-left" class="text-xl" />
          <span class="font-medium">Back to Agreements</span>
        </button>
  
        <!-- Loading State -->
        <div v-if="loading" class="text-center py-12">
          <div class="inline-flex items-center gap-3 animate-pulse">
            <Icon name="svg-spinners:bars-scale" class="text-lime-500 text-2xl" />
            <p class="text-gray-600 dark:text-gray-300 font-medium">Loading agreement details...</p>
          </div>
        </div>
  
        <!-- Error State -->
        <div v-else-if="error" class="text-center py-12">
          <div class="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl inline-block max-w-md">
            <p class="text-red-500 dark:text-red-400 flex items-center gap-2 justify-center text-lg">
              <Icon name="mdi:alert-circle" class="text-2xl" />
              {{ error }}
            </p>
            <button
              @click="fetchAgreement"
              class="mt-4 px-6 py-2.5 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition flex items-center gap-2 mx-auto font-medium shadow hover:shadow-md"
            >
              <Icon name="mdi:reload" />
              Retry
            </button>
          </div>
        </div>
  
        <!-- Agreement Details -->
        <div v-else-if="agreement" class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
          <!-- Header Section -->
          <div class="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div class="flex items-center gap-3">
                  <h1 class="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
                    {{ agreement.job.title }}
                  </h1>
                  <span
                    class="px-3 py-1 rounded-full text-sm font-medium shadow-inner"
                    :class="statusClasses(agreement.status)"
                  >
                    {{ formatStatus(agreement.status) }}
                  </span>
                </div>
                <div class="flex flex-wrap items-center gap-3 mt-2">
                  <span class="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1">
                    <Icon name="mdi:calendar" class="text-lime-500" />
                    Created {{ formatDate(agreement.created_at) }}
                  </span>
                  <span class="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1">
                    <Icon name="mdi:identifier" class="text-lime-500" />
                    Agreement ID: {{ agreement.agreement_id }}
                  </span>
                </div>
              </div>
  
              <!-- Action Buttons -->
              <div class="flex flex-wrap gap-2">
                <!-- Update Button for Pending/Rejected -->
                <button
                  v-if="['pending', 'rejected'].includes(agreement.status)"
                  @click="initiateUpdate"
                  class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center gap-2 font-medium shadow hover:shadow-md"
                >
                  <Icon name="mdi:pencil" />
                  Update
                </button>
  
                <!-- Finish/Cancel Buttons for Confirmed -->
                <template v-if="agreement.status === 'confirmed'">
                  <button
                    v-if="agreement.job.time === 'one time'"
                    @click="markJobFinished"
                    class="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition flex items-center gap-2 font-medium shadow hover:shadow-md"
                  >
                    <Icon name="mdi:check-all" />
                    Mark Finished
                  </button>
                  <button
                    v-else
                    @click="initiateCancellation"
                    class="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition flex items-center gap-2 font-medium shadow hover:shadow-md"
                  >
                    <Icon name="mdi:close" />
                    Cancel Agreement
                  </button>
                </template>
              </div>
            </div>
          </div>
  
          <!-- Main Content -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
            <!-- Left Column - Job Details -->
            <div class="lg:col-span-2 space-y-6">
              <!-- Agreement Content -->
              <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                <div class="p-5">
                  <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-3">
                    <div class="p-2 bg-lime-100 dark:bg-lime-900 rounded-lg">
                      <Icon name="mdi:file-document" class="text-lime-600 dark:text-lime-400 text-xl" />
                    </div>
                    <span>Agreement Details</span>
                  </h2>
                  <div class="bg-gray-50 dark:bg-gray-700 p-5 rounded-lg whitespace-pre-wrap border border-gray-200 dark:border-gray-600 font-medium text-gray-700 dark:text-gray-300">
                    {{ agreement.agreement_details || "No details provided" }}
                  </div>
                </div>
              </div>
  
              <!-- Job Information -->
              <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                <div class="p-5">
                  <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-3">
                    <div class="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                      <Icon name="mdi:briefcase" class="text-blue-600 dark:text-blue-400 text-xl" />
                    </div>
                    <span>Job Information</span>
                  </h2>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div class="space-y-4">
                      <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                        <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Job Type</p>
                        <p class="font-medium capitalize text-gray-800 dark:text-white">
                          {{ formatJobTime(agreement.job.time) }}
                        </p>
                      </div>
                      <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                        <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Location</p>
                        <p class="font-medium text-gray-800 dark:text-white">{{ agreement.job.location }}</p>
                      </div>
                    </div>
                    <div class="space-y-4">
                      <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                        <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Salary Range</p>
                        <p class="font-medium text-gray-800 dark:text-white">
                          {{ formatCurrency(agreement.job.salary_min) }} - {{ formatCurrency(agreement.job.salary_max) }}
                        </p>
                      </div>
                      <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                        <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Expected Start Date</p>
                        <p class="font-medium text-gray-800 dark:text-white">
                          {{ formatDate(agreement.job.expected_start_date) }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  
            <!-- Right Column - Maid Profile -->
            <div class="space-y-6">
              <!-- Maid Profile Card -->
              <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                <div class="p-5">
                  <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-5 flex items-center gap-3">
                    <div class="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                      <Icon name="mdi:account" class="text-purple-600 dark:text-purple-400 text-xl" />
                    </div>
                    <span>Maid Profile</span>
                  </h2>
  
                  <div class="flex flex-col items-center text-center mb-5">
                    <div class="relative mb-4">
                      <img
                        v-if="agreement.maid.image_url"
                        :src="agreement.maid.image_url"
                        class="w-28 h-28 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg"
                        alt="Maid profile"
                      />
                      <div
                        v-else
                        class="w-28 h-28 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center border-4 border-white dark:border-gray-800 shadow-lg"
                      >
                        <Icon name="mdi:account" class="text-gray-500 dark:text-gray-300 text-4xl" />
                      </div>
                     
                    </div>
  
                    <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-1">
                      {{ fullMaidName }}
                    </h3>
                    <p class="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      {{ agreement.maid.gender ? agreement.maid.gender.charAt(0).toUpperCase() + agreement.maid.gender.slice(1) : 'Gender not specified' }}
                    </p>
                    
                    <div class="flex gap-2">
                      <span class="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-3 py-1 rounded-full">
                        {{ agreement.maid.religion || 'Religion not specified' }}
                      </span>
                      <span class="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs px-3 py-1 rounded-full">
                        Rating: {{ agreement.maid.rating || '0.0' }}
                      </span>
                    </div>
                  </div>
  
                  <div class="space-y-4">
                    
  
                    <div class="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div class="p-2 bg-green-100 dark:bg-green-900 rounded-lg mt-1">
                        <Icon name="mdi:map-marker" class="text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p class="text-xs text-gray-500 dark:text-gray-400">Address</p>
                        <p class="text-gray-700 dark:text-gray-300 font-medium">
                          {{ agreement.maid.address || 'Address not provided' }}
                        </p>
                      </div>
                    </div>
  
                    <div class="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div class="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                        <Icon name="mdi:translate" class="text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p class="text-xs text-gray-500 dark:text-gray-400">Languages</p>
                        <p class="text-gray-700 dark:text-gray-300 font-medium">
                          <span class="font-semibold">Main:</span> {{ agreement.maid.main_language || 'Not specified' }}
                        </p>
                        <p class="text-gray-700 dark:text-gray-300 font-medium" v-if="agreement.maid.other_language">
                          <span class="font-semibold">Other:</span> {{ agreement.maid.other_language }}
                        </p>
                      </div>
                    </div>
  
                    <div class="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div class="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                        <Icon name="mdi:tools" class="text-yellow-600 dark:text-yellow-400" />
                      </div>
                      <div>
                        <p class="text-xs text-gray-500 dark:text-gray-400">Skills</p>
                        <p class="text-gray-700 dark:text-gray-300 font-medium">
                          {{ agreement.maid.skill || 'Not specified' }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
  
              <!-- Timeline -->
              <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                <div class="p-5">
                  <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-5 flex items-center gap-3">
                    <div class="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                      <Icon name="mdi:timeline" class="text-orange-600 dark:text-orange-400 text-xl" />
                    </div>
                    <span>Agreement Timeline</span>
                  </h2>
  
                  <div class="space-y-6">
                    <div class="flex gap-4">
                      <div class="flex flex-col items-center">
                        <div
                          class="w-10 h-10 rounded-full flex items-center justify-center bg-lime-500 text-white shadow-lg"
                        >
                          <Icon name="mdi:calendar-plus" />
                        </div>
                        <div class="w-0.5 h-full bg-gray-300 dark:bg-gray-600"></div>
                      </div>
                      <div class="pt-1">
                        <p class="font-semibold text-gray-800 dark:text-white">Agreement Created</p>
                        <p class="text-sm text-gray-500 dark:text-gray-400">
                          {{ formatDateTime(agreement.created_at) }}
                        </p>
                      </div>
                    </div>
  
                    <div
                      v-if="agreement.status === 'rejected'"
                      class="flex gap-4"
                    >
                      <div class="flex flex-col items-center">
                        <div class="w-0.5 h-4 bg-gray-300 dark:bg-gray-600"></div>
                        <div
                          class="w-10 h-10 rounded-full flex items-center justify-center bg-red-500 text-white shadow-lg"
                        >
                          <Icon name="mdi:close-circle" />
                        </div>
                        <div class="w-0.5 h-full bg-gray-300 dark:bg-gray-600"></div>
                      </div>
                      <div class="pt-1">
                        <p class="font-semibold text-gray-800 dark:text-white">Agreement Rejected</p>
                        <p class="text-sm text-gray-500 dark:text-gray-400">
                          {{ formatDateTime(agreement.updated_at) }}
                        </p>
                      </div>
                    </div>
  
                    <div
                      v-if="agreement.status === 'confirmed'"
                      class="flex gap-4"
                    >
                      <div class="flex flex-col items-center">
                        <div class="w-0.5 h-4 bg-gray-300 dark:bg-gray-600"></div>
                        <div
                          class="w-10 h-10 rounded-full flex items-center justify-center bg-blue-500 text-white shadow-lg"
                        >
                          <Icon name="mdi:check-circle" />
                        </div>
                        <div class="w-0.5 h-full bg-gray-300 dark:bg-gray-600"></div>
                      </div>
                      <div class="pt-1">
                        <p class="font-semibold text-gray-800 dark:text-white">Agreement Confirmed</p>
                        <p class="text-sm text-gray-500 dark:text-gray-400">
                          {{ formatDateTime(agreement.updated_at) }}
                        </p>
                      </div>
                    </div>
  
                    <div
                      v-if="agreement.status === 'finished' || agreement.status === 'canceled'"
                      class="flex gap-4"
                    >
                      <div class="flex flex-col items-center">
                        <div class="w-0.5 h-4 bg-gray-300 dark:bg-gray-600"></div>
                        <div
                          class="w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
                          :class="{
                            'bg-purple-500 text-white': agreement.status === 'finished',
                            'bg-red-500 text-white': agreement.status === 'canceled'
                          }"
                        >
                          <Icon
                            :name="agreement.status === 'finished' ? 'mdi:check-all' : 'mdi:cancel'"
                          />
                        </div>
                      </div>
                      <div class="pt-1">
                        <p class="font-semibold text-gray-800 dark:text-white capitalize">
                          Agreement {{ agreement.status }}
                        </p>
                        <p class="text-sm text-gray-500 dark:text-gray-400">
                          {{ formatDateTime(agreement.updated_at) }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Update Agreement Modal -->
        <div v-if="showUpdateModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-3">
                <Icon name="mdi:pencil" class="text-blue-500 text-2xl" />
                Update Agreement Details
              </h3>
              <button @click="showUpdateModal = false" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <Icon name="mdi:close" class="text-xl" />
              </button>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 class="font-medium text-gray-700 dark:text-gray-300 mb-3 text-lg">Agreement Details</h4>
                <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl border border-gray-200 dark:border-gray-600">
                  <textarea
                    v-model="updatedAgreementDetails"
                    class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-lime-500 focus:border-lime-500 focus:outline-none transition"
                    rows="12"
                    placeholder="Enter agreement details..."
                  ></textarea>
                </div>
              </div>
              
              <div>
                <h4 class="font-medium text-gray-700 dark:text-gray-300 mb-3 text-lg">Agreement Information</h4>
                <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl border border-gray-200 dark:border-gray-600 space-y-4">
                  <!-- Status (display only) -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Status
                    </label>
                    <div class="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700">
                      <span :class="statusClasses(agreement.status)" class="px-3 py-1 rounded-full text-sm font-medium">
                        {{ formatStatus(agreement.status) }}
                      </span>
                    </div>
                  </div>
                  
                  <div class="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h5 class="font-medium text-gray-700 dark:text-gray-300 mb-3 text-lg">Agreement Summary</h5>
                    <div class="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                      <div class="flex justify-between">
                        <span>Job Title:</span>
                        <span class="font-medium text-gray-800 dark:text-gray-200">{{ agreement.job.title }}</span>
                      </div>
                      <div class="flex justify-between">
                        <span>Job Type:</span>
                        <span class="capitalize">{{ formatJobTime(agreement.job.time) }}</span>
                      </div>
                      <div class="flex justify-between">
                        <span>Location:</span>
                        <span>{{ agreement.job.location }}</span>
                      </div>
                      <div class="flex justify-between">
                        <span>Maid Name:</span>
                        <span>{{ fullMaidName }}</span>
                      </div>
                      <div class="flex justify-between">
                        <span>Maid ID:</span>
                        <span>{{ agreement.maid.id }}</span>
                      </div>
                      <div class="flex justify-between">
                        <span>Created At:</span>
                        <span>{{ formatDateTime(agreement.created_at) }}</span>
                      </div>
                      <div class="flex justify-between">
                        <span>Last Updated:</span>
                        <span>{{ formatDateTime(agreement.updated_at) }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                @click="showUpdateModal = false"
                class="px-5 py-2.5 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition flex items-center gap-2 font-medium"
              >
                <Icon name="mdi:close" />
                Cancel
              </button>
              <button
                @click="saveUpdatedAgreement"
                class="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition flex items-center gap-2 font-medium shadow-md"
              >
                <Icon name="mdi:content-save" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useAuthStore } from '@/stores/auth';
  import backendApi from '@/networkServices/api/backendApi.js';
  
  const route = useRoute();
  const router = useRouter();
  const authStore = useAuthStore();
  
  // Data
  const loading = ref(true);
  const error = ref(null);
  const agreement = ref(null);
  const showUpdateModal = ref(false);
  const updatedAgreementDetails = ref('');
  
  // Computed
  const fullMaidName = computed(() => {
    if (!agreement.value?.maid) return '';
    const { first_name, middle_name, last_name } = agreement.value.maid;
    return [first_name, middle_name, last_name].filter(Boolean).join(' ');
  });
  
  // Helper functions
  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const formatDateTime = (dateString) => {
    if (!dateString) return 'Not specified';
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
  
  const formatCurrency = (amount) => {
    if (!amount) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };
  
  const statusClasses = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100';
      case 'finished':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';
      case 'canceled':
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };
  
  // API Methods
  const fetchAgreement = async () => {
    try {
      loading.value = true;
      error.value = null;
  
      if (!authStore._hydrated) {
        await authStore.hydrate();
      }
  
      const response = await backendApi.get(`/show_agreements/${route.params.id}`, {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`,
        },
      });
  
      agreement.value = response.data.agreement;
      updatedAgreementDetails.value = agreement.value.agreement_details;
    } catch (err) {
      error.value = err.message || 'Failed to load agreement details';
      console.error('Error fetching agreement:', err);
    } finally {
      loading.value = false;
    }
  };
  
  const saveUpdatedAgreement = async () => {
    try {
      loading.value = true;
      
      const response = await backendApi.put(
        `/agreements/${agreement.value.agreement_id}/update`,
        {
          agreement_details: updatedAgreementDetails.value
        },
        {
          headers: {
            Authorization: `Bearer ${authStore.accessToken}`,
          },
        }
      );
  
      // Update local state
      agreement.value.agreement_details = updatedAgreementDetails.value;
      agreement.value.updated_at = new Date().toISOString();
      
      showUpdateModal.value = false;
    } catch (err) {
      error.value = err.message || 'Failed to update agreement';
    } finally {
      loading.value = false;
    }
  };
  
  const markJobFinished = async () => {
    try {
      loading.value = true;
      
      const response = await backendApi.post(
        `/agreements/${agreement.value.agreement_id}/finish`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authStore.accessToken}`,
          },
        }
      );
  
      // Update local state
      agreement.value.status = 'finished';
      agreement.value.updated_at = new Date().toISOString();
    } catch (err) {
      error.value = err.message || 'Failed to mark job as finished';
    } finally {
      loading.value = false;
    }
  };
  
  const initiateCancellation = async () => {
    try {
      loading.value = true;
      
      const response = await backendApi.post(
        `/agreements/${agreement.value.agreement_id}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authStore.accessToken}`,
          },
        }
      );
  
      // Update local state
      agreement.value.status = 'canceled';
      agreement.value.updated_at = new Date().toISOString();
    } catch (err) {
      error.value = err.message || 'Failed to cancel agreement';
    } finally {
      loading.value = false;
    }
  };
  
  const initiateUpdate = () => {
    showUpdateModal.value = true;
  };
  
  // Lifecycle
  onMounted(() => {
    fetchAgreement();
  });
  
  definePageMeta({
    layout: 'house',
  });
  </script>
  
  <style scoped>
  .whitespace-pre-wrap {
    white-space: pre-wrap;
  }
  </style>