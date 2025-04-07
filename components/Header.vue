<template>
  <header
    class="w-full bg-[#F3F3F3] dark:bg-[#191A23] sticky left-0 right-0 top-0 z-50 border-b border-gray-200 dark:border-gray-700"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex-shrink-0 flex items-center">
          <NuxtLink
            to="/"
            class="text-lg font-semibold text-gray-800 dark:text-white"
          >
            MaidFinder
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center justify-between sapce-x-8">
          <!-- Navigation Links -->
          <nav class="flex space-x-2">
            <template v-for="link in mainNavigationLinks" :key="link.to">
              <!-- Regular Links -->
              <NuxtLink
                v-if="!link.children"
                :to="link.to"
                class="text-gray-700 dark:text-gray-300 hover:text-[#90d43d] px-3 py-2 text-md font-semibold"
                active-class="text-[#90d43d]"
              >
                {{ link.text }}
              </NuxtLink>

              <!-- Dropdown Links -->
              <div v-else class="relative group">
                <button
                  @click="toggleDropdown(link.to)"
                  class="text-gray-700 dark:text-gray-300 hover:text-[#90d43d] px-3 py-2 text-md font-semibold flex items-center"
                >
                  {{ link.text }}
                  <svg
                    class="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>

                <!-- Dropdown menu -->
                <transition
                  enter-active-class="transition ease-out duration-100"
                  enter-from-class="transform opacity-0 scale-95"
                  enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-from-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95"
                >
                  <div
                    v-show="activeDropdown === link.to"
                    @mouseleave="activeDropdown = null"
                    class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                  >
                    <NuxtLink
                      v-for="child in link.children"
                      :key="child.to"
                      :to="child.to"
                      class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      @click="activeDropdown = null"
                    >
                      {{ child.text }}
                    </NuxtLink>
                  </div>
                </transition>
              </div>
            </template>
          </nav>
        </div>

        <!-- Right side icons and dropdown -->
        <div class="flex items-center space-x-4">
          <!-- Notification -->
          <button
            v-if="authStore.isAuthenticated"
            class="p-1 rounded-full text-gray-700 dark:text-gray-300 hover:text-[#90d43d] focus:outline-none"
          >
            <span class="sr-only">View notifications</span>
            <svg
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>

          <LanguageSwitcher />
          <DarkModeToggle />

          <!-- Profile dropdown -->
          <div v-if="authStore.isAuthenticated" class="relative ml-3">
            <div>
              <button
                @click="toggleProfileDropdown"
                class="flex items-center max-w-xs text-md rounded-full focus:outline-none"
                id="user-menu"
              >
                <span class="sr-only">Open user menu</span>
                <div
                  class="h-8 w-8 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-600"
                >
                  <NuxtImg
                    :src="authStore.user?.image || '/default-avatar.jpg'"
                    class="w-full h-full object-cover"
                  />
                </div>
              </button>
            </div>

            <!-- Dropdown menu -->
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <div
                v-show="showProfileDropdown"
                @mouseleave="showProfileDropdown = false"
                class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu"
              >
                <div
                  class="px-4 py-2 border-b border-gray-200 dark:border-gray-700"
                >
                  <p
                    class="text-sm font-semibold text-gray-900 dark:text-white truncate"
                  >
                    {{ authStore.user?.name }}
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {{ authStore.user?.email }}
                  </p>
                </div>

                <NuxtLink
                  to="/profile"
                  class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  @click="showProfileDropdown = false"
                >
                  Profile
                </NuxtLink>

                <NuxtLink
                  to="/settings"
                  class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  @click="showProfileDropdown = false"
                >
                  Settings
                </NuxtLink>

                <button
                  @click="logout"
                  class="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Sign out
                </button>
              </div>
            </transition>
          </div>

          <!-- Login button for guests -->
          <NuxtLink
            v-else
            to="/login"
            class="text-gray-700 dark:text-[#F3F3F3] hover:text-[#90d43d] ml-4"
          >
            Log In
          </NuxtLink>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden flex items-center">
          <button
            @click="toggleMenu"
            type="button"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-[#90d43d] focus:outline-none"
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="block h-6 w-6"
              :class="{ hidden: isMenuOpen, block: !isMenuOpen }"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              class="hidden h-6 w-6"
              :class="{ block: isMenuOpen, hidden: !isMenuOpen }"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div
      v-show="isMenuOpen"
      class="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
    >
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <!-- Mobile Navigation Links -->
        <template v-for="link in mainNavigationLinks" :key="link.to">
          <!-- Regular Mobile Links -->
          <NuxtLink
            v-if="!link.children"
            :to="link.to"
            class="block px-3 py-2 rounded-md text-base font-semibold text-gray-700 dark:text-gray-300 hover:text-[#90d43d] hover:bg-gray-100 dark:hover:bg-gray-700"
            @click="isMenuOpen = false"
            active-class="text-[#90d43d]"
          >
            {{ link.text }}
          </NuxtLink>

          <!-- Mobile Dropdown Links -->
          <div v-else class="relative">
            <button
              @click="toggleMobileDropdown(link.to)"
              class="w-full text-left px-3 py-2 rounded-md text-base font-semibold text-gray-700 dark:text-gray-300 hover:text-[#90d43d] hover:bg-gray-100 dark:hover:bg-gray-700 flex justify-between items-center"
            >
              {{ link.text }}
              <svg
                class="w-4 h-4 ml-1 transform transition-transform"
                :class="{ 'rotate-180': activeMobileDropdown === link.to }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>

            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <div
                v-show="activeMobileDropdown === link.to"
                class="pl-4 space-y-1"
              >
                <NuxtLink
                  v-for="child in link.children"
                  :key="child.to"
                  :to="child.to"
                  class="block px-3 py-2 rounded-md text-base font-semibold text-gray-700 dark:text-gray-300 hover:text-[#90d43d] hover:bg-gray-100 dark:hover:bg-gray-700"
                  @click="isMenuOpen = false"
                >
                  {{ child.text }}
                </NuxtLink>
              </div>
            </transition>
          </div>
        </template>
      </div>

      <!-- Mobile Profile Section -->
      <div
        v-if="authStore.isAuthenticated"
        class="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700"
      >
        <div class="flex items-center px-5">
          <div class="flex-shrink-0">
            <div
              class="h-10 w-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-600"
            >
              <NuxtImg
                :src="authStore.user?.avatar || '/default-avatar.jpg'"
                class="w-full h-full object-cover"
              />
            </div>
          </div>
          <div class="ml-3">
            <div class="text-base font-semibold text-gray-800 dark:text-white">
              {{ authStore.user?.name }}
            </div>
            <div class="text-sm font-semibold text-gray-500 dark:text-gray-400">
              {{ authStore.user?.email }}
            </div>
          </div>
        </div>
        <div class="mt-3 px-2 space-y-1">
          <NuxtLink
            v-if="authStore.user?.role === 'maid'"
            to="/maids/dashboard"
            class="block px-3 py-2 rounded-md text-base font-semibold text-gray-700 dark:text-gray-300 hover:text-[#90d43d] hover:bg-gray-100 dark:hover:bg-gray-700"
            @click="isMenuOpen = false"
          >
            Dashboard
          </NuxtLink>

          <NuxtLink
            v-if="authStore.user?.role === 'household'"
            to="/household/dashboard"
            class="block px-3 py-2 rounded-md text-base font-semibold text-gray-700 dark:text-gray-300 hover:text-[#90d43d] hover:bg-gray-100 dark:hover:bg-gray-700"
            @click="isMenuOpen = false"
          >
            Dashboard
          </NuxtLink>

          <NuxtLink
            to="/profile"
            class="block px-3 py-2 rounded-md text-base font-semibold text-gray-700 dark:text-gray-300 hover:text-[#90d43d] hover:bg-gray-100 dark:hover:bg-gray-700"
            @click="isMenuOpen = false"
          >
            Profile
          </NuxtLink>

          <NuxtLink
            to="/settings"
            class="block px-3 py-2 rounded-md text-base font-semibold text-gray-700 dark:text-gray-300 hover:text-[#90d43d] hover:bg-gray-100 dark:hover:bg-gray-700"
            @click="isMenuOpen = false"
          >
            Settings
          </NuxtLink>

          <button
            @click="logout"
            class="block w-full text-left px-3 py-2 rounded-md text-base font-semibold text-gray-700 dark:text-gray-300 hover:text-[#90d43d] hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Sign out
          </button>
        </div>
      </div>

      <!-- Mobile Login for Guests -->
      <div
        v-else
        class="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700 px-2"
      >
        <NuxtLink
          to="/login"
          class="text-gray-700 dark:text-[#F3F3F3] hover:text-[#90d43d]"
          @click="isMenuOpen = false"
        >
          Log In
        </NuxtLink>
      </div>

      <!-- Mobile Language and Dark Mode -->
      <div
        class="px-4 py-3 border-t border-gray-200 dark:border-gray-700 flex justify-between"
      >
        <LanguageSwitcher />
        <DarkModeToggle />
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from "vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const isMenuOpen = ref(false);
const showProfileDropdown = ref(false);
const activeDropdown = ref(null);
const activeMobileDropdown = ref(null);

// Define navigation links based on user role
const mainNavigationLinks = computed(() => {
  const commonLinks = [
    { to: "/", text: "Home" },
    { to: "/about", text: "About Us" },
    { to: "/services", text: "Services" },
  ];

  if (!authStore.isAuthenticated) {
    return [
      ...commonLinks,
      { to: "/maids", text: "Find Maids" },
      { to: "/jobs", text: "Find Jobs" },
    ];
  }

  if (authStore.user?.role === "maid") {
    return [
      ...commonLinks,
      { to: "/jobs", text: "Find Jobs" },
      { to: "/maids/applications", text: "My Applications" },
      { to: "/maids/offers", text: "Job Offers" },
    ];
  }

  if (authStore.user?.role === "household") {
    return [
      ...commonLinks,
      { to: "/maids", text: "Find Maids" },
      {
        to: "/jobs",
        text: "Jobs",
        children: [
          { to: "/house/job/create", text: "Post a Job" },
          { to: "/house", text: "My Job Posts" },
        ],
      },
      { to: "/household/applications", text: "Applications" },
    ];
  }

  return commonLinks;
});

// Toggle mobile menu
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

// Toggle profile dropdown
const toggleProfileDropdown = () => {
  showProfileDropdown.value = !showProfileDropdown.value;
};

// Toggle dropdown
const toggleDropdown = (dropdown) => {
  activeDropdown.value = activeDropdown.value === dropdown ? null : dropdown;
};

// Toggle mobile dropdown
const toggleMobileDropdown = (dropdown) => {
  activeMobileDropdown.value =
    activeMobileDropdown.value === dropdown ? null : dropdown;
};

// Hydrate and fetch user when component mounts
onMounted(async () => {
  if (!authStore._hydrated) {
    authStore.hydrate();
  }

  if (authStore.isAuthenticated && !authStore.user) {
    try {
      const response = await backendApi.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`,
        },
      });
      authStore.setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  }
});

// Watch for authentication changes
watch(
  () => authStore.isAuthenticated,
  async (authenticated) => {
    if (authenticated && !authStore.user) {
      try {
        const response = await backendApi.get("/auth/me");
        authStore.setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    }
  }
);

// Logout function
const logout = async () => {
  try {
    await authStore.logout();
    await navigateTo("/");
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    showProfileDropdown.value = false;
    isMenuOpen.value = false;
  }
};
</script>
