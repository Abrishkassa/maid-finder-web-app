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
        'w-64 bg-white dark:bg-[#191A23] shadow-lg px-4 py-8 fixed h-screen md:relative transform transition-all duration-200 overflow-hidden',
        isSidebarCollapsed ? 'w-16' : 'w-64',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
      ]"
    >
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

      <!-- Navigation Links -->
      <nav>
        <ul>
          <li class="mb-2">
            <NuxtLink
              to="/"
              class="flex items-center p-2 hover:bg-lime-500 dark:hover:bg-lime-500 rounded"
            >
              <Icon name="mdi:home" class="size-6" style="color: gray" />
              <span
                :class="{
                  hidden: isSidebarCollapsed,
                  'ml-2': !isSidebarCollapsed,
                }"
                >Dashboard</span
              >
            </NuxtLink>
          </li>
          <li class="mb-2">
            <NuxtLink
              to="/"
              class="flex items-center p-2 hover:bg-lime-500 dark:hover:bg-lime-500 rounded"
            >
              <Icon name="mdi:apps" class="size-6" style="color: gray" />
              <span
                :class="{
                  hidden: isSidebarCollapsed,
                  'ml-2': !isSidebarCollapsed,
                }"
                >Applications</span
              >
            </NuxtLink>
          </li>
          <li class="mb-2">
            <NuxtLink
              to="/"
              class="flex items-center p-2 hover:bg-lime-500 dark:hover:bg-lime-500 rounded"
            >
              <Icon name="mdi:email" class="size-6" style="color: gray" />
              <span
                :class="{
                  hidden: isSidebarCollapsed,
                  'ml-2': !isSidebarCollapsed,
                }"
                >Messages</span
              >
            </NuxtLink>
          </li>
          <li class="mb-2">
            <NuxtLink
              to="/"
              class="flex items-center p-2 hover:bg-lime-500 dark:hover:bg-lime-500 rounded"
            >
              <Icon name="mdi:cash" class="size-6" style="color: gray" />
              <span
                :class="{
                  hidden: isSidebarCollapsed,
                  'ml-2': !isSidebarCollapsed,
                }"
                >Payments</span
              >
            </NuxtLink>
          </li>

          <li class="mb-2">
            <NuxtLink
              to="/"
              class="flex items-center p-2 hover:bg-lime-500 dark:hover:bg-lime-500 rounded"
            >
              <Icon name="mdi:cog" class="size-6" style="color: gray" />
              <span
                :class="{
                  hidden: isSidebarCollapsed,
                  'ml-2': !isSidebarCollapsed,
                }"
                >Settings</span
              >
            </NuxtLink>
          </li>
          <li class="mb-2">
            <NuxtLink
              to="/"
              class="flex items-center p-2 hover:bg-lime-500 dark:hover:bg-lime-500 rounded"
            >
              <Icon name="mdi:help-circle" class="size-6" style="color: gray" />
              <span
                :class="{
                  hidden: isSidebarCollapsed,
                  'ml-2': !isSidebarCollapsed,
                }"
                >Help</span
              >
            </NuxtLink>
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
