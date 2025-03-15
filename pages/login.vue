<template>
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

        <!-- Signin Button -->
        <button
          type="submit"
          class="w-full bg-black dark:bg-[#B9FF66] text-white dark:text-[#191A23] font-semibold px-6 py-2 rounded-lg hover:bg-[#191A23] dark:hover:bg-[#A0E55C] transition duration-300"
        >
          Signin
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
import { ref } from "vue";

// Reactive form data
const form = ref({
  email: "",
  password: "",
});

// Handle form submission
const handleSubmit = () => {
  // Add your login logic here
  console.log("Form submitted:", form.value);
  alert("Login successful!");
};

definePageMeta({
  layout: "custom",
});
</script>

<style scoped>
/* Add any custom styles here */
</style>
