<template>
  <div
    class="mx-auto w-full p-4 md:p-8 lg:w-1/2 transition-colors duration-300"
  >
    <div class="h-full w-full py-6 md:py-10"></div>
    <form
      @submit.prevent="confirm"
      class="flex flex-col justify-between gap-4 px-4 py-2"
    >
      <p class="font-serif text-lg text-slate-800 dark:text-slate-200">
        Verification code sent to:
        <span class="font-semibold text-blue-600 dark:text-blue-400">{{
          store.email
        }}</span>
      </p>

      <div>
        <input
          v-model="code"
          type="text"
          placeholder="Enter 6-digit verification code"
          class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
          :disabled="isLoading"
          maxlength="6"
          inputmode="numeric"
          pattern="\d{6}"
        />
        <p
          v-if="errors.code"
          class="mt-1 text-sm text-red-500 dark:text-red-400"
        >
          {{ errors.code }}
        </p>
      </div>

      <button
        type="submit"
        class="w-full rounded-lg bg-blue-600 px-4 py-3 font-bold text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        :disabled="isLoading || !code"
      >
        <div class="flex items-center justify-center">
          <span v-if="!isLoading">Verify Email</span>
          <Loader v-else />
        </div>
      </button>

      <div
        v-if="errorMessage"
        class="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-300 rounded-lg"
      >
        {{ errorMessage }}
      </div>

      <div class="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
        Didn't receive a code?
        <button
          @click.prevent="resendCode"
          class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium disabled:opacity-50"
          :disabled="isResending"
        >
          <span v-if="!isResending">Resend code</span>
          <span v-else class="inline-flex items-center">
            <svg
              class="animate-spin -ml-1 mr-1 h-3 w-3 text-blue-600 dark:text-blue-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Sending...
          </span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import backendAPI from "@/networkServices/api/backendApi.js";
import { useAuthStore } from "@/stores/auth";

// Custom loader component
const Loader = {
  template: `
    <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  `,
};

const route = useRoute();
const store = useAuthStore();
const id = ref(route.params.id);
const code = ref("");
const isLoading = ref(false);
const isResending = ref(false);
const errorMessage = ref("");
const errors = ref({ code: "" });

// Validate route on component mount
onMounted(() => {
  if (!["2", "3"].includes(id.value)) {
    errorMessage.value = "Invalid user type";
    return navigateTo("/signup");
  }

  if (!store.email) {
    errorMessage.value = "Please complete registration first";
    // Optional: redirect after delay
    setTimeout(() => navigateTo(`/signup/${id.value}`), 2000);
  }
});

const validateCode = () => {
  if (!code.value) {
    errors.value.code = "Verification code is required";
    return false;
  }
  if (code.value.length !== 6 || !/^\d+$/.test(code.value)) {
    errors.value.code = "Please enter a valid 6-digit code";
    return false;
  }
  errors.value.code = "";
  return true;
};

const confirm = async () => {
  if (!validateCode()) return;
  if (!store.email) {
    errorMessage.value =
      "Email verification failed. Please try registering again.";
    return;
  }

  isLoading.value = true;
  errorMessage.value = "";

  try {
    const response = await backendAPI.post("/auth/verify-email", {
      email: store.email,
      verification_code: code.value,
    });

    if (response.data.success) {
      // Store tokens if available
      if (response.data.data?.access_token) {
        store.setTokens(
          response.data.data.access_token,
          response.data.data.refresh_token,
          response.data.data.expires_in
        );
      }

      // Force navigation
      const redirectUrl = `/signup/profile/${id.value}`;
      await navigateTo(redirectUrl);

      // Fallback if navigation fails
      if (!window.location.pathname.includes("/signup/profile")) {
        window.location.href = redirectUrl;
      }
    } else {
      throw new Error(response.data.message || "Verification failed");
    }
  } catch (error) {
    console.error("Verification error:", error);
    errorMessage.value =
      error.response?.data?.message ||
      error.message ||
      "Verification failed. Please try again.";
  } finally {
    isLoading.value = false;
  }
};

const resendCode = async () => {
  if (!store.email) {
    errorMessage.value = "Cannot resend code - no email found";
    return;
  }

  isResending.value = true;
  errorMessage.value = "";

  try {
    const response = await backendAPI.post("/auth/resend-verification", {
      email: store.email,
    });

    if (response.data.success) {
      errorMessage.value = "New verification code sent! Check your email.";
    } else {
      throw new Error(response.data.message || "Failed to resend code");
    }
  } catch (error) {
    errorMessage.value =
      error.response?.data?.message ||
      error.message ||
      "Failed to resend code. Please try again.";
  } finally {
    isResending.value = false;
  }
};

definePageMeta({
  layout: "custom",
});
</script>
<style>
/* Smooth transitions for dark mode */
.dark {
  color-scheme: dark;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  input {
    padding: 0.75rem;
  }
  button {
    padding: 0.75rem;
  }
}

/* Dark mode transitions */
input,
button,
.error-message {
  transition: background-color 0.3s ease, border-color 0.3s ease,
    color 0.3s ease;
}
</style>
