<template>
  <section
    class="mx-auto max-w-7xl dark:bg-gray-900 min-h-screen dark:text-gray-100 p-4"
  >
    <!-- Accept Confirmation Modal -->
    <Modal :show="showAcceptModal" @close="showAcceptModal = false">
      <div class="p-6 text-center">
        <Icon
          name="mdi:check-circle-outline"
          class="mx-auto h-16 w-16 text-green-500"
        />
        <h3 class="text-2xl font-semibold text-gray-900 dark:text-white mt-4">
          Accept Job Offer
        </h3>
        <div class="mt-4 text-gray-600 dark:text-gray-300">
          <p>Are you sure you want to accept this job offer?</p>
          <p class="mt-2 font-medium">
            {{ invite.job.job_title || "This job" }}
          </p>
        </div>
        <div class="mt-6 flex justify-center gap-4">
          <button
            @click="showAcceptModal = false"
            class="px-6 py-2 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            @click="acceptJob"
            class="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors flex items-center gap-2"
            :disabled="isResponding"
          >
            <span>Yes, Accept</span>
            <Icon v-if="isResponding" name="mdi:loading" class="animate-spin" />
          </button>
        </div>
      </div>
    </Modal>

    <!-- Reject Confirmation Modal -->
    <Modal :show="showRejectModal" @close="showRejectModal = false">
      <div class="p-6 text-center">
        <Icon
          name="mdi:alert-circle-outline"
          class="mx-auto h-16 w-16 text-red-500"
        />
        <h3 class="text-2xl font-semibold text-gray-900 dark:text-white mt-4">
          Reject Job Offer
        </h3>
        <div class="mt-4 text-gray-600 dark:text-gray-300">
          <p>Are you sure you want to reject this job offer?</p>
          <p class="mt-2 font-medium">
            {{ invite.job.job_title || "This job" }}
          </p>
        </div>
        <div class="mt-6 flex justify-center gap-4">
          <button
            @click="showRejectModal = false"
            class="px-6 py-2 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            @click="rejectJob"
            class="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors flex items-center gap-2"
            :disabled="isResponding"
          >
            <span>Yes, Reject</span>
            <Icon v-if="isResponding" name="mdi:loading" class="animate-spin" />
          </button>
        </div>
      </div>
    </Modal>

    <!-- Success Modal -->
    <Modal :show="showSuccessModal" @close="showSuccessModal = false">
      <div class="p-6 text-center">
        <Icon
          name="mdi:check-circle"
          class="mx-auto h-16 w-16 text-green-500"
        />
        <h3 class="text-2xl font-semibold text-gray-900 dark:text-white mt-4">
          {{ successMessage }}
        </h3>
        <div class="mt-4 text-gray-600 dark:text-gray-300">
          <p v-if="invite.status === 'accepted'">
            You've accepted the job offer for
            <span class="font-medium">{{ invite.job.job_title }}</span
            >.
          </p>
          <p v-else>
            You've rejected the job offer for
            <span class="font-medium">{{ invite.job.job_title }}</span
            >.
          </p>
        </div>
        <div class="mt-6">
          <button
            @click="showSuccessModal = false"
            class="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            OK
          </button>
        </div>
      </div>
    </Modal>
    <!-- Back Button -->
    <button
      @click="$router.go(-1)"
      class="mb-6 flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
    >
      <Icon name="mdi:arrow-left" class="mr-1" /> Back to Invitations
    </button>

    <!-- Main Card Container -->
    <div
      class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700"
    >
      <!-- Status Banner -->
      <div
        class="h-2 w-full"
        :class="{
          'bg-blue-500': invite.status === 'pending',
          'bg-green-500': invite.status === 'accepted',
          'bg-red-500': invite.status === 'rejected',
        }"
      ></div>

      <div class="p-6 md:p-8">
        <!-- Header with Status -->
        <div
          class="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4"
        >
          <div>
            <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-1">
              {{ invite.job.job_title || "No title provided" }}
            </h1>
            <div class="flex items-center text-gray-500 dark:text-gray-400">
              <Icon name="mdi:map-marker-outline" class="mr-1" />
              <span>{{ invite.job.location || "Location not specified" }}</span>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <span
              class="px-4 py-2 rounded-full text-sm font-medium shadow-sm"
              :class="{
                'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200':
                  invite.status === 'pending',
                'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200':
                  invite.status === 'accepted',
                'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200':
                  invite.status === 'rejected',
              }"
            >
              {{ formatStatus(invite.status) }}
            </span>
            <button
              @click="printJobDetails"
              class="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              title="Print Details"
            >
              <Icon
                name="mdi:printer"
                class="text-gray-600 dark:text-gray-300"
              />
            </button>
          </div>
        </div>

        <div class="flex flex-col lg:flex-row gap-8">
          <!-- Left Column - Job Details -->
          <div class="flex-1 space-y-6">
            <!-- Job Highlights -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 p-4 rounded-xl border border-blue-100 dark:border-blue-800"
              >
                <div class="flex items-center gap-3">
                  <div class="p-2 bg-blue-100 dark:bg-blue-700 rounded-lg">
                    <Icon
                      name="mdi:clock-outline"
                      class="text-blue-600 dark:text-blue-300"
                    />
                  </div>
                  <div>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      Job Type
                    </p>
                    <p class="font-medium">
                      {{
                        formatJobTime(invite.job.job_time) || "Not specified"
                      }}
                    </p>
                  </div>
                </div>
              </div>

              <div
                class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 p-4 rounded-xl border border-green-100 dark:border-green-800"
              >
                <div class="flex items-center gap-3">
                  <div class="p-2 bg-green-100 dark:bg-green-700 rounded-lg">
                    <Icon
                      name="mdi:cash-multiple"
                      class="text-green-600 dark:text-green-300"
                    />
                  </div>
                  <div>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      Salary
                    </p>
                    <p class="font-medium">{{ formatSalary(invite.job) }}</p>
                  </div>
                </div>
              </div>

              <div
                class="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 p-4 rounded-xl border border-purple-100 dark:border-purple-800"
              >
                <div class="flex items-center gap-3">
                  <div class="p-2 bg-purple-100 dark:bg-purple-700 rounded-lg">
                    <Icon
                      name="mdi:account-group"
                      class="text-purple-600 dark:text-purple-300"
                    />
                  </div>
                  <div>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      Maids Needed
                    </p>
                    <p class="font-medium">
                      {{ invite.job.num_of_maids || 1 }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Job Description Card -->
            <div
              class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
            >
              <div class="p-5 border-b border-gray-100 dark:border-gray-700">
                <h3 class="text-xl font-semibold flex items-center gap-2">
                  <Icon name="mdi:text-box-outline" class="text-indigo-500" />
                  Job Description
                </h3>
              </div>
              <div class="p-5">
                <p class="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                  {{ invite.job.job_description || "No description provided" }}
                </p>
              </div>
            </div>

            <!-- Requirements Card -->
            <div
              class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
            >
              <div class="p-5 border-b border-gray-100 dark:border-gray-700">
                <h3 class="text-xl font-semibold flex items-center gap-2">
                  <Icon
                    name="mdi:clipboard-list-outline"
                    class="text-purple-500"
                  />
                  Requirements
                </h3>
              </div>
              <div class="p-5">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Skills Required
                    </p>
                    <p class="font-medium">
                      {{ invite.job.required_skills || "Not specified" }}
                    </p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Language
                    </p>
                    <p class="font-medium">
                      {{ invite.job.language_requirement || "Not specified" }}
                    </p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Gender Preference
                    </p>
                    <p class="font-medium">
                      {{ invite.job.gender_preference || "No preference" }}
                    </p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Religion Preference
                    </p>
                    <p class="font-medium">
                      {{ invite.job.religion_preference || "No preference" }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Benefits Card -->
            <div
              class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
            >
              <div class="p-5 border-b border-gray-100 dark:border-gray-700">
                <h3 class="text-xl font-semibold flex items-center gap-2">
                  <Icon name="mdi:gift-outline" class="text-green-500" />
                  Benefits
                </h3>
              </div>
              <div class="p-5">
                <p class="text-gray-600 dark:text-gray-300">
                  {{ invite.job.benefit || "Not specified" }}
                </p>
              </div>
            </div>
          </div>

          <!-- Right Column - Household & Actions -->
          <div class="lg:w-96 flex-shrink-0 space-y-6">
            <!-- Household Profile Card -->
            <div
              class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
            >
              <div class="p-5 border-b border-gray-100 dark:border-gray-700">
                <h3 class="text-xl font-semibold">Employer Information</h3>
              </div>
              <div class="p-5">
                <div class="flex flex-col items-center text-center mb-4">
                  <img
                    :src="
                      invite.household.image_url ||
                      'https://via.placeholder.com/150'
                    "
                    alt="Household profile"
                    class="w-20 h-20 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow mb-3"
                  />
                  <h2 class="text-xl font-semibold">
                    {{ getHouseholdName(invite.household) }}
                  </h2>
                  <div class="flex items-center mt-1">
                    <div class="flex items-center mr-2">
                      <Icon
                        v-for="star in 5"
                        :key="star"
                        :name="
                          star <= Math.round(invite.household.rating)
                            ? 'mdi:star'
                            : 'mdi:star-outline'
                        "
                        class="text-yellow-400 w-5 h-5"
                      />
                    </div>
                    <span class="text-sm text-gray-500 dark:text-gray-400">
                      ({{ invite.household.total_reviews || 0 }} reviews)
                    </span>
                  </div>
                </div>

                <div class="space-y-3">
                  <div class="flex items-center">
                    <Icon
                      name="mdi:email-outline"
                      class="text-gray-500 dark:text-gray-400 mr-2"
                    />
                    <span class="text-gray-700 dark:text-gray-300 text-sm">
                      {{ invite.household.email || "No email provided" }}
                    </span>
                  </div>

                  <div class="flex items-center">
                    <Icon
                      name="mdi:calendar"
                      class="text-gray-500 dark:text-gray-400 mr-2"
                    />
                    <span class="text-gray-700 dark:text-gray-300 text-sm">
                      Invited on {{ formatDate(invite.invited_at) }}
                    </span>
                  </div>

                  <div class="flex items-center">
                    <Icon
                      name="mdi:clock-outline"
                      class="text-gray-500 dark:text-gray-400 mr-2"
                    />
                    <span class="text-gray-700 dark:text-gray-300 text-sm">
                      Posted {{ formatDate(invite.job.created_at) }}
                    </span>
                  </div>
                </div>

                <!-- Action Buttons -->
                <div class="mt-6 space-y-3">
                  <button
                    v-if="invite.status === 'pending'"
                    @click="showAcceptModal = true"
                    class="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
                  >
                    <Icon name="mdi:check" class="h-5 w-5" />
                    <span>Accept Offer</span>
                  </button>

                  <button
                    v-if="invite.status === 'pending'"
                    @click="showRejectModal = true"
                    class="w-full py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
                  >
                    <Icon name="mdi:close" class="h-5 w-5" />
                    <span>Reject Offer</span>
                  </button>

                  <button
                    class="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
                  >
                    <Icon name="mdi:message-text-outline" class="h-5 w-5" />
                    <span>Message Employer</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Ratings & Reviews Card -->
            <div
              class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
            >
              <div class="p-5 border-b border-gray-100 dark:border-gray-700">
                <h3 class="text-xl font-semibold flex items-center gap-2">
                  <Icon
                    name="mdi:star-circle-outline"
                    class="text-yellow-500"
                  />
                  Ratings & Reviews
                </h3>
              </div>
              <div class="p-5">
                <!-- Average Rating -->
                <div class="flex items-center justify-between mb-6">
                  <div class="flex items-center">
                    <span class="text-4xl font-bold mr-3">{{
                      invite.household.rating || 0
                    }}</span>
                    <div>
                      <div class="flex items-center mb-1">
                        <Icon
                          v-for="star in 5"
                          :key="star"
                          :name="
                            star <= Math.round(invite.household.rating)
                              ? 'mdi:star'
                              : 'mdi:star-outline'
                          "
                          class="text-yellow-400 w-5 h-5"
                        />
                      </div>
                      <span class="text-sm text-gray-500 dark:text-gray-400">
                        {{ invite.household.total_reviews || 0 }} reviews
                      </span>
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="flex items-center justify-end mb-1">
                      <span class="text-sm w-8 text-right mr-2">5</span>
                      <div
                        class="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2"
                      >
                        <div
                          class="bg-yellow-400 h-2 rounded-full"
                          :style="{ width: '60%' }"
                        ></div>
                      </div>
                    </div>
                    <div class="flex items-center justify-end mb-1">
                      <span class="text-sm w-8 text-right mr-2">4</span>
                      <div
                        class="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2"
                      >
                        <div
                          class="bg-yellow-400 h-2 rounded-full"
                          :style="{ width: '20%' }"
                        ></div>
                      </div>
                    </div>
                    <div class="flex items-center justify-end mb-1">
                      <span class="text-sm w-8 text-right mr-2">3</span>
                      <div
                        class="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2"
                      >
                        <div
                          class="bg-yellow-400 h-2 rounded-full"
                          :style="{ width: '10%' }"
                        ></div>
                      </div>
                    </div>
                    <div class="flex items-center justify-end mb-1">
                      <span class="text-sm w-8 text-right mr-2">2</span>
                      <div
                        class="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2"
                      >
                        <div
                          class="bg-yellow-400 h-2 rounded-full"
                          :style="{ width: '5%' }"
                        ></div>
                      </div>
                    </div>
                    <div class="flex items-center justify-end">
                      <span class="text-sm w-8 text-right mr-2">1</span>
                      <div
                        class="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2"
                      >
                        <div
                          class="bg-yellow-400 h-2 rounded-full"
                          :style="{ width: '5%' }"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Reviews List -->
                <div class="space-y-4">
                  <div
                    v-for="(review, index) in invite.household.reviews"
                    :key="index"
                    class="border-b border-gray-100 dark:border-gray-700 pb-4 last:border-0 last:pb-0"
                  >
                    <div class="flex items-start gap-3">
                      <img
                        :src="
                          review.maid_image || 'https://via.placeholder.com/40'
                        "
                        alt="Reviewer"
                        class="w-10 h-10 rounded-full object-cover"
                      />
                      <div class="flex-1">
                        <div class="flex items-center justify-between">
                          <h4 class="font-medium">{{ review.maid_name }}</h4>
                          <span
                            class="text-xs text-gray-500 dark:text-gray-400"
                          >
                            {{ formatDate(review.created_at) }}
                          </span>
                        </div>
                        <div class="flex items-center mb-1">
                          <Icon
                            v-for="star in 5"
                            :key="star"
                            :name="
                              star <= review.rating
                                ? 'mdi:star'
                                : 'mdi:star-outline'
                            "
                            class="text-yellow-400 w-4 h-4"
                          />
                        </div>
                        <p class="text-sm text-gray-600 dark:text-gray-300">
                          {{ review.review }}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    v-if="
                      !invite.household.reviews ||
                      invite.household.reviews.length === 0
                    "
                    class="text-center py-4"
                  >
                    <p class="text-gray-500 dark:text-gray-400">
                      No reviews yet
                    </p>
                  </div>
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
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import backendApi from "@/networkServices/api/backendApi";
import { useAuthStore } from "@/stores/auth";

const route = useRoute();
const inviteId = route.params.id;
const authStore = useAuthStore();

// State
const invite = ref({
  invite_id: null,
  status: "pending",
  invited_at: "",
  job: {
    job_title: "",
    job_description: "",
    job_time: "",
    required_skills: "",
    language_requirement: "",
    gender_preference: "",
    religion_preference: "",
    salary_min: "",
    salary_max: "",
    benefit: "",
    location: "",
    num_of_maids: 1,
    expected_start_date: "",
    status: "open",
    created_at: "",
  },
  household: {
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    image_url: "",
    rating: 0,
    total_reviews: 0,
    reviews: [],
  },
});

const loading = ref(true);
const error = ref(null);
const showAcceptModal = ref(false);
const showRejectModal = ref(false);
const showSuccessModal = ref(false);
const successMessage = ref("");
const isResponding = ref(false);

// Fetch job invite details
const fetchInviteDetails = async () => {
  try {
    loading.value = true;
    error.value = null;
    if (!authStore._hydrated) {
      await authStore.hydrate();
    }

    const response = await backendApi.get(`/maid/invitation/${inviteId}`, {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    });

    invite.value = response.data;
  } catch (err) {
    error.value = "Failed to load job invitation details";
    console.error(err);
  } finally {
    loading.value = false;
  }
};

// Accept job offer
const acceptJob = async () => {
  try {
    isResponding.value = true;
    await backendApi.post(
      `/maid/job-invites/${inviteId}/accept`,
      {},
      {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`,
        },
      }
    );

    // Update local state
    invite.value.status = "accepted";
    showAcceptModal.value = false;
    successMessage.value = "Job Accepted Successfully!";
    showSuccessModal.value = true;
  } catch (err) {
    console.error("Error accepting job invite:", err);
    alert("Failed to accept invitation. Please try again.");
  } finally {
    isResponding.value = false;
  }
};

// Reject job offer
const rejectJob = async () => {
  try {
    isResponding.value = true;
    await backendApi.post(
      `/maid/job-invites/${inviteId}/reject`,
      {},
      {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`,
        },
      }
    );

    // Update local state
    invite.value.status = "rejected";
    showRejectModal.value = false;
    successMessage.value = "Job Rejected Successfully";
    showSuccessModal.value = true;
  } catch (err) {
    console.error("Error rejecting job invite:", err);
    alert("Failed to reject invitation. Please try again.");
  } finally {
    isResponding.value = false;
  }
};

// Helper functions (keep your existing ones)
const formatDate = (dateString) => {
  if (!dateString) return "Not specified";
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const formatJobTime = (jobTime) => {
  if (!jobTime) return "Not specified";
  return jobTime
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const formatSalary = (job) => {
  if (!job.salary_min && !job.salary_max) return "Negotiable";
  if (job.salary_min && job.salary_max) {
    return `ETB ${job.salary_min} - ${job.salary_max}`;
  }
  return `ETB ${job.salary_min || job.salary_max}`;
};

const getHouseholdName = (household) => {
  if (!household) return "Unknown Employer";
  return (
    `${household.first_name || ""} ${
      household.middle_name ? household.middle_name + " " : ""
    }${household.last_name || ""}`.trim() || "Unknown Employer"
  );
};

const formatStatus = (status) => {
  if (!status) return "Unknown";
  return status.charAt(0).toUpperCase() + status.slice(1);
};

// Print job details
const printJobDetails = () => {
  const printWindow = window.open("", "", "width=800,height=600");
  printWindow.document.write(`
    <html>
      <head>
        <title>Job Offer Details - ${
          invite.value.job.job_title || "Untitled Job"
        }</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          h1, h2 { color: #333; }
          .header { display: flex; justify-content: space-between; margin-bottom: 20px; }
          .status { padding: 4px 8px; border-radius: 12px; font-size: 14px; }
          .pending { background-color: #d1ecf1; color: #0c5460; }
          .accepted { background-color: #d4edda; color: #155724; }
          .rejected { background-color: #f8d7da; color: #721c24; }
          .section { margin-bottom: 30px; }
          .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
          .household-card { border: 1px solid #ddd; padding: 15px; border-radius: 8px; margin-top: 20px; }
          .household-img { width: 100px; height: 100px; border-radius: 50%; object-fit: cover; margin: 0 auto 10px; display: block; }
          .text-right { text-align: right; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
          .rating-bar { background-color: #f2f2f2; height: 10px; border-radius: 5px; margin-bottom: 5px; }
          .rating-fill { background-color: #FFD700; height: 100%; border-radius: 5px; }
          .review { border-bottom: 1px solid #eee; padding-bottom: 15px; margin-bottom: 15px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Job Offer Details</h1>
          <div class="text-right">
            <p>Generated on: ${new Date().toLocaleString()}</p>
            <p class="status ${invite.value.status}">
              Status: ${formatStatus(invite.value.status)}
            </p>
          </div>
        </div>

        <div class="section">
          <h2>Job Information</h2>
          <div class="grid">
            <div>
              <p><strong>Job Title:</strong> ${
                invite.value.job.job_title || "Not specified"
              }</p>
              <p><strong>Location:</strong> ${
                invite.value.job.location || "Not specified"
              }</p>
              <p><strong>Job Type:</strong> ${
                formatJobTime(invite.value.job.job_time) || "Not specified"
              }</p>
            </div>
            <div>
              <p><strong>Expected Start:</strong> ${
                formatDate(invite.value.job.expected_start_date) || "Flexible"
              }</p>
              <p><strong>Maids Needed:</strong> ${
                invite.value.job.num_of_maids || 1
              }</p>
              <p><strong>Salary:</strong> ${formatSalary(invite.value.job)}</p>
            </div>
          </div>
        </div>

        <div class="section">
          <h2>Job Description</h2>
          <p>${
            invite.value.job.job_description || "No description provided"
          }</p>
        </div>

        <div class="section">
          <h2>Requirements</h2>
          <table>
            <tr>
              <th>Skills Required</th>
              <td>${invite.value.job.required_skills || "Not specified"}</td>
            </tr>
            <tr>
              <th>Language Requirement</th>
              <td>${
                invite.value.job.language_requirement || "Not specified"
              }</td>
            </tr>
            <tr>
              <th>Gender Preference</th>
              <td>${invite.value.job.gender_preference || "No preference"}</td>
            </tr>
            <tr>
              <th>Religion Preference</th>
              <td>${
                invite.value.job.religion_preference || "No preference"
              }</td>
            </tr>
          </table>
        </div>

        <div class="section">
          <h2>Employer Information</h2>
          <div class="household-card">
            <img src="${
              invite.value.household.image_url ||
              "https://via.placeholder.com/150"
            }" class="household-img" alt="Employer photo">
            <h3 style="text-align: center;">${getHouseholdName(
              invite.value.household
            )}</h3>
            <p style="text-align: center; margin-bottom: 15px;">Employer</p>
            
            <table>
              <tr>
                <th>Email</th>
                <td>${invite.value.household.email || "Not specified"}</td>
              </tr>
              <tr>
                <th>Invited On</th>
                <td>${formatDate(invite.value.invited_at)}</td>
              </tr>
              <tr>
                <th>Job Posted</th>
                <td>${formatDate(invite.value.job.created_at)}</td>
              </tr>
              <tr>
                <th>Rating</th>
                <td>
                  ${invite.value.household.rating || 0} stars (${
    invite.value.household.total_reviews || 0
  } reviews)
                </td>
              </tr>
            </table>
          </div>
        </div>

        <div class="section">
          <h2>Ratings & Reviews</h2>
          <div style="display: flex; align-items: center; margin-bottom: 20px;">
            <div style="font-size: 36px; font-weight: bold; margin-right: 20px;">
              ${invite.value.household.rating || 0}
            </div>
            <div>
              <div style="display: flex; align-items: center; margin-bottom: 5px;">
                <span style="width: 30px;">5</span>
                <div class="rating-bar" style="width: 200px; margin-left: 10px;">
                  <div class="rating-fill" style="width: 60%;"></div>
                </div>
              </div>
              <div style="display: flex; align-items: center; margin-bottom: 5px;">
                <span style="width: 30px;">4</span>
                <div class="rating-bar" style="width: 200px; margin-left: 10px;">
                  <div class="rating-fill" style="width: 20%;"></div>
                </div>
              </div>
              <div style="display: flex; align-items: center; margin-bottom: 5px;">
                <span style="width: 30px;">3</span>
                <div class="rating-bar" style="width: 200px; margin-left: 10px;">
                  <div class="rating-fill" style="width: 10%;"></div>
                </div>
              </div>
              <div style="display: flex; align-items: center; margin-bottom: 5px;">
                <span style="width: 30px;">2</span>
                <div class="rating-bar" style="width: 200px; margin-left: 10px;">
                  <div class="rating-fill" style="width: 5%;"></div>
                </div>
              </div>
              <div style="display: flex; align-items: center;">
                <span style="width: 30px;">1</span>
                <div class="rating-bar" style="width: 200px; margin-left: 10px;">
                  <div class="rating-fill" style="width: 5%;"></div>
                </div>
              </div>
            </div>
          </div>

          ${
            invite.value.household.reviews &&
            invite.value.household.reviews.length > 0
              ? invite.value.household.reviews
                  .map(
                    (review) => `
                  <div class="review">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                      <strong>${review.maid_name}</strong>
                      <span>${formatDate(review.created_at)}</span>
                    </div>
                    <div style="color: #FFD700; margin-bottom: 5px;">
                      ${"★".repeat(review.rating)}${"☆".repeat(
                      5 - review.rating
                    )}
                    </div>
                    <p>${review.review}</p>
                  </div>
                `
                  )
                  .join("")
              : "<p>No reviews yet</p>"
          }
        </div>
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 500);
};

// Lifecycle
onMounted(() => {
  fetchInviteDetails();
});

definePageMeta({
  layout: "house",
});
</script>
<style scoped>
/* Custom transitions */
button,
a,
.transition-all {
  transition: all 0.2s ease-in-out;
}

/* Hover effects */
.hover\:shadow-lg:hover {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Card shadows */
.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Rounded corners */
.rounded-2xl {
  border-radius: 1rem;
}

/* Gradient text for potential future use */
.text-gradient {
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.dark ::-webkit-scrollbar-track {
  background: #374151;
}

.dark ::-webkit-scrollbar-thumb {
  background: #4b5563;
}

/* Animation for loading state */
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
