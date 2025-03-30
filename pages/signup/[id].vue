<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-[#F3F3F3] dark:bg-[#191A23] p-4"
  >
    <div
      class="bg-white dark:bg-[#20233f] p-8 font-serif rounded-lg shadow-lg text-center max-w-xl w-full"
    >
      <h1
        class="w-full text-xl font-bold text-left text-gray-800 dark:text-[#F3F3F3] mb-4"
      >
        Create your account as {{ roleName }}
      </h1>

      <!-- Social Login Buttons -->
      <div class="flex flex-row justify-center items-center mb-4 gap-4">
        <button
          class="w-full flex items-center justify-center px-4 py-2 border rounded-lg text-gray-700 dark:text-[#F3F3F3] hover:bg-gray-50 dark:hover:bg-[#000000] transition duration-300"
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
      <div class="relative mb-6">
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
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Email Input -->
        <div class="relative">
          <label class="block text-left text-gray-700 dark:text-[#F3F3F3] mb-2"
            >Email</label
          >
          <div class="relative">
            <input
              placeholder="user@example.com"
              v-model="form.email"
              type="email"
              class="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B9FF66] dark:bg-[#191A23] dark:text-[#F3F3F3] dark:border-[#F3F3F3]"
            />
            <Icon
              name="ic:baseline-email"
              class="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg text-gray-500 dark:text-[#F3F3F3]"
            />
          </div>
        </div>

        <!-- Password Input -->
        <div class="relative">
          <label class="block text-left text-gray-700 dark:text-[#F3F3F3] mb-2"
            >Password</label
          >
          <div class="relative">
            <input
              placeholder="Enter a password"
              v-model="form.password"
              type="password"
              class="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B9FF66] dark:bg-[#191A23] dark:text-[#F3F3F3] dark:border-[#F3F3F3]"
            />
            <Icon
              name="ic:baseline-lock"
              class="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg text-gray-500 dark:text-[#F3F3F3]"
            />
          </div>
        </div>

        <!-- Confirm Password Input -->
        <div class="relative">
          <label class="block text-left text-gray-700 dark:text-[#F3F3F3] mb-2"
            >Confirm Password</label
          >
          <div class="relative">
            <input
              placeholder="Confirm your password"
              v-model="form.confirmPassword"
              type="password"
              class="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B9FF66] dark:bg-[#191A23] dark:text-[#F3F3F3] dark:border-[#F3F3F3]"
            />
            <Icon
              name="ic:baseline-lock"
              class="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg text-gray-500 dark:text-[#F3F3F3]"
            />
          </div>
        </div>

        <!-- Terms & Conditions Checkbox -->
        <div class="flex items-center">
          <input
            type="checkbox"
            v-model="form.agreeTerms"
            class="mr-2 accent-[#B9FF66]"
          />
          <label class="text-gray-700 dark:text-[#F3F3F3]">
            I agree to the
            <a href="#" class="text-[#B9FF66] hover:underline"
              >Terms & Conditions</a
            >
          </label>
        </div>

        <!-- Signup Button -->
        <button
          type="submit"
          class="w-full bg-black dark:bg-[#B9FF66] text-white dark:text-[#191A23] font-semibold px-6 py-2 rounded-lg hover:bg-[#191A23] dark:hover:bg-[#A0E55C] transition duration-300"
        >
          Signup
        </button>
      </form>

      <!-- Login Link -->
      <p class="text-center text-gray-600 dark:text-[#F3F3F3] mt-6">
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

// Get the id parameter from the route
const route = useRoute();
const id = ref(route.params.id);

// Map role IDs to role names
const roleName = computed(() => {
  switch (id.value) {
    case "2":
      return "Householder/Client";  
    case "3":
      return "Maid/Job Seeker";
  }
});

// Reactive form data
const form = ref({
  email: "",
  password: "",
  confirmPassword: "",
  roleId: id.value, // Include the role ID in the form data
  agreeTerms: false,
});

// Handle form submission
const handleSubmit = () => {
  if (form.value.password !== form.value.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  if (!form.value.agreeTerms) {
    alert("You must agree to the Terms & Conditions");
    return;
  }
  navigateTo(`/signup/profile/${id.value}`);
};

definePageMeta({
  layout: "custom",
});
</script>

<style scoped>
/* Add any custom styles here */
</style>
