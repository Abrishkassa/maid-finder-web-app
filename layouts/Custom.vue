<template>
  <header
    class="w-full bg-[#F3F3F3] dark:bg-[#191A23] sticky left-0 right-0 top-0 z-50"
  >
    <div class="max-w-7xl mx-auto px-8 flex items-center justify-between py-2">
      <!-- Logo -->

      <div class="flex items-center space-x-2">
        <NuxtLink
          to="/Jobs"
          class="text-lg font-semibold text-gray-800 dark:text-white"
          >MaidFinder</NuxtLink
        >
      </div>

      <!-- Hamburger Menu (Mobile) -->
      <button
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

      <!-- Right Buttons (Desktop) -->
      <div class="hidden md:flex items-center font-semibold space-x-4">
        <LanguageSwitcher />
        <DarkModeToggle />
      </div>
    </div>
  </header>
  <div class="min-h-screen bg-[#F3F3F3] dark:bg-[#191A23]">
    <slot />
  </div>
</template>
