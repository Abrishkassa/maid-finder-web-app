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
            <PrinterIcon class="h-5 w-5 mr-1" />
            Print Profile
          </button>
          <NuxtLink
            to="/maids/dashboard/users"
            class="p-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 dark:bg-blue-700 dark:text-blue-100 dark:hover:bg-blue-600 flex items-center"
          >
            Back to List
          </NuxtLink>
        </div>
      </div>

      <!-- User Details -->
      <div class="px-4 py-5 sm:p-6" id="userProfileContent">
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
                  Name:
                </div>
                <div class="col-span-2 text-sm">{{ user.name }}</div>
              </div>
              <div class="grid grid-cols-3 gap-4">
                <div
                  class="text-sm font-medium text-gray-500 dark:text-gray-400"
                >
                  Email:
                </div>
                <div class="col-span-2 text-sm">{{ user.email }}</div>
              </div>
              <div class="grid grid-cols-3 gap-4">
                <div
                  class="text-sm font-medium text-gray-500 dark:text-gray-400"
                >
                  Phone:
                </div>
                <div class="col-span-2 text-sm">{{ user.phone || "N/A" }}</div>
              </div>
              <div class="grid grid-cols-3 gap-4">
                <div
                  class="text-sm font-medium text-gray-500 dark:text-gray-400"
                >
                  User Type:
                </div>
                <div class="col-span-2 text-sm">{{ user.userType }}</div>
              </div>
              <div class="grid grid-cols-3 gap-4">
                <div
                  class="text-sm font-medium text-gray-500 dark:text-gray-400"
                >
                  Location:
                </div>
                <div class="col-span-2 text-sm">
                  {{ user.location || "N/A" }}
                </div>
              </div>
              <div class="grid grid-cols-3 gap-4">
                <div
                  class="text-sm font-medium text-gray-500 dark:text-gray-400"
                >
                  Registered:
                </div>
                <div class="col-span-2 text-sm">
                  {{ formatDate(user.registered) }}
                </div>
              </div>
            </div>
          </div>

          <!-- Account Status -->
          <div>
            <h4
              class="text-md font-semibold mb-4 border-b pb-2 dark:border-gray-700"
            >
              Account Status
            </h4>
            <div class="space-y-4">
              <div class="grid grid-cols-3 gap-4 items-center">
                <div
                  class="text-sm font-medium text-gray-500 dark:text-gray-400"
                >
                  Status:
                </div>
                <div class="col-span-2">
                  <span :class="statusClass(user.status)">
                    {{ user.status }}
                  </span>
                </div>
              </div>
              <div class="grid grid-cols-3 gap-4 items-center">
                <div
                  class="text-sm font-medium text-gray-500 dark:text-gray-400"
                >
                  Verification:
                </div>
                <div class="col-span-2">
                  <span :class="verificationClass(user.verificationStatus)">
                    {{ user.verificationStatus }}
                  </span>
                </div>
              </div>
              <div v-if="user.rejectionReason" class="grid grid-cols-3 gap-4">
                <div
                  class="text-sm font-medium text-gray-500 dark:text-gray-400"
                >
                  Rejection Reason:
                </div>
                <div class="col-span-2 text-sm">{{ user.rejectionReason }}</div>
              </div>
              <div v-if="user.suspensionReason" class="grid grid-cols-3 gap-4">
                <div
                  class="text-sm font-medium text-gray-500 dark:text-gray-400"
                >
                  Suspension Reason:
                </div>
                <div class="col-span-2 text-sm">
                  {{ user.suspensionReason }}
                </div>
              </div>
            </div>

            <!-- Status Actions -->
            <div class="mt-6 flex flex-wrap gap-2">
              <button
                v-if="user.status !== 'Approved'"
                @click="approveUser"
                class="px-4 py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 dark:bg-green-700 dark:text-green-100 dark:hover:bg-green-600 text-sm"
              >
                Approve User
              </button>
              <button
                v-if="user.status !== 'Rejected'"
                @click="openRejectModal"
                class="px-4 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 dark:bg-red-700 dark:text-red-100 dark:hover:bg-red-600 text-sm"
              >
                Reject User
              </button>
              <button
                v-if="user.status !== 'Suspended'"
                @click="openSuspendModal"
                class="px-4 py-2 bg-orange-100 text-orange-800 rounded-lg hover:bg-orange-200 dark:bg-orange-700 dark:text-orange-100 dark:hover:bg-orange-600 text-sm"
              >
                Suspend User
              </button>
              <button
                v-if="user.status !== 'Pending'"
                @click="resetStatus"
                class="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 text-sm"
              >
                Reset to Pending
              </button>
            </div>
          </div>

          <!-- Additional Info Based on User Type -->
          <div v-if="user.userType === 'Maid'" class="md:col-span-2">
            <h4
              class="text-md font-semibold mb-4 border-b pb-2 dark:border-gray-700"
            >
              Maid Information
            </h4>
            <div class="space-y-3">
              <div class="grid grid-cols-3 gap-4">
                <div
                  class="text-sm font-medium text-gray-500 dark:text-gray-400"
                >
                  Bio:
                </div>
                <div class="col-span-2 text-sm">{{ user.bio || "N/A" }}</div>
              </div>
              <div class="grid grid-cols-3 gap-4">
                <div
                  class="text-sm font-medium text-gray-500 dark:text-gray-400"
                >
                  Documents:
                </div>
                <div class="col-span-2 text-sm">
                  <div v-if="user.documents && user.documents.length">
                    <div
                      v-for="(doc, index) in user.documents"
                      :key="index"
                      class="mb-1"
                    >
                      <a
                        href="#"
                        class="text-blue-600 dark:text-blue-400 hover:underline"
                        >{{ doc }}</a
                      >
                    </div>
                  </div>
                  <div v-else>No documents uploaded</div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="user.userType === 'Employer'" class="md:col-span-2">
            <h4
              class="text-md font-semibold mb-4 border-b pb-2 dark:border-gray-700"
            >
              Employer Information
            </h4>
            <div class="space-y-3">
              <div class="grid grid-cols-3 gap-4">
                <div
                  class="text-sm font-medium text-gray-500 dark:text-gray-400"
                >
                  Company:
                </div>
                <div class="col-span-2 text-sm">
                  {{ user.company || "N/A" }}
                </div>
              </div>
              <div class="grid grid-cols-3 gap-4">
                <div
                  class="text-sm font-medium text-gray-500 dark:text-gray-400"
                >
                  Address:
                </div>
                <div class="col-span-2 text-sm">
                  {{ user.address || "N/A" }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Reject Modal -->
    <div
      v-if="showRejectModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div
        class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h3 class="text-lg font-semibold mb-4">Reject User</h3>
        <textarea
          v-model="rejectReason"
          placeholder="Enter reason for rejection..."
          class="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 mb-4"
          rows="4"
        ></textarea>
        <div class="flex justify-end space-x-2">
          <button
            @click="showRejectModal = false"
            class="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            @click="rejectUser"
            class="p-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 dark:bg-red-700 dark:text-red-100 dark:hover:bg-red-600"
          >
            Confirm Reject
          </button>
        </div>
      </div>
    </div>

    <!-- Suspend Modal -->
    <div
      v-if="showSuspendModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div
        class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h3 class="text-lg font-semibold mb-4">Suspend User</h3>
        <textarea
          v-model="suspendReason"
          placeholder="Enter reason for suspension..."
          class="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 mb-4"
          rows="4"
        ></textarea>
        <div class="flex justify-end space-x-2">
          <button
            @click="showSuspendModal = false"
            class="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            @click="suspendUser"
            class="p-2 bg-orange-100 text-orange-800 rounded-lg hover:bg-orange-200 dark:bg-orange-700 dark:text-orange-100 dark:hover:bg-orange-600"
          >
            Confirm Suspend
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";

import { useRoute } from "vue-router";

const route = useRoute();
const userId = route.params.id;

// Sample user data - in a real app, you'd fetch this from an API
const user = ref({
  id: 1,
  name: "John Doe",
  userType: "Maid",
  email: "john@example.com",
  phone: "1234567890",
  location: "New York, USA",
  registered: "2023-10-01",
  verificationStatus: "Verified",
  status: "Pending",
  bio: "Experienced maid with 5 years in residential cleaning.",
  documents: ["ID_Proof.pdf", "Background_Check.pdf"],
});

// Modals
const showRejectModal = ref(false);
const showSuspendModal = ref(false);
const rejectReason = ref("");
const suspendReason = ref("");

// Format date
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Status Class
const statusClass = (status) => {
  switch (status) {
    case "Pending":
      return "inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100";
    case "Approved":
      return "inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100";
    case "Rejected":
      return "inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100";
    case "Suspended":
      return "inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-800 dark:bg-orange-700 dark:text-orange-100";
    default:
      return "inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100";
  }
};

// Verification Class
const verificationClass = (status) => {
  switch (status) {
    case "Verified":
      return "inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100";
    case "Unverified":
      return "inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100";
    case "Pending":
      return "inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100";
    default:
      return "inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100";
  }
};

// Approve User
const approveUser = () => {
  user.value.status = "Approved";
  // TODO: Call API to update status
};

// Open Reject Modal
const openRejectModal = () => {
  rejectReason.value = "";
  showRejectModal.value = true;
};

// Reject User
const rejectUser = () => {
  user.value.status = "Rejected";
  user.value.rejectionReason = rejectReason.value;
  showRejectModal.value = false;
  // TODO: Call API to update status with reason
};

// Open Suspend Modal
const openSuspendModal = () => {
  suspendReason.value = "";
  showSuspendModal.value = true;
};

// Suspend User
const suspendUser = () => {
  user.value.status = "Suspended";
  user.value.suspensionReason = suspendReason.value;
  showSuspendModal.value = false;
  // TODO: Call API to update status with reason
};

// Reset Status
const resetStatus = () => {
  user.value.status = "Pending";
  // TODO: Call API to update status
};

// Print User Profile
const printUserProfile = () => {
  const printWindow = window.open("", "", "width=800,height=600");

  // Get the HTML content of the user profile section
  const content = document.getElementById("userProfileContent").innerHTML;

  printWindow.document.write(`
    <html>
      <head>
        <title>User Profile - ${user.value.name}</title>
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
          .status {
            display: inline-flex;
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            font-size: 0.75rem;
            font-weight: 600;
          }
          .status-pending {
            background-color: #fff3cd;
            color: #856404;
          }
          .status-approved {
            background-color: #d4edda;
            color: #155724;
          }
          .status-rejected {
            background-color: #f8d7da;
            color: #721c24;
          }
          .status-suspended {
            background-color: #ffe8cc;
            color: #804d00;
          }
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
        </style>
      </head>
      <body>
        <div class="print-date">Printed on: ${new Date().toLocaleString()}</div>
        <h1>User Profile - ${user.value.name}</h1>
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

// In a real app, you would fetch the user data based on the ID
onMounted(() => {
  // TODO: Fetch user data from API
  // Example:
  // const response = await fetch(`/api/users/${userId}`);
  // user.value = await response.json();
});

definePageMeta({
  layout: "mod",
});
</script>
