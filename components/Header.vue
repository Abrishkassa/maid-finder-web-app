<template>
  <header
    class="w-full bg-white dark:bg-[#191A23] dark:border-white shadow-lg sticky left-0 right-0 top-0"
  >
    <div class="max-w-7xl mx-auto px-8 flex items-center justify-between py-4">
      <!-- Logo -->
      <div class="flex items-center space-x-2">
        <span class="text-lg font-semibold text-gray-800 dark:text-white"
          >MaidFinder</span
        >
      </div>
      <!-- Navigation Links -->
      <nav class="hidden md:flex space-x-6 text-gray-700 dark:text-[#F3F3F3]">
        <a href="/" class="hover:text-[#B9FF66]">Home</a>
        <a href="#" class="hover:text-[#B9FF66]">About us</a>
        <a href="#" class="hover:text-[#B9FF66]">Services</a>
        <a href="/maids" class="hover:text-[#B9FF66]">Find Maids</a>
        <a href="/Jobs" class="hover:text-[#B9FF66]">Find Jobs</a>
        <a href="#" class="hover:text-[#B9FF66]">How it works</a>
      </nav>
      <!-- Right Buttons -->
      <div class="flex items-center space-x-4">
        <a
          href="/login"
          class="text-gray-700 dark:text-[#F3F3F3] hover:text-[#B9FF66]"
          >Log in</a
        >
        <a
          href="/signup"
          class="px-6 py-2 bg-black dark:bg-[#B9FF66] text-white dark:text-[#191A23] text-regular rounded-lg font-medium hover:bg-[#8fdb31] dark:hover:bg-[#A0E55C] transition"
        >
          Register
        </a>
        <DarkModeToggle />
      </div>
    </div>
  </header>
</template>
