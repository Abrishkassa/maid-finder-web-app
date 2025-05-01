<template>
    <section class="py-8 bg-gray-50 dark:bg-gray-900">
      <div class="container mx-auto px-4">
        <!-- Filters Section -->
        <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md mb-8">
          <div class="flex flex-col md:flex-row md:items-end gap-4">
             <!-- Maid Search -->
             <div class="min-w-[200px]">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Search Maid
              </label>
              <div class="relative">
                <input
                  type="text"
                  v-model="maidSearch"
                  placeholder="Search by maid name..."
                  class="w-full p-2.5 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
                />
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon name="mdi:magnify" class="text-gray-400" />
                </div>
              </div>
            </div>
            <!-- Date Range Filter -->
            <div class="flex-1">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Date Range
              </label>
              <div class="flex gap-2">
                <input
                  type="date"
                  v-model="dateRange.start"
                  class="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
                />
                <input
                  type="date"
                  v-model="dateRange.end"
                  class="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
                />
              </div>
            </div>
  
            <!-- Status Filter -->
            <div class="min-w-[180px]">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>
              <select
                v-model="statusFilter"
                class="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
              >
                <option value="">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="finished">Finished</option>
                <option value="canceled">Canceled</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
  
           
  
            <!-- Clear Filters Button -->
            <button
              @click="clearFilters"
              class="h-[42px] px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition flex items-center gap-1"
            >
              <Icon name="mdi:filter-remove" class="text-lg" />
              Clear
            </button>
  
            <!-- View Toggle -->
            <div class="flex items-center gap-2">
              <button
                @click="viewMode = 'card'"
                class="p-2 rounded-lg transition"
                :class="
                  viewMode === 'card'
                    ? 'bg-lime-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                "
                aria-label="Card view"
              >
                <Icon name="mdi:view-grid" class="text-lg" />
              </button>
              <button
                @click="viewMode = 'list'"
                class="p-2 rounded-lg transition"
                :class="
                  viewMode === 'list'
                    ? 'bg-lime-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                "
                aria-label="List view"
              >
                <Icon name="mdi:view-list" class="text-lg" />
              </button>
            </div>
          </div>
        </div>
  
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div 
            v-for="stat in stats"
            :key="stat.label"
            class="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border-l-4"
            :class="stat.borderColor"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ stat.label }}</p>
                <p class="text-2xl font-semibold text-gray-800 dark:text-white">{{ stat.value }}</p>
              </div>
              <div 
                class="p-3 rounded-full"
                :class="stat.bgColor"
              >
                <Icon :name="stat.icon" class="text-white text-xl" />
              </div>
            </div>
          </div>
        </div>
  
        <!-- Loading State -->
        <div v-if="loading" class="text-center py-12">
          <div class="inline-flex items-center gap-2">
            <Icon name="svg-spinners:bars-scale" class="text-lime-500 text-2xl" />
            <p class="text-gray-600 dark:text-gray-300">Loading agreements...</p>
          </div>
        </div>
  
        <!-- Error State -->
        <div v-else-if="error" class="text-center py-12">
          <div class="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg inline-block">
            <p class="text-red-500 dark:text-red-400 flex items-center gap-2">
              <Icon name="mdi:alert-circle" class="text-xl" />
              {{ error }}
            </p>
            <button
              @click="fetchAgreements"
              class="mt-4 px-6 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition flex items-center gap-2 mx-auto"
            >
              <Icon name="mdi:reload" />
              Retry
            </button>
          </div>
        </div>
  
        <!-- Empty State -->
        <div v-else-if="filteredAgreements.length === 0" class="text-center py-12">
          <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl inline-block">
            <Icon name="mdi:file-document-outline" class="text-gray-400 text-4xl mb-3" />
            <p class="text-gray-600 dark:text-gray-300">No agreements found matching your criteria</p>
            <button
              @click="clearFilters"
              class="mt-4 px-4 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition"
            >
              Clear filters
            </button>
          </div>
        </div>
  
        <!-- Card View -->
        <div
          v-else-if="viewMode === 'card'"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div
            v-for="agreement in filteredAgreements"
            :key="agreement.agreement_id"
            class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer border-l-4"
            :class="statusBorderClasses(agreement.status)"
            @click="viewAgreementDetail(agreement.agreement_id)"
          >
            <div class="flex justify-between items-start mb-4">
              <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-100 line-clamp-1">
                {{ agreement.job.title }}
              </h3>
              <span
                class="px-2.5 py-1 rounded-full text-xs font-medium"
                :class="statusClasses(agreement.status)"
              >
                {{ formatStatus(agreement.status) }}
              </span>
            </div>
  
            <div class="space-y-3">
              <div class="flex items-center">
                <Icon name="mdi:map-marker" class="text-gray-500 dark:text-gray-400 mr-2" />
                <span class="text-gray-600 dark:text-gray-300 line-clamp-1">{{ agreement.job.location }}</span>
              </div>
  
              <div class="flex items-center">
                <Icon name="mdi:clock" class="text-gray-500 dark:text-gray-400 mr-2" />
                <span class="text-gray-600 dark:text-gray-300 capitalize">
                  {{ formatJobTime(agreement.job.time) }}
                </span>
              </div>
  
              <div class="flex items-center">
                <Icon name="mdi:calendar" class="text-gray-500 dark:text-gray-400 mr-2" />
                <span class="text-gray-600 dark:text-gray-300">
                  {{ formatDate(agreement.created_at) }}
                </span>
              </div>
            </div>
  
            <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div class="flex items-center justify-between gap-2">
                <div class="flex items-center">
                  <img 
                    v-if="agreement.with.image_url"
                    :src="agreement.with.image_url" 
                    class="w-8 h-8 rounded-full object-cover mr-2"
                    alt="Maid profile"
                  >
                  <div v-else class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-2">
                    <Icon name="mdi:account" class="text-gray-500 dark:text-gray-300" />
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-800 dark:text-gray-200 line-clamp-1">
                      {{ agreement.with.name }}
                    </p>
                    <!-- Only show maid ID if status is not pending or rejected -->
                    <p 
                      v-if="!['pending', 'rejected'].includes(agreement.status)"
                      class="text-xs text-gray-500 dark:text-gray-400"
                    >
                      Maid ID: {{ agreement.with.maid_id }}
                    </p>
                    <!-- Show rejection reason if status is rejected -->
                    <p 
                      v-if="agreement.status === 'rejected' && agreement.rejection_reason"
                      class="text-xs text-red-500 dark:text-red-400 line-clamp-1"
                    >
                      Reason: {{ agreement.rejection_reason }}
                    </p>
                  </div>
                </div>
                <div class="flex gap-2">
                  <!-- Pending Status: Accept and Reject -->
                  <template v-if="agreement.status === 'pending'">
                    <button
                      @click.stop="acceptAgreement(agreement.agreement_id)"
                      class="px-3 py-1 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition flex-1 flex items-center gap-1"
                    >
                      <Icon name="mdi:check" class="text-sm" />
                      Accept
                    </button>
                    <button
                      @click.stop="initiateRejection(agreement.agreement_id)"
                      class="px-3 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition flex-1 flex items-center gap-1"
                    >
                      <Icon name="mdi:close" class="text-sm" />
                      Reject
                    </button>
                  </template>
  
                  <!-- Rejected Status: Update Rejection Reason -->
                  <template v-else-if="agreement.status === 'rejected'">
                    <button
                      @click.stop="initiateRejection(agreement.agreement_id)"
                      class="px-3 py-1 bg-yellow-500 text-white rounded-lg text-sm hover:bg-yellow-600 transition flex-1 flex items-center gap-1"
                    >
                      <Icon name="mdi:pencil" class="text-sm" />
                      Update
                    </button>
                  </template>
  
                  <!-- Confirmed Status: Different actions based on job type -->
                  <template v-else-if="agreement.status === 'confirmed'">
                    <button
                      v-if="agreement.job.time === 'one time'"
                      @click.stop="markJobFinished(agreement.agreement_id)"
                      class="px-3 py-1 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition flex-1 flex items-center gap-1"
                    >
                      <Icon name="mdi:check-all" class="text-sm" />
                      Finished
                    </button>
                    <button
                      v-else
                      @click.stop="initiateCancellation(agreement.agreement_id)"
                      class="px-3 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition flex-1 flex items-center gap-1"
                    >
                      <Icon name="mdi:close" class="text-sm" />
                      Cancel
                    </button>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- List View -->
        <div v-else class="space-y-4">
          <div
            v-for="agreement in filteredAgreements"
            :key="agreement.agreement_id"
            class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            @click="viewAgreementDetail(agreement.agreement_id)"
          >
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">
                    {{ agreement.job.title }}
                  </h3>
                  <span
                    class="px-2.5 py-1 rounded-full text-xs font-medium"
                    :class="statusClasses(agreement.status)"
                  >
                    {{ formatStatus(agreement.status) }}
                  </span>
                </div>
  
                <div class="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div class="flex items-center">
                    <Icon name="mdi:map-marker" class="text-gray-500 dark:text-gray-400 mr-1" />
                    <span class="text-gray-600 dark:text-gray-300 line-clamp-1">{{ agreement.job.location }}</span>
                  </div>
                  <div class="flex items-center">
                    <Icon name="mdi:clock" class="text-gray-500 dark:text-gray-400 mr-1" />
                    <span class="text-gray-600 dark:text-gray-300 capitalize">
                      {{ formatJobTime(agreement.job.time) }}
                    </span>
                  </div>
                  <div class="flex items-center">
                    <Icon name="mdi:calendar" class="text-gray-500 dark:text-gray-400 mr-1" />
                    <span class="text-gray-600 dark:text-gray-300">
                      {{ formatDate(agreement.created_at) }}
                    </span>
                  </div>
                  <div class="flex items-center">
                    <img 
                      v-if="agreement.with.image_url"
                      :src="agreement.with.image_url" 
                      class="w-6 h-6 rounded-full object-cover mr-1"
                      alt="Maid profile"
                    >
                    <Icon v-else name="mdi:account" class="text-gray-500 dark:text-gray-400 mr-1" />
                    <span class="text-gray-600 dark:text-gray-300 line-clamp-1">
                      {{ agreement.with.name }}
                      <span v-if="!['pending', 'rejected'].includes(agreement.status)" class="text-xs text-gray-500 dark:text-gray-400">
                        (ID: {{ agreement.with.maid_id }})
                      </span>
                      <span 
                        v-if="agreement.status === 'rejected' && agreement.rejection_reason"
                        class="text-red-500 dark:text-red-400 ml-1 text-xs"
                      >
                        - {{ agreement.rejection_reason }}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
  
              <div class="flex items-center gap-2">
                <!-- Pending Status: Accept and Reject -->
                <template v-if="agreement.status === 'pending'">
                  <button
                    @click.stop="acceptAgreement(agreement.agreement_id)"
                    class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition whitespace-nowrap flex items-center gap-2"
                  >
                    <Icon name="mdi:check" />
                    Accept
                  </button>
                  <button
                    @click.stop="initiateRejection(agreement.agreement_id)"
                    class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition whitespace-nowrap flex items-center gap-2"
                  >
                    <Icon name="mdi:close" />
                    Reject
                  </button>
                </template>
  
                <!-- Rejected Status: Update Rejection Reason -->
                <template v-else-if="agreement.status === 'rejected'">
                  <button
                    @click.stop="initiateRejection(agreement.agreement_id)"
                    class="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition whitespace-nowrap flex items-center gap-2"
                  >
                    <Icon name="mdi:pencil" />
                    Update
                  </button>
                </template>
  
                <!-- Confirmed Status: Different actions based on job type -->
                <template v-else-if="agreement.status === 'confirmed'">
                  <button
                    v-if="agreement.job.time === 'one time'"
                    @click.stop="markJobFinished(agreement.agreement_id)"
                    class="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition whitespace-nowrap flex items-center gap-2"
                  >
                    <Icon name="mdi:check-all" />
                    Finished
                  </button>
                  <button
                    v-else
                    @click.stop="initiateCancellation(agreement.agreement_id)"
                    class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition whitespace-nowrap flex items-center gap-2"
                  >
                    <Icon name="mdi:close" />
                    Cancel
                  </button>
                </template>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Pagination -->
        <div v-if="pagination.total_pages > 1" class="flex justify-center mt-8">
          <div class="flex items-center gap-2">
            <button
              @click="prevPage"
              :disabled="pagination.current_page === 1"
              class="px-4 py-2 rounded-lg border flex items-center gap-1"
              :class="{
                'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600':
                  pagination.current_page !== 1,
                'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed':
                  pagination.current_page === 1,
              }"
            >
              <Icon name="mdi:chevron-left" />
              Previous
            </button>
  
            <div class="flex items-center gap-1">
              <button
                v-for="page in paginationButtons"
                :key="page"
                @click="goToPage(page)"
                class="w-10 h-10 flex items-center justify-center rounded-lg transition"
                :class="{
                  'bg-lime-500 text-white hover:bg-lime-600': page === pagination.current_page,
                  'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700':
                    page !== pagination.current_page,
                }"
                :disabled="page === '...'"
              >
                {{ page }}
              </button>
            </div>
  
            <button
              @click="nextPage"
              :disabled="pagination.current_page === pagination.total_pages"
              class="px-4 py-2 rounded-lg border flex items-center gap-1"
              :class="{
                'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600':
                  pagination.current_page !== pagination.total_pages,
                'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed':
                  pagination.current_page === pagination.total_pages,
              }"
            >
              Next
              <Icon name="mdi:chevron-right" />
            </button>
          </div>
        </div>
  
        <!-- Rejection Reason Modal -->
        <div v-if="showRejectionModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
              <Icon name="mdi:alert-circle-outline" class="text-red-500" />
              {{ isUpdatingRejection ? 'Update Rejection Reason' : 'Reason for Rejection' }}
            </h3>
            
            <textarea
              v-model="rejectionReason"
              :placeholder="isUpdatingRejection ? 'Update the rejection reason...' : 'Please provide a reason for rejecting this agreement...'"
              class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-lime-500 focus:border-lime-500 mb-4"
              rows="4"
            ></textarea>
            
            <div class="flex justify-end gap-3">
              <button
                @click="cancelRejection"
                class="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition flex items-center gap-2"
              >
                <Icon name="mdi:close" />
                Cancel
              </button>
              <button
                @click="confirmRejection"
                class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center gap-2"
                :disabled="!rejectionReason.trim()"
                :class="{'opacity-50 cursor-not-allowed': !rejectionReason.trim()}"
              >
                <Icon name="mdi:check" />
                {{ isUpdatingRejection ? 'Update' : 'Submit' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import { useAuthStore } from "@/stores/auth";
  import backendApi from "@/networkServices/api/backendApi.js";
  
  const router = useRouter();
  const authStore = useAuthStore();
  
  // Data
  const loading = ref(false);
  const error = ref(null);
  const viewMode = ref("card"); // 'card' or 'list'
  const statusFilter = ref("");
  const maidSearch = ref("");
  const dateRange = ref({
    start: "",
    end: ""
  });
  const agreements = ref([]);
  const maids = ref([]);
  const pagination = ref({
    current_page: 1,
    total_pages: 1,
    total: 0
  });
  const showRejectionModal = ref(false);
  const rejectionReason = ref("");
  const currentActionAgreementId = ref(null);
  
  // Stats
  const stats = computed(() => [
    {
      label: "Total Agreements",
      value: pagination.value.total,
      icon: "mdi:file-document-multiple",
      bgColor: "bg-blue-500",
      borderColor: "border-blue-500"
    },
    {
      label: "Pending",
      value: agreements.value.filter(a => a.status === "pending").length,
      icon: "mdi:clock",
      bgColor: "bg-yellow-500",
      borderColor: "border-yellow-500"
    },
    {
      label: "Confirmed",
      value: agreements.value.filter(a => a.status === "confirmed").length,
      icon: "mdi:check-circle",
      bgColor: "bg-green-500",
      borderColor: "border-green-500"
    },
    {
      label: "Rejected",
      value: agreements.value.filter(a => a.status === "rejected").length,
      icon: "mdi:close-circle",
      bgColor: "bg-red-500",
      borderColor: "border-red-500"
    }
  ]);
  
  // Computed
  const filteredAgreements = computed(() => {
    return agreements.value.filter(agreement => {
      // Filter by status
      if (statusFilter.value && agreement.status !== statusFilter.value) {
        return false;
      }
  
      // Filter by maid search
      if (maidSearch.value && !agreement.with.name.toLowerCase().includes(maidSearch.value.toLowerCase())) {
        return false;
      }
  
      // Filter by date range
      if (dateRange.value.start || dateRange.value.end) {
        const agreementDate = new Date(agreement.created_at);
        const startDate = dateRange.value.start ? new Date(dateRange.value.start) : null;
        const endDate = dateRange.value.end ? new Date(dateRange.value.end) : null;
  
        if (startDate && agreementDate < startDate) return false;
        if (endDate && agreementDate > endDate) return false;
      }
  
      return true;
    });
  });
  
  const paginationButtons = computed(() => {
    const buttons = [];
    const current = pagination.value.current_page;
    const total = pagination.value.total_pages;
  
    // Always show first page
    buttons.push(1);
  
    // Show pages around current page
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
  
    if (start > 2) buttons.push("...");
  
    for (let i = start; i <= end; i++) {
      buttons.push(i);
    }
  
    if (end < total - 1) buttons.push("...");
  
    // Always show last page if different from first
    if (total > 1) buttons.push(total);
  
    return buttons;
  });
  
  const isUpdatingRejection = computed(() => {
    if (!currentActionAgreementId.value) return false;
    const agreement = agreements.value.find(a => a.agreement_id === currentActionAgreementId.value);
    return agreement?.status === 'rejected';
  });
  
  // Methods
  const viewAgreementDetail = (agreementId) => {
    router.push(`/house/job/agreement-${agreementId}`);
  };
  
  const clearFilters = () => {
    statusFilter.value = "";
    maidSearch.value = "";
    dateRange.value = { start: "", end: "" };
  };
  
  // Agreement Action Methods
  const acceptAgreement = async (agreementId) => {
    try {
      loading.value = true;
      const response = await backendApi.post(
        `/agreements/${agreementId}/confirm`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authStore.accessToken}`,
          },
        }
      );
  
      // Update local state
      const index = agreements.value.findIndex(a => a.agreement_id === agreementId);
      if (index !== -1) {
        agreements.value[index].status = "confirmed";
      }
    } catch (err) {
      error.value = err.message || "Failed to accept agreement";
    } finally {
      loading.value = false;
    }
  };
  
  const initiateRejection = (agreementId) => {
    currentActionAgreementId.value = agreementId;
    const agreement = agreements.value.find(a => a.agreement_id === agreementId);
    rejectionReason.value = agreement?.rejection_reason || "";
    showRejectionModal.value = true;
  };
  
  const cancelRejection = () => {
    showRejectionModal.value = false;
    currentActionAgreementId.value = null;
    rejectionReason.value = "";
  };
  
  const confirmRejection = async () => {
    if (!rejectionReason.value.trim() || !currentActionAgreementId.value) return;
  
    try {
      loading.value = true;
      const response = await backendApi.post(
        `/agreements/${currentActionAgreementId.value}/reject`,
        { rejection_reason: rejectionReason.value },
        {
          headers: {
            Authorization: `Bearer ${authStore.accessToken}`,
          },
        }
      );
  
      // Update local state
      const index = agreements.value.findIndex(
        (a) => a.agreement_id === currentActionAgreementId.value
      );
      if (index !== -1) {
        agreements.value[index].status = "rejected";
        agreements.value[index].rejection_reason = rejectionReason.value;
      }
  
      showRejectionModal.value = false;
      currentActionAgreementId.value = null;
      rejectionReason.value = "";
    } catch (err) {
      error.value = err.message || "Failed to reject agreement";
    } finally {
      loading.value = false;
    }
  };
  
  const initiateCancellation = async (agreementId) => {
    try {
      loading.value = true;
      const response = await backendApi.post(
        `/agreements/${agreementId}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authStore.accessToken}`,
          },
        }
      );
  
      // Update local state
      const index = agreements.value.findIndex(a => a.agreement_id === agreementId);
      if (index !== -1) {
        agreements.value[index].status = "canceled";
      }
      
    } catch (err) {
      error.value = err.message || "Failed to cancel agreement";
    } finally {
      loading.value = false;
    }
  };
  
  const markJobFinished = async (agreementId) => {
    try {
      loading.value = true;
      const response = await backendApi.post(
        `/agreements/${agreementId}/finish`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authStore.accessToken}`,
          },
        }
      );
  
      // Update local state
      const index = agreements.value.findIndex(a => a.agreement_id === agreementId);
      if (index !== -1) {
        agreements.value[index].status = "finished";
      }
    } catch (err) {
      error.value = err.message || "Failed to mark job as finished";
    } finally {
      loading.value = false;
    }
  };
  
  // Helper functions
  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const formatJobTime = (jobTime) => {
    if (!jobTime) return "N/A";
    return jobTime
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  
  const formatStatus = (status) => {
    if (!status) return "N/A";
    return status.charAt(0).toUpperCase() + status.slice(1);
  };
  
  const statusClasses = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100";
      case "finished":
        return "bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100";
      case "canceled":
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };
  
  const statusBorderClasses = (status) => {
    switch (status) {
      case "confirmed":
        return "border-blue-500";
      case "finished":
        return "border-purple-500";
      case "pending":
        return "border-yellow-500";
      case "canceled":
      case "rejected":
        return "border-red-500";
      default:
        return "border-gray-300 dark:border-gray-600";
    }
  };
  
  // Extract unique maids from agreements
  const extractMaids = (agreements) => {
    const maidMap = new Map();
    agreements.forEach(agreement => {
      if (!maidMap.has(agreement.with.maid_id)) {
        maidMap.set(agreement.with.maid_id, agreement.with);
      }
    });
    return Array.from(maidMap.values());
  };
  
  // API Methods
  const fetchAgreements = async () => {
    try {
      loading.value = true;
      error.value = null;
  
      if (!authStore._hydrated) {
        await authStore.hydrate();
      }
  
      const response = await backendApi.get("/list_of_agreements", {
        params: {
          page: pagination.value.current_page
        },
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`,
        },
      });
  
      agreements.value = response.data.agreements || [];
      maids.value = extractMaids(response.data.agreements);
      pagination.value = {
        current_page: response.data.pagination.current_page || 1,
        total_pages: response.data.pagination.total_pages || 1,
        total: response.data.pagination.total || 0
      };
    } catch (err) {
      error.value = err.message || "Failed to load agreements";
    } finally {
      loading.value = false;
    }
  };
  
  // Pagination
  const prevPage = () => {
    if (pagination.value.current_page > 1) {
      pagination.value.current_page--;
      fetchAgreements();
    }
  };
  
  const nextPage = () => {
    if (pagination.value.current_page < pagination.value.total_pages) {
      pagination.value.current_page++;
      fetchAgreements();
    }
  };
  
  const goToPage = (page) => {
    if (page === "..." || page === pagination.value.current_page) return;
    pagination.value.current_page = page;
    fetchAgreements();
  };
  
  // Lifecycle
  onMounted(() => {
    fetchAgreements();
  });
  
  definePageMeta({
    layout: "house",
  });
  </script>