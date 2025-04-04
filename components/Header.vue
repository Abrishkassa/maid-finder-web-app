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
        <div class="hidden md:flex items-center space-x-8">
          <!-- Guest Navigation -->
          <nav v-if="!authStore.isAuthenticated" class="flex space-x-8">
            <NuxtLink
              to="/"
              class="text-gray-700 dark:text-gray-300 hover:text-[#B9FF66] px-3 py-2 text-md font-semibold"
              >Home</NuxtLink
            >
            <NuxtLink
              to="/about"
              class="text-gray-700 dark:text-gray-300 hover:text-[#B9FF66] px-3 py-2 text-md font-semibold"
              >About Us</NuxtLink
            >
            <NuxtLink
              to="/services"
              class="text-gray-700 dark:text-gray-300 hover:text-[#B9FF66] px-3 py-2 text-md font-semibold"
              >Services</NuxtLink
            >
            <NuxtLink
              to="/maids"
              class="text-gray-700 dark:text-gray-300 hover:text-[#B9FF66] px-3 py-2 text-md font-semibold"
              >Find Maids</NuxtLink
            >
            <NuxtLink
              to="/jobs"
              class="text-gray-700 dark:text-gray-300 hover:text-[#B9FF66] px-3 py-2 text-md font-semibold"
              >Find Jobs</NuxtLink
            >
          </nav>

          <!-- Maid Navigation -->
          <nav
            v-else-if="
              authStore.isAuthenticated && authStore.user?.role === 'maid'
            "
            class="flex space-x-8"
          >
            <NuxtLink
              to="/"
              class="text-gray-700 dark:text-gray-300 hover:text-[#B9FF66] px-3 py-2 text-md font-semibold"
              >Home</NuxtLink
            >
            <NuxtLink
              to="/about"
              class="text-gray-700 dark:text-gray-300 hover:text-[#B9FF66] px-3 py-2 text-md font-semibold"
              >About Us</NuxtLink
            >
            <NuxtLink
              to="/services"
              class="text-gray-700 dark:text-gray-300 hover:text-[#B9FF66] px-3 py-2 text-md font-semibold"
              >Services</NuxtLink
            >
            <NuxtLink
              to="/jobs"
              class="text-gray-700 dark:text-gray-300 hover:text-[#B9FF66] px-3 py-2 text-md font-semibold"
              >Find Jobs</NuxtLink
            >
            <NuxtLink
              to="/maids/applications"
              class="text-gray-700 dark:text-gray-300 hover:text-[#B9FF66] px-3 py-2 text-md font-semibold"
              >My Applications</NuxtLink
            >
            <NuxtLink
              to="/maids/offers"
              class="text-gray-700 dark:text-gray-300 hover:text-[#B9FF66] px-3 py-2 text-md font-semibold"
              >Job Offers</NuxtLink
            >
          </nav>

          <!-- Household Navigation -->
          <nav
            v-else-if="
              authStore.isAuthenticated && authStore.user?.role === 'household'
            "
            class="flex space-x-8"
          >
            <NuxtLink
              to="/"
              class="text-gray-700 dark:text-gray-300 hover:text-[#B9FF66] px-3 py-2 text-md font-semibold"
              >Home</NuxtLink
            >
            <NuxtLink
              to="/about"
              class="text-gray-700 dark:text-gray-300 hover:text-[#B9FF66] px-3 py-2 text-md font-semibold"
              >About Us</NuxtLink
            >
            <NuxtLink
              to="/services"
              class="text-gray-700 dark:text-gray-300 hover:text-[#B9FF66] px-3 py-2 text-md font-semibold"
              >Services</NuxtLink
            >
            <NuxtLink
              to="/maids"
              class="text-gray-700 dark:text-gray-300 hover:text-[#B9FF66] px-3 py-2 text-md font-semibold"
              >Find Maids</NuxtLink
            >
            <NuxtLink
              to="/household/jobs"
              class="text-gray-700 dark:text-gray-300 hover:text-[#B9FF66] px-3 py-2 text-md font-semibold"
              >My Job Posts</NuxtLink
            >
            <NuxtLink
              to="/household/applications"
              class="text-gray-700 dark:text-gray-300 hover:text-[#B9FF66] px-3 py-2 text-md font-semibold"
              >Applications</NuxtLink
            >
          </nav>

          <!-- Right side icons and dropdown -->
          <div class="flex items-center space-x-4">
            <!-- Notification -->
            <button
              v-if="authStore.isAuthenticated"
              class="p-1 rounded-full text-gray-700 dark:text-gray-300 hover:text-[#B9FF66] focus:outline-none"
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
                      :src="authStore.user?.avatar || '/default-avatar.jpg'"
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
                      {{ authStore.user?.username }}
                    </p>
                    <p
                      class="text-xs text-gray-500 dark:text-gray-400 truncate"
                    >
                      {{ authStore.user?.email }}
                    </p>
                  </div>

                  <NuxtLink
                    v-if="authStore.user?.role === 'maid'"
                    to="/maids/dashboard"
                    class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    @click="showProfileDropdown = false"
                  >
                    Dashboard
                  </NuxtLink>

                  <NuxtLink
                    v-if="authStore.user?.role === 'household'"
                    to="/household/dashboard"
                    class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    @click="showProfileDropdown = false"
                  >
                    Dashboard
                  </NuxtLink>

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
              class="ml-4 px-4 py-2 border border-transparent rounded-md text-sm font-semibold text-white bg-[#B9FF66] hover:bg-[#a5e55c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B9FF66]"
            >
              Log In
            </NuxtLink>
          </div>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden flex items-center">
          <button
            @click="toggleMenu"
            type="button"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-[#B9FF66] focus:outline-none"
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
        <!-- Guest Mobile Navigation -->
        <template v-if="!authStore.isAuthenticated">
          <NuxtLink
            to="/"
            class="block px-3 py-2 rounded-md text-base font-semibold text-gray-700 dark:text-gray-300 hover:text-[#B9FF66] hover:bg-gray-100 dark:hover:bg-gray-700"
            >Home</NuxtLink
          >
          <NuxtLink
            to="/about"
            class="block px-3 py-2 rounded-md text-base font-semibold text-gray-700 dark:text-gray-300 hover:text-[#B9FF66] hover:bg-gray-100 dark:hover:bg-gray-700"
            >About Us</NuxtLink
          >
          <NuxtLink
            to="/services"
            class="block px-3 py-2 rounded-md text-base font-semibold text-gray-700 dark:text-gray-300 hover:text-[#B9FF66] hover:bg-gray-100 dark:hover:bg-gray-700"
            >Services</NuxtLink
          >
          <NuxtLink
            to="/maids"
            class="block px-3 py-2 rounded-md text-base font-semibold text-gray-700 dark:text-gray-300 hover:text-[#B9FF66] hover:bg-gray-100 dark:hover:bg-gray-700"
            >Find Maids</NuxtLink
          >
          <NuxtLink
            to="/jobs"
            class="block px-3 py-2 rounded-md text-base font-semibold text-gray-700 dark:text-gray-300 hover:text-[#B9FF66] hover:bg-gray-100 dark:hover:bg-gray-700"
            >Find Jobs</NuxtLink
          >
        </template>

        <!-- Maid Mobile Navigation -->
        <template
          v-else-if="
            authStore.isAuthenticated && authStore.user?.role === 'maid'
          "
        >
          <NuxtLink
            to="/"
            class="block px-3 py-2 rounded-md text-base font-semibold text-gray-700 dark:text-gray-300 hover:text-[#B9FF66] hover:bg-gray-100 dark:hover:bg-gray-700"
            >Home</NuxtLink
          >
          <NuxtLink
            to="/about"
            class="block px-3 py-2 rounded-md text-base font-semibold text-gray-700 dark:text-gray-300 hover:text-[#B9FF66] hover:bg-gray-100 dark:hover:bg-gray-700"
            >About Us</NuxtLink
          >
          <NuxtLink
            to="/services"
            class="block px-3 py-2 rounded-md text-base font-semibold text-gray-700 dark:text-gray-300 hover:text-[#B9FF66] hover:bg-gray-100 dark:hover:bg-gray-700"
            >Services</NuxtLink
          >
          <NuxtLink
            to="/jobs"
            class="block px-3 py-2 rounded-md text-base font-semibold text-gray-700 dark:text-gray-300 hover:text-[#B9FF66] hover:bg-gray-100 dark:hover:bg-gray-700"
            >Find Jobs</NuxtLink
          >
          <NuxtLink
            to="/maids/applications"
            class="block px-3 py-2 rounded-md text-base font-semibold text-gray-700 dark:text-gray-300 hover:text-[#B9FF66] hover:bg-gray-100 dark:hover:bg-gray-700"
            >My Applications</NuxtLink
          >
          <NuxtLink
            to="/maids/offers"
            class="block px-3 py-2 rounded-md text-base font-semibold text-gray-700 dark:text-gray-300 hover:text-[#B9FF66] hover:bg-gray-100 dark:hover:bg-gray-700"
            >Job Offers</NuxtLink
          >
        </template>

        <!-- Household Mobile Navigation -->
        <template
          v-else-if="
            authStore.isAuthenticated && authStore.user?.role === 'household'
          "
        >
          <NuxtLink
            to="/"
            class="block px-3 py-2 rounded-md text-base font-semibold text-gray-700 dark:text-gray-300 hover:text-[#B9FF66] hover:bg-gray-100 dark:hover:bg-gray-700"
            >Home</NuxtLink
          >
          <NuxtLink
            to="/about"
            class="block px-3 py-2 rounded-md text-base font-semibold text-gray-700 dark:text-gray-300 hover:text-[#B9FF66] hover:bg-gray-100 dark:hover:bg-gray-700"
            >About Us</NuxtLink
          >
          <NuxtLink
            to="/services"
            class="block px-3 py-2 rounded-md text-base font-semibold text-gray-700 dark:text-gray-300 hover:text-[#B9FF66] hover:bg-gray-100 dark:hover:bg-gray-700"
            >Services</NuxtLink
          >
          <NuxtLink
            to="/maids"
            class="block px-3 py-2 rounded-md text-base font-semibold text-gray-700 dark:text-gray-300 hover:text-[#B9FF66] hover:bg-gray-100 dark:hover:bg-gray-700"
            >Find Maids</NuxtLink
          >
          <NuxtLink
            to="/household/jobs"
            class="block px-3 py-2 rounded-md text-base font-semibold text-gray-700 dark:text-gray-300 hover:text-[#B9FF66] hover:bg-gray-100 dark:hover:bg-gray-700"
            >My Job Posts</NuxtLink
          >
          <NuxtLink
            to="/household/applications"
            class="block px-3 py-2 rounded-md text-base font-semibold text-gray-700 dark:text-gray-300 hover:text-[#B9FF66] hover:bg-gray-100 dark:hover:bg-gray-700"
            >Applications</NuxtLink
          >
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
              {{ authStore.user?.username }}
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
            class="block px-3 py-2 rounded-md text-base font-semibold text-gray-700 dark:text-gray-300 hover:text-[#B9FF66] hover:bg-gray-100 dark:hover:bg-gray-700"
            @click="isMenuOpen = false"
          >
            Dashboard
          </NuxtLink>

          <NuxtLink
            v-if="authStore.user?.role === 'household'"
            to="/household/dashboard"
            class="block px-3 py-2 rounded-md text-base font-semibold text-gray-700 dark:text-gray-300 hover:text-[#B9FF66] hover:bg-gray-100 dark:hover:bg-gray-700"
            @click="isMenuOpen = false"
          >
            Dashboard
          </NuxtLink>

          <NuxtLink
            to="/profile"
            class="block px-3 py-2 rounded-md text-base font-semibold text-gray-700 dark:text-gray-300 hover:text-[#B9FF66] hover:bg-gray-100 dark:hover:bg-gray-700"
            @click="isMenuOpen = false"
          >
            Profile
          </NuxtLink>

          <NuxtLink
            to="/settings"
            class="block px-3 py-2 rounded-md text-base font-semibold text-gray-700 dark:text-gray-300 hover:text-[#B9FF66] hover:bg-gray-100 dark:hover:bg-gray-700"
            @click="isMenuOpen = false"
          >
            Settings
          </NuxtLink>

          <button
            @click="logout"
            class="block w-full text-left px-3 py-2 rounded-md text-base font-semibold text-gray-700 dark:text-gray-300 hover:text-[#B9FF66] hover:bg-gray-100 dark:hover:bg-gray-700"
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
          class="text-gray-700 dark:text-[#F3F3F3] hover:text-[#B9FF66]"
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
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const isMenuOpen = ref(false);
const showProfileDropdown = ref(false);

// Toggle mobile menu
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

// Toggle profile dropdown
const toggleProfileDropdown = () => {
  showProfileDropdown.value = !showProfileDropdown.value;
};

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

<style scoped>
.router-link-active {
  @apply text-[#B9FF66];
}
</style>
