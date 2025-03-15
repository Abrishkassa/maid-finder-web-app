<template>
  <header
    class="w-full bg-[#F3F3F3] dark:bg-[#191A23] sticky left-0 right-0 top-0 z-50"
  >
    <div class="max-w-7xl mx-auto px-8 flex items-center justify-between py-2">
      <!-- Logo -->
      <div class="flex items-center space-x-2">
        <span class="text-lg font-semibold text-gray-800 dark:text-white"
          >MaidFinder</span
        >
      </div>

      <!-- Hamburger Menu (Mobile) -->
      <button
        @click="toggleMenu"
        class="md:hidden p-2 text-gray-700 dark:text-[#F3F3F3] hover:text-[#B9FF66] focus:outline-none"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </button>

      <!-- Navigation Links (Desktop) -->
      <nav
        class="hidden md:flex font-semibold space-x-6 text-gray-700 dark:text-[#F3F3F3]"
      >
        <NuxtLink to="/" class="hover:text-[#B9FF66]">Home</NuxtLink>
        <NuxtLink to="#" class="hover:text-[#B9FF66]">About us</NuxtLink>
        <NuxtLink to="#" class="hover:text-[#B9FF66]">Services</NuxtLink>
        <NuxtLink to="/maids" class="hover:text-[#B9FF66]">Find Maids</NuxtLink>
        <NuxtLink to="/Jobs" class="hover:text-[#B9FF66]">Find Jobs</NuxtLink>
      </nav>

      <!-- Right Buttons (Desktop) -->
      <div class="hidden md:flex items-center font-semibold space-x-4">
        <NuxtLink
          to="/login"
          class="text-gray-700 dark:text-[#F3F3F3] hover:text-[#B9FF66]"
          >Log in</NuxtLink
        >
        <LanguageSwitcher />
        <DarkModeToggle />
      </div>
    </div>

    <!-- Mobile Menu (Dropdown) -->
    <div
      v-if="isMenuOpen"
      class="md:hidden bg-white dark:bg-[#191A23] shadow-lg"
    >
      <nav
        class="flex flex-col space-y-4 p-4 font-semibold text-gray-700 dark:text-[#F3F3F3]"
      >
        <NuxtLink to="/" class="hover:text-[#B9FF66]">Home</NuxtLink>
        <NuxtLink to="#" class="hover:text-[#B9FF66]">About us</NuxtLink>
        <NuxtLink to="#" class="hover:text-[#B9FF66]">Services</NuxtLink>
        <NuxtLink to="/maids" class="hover:text-[#B9FF66]">Find Maids</NuxtLink>
        <NuxtLink to="/Jobs" class="hover:text-[#B9FF66]">Find Jobs</NuxtLink>
        <NuxtLink
          to="/login"
          class="text-gray-700 dark:text-[#F3F3F3] hover:text-[#B9FF66]"
          >Log in</NuxtLink
        >
        <div class="flex items-center space-x-4">
          <LanguageSwitcher />
          <DarkModeToggle />
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";

// State for mobile menu
const isMenuOpen = ref(false);

// Toggle mobile menu
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>
