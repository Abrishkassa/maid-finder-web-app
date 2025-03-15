<template>
  <div
    class="min-h-screen font-serif bg-[#F3F3F3] dark:bg-[#191A23] text-gray-900 dark:text-gray-100 flex"
  >
    <!-- Sidebar Toggle Button (Mobile) -->
    <button
      @click="isSidebarOpen = !isSidebarOpen"
      class="md:hidden p-2 fixed top-4 left-4 z-50 bg-white dark:bg-gray-800 rounded shadow"
    >
      ☰
    </button>

    <!-- Sidebar -->
    <aside
      :class="[
        'w-64 bg-white dark:bg-[#191A23] shadow-lg px-4 py-8 fixed h-screen md:relative transform transition-all duration-200',
        isSidebarCollapsed ? 'w-16' : 'w-64',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
      ]"
    >
      <!-- Sidebar Toggle Button -->
      <button
        @click="isSidebarCollapsed = !isSidebarCollapsed"
        class="bg-black rounded-full absolute -right-1 top-6 z-10 shadow-md hover:bg-gray-700 transition-colors duration-200"
      >
        <Icon
          name="line-md:chevron-small-triple-left"
          v-if="!isSidebarCollapsed"
          style="color: white"
        />
        <Icon
          name="line-md:chevron-small-triple-right"
          v-else
          style="color: white"
        />
      </button>

      <!-- Profile Section -->
      <div class="mb-6 flex justify-between items-center">
        <h2
          class="text-lg font-semibold text-gray-800 dark:text-white"
          :class="{ hidden: isSidebarCollapsed }"
        >
          MaidFinder
        </h2>
        <ColorModeToggle />
      </div>

      <div class="mb-6">
        <p class="text-lg" :class="{ hidden: isSidebarCollapsed }">
          Yohannis Tesfaye
        </p>
        <p
          class="text-sm text-green-500"
          :class="{ hidden: isSidebarCollapsed }"
        >
          Verified
        </p>
      </div>

      <!-- Navigation Links -->
      <nav>
        <ul>
          <li class="mb-2">
            <a
              href="#"
              class="flex items-center p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
            >
              <ApplicationIcon class="w-5 h-5" />
              <span
                :class="{
                  hidden: isSidebarCollapsed,
                  'ml-2': !isSidebarCollapsed,
                }"
                >Applications</span
              >
            </a>
          </li>
          <li class="mb-2">
            <a
              href="#"
              class="flex items-center p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
            >
              <MessageIcon class="w-5 h-5" />
              <span
                :class="{
                  hidden: isSidebarCollapsed,
                  'ml-2': !isSidebarCollapsed,
                }"
                >Messages</span
              >
            </a>
          </li>
          <li class="mb-2">
            <a
              href="#"
              class="flex items-center p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
            >
              <PaymentIcon class="w-5 h-5" />
              <span
                :class="{
                  hidden: isSidebarCollapsed,
                  'ml-2': !isSidebarCollapsed,
                }"
                >Payments</span
              >
            </a>
          </li>
          <li class="mb-2">
            <a
              href="#"
              class="flex items-center p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
            >
              <ProfileIcon class="w-5 h-5" />
              <span
                :class="{
                  hidden: isSidebarCollapsed,
                  'ml-2': !isSidebarCollapsed,
                }"
                >Profile</span
              >
            </a>
          </li>
          <li class="mb-2">
            <a
              href="#"
              class="flex items-center p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
            >
              <SettingsIcon class="w-5 h-5" />
              <span
                :class="{
                  hidden: isSidebarCollapsed,
                  'ml-2': !isSidebarCollapsed,
                }"
                >Settings</span
              >
            </a>
          </li>
          <li class="mb-2">
            <a
              href="#"
              class="flex items-center p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
            >
              <HelpIcon class="w-5 h-5" />
              <span
                :class="{
                  hidden: isSidebarCollapsed,
                  'ml-2': !isSidebarCollapsed,
                }"
                >Help</span
              >
            </a>
          </li>
        </ul>
      </nav>

      <!-- Logout Button -->
      <div class="mt-6">
        <button
          class="w-full p-2 bg-red-500 text-white rounded hover:bg-red-600"
          :class="{ hidden: isSidebarCollapsed }"
        >
          Logout
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main
      class="bg-[#F3F3F3] font-serif dark:bg-[#191A23] min-h-screen flex-1 py-2 mt-16 md:mt-0 overflow-y-auto"
    >
      <MaidHeader />
      <slot />
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isSidebarOpen = ref(false);
const isSidebarCollapsed = ref(false);
</script>
