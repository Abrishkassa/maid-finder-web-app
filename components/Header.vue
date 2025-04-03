<template>
  <header
    class="w-full bg-[#F3F3F3] dark:bg-[#191A23] sticky left-0 right-0 top-0 z-50"
  >
    <div class="max-w-7xl mx-auto px-8 flex items-center justify-between py-2">
      <!-- Logo -->
      <div class="flex items-center space-x-2">
        <NuxtLink
          to="/"
          class="text-lg font-semibold text-gray-800 dark:text-white"
          >MaidFinder</NuxtLink
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
        <NuxtLink to="/about" class="hover:text-[#B9FF66]">About us</NuxtLink>
        <NuxtLink to="/services" class="hover:text-[#B9FF66]"
          >Services</NuxtLink
        >
        <NuxtLink to="/maids" class="hover:text-[#B9FF66]">
          Find Maids
        </NuxtLink>
        <NuxtLink to="/Jobs" class="hover:text-[#B9FF66]"> Find Jobs </NuxtLink>
      </nav>

      <!-- Right Buttons (Desktop) -->
      <div class="hidden md:flex items-center font-semibold space-x-4">
        <LanguageSwitcher />
        <DarkModeToggle />

        <!-- Show profile dropdown if authenticated -->
        <div
          class="relative"
          v-if="authStore.isAuthenticated"
          @mouseenter="showProfileDropdown = true"
          @mouseleave="showProfileDropdown = false"
        >
          <button
            @click="toggleProfileDropdown"
            class="flex items-center focus:outline-none"
          >
            <div class="w-8 h-8 rounded-full overflow-hidden bg-gray-300">
              <img alt="Profile" class="w-full h-full object-cover" />
            </div>
          </button>

          <!-- Maid Profile dropdown menu -->
          <div
            v-if="authStore.isAuthenticated && authStore.user?.role === 'maid'"
            class="absolute right-0 mt-2 w-48 bg-white dark:bg-[#191A23] rounded-md shadow-lg py-1 z-50"
            v-show="showProfileDropdown"
            @mouseenter="showProfileDropdown = true"
            @mouseleave="showProfileDropdown = false"
          >
            <div
              class="px-4 py-2 text-sm text-gray-700 dark:text-[#F3F3F3] border-b dark:border-gray-700"
            >
              <p class="font-semibold">{{ authStore.user?.username }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                {{ authStore.user?.email }}
              </p>
            </div>
            <NuxtLink
              to="/maids/dashboard"
              class="block px-4 py-2 text-sm text-gray-700 dark:text-[#F3F3F3] hover:bg-gray-100 dark:hover:bg-gray-700"
              @click="showProfileDropdown = false"
            >
              Dashboard
            </NuxtLink>
            <NuxtLink
              to="/maids/dashboard/profile"
              class="block px-4 py-2 text-sm text-gray-700 dark:text-[#F3F3F3] hover:bg-gray-100 dark:hover:bg-gray-700"
              @click="showProfileDropdown = false"
              >Profile</NuxtLink
            >

            <NuxtLink
              to="/settings"
              class="block px-4 py-2 text-sm text-gray-700 dark:text-[#F3F3F3] hover:bg-gray-100 dark:hover:bg-gray-700"
              @click="showProfileDropdown = false"
              >Settings</NuxtLink
            >
            <button
              @click="logout"
              class="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-[#F3F3F3] hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Sign out
            </button>
          </div>
          <!-- household Profile dropdown menu -->
          <div
            v-if="
              authStore.isAuthenticated && authStore.user?.role === 'household'
            "
            class="absolute right-0 mt-2 w-48 bg-white dark:bg-[#191A23] rounded-md shadow-lg py-1 z-50"
            v-show="showProfileDropdown"
            @mouseenter="showProfileDropdown = true"
            @mouseleave="showProfileDropdown = false"
          >
            <div
              class="px-4 py-2 text-sm text-gray-700 dark:text-[#F3F3F3] border-b dark:border-gray-700"
            >
              <p class="font-semibold">{{ authStore.user?.username }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                {{ authStore.user?.email }}
              </p>
            </div>
            <NuxtLink
              to="/dashboard"
              class="block px-4 py-2 text-sm text-gray-700 dark:text-[#F3F3F3] hover:bg-gray-100 dark:hover:bg-gray-700"
              @click="showProfileDropdown = false"
            >
              Dashboard
            </NuxtLink>
            <NuxtLink
              to="/profile"
              class="block px-4 py-2 text-sm text-gray-700 dark:text-[#F3F3F3] hover:bg-gray-100 dark:hover:bg-gray-700"
              @click="showProfileDropdown = false"
              >Profile</NuxtLink
            >

            <NuxtLink
              to="/settings"
              class="block px-4 py-2 text-sm text-gray-700 dark:text-[#F3F3F3] hover:bg-gray-100 dark:hover:bg-gray-700"
              @click="showProfileDropdown = false"
              >Settings</NuxtLink
            >
            <button
              @click="logout"
              class="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-[#F3F3F3] hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Sign out
            </button>
          </div>
        </div>

        <!-- Show login button if not authenticated -->
        <NuxtLink
          v-else
          to="/login"
          class="text-gray-700 dark:text-[#F3F3F3] hover:text-[#B9FF66]"
          >Log in</NuxtLink
        >
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
        <NuxtLink to="/about" class="hover:text-[#B9FF66]">About us</NuxtLink>
        <NuxtLink to="/services" class="hover:text-[#B9FF66]"
          >Services</NuxtLink
        >
        <NuxtLink
          v-if="authStore.user?.role === 'household'"
          to="/maids"
          class="hover:text-[#B9FF66]"
        >
          Find Maids
        </NuxtLink>
        <NuxtLink
          v-if="authStore.user?.role === 'maid'"
          to="/Jobs"
          class="hover:text-[#B9FF66]"
        >
          Find Jobs
        </NuxtLink>

        <!-- Mobile profile section -->
        <template v-if="authStore.isAuthenticated">
          <NuxtLink to="/dashboard" class="hover:text-[#B9FF66]"
            >Dashboard</NuxtLink
          >
          <NuxtLink to="/profile" class="hover:text-[#B9FF66]"
            >Profile</NuxtLink
          >
          <NuxtLink
            v-if="authStore.user?.role === 'maid'"
            to="/maid/profile"
            class="hover:text-[#B9FF66]"
          >
            Maid Profile
          </NuxtLink>
          <NuxtLink
            v-if="authStore.user?.role === 'household'"
            to="/household/profile"
            class="hover:text-[#B9FF66]"
          >
            Household Profile
          </NuxtLink>
          <NuxtLink to="/settings" class="hover:text-[#B9FF66]"
            >Settings</NuxtLink
          >
          <button
            @click="logout"
            class="text-left text-gray-700 dark:text-[#F3F3F3] hover:text-[#B9FF66]"
          >
            Sign out
          </button>
        </template>

        <NuxtLink
          v-else
          to="/login"
          class="text-gray-700 dark:text-[#F3F3F3] hover:text-[#B9FF66]"
          >Log in</NuxtLink
        >

        <div class="flex items-center space-x-4 pt-2">
          <LanguageSwitcher />
          <DarkModeToggle />
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useAuthStore } from "@/stores/auth";
import backendApi from "@/networkServices/api/backendApi"; // Make sure this path is correct

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

// Hydrate and fetch user when component mounts
onMounted(async () => {
  if (!authStore._hydrated) {
    authStore.hydrate();
  }

  try {
    const response = await backendApi.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    }); // Changed to GET as it's more standard for fetching data

    authStore.setUser(response.data); // Store the user data in the auth store
  } catch (error) {
    console.error("Failed to fetch user:", error);
    // Optional: handle error (e.g., show toast notification)
  }
});

// Watch for authentication changes
watch(
  () => authStore.isAuthenticated,
  async (authenticated) => {
    if (authenticated && !authStore.user) {
      try {
        const response = await backendApi.post("/auth/me");
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

<style>
/* Add this to handle dropdown clicks */
.relative {
  position: relative;
}
</style>
