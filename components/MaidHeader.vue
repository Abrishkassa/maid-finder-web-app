<template>
  <header
    class="w-full bg-[#F3F3F3] dark:bg-[#191A23] sticky left-0 right-0 top-0"
  >
    <div class="max-w-7xl mx-auto px-8 flex items-center justify-between">
      <!-- Search Bar -->
      <div class="w-full md:w-2/3 flex justify-center items-center">
        <input
          type="text"
          placeholder="Search settings"
          class="w-full px-4 py-2 border border-lime-300 dark:border-lime-600 rounded-lg focus:border-lime-300 dark:focus:border-lime-400 outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
      </div>

      <!-- Language Switcher and Dark Mode Toggle -->
      <div class="flex items-center gap-4">
        <LanguageSwitcher />
        <DarkModeToggle />
      </div>
    </div>

    <!-- Mobile Menu (Dropdown) -->
    <div
      v-if="isMenuOpen"
      class="md:hidden bg-white dark:bg-[#191A23] shadow-lg"
    >
      <div class="flex flex-col items-end px-8 py-4 space-y-4">
        <LanguageSwitcher />
        <DarkModeToggle />
      </div>
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
