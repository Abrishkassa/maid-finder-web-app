<template>
  <section class="ml-0 md:ml-64 dark:bg-gray-900 dark:text-gray-100 p-4 md:p-6">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <!-- User Header with Actions -->
      <div
        class="bg-gray-50 dark:bg-gray-700 px-4 py-5 sm:px-6 flex justify-between items-center"
      >
        <div>
          <h3
            class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100"
          >
            User Details
          </h3>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage user account and status
          </p>
        </div>
        <div class="flex space-x-2">
          <button
            @click="printUserProfile"
            class="p-2 bg-gray-200 dark:bg-gray-600 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 flex items-center"
          >
            <Icon
              name="mdi:printer"
              class="h-5 w-5 mr-1 text-black dark:text-white"
            />
            Print Profile
          </button>
          <NuxtLink
            to="/mod/houseprofilelist"
            class="p-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 dark:bg-blue-700 dark:text-blue-100 dark:hover:bg-blue-600 flex items-center"
          >
            Back to List
          </NuxtLink>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="p-8 text-center">
        <Spinner class="mx-auto h-8 w-8 text-blue-500" />
        <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Loading user data...
        </p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="p-8 text-center">
        <ExclamationCircleIcon class="mx-auto h-8 w-8 text-red-500" />
        <p class="mt-2 text-sm text-red-500 dark:text-red-400">{{ error }}</p>
        <button
          @click="fetchUserData(id)"
          class="mt-4 px-4 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 dark:bg-blue-700 dark:text-blue-100 dark:hover:bg-blue-600 text-sm"
        >
          Retry
        </button>
      </div>

      <!-- User Details -->
      <div v-else class="px-4 py-5 sm:p-6" id="userProfileContent">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Basic Info -->
          <div>
            <h4
              class="text-md font-semibold mb-4 border-b pb-2 dark:border-gray-700"
            >
              Basic Information
            </h4>
            <div class="space-y-3">
              <div class="grid grid-cols-3 gap-4">
                <div
                  class="text-sm font-medium text-gray-500 dark:text-gray-400"
                >
                  Full Name:
                </div>
                <div class="col-span-2 text-sm">
                  {{ userData.first_name }}
                  {{ userData.middle_name ? userData.middle_name + " " : "" }}
                  {{ userData.last_name }}
                </div>
              </div>
              <div class="grid grid-cols-3 gap-4">
                <div
                  class="text-sm font-medium text-gray-500 dark:text-gray-400"
                >
                  Gender:
                </div>
                <div class="col-span-2 text-sm capitalize">
                  {{ userData.gender || "N/A" }}
                </div>
              </div>
              <div class="grid grid-cols-3 gap-4">
                <div
                  class="text-sm font-medium text-gray-500 dark:text-gray-400"
                >
                  Age:
                </div>
                <div class="col-span-2 text-sm">
                  {{ userData.age || "N/A" }}
                </div>
              </div>
              <div class="grid grid-cols-3 gap-4">
                <div
                  class="text-sm font-medium text-gray-500 dark:text-gray-400"
                >
                  Date of Birth:
                </div>
                <div class="col-span-2 text-sm">
                  {{ userData.date_of_birth || "N/A" }}
                </div>
              </div>
              <div class="grid grid-cols-3 gap-4">
                <div
                  class="text-sm font-medium text-gray-500 dark:text-gray-400"
                >
                  Phone 1:
                </div>
                <div class="col-span-2 text-sm">
                  {{ userData.phone_number1 || "N/A" }}
                </div>
              </div>
              <div class="grid grid-cols-3 gap-4">
                <div
                  class="text-sm font-medium text-gray-500 dark:text-gray-400"
                >
                  Phone 2:
                </div>
                <div class="col-span-2 text-sm">
                  {{ userData.phone_number2 || "N/A" }}
                </div>
              </div>
              <div class="grid grid-cols-3 gap-4">
                <div
                  class="text-sm font-medium text-gray-500 dark:text-gray-400"
                >
                  Religion:
                </div>
                <div class="col-span-2 text-sm">
                  {{ userData.religion || "N/A" }}
                </div>
              </div>
              <div class="grid grid-cols-3 gap-4">
                <div
                  class="text-sm font-medium text-gray-500 dark:text-gray-400"
                >
                  Address:
                </div>
                <div class="col-span-2 text-sm">
                  {{ userData.address || "N/A" }}
                </div>
              </div>
              <div class="grid grid-cols-3 gap-4">
                <div
                  class="text-sm font-medium text-gray-500 dark:text-gray-400"
                >
                  Registered:
                </div>
                <div class="col-span-2 text-sm">
                  {{ formatDate(userData.created_at) }}
                </div>
              </div>
            </div>
          </div>

          <!-- Account Status & Images -->
          <div>
            <h4
              class="text-md font-semibold mb-4 border-b pb-2 dark:border-gray-700"
            >
              Account Status & Verification
            </h4>
            <div class="space-y-4">
              <div class="grid grid-cols-3 gap-4 items-center">
                <div
                  class="text-sm font-medium text-gray-500 dark:text-gray-400"
                >
                  Verification:
                </div>
                <div class="col-span-2">
                  <span
                    :class="verificationClass(userData.verification_status)"
                  >
                    {{ userData.verification_status }}
                  </span>
                </div>
              </div>

              <div class="grid grid-cols-3 gap-4">
                <div
                  class="text-sm font-medium text-gray-500 dark:text-gray-400"
                >
                  Profile Image:
                </div>
                <div class="col-span-2">
                  <img
                    v-if="userData.image_url"
                    :src="userData.image_url"
                    alt="Profile Image"
                    class="h-24 w-24 rounded-full object-cover border border-gray-200 dark:border-gray-600"
                  />
                  <span v-else class="text-sm text-gray-500">No image</span>
                </div>
              </div>

              <div class="grid grid-cols-3 gap-4">
                <div
                  class="text-sm font-medium text-gray-500 dark:text-gray-400"
                >
                  ID Document:
                </div>
                <div class="col-span-2">
                  <a
                    v-if="userData.identity_image_url"
                    :href="userData.identity_image_url"
                    target="_blank"
                    class="text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                  >
                    <DocumentIcon class="h-5 w-5 mr-1" />
                    View ID Document
                  </a>
                  <span v-else class="text-sm text-gray-500">No document</span>
                </div>
              </div>
            </div>

            <!-- Status Actions -->
            <div class="mt-6 flex flex-wrap gap-2">
              <button
                v-if="userData.verification_status !== 'verified'"
                @click="verifyUser"
                class="px-4 py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 dark:bg-green-700 dark:text-green-100 dark:hover:bg-green-600 text-sm"
              >
                Verify User
              </button>
            </div>
            <!---Rating -->
            <div class="grid grid-cols-3 gap-4">
              <div class="text-sm font-medium text-gray-500 dark:text-gray-400">
                Rating:
              </div>
              <div class="col-span-2 text-sm">
                {{ userData.rating || "N/A" }}
              </div>
            </div>
            <!---Reason for rejection-->
            <div
              class="grid grid-cols-3 gap-4"
              v-if="userData.verification_status !== 'verified'"
            >
              <div class="text-sm font-medium text-gray-500 dark:text-gray-400">
                Rejction Reason
              </div>
              <div class="col-span-2 text-sm">
                {{ userData.rejection_reason || "N/A" }}
              </div>
            </div>
            <div class="grid grid-cols-3 gap-4">
              <div class="text-sm font-medium text-gray-500 dark:text-gray-400">
                Registered:
              </div>
              <div class="col-span-2 text-sm">
                {{ userData.created_at || "N/A" }}
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
import backendApi from "@/networkServices/api/backendApi.js";
import { useAuthStore } from "@/stores/auth";

const route = useRoute();
const id = route.params.id;
const authStore = useAuthStore();

// User data state
const userData = ref({});
const loading = ref(true);
const error = ref(null);

// Modals
const showSuspendModal = ref(false);
const suspendReason = ref("");

// Format date
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Verification Class
const verificationClass = (status) => {
  if (!status)
    return "inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100";

  switch (status.toLowerCase()) {
    case "verified":
      return "inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100";
    case "unverified":
      return "inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100";
    case "pending":
      return "inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100";
    default:
      return "inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100";
  }
};

// Fetch user data
const fetchUserData = async (id) => {
  try {
    loading.value = true;
    error.value = null;

    if (!authStore._hydrated) {
      await authStore.hydrate();
    }

    const response = await backendApi.get(`/household-profile/${id}`, {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    });
    console.log("FA", response.data);

    userData.value = response.data; // Assign API data to userData
  } catch (err) {
    console.error("Error fetching user data:", err);
    error.value = "Failed to load user data. Please try again.";
  } finally {
    loading.value = false;
  }
};

// Verify User
const verifyUser = async () => {
  try {
    // TODO: Call API to verify user
    userData.value.verification_status = "verified";
  } catch (err) {
    console.error("Error verifying user:", err);
  }
};

// Unverify User
const unverifyUser = async () => {
  try {
    // TODO: Call API to unverify user
    userData.value.verification_status = "unverified";
  } catch (err) {
    console.error("Error unverifying user:", err);
  }
};

// Open Suspend Modal
const openSuspendModal = () => {
  suspendReason.value = "";
  showSuspendModal.value = true;
};

// Suspend User
const suspendUser = async () => {
  try {
    // TODO: Call API to suspend user with reason
    showSuspendModal.value = false;
    // You might want to update the user status here
  } catch (err) {
    console.error("Error suspending user:", err);
  }
};

// Print User Profile
const printUserProfile = () => {
  const printWindow = window.open("", "", "width=800,height=600");

  // Get the HTML content of the user profile section
  const content = document.getElementById("userProfileContent").innerHTML;

  printWindow.document.write(`
    <html>
      <head>
        <title>User Profile - ${userData.value.first_name} ${
    userData.value.last_name
  }</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          h1 { color: #333; text-align: center; margin-bottom: 20px; }
          h2 { color: #444; border-bottom: 1px solid #ddd; padding-bottom: 5px; margin-top: 20px; }
          .grid { display: grid; }
          .grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          .gap-4 { gap: 1rem; }
          .text-sm { font-size: 0.875rem; }
          .font-medium { font-weight: 500; }
          .text-gray-500 { color: #6b7280; }
          .verification-verified {
            background-color: #d4edda;
            color: #155724;
          }
          .verification-unverified {
            background-color: #f8d7da;
            color: #721c24;
          }
          .verification-pending {
            background-color: #fff3cd;
            color: #856404;
          }
          .print-date {
            text-align: right;
            margin-bottom: 20px;
            font-size: 0.875rem;
            color: #6b7280;
          }
          img {
            max-width: 150px;
            height: auto;
            border: 1px solid #ddd;
            border-radius: 4px;
          }
        </style>
      </head>
      <body>
        <div class="print-date">Printed on: ${new Date().toLocaleString()}</div>
        <h1>User Profile - ${userData.value.first_name} ${
    userData.value.last_name
  }</h1>
        ${content}
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

// Fetch data when component mounts
onMounted(() => {
  fetchUserData(id);
});

definePageMeta({
  layout: "mod",
});
</script>
