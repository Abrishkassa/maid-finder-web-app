<template>
  <section class="py-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
    <div class="container mx-auto px-4 max-w-6xl">
      <!-- Loading State -->
      <div v-if="loading && !agreement" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lime-500"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl">
        <div class="flex items-center gap-3 mb-3">
          <Icon name="mdi:alert-circle" class="text-red-500 dark:text-red-400 w-6 h-6" />
          <h3 class="text-lg font-medium text-red-800 dark:text-red-200">Failed to load agreement</h3>
        </div>
        <p class="text-red-700 dark:text-red-300 mb-4">{{ error }}</p>
        <button
          @click="fetchAgreement"
          class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
        >
          Retry
        </button>
      </div>

      <!-- Content -->
      <template v-else-if="agreement">
        <!-- Back Button -->
        <nav class="flex items-center mb-6">
          <button 
            @click="goBack"
            class="flex items-center text-lime-600 dark:text-lime-400 hover:text-lime-700 dark:hover:text-lime-300 transition"
          >
            <Icon name="mdi:chevron-left" class="mr-1 w-5 h-5" />
            Back to Agreements
          </button>
        </nav>

        <!-- Main Card -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          <!-- Status Header -->
          <div 
            class="px-6 py-4 border-b"
            :class="statusHeaderClasses(agreement.status)"
          >
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div class="flex items-start gap-4">
                <div 
                  class="flex-shrink-0 p-3 rounded-lg"
                  :class="statusIconBgClasses(agreement.status)"
                >
                  <Icon 
                    name="mdi:file-document" 
                    class="w-6 h-6"
                    :class="statusIconColorClasses(agreement.status)"
                  />
                </div>
                <div>
                  <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100">{{ agreement.job.title }}</h1>
                  <div class="flex items-center flex-wrap gap-2 mt-2">
                    <span 
                      class="px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1.5"
                      :class="statusClasses(agreement.status)"
                    >
                      <Icon 
                        :name="statusIcon(agreement.status)" 
                        class="w-4 h-4"
                      />
                      {{ formatStatus(agreement.status) }}
                    </span>
                    <div class="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <Icon name="mdi:calendar" class="mr-1.5 w-4 h-4" />
                      Created {{ formatRelativeDate(agreement.created_at) }}
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Action Buttons -->
              <div class="flex flex-wrap gap-2">
                <!-- Pending Status Actions -->
                <template v-if="agreement.status === 'pending'">
                  <button
                    @click="showAcceptModal = true"
                    class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition flex items-center gap-2"
                    :disabled="actionLoading"
                  >
                    <Icon name="mdi:check" class="w-5 h-5" />
                    <span v-if="!actionLoading">Accept</span>
                    <span v-else>Processing...</span>
                  </button>
                  <button
                    @click="initiateRejection"
                    class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition flex items-center gap-2"
                    :disabled="actionLoading"
                  >
                    <Icon name="mdi:close" class="w-5 h-5" />
                    <span v-if="!actionLoading">Reject</span>
                    <span v-else>Processing...</span>
                  </button>
                </template>

                <!-- Confirmed Status Actions -->
                <template v-else-if="agreement.status === 'confirmed'">
                  <button
                    v-if="agreement.job.time === 'one time'"
                    @click="showFinishModal = true"
                    class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition flex items-center gap-2"
                    :disabled="actionLoading"
                  >
                    <Icon name="mdi:check-all" class="w-5 h-5" />
                    <span v-if="!actionLoading">Mark Finished</span>
                    <span v-else>Processing...</span>
                  </button>
                  <button
                    v-else
                    @click="showCancelModal = true"
                    class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition flex items-center gap-2"
                    :disabled="actionLoading"
                  >
                    <Icon name="mdi:cancel" class="w-5 h-5" />
                    <span v-if="!actionLoading">Cancel</span>
                    <span v-else>Processing...</span>
                  </button>
                </template>

                <!-- Common Actions -->
                <button
                  @click="printAgreement"
                  class="px-3 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg transition flex items-center gap-2"
                >
                  <Icon name="mdi:printer" class="w-5 h-5" />
                  Print
                </button>
              </div>
            </div>
          </div>

          <!-- Main Content -->
          <div class="p-6">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <!-- Left Column - Job Details -->
              <div class="lg:col-span-2 space-y-6">
                <!-- Job Information Card -->
                <div class="bg-gray-50 dark:bg-gray-700/50 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div class="flex items-center justify-between mb-4">
                    <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                      <Icon name="mdi:briefcase" class="text-lime-600 dark:text-lime-400" />
                      Job Information
                    </h2>
                    <span class="text-xs px-2.5 py-1 bg-gray-200 dark:bg-gray-600 rounded-full text-gray-700 dark:text-gray-200">
                      {{ agreement.job.status }}
                    </span>
                  </div>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="space-y-1">
                      <label class="text-xs font-medium text-gray-500 dark:text-gray-400">Job Type</label>
                      <p class="text-gray-800 dark:text-gray-100 font-medium capitalize">
                        {{ formatJobTime(agreement.job.time) }}
                      </p>
                    </div>
                    
                    <div class="space-y-1">
                      <label class="text-xs font-medium text-gray-500 dark:text-gray-400">Location</label>
                      <p class="text-gray-800 dark:text-gray-100 font-medium flex items-center gap-1">
                        <Icon name="mdi:map-marker" class="text-gray-500 dark:text-gray-400" />
                        {{ agreement.job.location }}
                      </p>
                    </div>
                    
                    <div class="space-y-1">
                      <label class="text-xs font-medium text-gray-500 dark:text-gray-400">Start Date</label>
                      <p class="text-gray-800 dark:text-gray-100 font-medium flex items-center gap-1">
                        <Icon name="mdi:calendar" class="text-gray-500 dark:text-gray-400" />
                        {{ formatDate(agreement.job.expected_start_date) }}
                      </p>
                    </div>
                    
                    <div class="space-y-1">
                      <label class="text-xs font-medium text-gray-500 dark:text-gray-400">Salary Range</label>
                      <p class="text-gray-800 dark:text-gray-100 font-medium flex items-center gap-1">
                        <Icon name="mdi:cash" class="text-gray-500 dark:text-gray-400" />
                        ${{ agreement.job.salary_min }} - ${{ agreement.job.salary_max }}
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Agreement Terms Card -->
                <div class="bg-gray-50 dark:bg-gray-700/50 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
                  <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2 mb-4">
                    <Icon name="mdi:file-document-edit" class="text-lime-600 dark:text-lime-400" />
                    Agreement Terms
                  </h2>
                  <div class="prose dark:prose-invert max-w-none bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <pre class="whitespace-pre-wrap font-sans text-gray-800 dark:text-gray-200">{{ agreement.agreement_details }}</pre>
                  </div>
                </div>

                <!-- Rating and Review Card - Only for finished agreements -->
                <div v-if="agreement.status === 'finished'" 
                     class="bg-gray-50 dark:bg-gray-700/50 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
                  <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2 mb-4">
                    <Icon name="mdi:star" class="text-lime-600 dark:text-lime-400" />
                    Rate & Review
                  </h2>
                  
                  <!-- Success Message -->
                  <div v-if="reviewSuccess" class="mb-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div class="flex items-center text-green-800 dark:text-green-200">
                      <Icon name="mdi:check-circle" class="w-5 h-5 mr-2" />
                      <span>Your review has been submitted successfully!</span>
                    </div>
                  </div>
                  
                  <!-- Existing Review for this agreement -->
                  <div v-if="existingReview" class="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 mb-4">
                    <div class="flex items-center justify-between mb-2">
                      <div class="flex items-center">
                        <div class="flex">
                          <Icon 
                            v-for="star in 5" 
                            :key="star" 
                            name="mdi:star" 
                            class="w-5 h-5"
                            :class="star <= existingReview.rating ? 'text-yellow-500' : 'text-gray-300 dark:text-gray-600'"
                          />
                        </div>
                        <span class="ml-2 text-sm text-gray-600 dark:text-gray-300">
                          Rated {{ existingReview.rating }} stars
                        </span>
                      </div>
                      <span class="text-xs text-gray-500 dark:text-gray-400">
                        {{ formatRelativeDate(existingReview.created_at) }}
                      </span>
                    </div>
                    <p class="text-gray-800 dark:text-gray-200 text-sm" v-if="existingReview.review">
                      "{{ existingReview.review }}"
                    </p>
                  </div>
                  
                  <!-- Reviews maid made for this household -->
                  <div v-if="householdReviews.length > 0" class="space-y-4 mb-4">
                    <h3 class="text-md font-medium text-gray-800 dark:text-gray-200">
                      Your Previous Reviews for This Household
                    </h3>
                    <div v-for="review in householdReviews" :key="review.id" 
                         class="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div class="flex items-center justify-between mb-2">
                        <div class="flex items-center">
                          <div class="flex">
                            <Icon 
                              v-for="star in 5" 
                              :key="star" 
                              name="mdi:star" 
                              class="w-5 h-5"
                              :class="star <= review.rating ? 'text-yellow-500' : 'text-gray-300 dark:text-gray-600'"
                            />
                          </div>
                          <span class="ml-2 text-sm text-gray-600 dark:text-gray-300">
                            Rated {{ review.rating }} stars
                          </span>
                        </div>
                        <span class="text-xs text-gray-500 dark:text-gray-400">
                          {{ formatRelativeDate(review.created_at) }}
                        </span>
                      </div>
                      <p class="text-gray-800 dark:text-gray-200 text-sm" v-if="review.review">
                        "{{ review.review }}"
                      </p>
                      <div class="mt-2 text-xs text-gray-500 dark:text-gray-400">
                        For job: {{ review.job_title || 'N/A' }}
                      </div>
                    </div>
                  </div>
                  
                  <!-- Review Form -->
                  <div v-if="canReview && !existingReview" class="space-y-4">
                    <div class="flex items-center">
                      <span class="mr-3 text-sm text-gray-600 dark:text-gray-300">Rating:</span>
                      <div class="flex">
                        <button 
                          v-for="star in 5" 
                          :key="star" 
                          @click="selectedRating = star"
                          class="focus:outline-none"
                        >
                          <Icon 
                            name="mdi:star" 
                            class="w-8 h-8 transition"
                            :class="star <= selectedRating ? 'text-yellow-500 hover:text-yellow-600' : 'text-gray-300 dark:text-gray-600 hover:text-gray-400 dark:hover:text-gray-500'"
                          />
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label for="review" class="block text-sm text-gray-600 dark:text-gray-300 mb-1">Review (optional):</label>
                      <textarea
                        id="review"
                        v-model="reviewText"
                        placeholder="Share your experience..."
                        class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                        rows="3"
                      ></textarea>
                    </div>
                    
                    <button
                      @click="submitReview"
                      class="px-4 py-2 bg-lime-600 hover:bg-lime-700 text-white rounded-lg transition flex items-center gap-2"
                      :disabled="!selectedRating || reviewLoading"
                    >
                      <Icon name="mdi:send" class="w-5 h-5" />
                      <span v-if="!reviewLoading">Submit Review</span>
                      <span v-else>Submitting...</span>
                    </button>
                  </div>
                  
                  <!-- Message when no review needed -->
                  <div v-if="!canReview && !existingReview && householdReviews.length === 0" class="text-center py-4 text-sm text-gray-500 dark:text-gray-400">
                    <p>This job has been completed. You can now submit your review.</p>
                  </div>
                </div>

                <!-- Timeline Card -->
                <div class="bg-gray-50 dark:bg-gray-700/50 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
                  <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2 mb-4">
                    <Icon name="mdi:timeline" class="text-lime-600 dark:text-lime-400" />
                    Activity Timeline
                  </h2>
                  <div class="space-y-4">
                    <div class="flex items-start gap-3">
                      <div class="flex-shrink-0 mt-1">
                        <div class="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                          <Icon name="mdi:file-document-plus" class="text-blue-600 dark:text-blue-300 w-5 h-5" />
                        </div>
                      </div>
                      <div class="flex-1">
                        <p class="text-sm font-medium text-gray-800 dark:text-gray-200">Agreement created</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">{{ formatDateTime(agreement.created_at) }}</p>
                      </div>
                    </div>
                    
                    <div class="flex items-start gap-3">
                      <div class="flex-shrink-0 mt-1">
                        <div class="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                          <Icon name="mdi:check" class="text-green-600 dark:text-green-300 w-5 h-5" />
                        </div>
                      </div>
                      <div class="flex-1">
                        <p class="text-sm font-medium text-gray-800 dark:text-gray-200">
                          Agreement {{ formatStatus(agreement.status) }}
                        </p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">
                          {{ formatRelativeDate(agreement.updated_at) }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Right Column - Household Details -->
              <div class="space-y-6">
                <!-- Household Card -->
                <div class="bg-gray-50 dark:bg-gray-700/50 p-5 rounded-xl border border-gray-200 dark:border-gray-700 sticky top-6">
                  <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2 mb-4">
                    <Icon name="mdi:home" class="text-lime-600 dark:text-lime-400" />
                    Household Information
                  </h2>
                  
                  <div class="flex flex-col items-center mb-4">
                    <img 
                      :src="agreement.household.image_url || 'https://via.placeholder.com/150?text=No+Image'" 
                      :alt="agreement.household.name"
                      class="w-20 h-20 rounded-full object-cover border-2 border-lime-500 mb-3"
                      @error="handleImageError"
                    />
                    <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-100 text-center">
                      {{ agreement.household.first_name }} {{ agreement.household.last_name }}
                    </h3>
                    <div class="flex items-center mt-1">
                      <div class="flex">
                        <Icon 
                          v-for="star in 5" 
                          :key="star" 
                          name="mdi:star" 
                          class="w-5 h-5"
                          :class="star <= Math.floor(parseFloat(agreement.household.rating)) ? 'text-yellow-500' : 'text-gray-300 dark:text-gray-600'"
                        />
                      </div>
                      <span class="ml-1 text-sm text-gray-600 dark:text-gray-300">
                        {{ agreement.household.rating || 'No ratings yet' }}
                      </span>
                    </div>
                  </div>
                  
                  <div class="space-y-3">
                    <div class="flex items-start gap-3">
                      <Icon name="mdi:home" class="text-gray-500 dark:text-gray-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <label class="text-xs font-medium text-gray-500 dark:text-gray-400">Household Name</label>
                        <p class="text-gray-800 dark:text-gray-100">{{ agreement.household.name }}</p>
                      </div>
                    </div>
                    
                    <div class="flex items-start gap-3">
                      <Icon name="mdi:map-marker" class="text-gray-500 dark:text-gray-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <label class="text-xs font-medium text-gray-500 dark:text-gray-400">Address</label>
                        <p class="text-gray-800 dark:text-gray-100">{{ agreement.household.address }}</p>
                      </div>
                    </div>
                    
                    <div class="flex items-start gap-3">
                      <Icon name="mdi:phone" class="text-gray-500 dark:text-gray-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <label class="text-xs font-medium text-gray-500 dark:text-gray-400">Phone</label>
                        <p class="text-gray-800 dark:text-gray-100">{{ agreement.household.phone_number1 }}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Documents Card -->
                <div class="bg-gray-50 dark:bg-gray-700/50 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
                  <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2 mb-4">
                    <Icon name="mdi:file-multiple" class="text-lime-600 dark:text-lime-400" />
                    Attached Documents
                  </h2>
                  <div class="space-y-2">
                    <div class="text-center py-4 text-sm text-gray-500 dark:text-gray-400">
                      No documents attached
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- Accept Agreement Modal -->
      <div v-if="showAcceptModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6">
          <div class="flex items-center gap-3 mb-4">
            <div class="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
              <Icon name="mdi:check" class="w-6 h-6 text-green-600 dark:text-green-300" />
            </div>
            <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">Confirm Acceptance</h3>
          </div>
          
          <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Are you sure you want to accept this agreement? This action cannot be undone.
          </p>
          
          <div class="flex justify-end gap-3">
            <button
              @click="showAcceptModal = false"
              class="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              @click="confirmAccept"
              class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition flex items-center gap-2"
            >
              <Icon name="mdi:check" class="w-5 h-5" />
              Confirm Acceptance
            </button>
          </div>
        </div>
      </div>

      <!-- Rejection Reason Modal -->
      <div v-if="showRejectionModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6">
          <div class="flex items-center gap-3 mb-4">
            <div class="p-2 bg-red-100 dark:bg-red-900/50 rounded-lg">
              <Icon name="mdi:alert-circle" class="w-6 h-6 text-red-600 dark:text-red-300" />
            </div>
            <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">Reason for Rejection</h3>
          </div>
          
          <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Please provide a detailed reason for rejecting this agreement. This will be shared with the household.
          </p>
          
          <textarea
            v-model="rejectionReason"
            placeholder="Example: The proposed schedule doesn't work for me..."
            class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-4 focus:ring-2 focus:ring-lime-500 focus:border-transparent"
            rows="4"
          ></textarea>
          
          <div class="flex justify-end gap-3">
            <button
              @click="cancelRejection"
              class="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg transition"
              :disabled="actionLoading"
            >
              Cancel
            </button>
            <button
              @click="confirmRejection"
              class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition flex items-center gap-2"
              :disabled="!rejectionReason.trim() || actionLoading"
              :class="{'opacity-50 cursor-not-allowed': !rejectionReason.trim() || actionLoading}"
            >
              <Icon name="mdi:close" class="w-5 h-5" />
              <span v-if="!actionLoading">Submit Rejection</span>
              <span v-else>Processing...</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Finish Job Modal -->
      <div v-if="showFinishModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6">
          <div class="flex items-center gap-3 mb-4">
            <div class="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
              <Icon name="mdi:check-all" class="w-6 h-6 text-purple-600 dark:text-purple-300" />
            </div>
            <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">Mark Job as Finished</h3>
          </div>
          
          <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Are you sure you want to mark this job as finished? This action cannot be undone.
          </p>
          
          <div class="flex justify-end gap-3">
            <button
              @click="showFinishModal = false"
              class="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              @click="confirmFinish"
              class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition flex items-center gap-2"
            >
              <Icon name="mdi:check-all" class="w-5 h-5" />
              Confirm Completion
            </button>
          </div>
        </div>
      </div>

      <!-- Cancel Agreement Modal -->
      <div v-if="showCancelModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6">
          <div class="flex items-center gap-3 mb-4">
            <div class="p-2 bg-red-100 dark:bg-red-900/50 rounded-lg">
              <Icon name="mdi:cancel" class="w-6 h-6 text-red-600 dark:text-red-300" />
            </div>
            <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">Cancel Agreement</h3>
          </div>
          
          <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Are you sure you want to cancel this agreement? This action cannot be undone.
          </p>
          
          <div class="flex justify-end gap-3">
            <button
              @click="showCancelModal = false"
              class="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              @click="confirmCancellation"
              class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition flex items-center gap-2"
            >
              <Icon name="mdi:cancel" class="w-5 h-5" />
              Confirm Cancellation
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import backendApi from "@/networkServices/api/backendApi.js";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

// Reactive state
const agreement = ref(null);
const loading = ref(true);
const actionLoading = ref(false);
const error = ref(null);
const showAcceptModal = ref(false);
const showRejectionModal = ref(false);
const showFinishModal = ref(false);
const showCancelModal = ref(false);
const rejectionReason = ref("");

// Review state
const existingReview = ref(null);
const householdReviews = ref([]);
const canReview = ref(false);
const selectedRating = ref(0);
const reviewText = ref("");
const reviewLoading = ref(false);
const reviewSuccess = ref(false);

// Fetch agreement data
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
    
    // Only check for reviews if agreement is finished
    if (agreement.value.status === 'finished') {
      await fetchExistingReview();
      await fetchHouseholdReviews();
      canReview.value = !existingReview.value;
    }
  } catch (err) {
    error.value = err.response?.data?.message || err.message || "Failed to load agreement";
    console.error("Error fetching agreement:", err);
  } finally {
    loading.value = false;
  }
};

// Fetch existing review for this agreement
const fetchExistingReview = async () => {
  try {
    const response = await backendApi.get(`/agreements/${route.params.id}/review`, {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    });
    existingReview.value = response.data.review;
    if (existingReview.value) {
      existingReview.value.rating = parseInt(existingReview.value.rating);
    }
  } catch (err) {
    console.error("Error fetching review:", err);
    existingReview.value = null;
  }
};

// Fetch all reviews maid made for this household
const fetchHouseholdReviews = async () => {
  try {
    const response = await backendApi.get(`/reviews/household/${agreement.value.household.id}`, {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    });
    
    // Filter out the current agreement's review if it exists
    householdReviews.value = response.data.reviews
      .filter(review => !existingReview.value || review.id !== existingReview.value.id)
      .map(review => ({
        ...review,
        rating: parseInt(review.rating)
      }));
  } catch (err) {
    console.error("Error fetching household reviews:", err);
    householdReviews.value = [];
  }
};

// Submit a new review
const submitReview = async () => {
  if (!selectedRating.value || agreement.value.status !== 'finished') return;
  
  try {
    reviewLoading.value = true;
    reviewSuccess.value = false;
    
    const response = await backendApi.post(
      `/reviews/${route.params.id}`,
      {
        rating: selectedRating.value,
        review: reviewText.value
      },
      {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`,
        },
      }
    );
    
    // Handle successful response
    existingReview.value = {
      ...response.data.review,
      rating: parseInt(response.data.review.rating)
    };
    canReview.value = false;
    reviewSuccess.value = true;
    
    // Update household rating if available
    if (response.data.updated_rating && agreement.value?.household) {
      agreement.value.household.rating = response.data.updated_rating;
    }
    
    // Reset form
    reviewText.value = "";
    selectedRating.value = 0;
    
  } catch (err) {
    error.value = err.response?.data?.message || err.message || "Failed to submit review";
    console.error("Error submitting review:", err);
  } finally {
    reviewLoading.value = false;
  }
};

// Handle image error
const handleImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/150?text=No+Image';
};

// Navigation
const goBack = () => {
  router.push(`/maids/agreements`);
};

// Print agreement
const printAgreement = () => {
  window.print();
};

// Action methods (accept, reject, finish, cancel)
const confirmAccept = async () => {
  try {
    actionLoading.value = true;
    const response = await backendApi.post(
      `/agreements/${agreement.value.id}/confirm`,
      {},
      {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`,
        },
      }
    );
    agreement.value.status = "confirmed";
    showAcceptModal.value = false;
  } catch (err) {
    error.value = err.response?.data?.message || err.message || "Failed to accept agreement";
    console.error("Error accepting agreement:", err);
  } finally {
    actionLoading.value = false;
  }
};

const initiateRejection = () => {
  showRejectionModal.value = true;
  rejectionReason.value = "";
};

const cancelRejection = () => {
  showRejectionModal.value = false;
  rejectionReason.value = "";
};

const confirmRejection = async () => {
  if (!rejectionReason.value.trim()) return;

  try {
    actionLoading.value = true;
    const response = await backendApi.post(
      `/agreements/${agreement.value.id}/reject`,
      { rejection_reason: rejectionReason.value },
      {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`,
        },
      }
    );
    agreement.value.status = "rejected";
    agreement.value.rejection_reason = rejectionReason.value;
    showRejectionModal.value = false;
  } catch (err) {
    error.value = err.response?.data?.message || err.message || "Failed to reject agreement";
    console.error("Error rejecting agreement:", err);
  } finally {
    actionLoading.value = false;
  }
};

const confirmFinish = async () => {
  try {
    actionLoading.value = true;
    const response = await backendApi.post(
      `/agreements/${agreement.value.id}/finish`,
      {},
      {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`,
        },
      }
    );
    agreement.value.status = "finished";
    showFinishModal.value = false;
    
    // Enable review after finishing
    canReview.value = true;
    await fetchExistingReview();
    await fetchHouseholdReviews();
    
  } catch (err) {
    error.value = err.response?.data?.message || err.message || "Failed to mark job as finished";
    console.error("Error finishing job:", err);
  } finally {
    actionLoading.value = false;
  }
};

const confirmCancellation = async () => {
  try {
    actionLoading.value = true;
    const response = await backendApi.post(
      `/agreements/${agreement.value.id}/cancel`,
      {},
      {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`,
        },
      }
    );
    agreement.value.status = "canceled";
    showCancelModal.value = false;
  } catch (err) {
    error.value = err.response?.data?.message || err.message || "Failed to cancel agreement";
    console.error("Error canceling agreement:", err);
  } finally {
    actionLoading.value = false;
  }
};

// Helper functions
const formatDate = (dateString) => {
  if (!dateString) return "Not specified";
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const formatDateTime = (dateString) => {
  if (!dateString) return "";
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const formatRelativeDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const now = new Date();
  const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) return "today";
  if (diffInDays === 1) return "yesterday";
  if (diffInDays < 7) return `${diffInDays} days ago`;
  
  return formatDate(dateString);
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

const statusIcon = (status) => {
  switch (status) {
    case "confirmed": return "mdi:check-circle";
    case "finished": return "mdi:check-all";
    case "pending": return "mdi:clock";
    case "canceled": return "mdi:cancel";
    case "rejected": return "mdi:close-circle";
    default: return "mdi:information";
  }
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

const statusHeaderClasses = (status) => {
  switch (status) {
    case "confirmed": return "bg-blue-50 border-blue-100 dark:bg-blue-900/30 dark:border-blue-800";
    case "finished": return "bg-purple-50 border-purple-100 dark:bg-purple-900/30 dark:border-purple-800";
    case "pending": return "bg-yellow-50 border-yellow-100 dark:bg-yellow-900/30 dark:border-yellow-800";
    case "canceled":
    case "rejected": return "bg-red-50 border-red-100 dark:bg-red-900/30 dark:border-red-800";
    default: return "bg-gray-50 border-gray-100 dark:bg-gray-700/30 dark:border-gray-700";
  }
};

const statusIconBgClasses = (status) => {
  switch (status) {
    case "confirmed": return "bg-blue-100 dark:bg-blue-800/50";
    case "finished": return "bg-purple-100 dark:bg-purple-800/50";
    case "pending": return "bg-yellow-100 dark:bg-yellow-800/50";
    case "canceled":
    case "rejected": return "bg-red-100 dark:bg-red-800/50";
    default: return "bg-gray-100 dark:bg-gray-800/50";
  }
};

const statusIconColorClasses = (status) => {
  switch (status) {
    case "confirmed": return "text-blue-600 dark:text-blue-300";
    case "finished": return "text-purple-600 dark:text-purple-300";
    case "pending": return "text-yellow-600 dark:text-yellow-300";
    case "canceled":
    case "rejected": return "text-red-600 dark:text-red-300";
    default: return "text-gray-600 dark:text-gray-300";
  }
};

// Lifecycle hooks
onMounted(() => {
  fetchAgreement();
});

definePageMeta({
  layout: "house",
});
</script>

<style scoped>
.prose {
  color: inherit;
}
.prose pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: inherit;
  margin: 0;
  padding: 0;
  background: transparent;
  border: none;
}

.star-rating button {
  transition: transform 0.2s;
}
.star-rating button:hover {
  transform: scale(1.2);
}

@media print {
  nav, .sticky {
    display: none !important;
  }
  body {
    background: white !important;
    color: black !important;
  }
  .dark\:bg-gray-800 {
    background: white !important;
  }
  .dark\:text-gray-200 {
    color: black !important;
  }
}
</style>