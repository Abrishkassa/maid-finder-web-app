<template>
  <div
    class="min-h-screen font-serif bg-[#F3F3F3] dark:bg-[#191A23] text-gray-900 dark:text-gray-100 flex flex-row"
  >
    <!-- Sidebar -->
    <aside
      :class="[
        'bg-white dark:bg-[#191A23] shadow-lg px-4 py-8 fixed h-full transform transition-all duration-200 z-40',
        isSidebarCollapsed ? 'w-16' : 'w-64',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
      ]"
    >
      <!-- Cancel Button (Mobile) -->
      <button
        @click="toggleMobileMenu"
        class="md:hidden p-2 absolute top-2 right-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
      >
        <Icon name="mdi:close" class="size-6" />
      </button>

      <!-- Profile Section -->
      <div class="mb-6 flex justify-between items-center">
        <h2
          class="text-lg font-semibold text-gray-800 dark:text-white"
          v-if="!isSidebarCollapsed"
        >
          MaidFinder
        </h2>
        <ColorModeToggle class="hidden md:block" />
      </div>

      <!-- Navigation Links -->
      <nav>
        <ul>
          <li v-for="(item, index) in navItems" :key="index" class="mb-2">
            <NuxtLink
              :to="item.link"
              class="flex items-center p-2 hover:bg-lime-500 dark:hover:bg-lime-500 rounded"
            >
              <Icon :name="item.icon" class="size-6 text-gray-500" />
              <span v-if="!isSidebarCollapsed" class="ml-2">{{
                item.label
              }}</span>
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <!-- Language Switcher and Dark Mode Toggle (Mobile) -->
      <div class="mt-6 md:hidden flex flex-row space-x-4">
        <LanguageSwitcher />
        <DarkModeToggle />
      </div>

      <!-- Logout Button -->
      <button
        v-if="!isSidebarCollapsed"
        class="mt-6 w-full p-2 bg-red-500 text-white rounded hover:bg-red-600"
        @click="logout"
      >
        Logout
      </button>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Sticky Header -->
      <header
        class="sticky top-0 z-30 bg-[#F3F3F3] shadow-sm dark:bg-[#191A23] px-4 py-2 flex justify-between items-center"
      >
        <!-- Hamburger Menu and Profile Circle (Small Screens) -->
        <div class="flex items-center space-x-4 md:hidden">
          <!-- Hamburger Menu (Mobile) -->
          <button
            @click="toggleMobileMenu"
            class="p-2 bg-white dark:bg-gray-800 rounded shadow"
          >
            ☰
          </button>

          <!-- Profile Circle (Small Screens) -->
          <button
            @click="toggleProfileDropdown"
            class="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <div class="size-8 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
          </button>
        </div>

        <!-- Search Bar (Centered on Desktop) -->
        <div class="flex-1 flex justify-center md:justify-center">
          <div class="relative max-w-md w-full">
            <input
              type="text"
              placeholder="Search..."
              class="pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-lime-500 w-full"
            />
            <Icon
              name="mdi:magnify"
              class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
            />
          </div>
        </div>

        <!-- Right Side: Language, Dark Mode, Notification, Profile (Larger Screens) -->
        <div class="hidden md:flex items-center space-x-4">
          <!-- Dark Mode Toggle -->
          <DarkModeToggle />

          <!-- Notification Icon -->
          <div class="relative">
            <button
              class="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              @click="toggleNotificationDropdown"
            >
              <Icon
                name="mdi:bell-outline"
                class="size-6 text-gray-600 dark:text-gray-400"
              />
              <span
                class="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1"
                >3</span
              >
            </button>

            <!-- Notification Dropdown -->
            <div
              v-if="isNotificationDropdownOpen"
              class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
            >
              <ul>
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Notification 1
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Notification 2
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Notification 3
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <!-- Profile Dropdown -->
          <div class="relative">
            <button
              @click="toggleProfileDropdown"
              class="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              <div
                class="size-8 bg-gray-300 dark:bg-gray-600 rounded-full"
              ></div>
              <Icon
                name="mdi:chevron-down"
                class="size-4 text-gray-600 dark:text-gray-400"
              />
            </button>

            <!-- Dropdown Menu -->
            <div
              v-if="isProfileDropdownOpen"
              class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
            >
              <ul>
                <li>
                  <NuxtLink
                    to="/profile"
                    class="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Profile
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink
                    to="/settings"
                    class="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Settings
                  </NuxtLink>
                </li>
                <li>
                  <button
                    class="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    @click="logout"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      <!-- Main Content Area -->
      <div class="p-4 dark:bg-[#191A23] bg-[#F3F3F3] flex-1">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
// Reactive state
const isSidebarOpen = ref(false);
const isSidebarCollapsed = ref(false);
const isProfileDropdownOpen = ref(false);
const isNotificationDropdownOpen = ref(false);

// Navigation items
const navItems = [
  { label: "Dashboard", link: "/maids/dashboard", icon: "mdi:home" },
  {
    label: "Applications",
    link: "/maids/dashboard/applications",
    icon: "mdi:apps",
  },
  { label: "Messages", link: "/maids/dashboard/messages", icon: "mdi:email" },
  { label: "Payments", link: "/maids/dashboard/payments", icon: "mdi:cash" },
  { label: "Settings", link: "/maids/dashboard/settings", icon: "mdi:cog" },
  {
    label: "Help",
    link: "/maids/dashboard/help",
    icon: "mdi:help-circle",
  },
];

// Toggle functions
const toggleMobileMenu = () => (isSidebarOpen.value = !isSidebarOpen.value);
const toggleProfileDropdown = () =>
  (isProfileDropdownOpen.value = !isProfileDropdownOpen.value);
const toggleNotificationDropdown = () =>
  (isNotificationDropdownOpen.value = !isNotificationDropdownOpen.value);

// Logout function
const logout = () => {
  // Add logout logic here
  console.log("User logged out");
};
</script>
