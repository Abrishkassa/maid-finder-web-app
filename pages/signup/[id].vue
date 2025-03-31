<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-[#F3F3F3] dark:bg-[#191A23] px-4 py-2"
  >
    <div
      class="bg-white dark:bg-[#20233f] p-8 font-serif rounded-lg shadow-lg text-center max-w-xl w-full"
    >
      <h1
        class="w-full text-md font-bold text-left text-gray-800 dark:text-[#F3F3F3] mb-4"
      >
        Create your account as {{ roleName }}
      </h1>

      <!-- Social Login Buttons -->
      <div
        class="flex flex-col sm:flex-row justify-center items-center mb-4 gap-4"
      >
        <button
          class="w-full flex items-center justify-center px-4 py-2 border rounded-lg text-gray-700 dark:text-[#F3F3F3] hover:bg-gray-50 dark:hover:bg-[#000000] transition duration-300"
          @click.prevent="socialLogin('telegram')"
        >
          <img
            src="https://telegram.org/favicon.ico"
            alt="Telegram"
            class="w-5 h-5 mr-2"
          />
          Continue with Telegram
        </button>
        <button
          class="w-full flex items-center justify-center px-4 py-2 border rounded-lg text-gray-700 dark:text-[#F3F3F3] hover:bg-gray-50 dark:hover:bg-[#000000] transition duration-300"
          @click.prevent="socialLogin('google')"
        >
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google"
            class="w-5 h-5 mr-2"
          />
          Continue with Google
        </button>
      </div>

      <!-- Divider -->
      <div class="relative mb-2">
        <div class="absolute inset-0 flex items-center">
          <div
            class="w-full border-t border-gray-300 dark:border-[#F3F3F3]"
          ></div>
        </div>
        <div class="relative flex justify-center">
          <span
            class="bg-white dark:bg-[#191A23] px-2 text-gray-500 dark:text-[#F3F3F3]"
            >or</span
          >
        </div>
      </div>

      <!-- Registration Form -->
      <form @submit.prevent="handleSubmit" class="space-y-2">
        <!-- Error Message -->
        <div
          v-if="errorMessage"
          class="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-300 rounded-lg"
        >
          {{ errorMessage }}
        </div>

        <!-- Name -->
        <div class="relative">
          <label
            class="block text-left text-sm text-gray-700 dark:text-[#F3F3F3] mb-2"
            >Name</label
          >
          <div class="relative">
            <input
              v-model="form.name"
              type="text"
              placeholder="John"
              required
              class="w-full px-4 py-1.5 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B9FF66] dark:bg-[#191A23] dark:text-[#F3F3F3] dark:border-[#F3F3F3]"
            />
            <Icon
              name="ic:baseline-person"
              class="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg text-gray-500 dark:text-[#F3F3F3]"
            />
          </div>
        </div>

        <!-- Email Input -->
        <div class="relative">
          <label
            class="block text-left text-sm text-gray-700 dark:text-[#F3F3F3] mb-2"
            >Email</label
          >
          <div class="relative">
            <input
              v-model="form.email"
              type="email"
              placeholder="user@example.com"
              required
              class="w-full px-4 py-1.5 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B9FF66] dark:bg-[#191A23] dark:text-[#F3F3F3] dark:border-[#F3F3F3]"
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
              v-model="form.password"
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

        <!-- Confirm Password Input -->
        <div class="relative">
          <label
            class="block text-sm text-left text-gray-700 dark:text-[#F3F3F3] mb-2"
            >Confirm Password</label
          >
          <div class="relative">
            <input
              v-model="form.confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              placeholder="Confirm your password"
              required
              class="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B9FF66] dark:bg-[#191A23] dark:text-[#F3F3F3] dark:border-[#F3F3F3]"
            />
            <Icon
              name="ic:baseline-lock"
              class="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg text-gray-500 dark:text-[#F3F3F3]"
            />
            <button
              type="button"
              @click="showConfirmPassword = !showConfirmPassword"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-[#F3F3F3]"
            >
              <Icon
                :name="
                  showConfirmPassword
                    ? 'ic:baseline-visibility-off'
                    : 'ic:baseline-visibility'
                "
              />
            </button>
          </div>
        </div>

        <!-- Terms & Conditions Checkbox -->
        <div class="flex items-start">
          <input
            id="terms-checkbox"
            type="checkbox"
            v-model="form.agreeTerms"
            required
            class="mt-1 mr-2 accent-[#B9FF66]"
          />
          <label
            for="terms-checkbox"
            class="text-gray-700 dark:text-[#F3F3F3] text-sm"
          >
            I agree to the
            <a href="#" class="text-[#B9FF66] hover:underline"
              >Terms & Conditions</a
            >
            and
            <a href="#" class="text-[#B9FF66] hover:underline"
              >Privacy Policy</a
            >
          </label>
        </div>

        <!-- Signup Button -->
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full bg-black dark:bg-[#B9FF66] text-white dark:text-[#191A23] font-semibold px-6 py-1.5 rounded-lg hover:bg-[#191A23] dark:hover:bg-[#A0E55C] transition duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <span v-if="!isLoading">Sign Up</span>
          <span v-else class="flex items-center justify-center">
            <svg
              class="animate-spin -ml-1 mr-2 h-5 w-5 text-white dark:text-[#191A23]"
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
            Creating account...
          </span>
        </button>
      </form>

      <!-- Login Link -->
      <p class="text-center text-gray-600 dark:text-[#F3F3F3] mt-4">
        Already have an account?
        <NuxtLink to="/login" class="text-[#B9FF66] hover:underline"
          >Login</NuxtLink
        >
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import backendAPI from "@/networkServices/api/backendApi.js";
import { useAuthStore } from "@/stores/auth";

const route = useRoute();
const authStore = useAuthStore();
const id = ref(route.params.id);
const isLoading = ref(false);
const errorMessage = ref("");
const showPassword = ref(false);
const showConfirmPassword = ref(false);

// Map role IDs to role names
const roleName = computed(() => {
  switch (id.value) {
    case "2":
      return "Householder/Client";
    case "3":
      return "Maid/Job Seeker";
    default:
      return "";
  }
});

// Form data
const form = ref({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  roleId: id.value,
  agreeTerms: false,
});

// Social login handler
const socialLogin = async (provider) => {
  try {
    window.location.href = `${backendAPI.defaults.baseURL}/auth/${provider}`;
  } catch (error) {
    errorMessage.value = `Failed to initiate ${provider} login`;
  }
};

// Form submission
const handleSubmit = async () => {
  // Validate form
  if (
    !form.value.name ||
    !form.value.email ||
    !form.value.password ||
    !form.value.confirmPassword
  ) {
    errorMessage.value = "Please fill in all fields";
    return;
  }

  if (form.value.password !== form.value.confirmPassword) {
    errorMessage.value = "Passwords do not match";
    return;
  }

  if (form.value.password.length < 8) {
    errorMessage.value = "Password must be at least 8 characters";
    return;
  }

  if (!form.value.agreeTerms) {
    errorMessage.value = "You must agree to the terms and conditions";
    return;
  }

  isLoading.value = true;
  errorMessage.value = "";

  try {
    const response = await backendAPI.post("/auth/register", {
      name: form.value.name,
      email: form.value.email,
      password: form.value.password,
      password_confirmation: form.value.confirmPassword,
      role: form.value.roleId,
    });

    if (response.data) {
      // Store email in auth store
      authStore.setEmail(form.value.email);

      navigateTo(`/verify/${id.value}`);

      // Fallback if navigation fails
      if (!window.location.pathname.includes("/verify")) {
        window.location.href = redirectUrl;
      }
    } else {
      throw new Error(response.data.message || "Registration failed");
    }
  } catch (error) {
    console.error("Registration error:", error);
    errorMessage.value =
      error.response?.data?.message ||
      error.message ||
      "Registration failed. Please try again.";
  } finally {
    isLoading.value = false;
  }
};

// // Validate route on setup
if (!["2", "3"].includes(id.value)) {
  navigateTo("/signup");
}

definePageMeta({
  layout: "custom",
});
</script>

<style scoped>
/* Responsive adjustments */
@media (max-width: 640px) {
  .container {
    padding: 1rem;
  }
  input,
  button {
    padding: 0.75rem;
  }
}

/* Dark mode transitions */
input,
button {
  transition: background-color 0.3s ease, border-color 0.3s ease,
    color 0.3s ease;
}
</style>
