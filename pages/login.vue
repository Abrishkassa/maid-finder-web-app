<template>
  <!-- Template remains the same -->
  <div class="flex flex-col items-center justify-center min-h-screen p-4">
    <div
      class="bg-white dark:bg-[#20233f] p-8 font-serif rounded-lg shadow-lg text-center max-w-xl w-full"
    >
      <h1
        class="w-full text-xl font-bold text-left text-gray-800 dark:text-[#F3F3F3] mb-4"
      >
        Welcome back!
      </h1>

      <!-- Login Form -->
      <form @submit.prevent="login" class="space-y-4">
        <!-- Email Input -->
        <div class="relative">
          <label class="block text-left text-gray-700 dark:text-[#F3F3F3] mb-2"
            >Email</label
          >
          <div class="relative">
            <input
              placeholder="user@example.com"
              v-model="email"
              type="email"
              class="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B9FF66] dark:bg-[#191A23] dark:text-[#F3F3F3] dark:border-[#F3F3F3]"
              :disabled="isLoading"
            />
            <Icon
              name="ic:baseline-email"
              class="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg text-gray-500 dark:text-[#F3F3F3]"
            />
          </div>
        </div>

        <!-- Password Input -->
        <div class="relative">
          <label
            class="block text-sm text-left text-gray-700 dark:text-[#F3F3F3] mb-2"
            >Password</label
          >
          <div class="relative">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Enter a password"
              required
              minlength="8"
              class="w-full px-4 py-1.5 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B9FF66] dark:bg-[#191A23] dark:text-[#F3F3F3] dark:border-[#F3F3F3]"
            />
            <Icon
              name="ic:baseline-lock"
              class="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg focus:text-black text-gray-500 dark:text-[#F3F3F3]"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-[#F3F3F3]"
            >
              <Icon
                :name="
                  showPassword
                    ? 'ic:baseline-visibility-off'
                    : 'ic:baseline-visibility'
                "
              />
            </button>
          </div>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 text-left">
            Minimum 8 characters
          </p>
        </div>

        <!-- Error Message -->
        <div v-if="errorMessage" class="text-red-500 text-sm text-left">
          {{ errorMessage }}
        </div>

        <!-- Signin Button -->
        <button
          type="submit"
          class="w-full bg-black dark:bg-[#B9FF66] text-white dark:text-[#191A23] font-semibold px-6 py-2 rounded-lg hover:bg-[#191A23] dark:hover:bg-[#A0E55C] transition duration-300"
          :disabled="isLoading"
        >
          <span v-if="!isLoading">Signin</span>
          <span v-else>Signing in...</span>
        </button>
      </form>

      <!-- Signup Link -->
      <p class="text-center text-gray-600 dark:text-[#F3F3F3] mt-6">
        Don't have an account?
        <NuxtLink to="/signup" class="text-[#B9FF66] hover:underline"
          >Signup</NuxtLink
        >
      </p>
    </div>
  </div>
</template>

<script setup>
import backendAPI from "@/networkServices/api/backendApi.js";
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";

const email = ref("");
const password = ref("");
const errorMessage = ref("");
const isLoading = ref(false);
const showPassword = ref(false);
const authStore = useAuthStore();

onMounted(() => {
  const authStore = useAuthStore();
  authStore.hydrate();
});

const login = async () => {
  try {
    isLoading.value = true;
    errorMessage.value = "";

    if (!email.value || !password.value) {
      throw new Error("Please enter both email and password");
    }

    const response = await backendAPI.post("/auth/login", {
      email: email.value.trim().toLowerCase(),
      password: password.value,
    });

    const {
      user,
      access_token,
      refresh_token,
      expires_in,
      // is_verified,
      user_type,
    } = response.data;

    // Check if email is verified
    if ((response.data.is_verified = false)) {
      console.log("User fa", response.data);
      // Store the email in the auth store for verification page
      authStore.setVerificationEmail(email.value.trim().toLowerCase());
      // Redirect to verification page with user type (id)
      return await navigateTo(
        `/verify/${user_type}?email=${encodeURIComponent(
          email.value.trim().toLowerCase()
        )}`
      );
    }

    // Store tokens and user data
    authStore.setTokens(access_token, refresh_token, expires_in);

    // Redirect based on role
    switch (user.role) {
      case "admin":
        await navigateTo("/admin/dashboard");
        break;
      case "maid":
        await navigateTo("/");
        break;
      case "household":
        await navigateTo("/");

        break;
      case "employee":
        await navigateTo("/employee/dashboard");
        break;
      default:
        throw new Error("Unknown user role");
    }
  } catch (error) {
    console.error("Login error:", error);
    errorMessage.value =
      error.response?.data?.message || error.message || "Login failed";

    // Handle unverified email error specifically
    if (error.response?.data?.message?.includes("not verified")) {
      authStore.setVerificationEmail(email.value.trim().toLowerCase());
      // Get user type from error response or use default (2 for household)
      const userType = error.response?.data?.user_type || "2";
      await navigateTo(
        `/verify/${userType}?email=${encodeURIComponent(
          email.value.trim().toLowerCase()
        )}`
      );
    }
  } finally {
    isLoading.value = false;
  }
};

definePageMeta({
  layout: "custom",
});
</script>

<style scoped>
/* Add any custom styles here */
</style>
