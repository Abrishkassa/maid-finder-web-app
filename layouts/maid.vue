<template>
  <div
    class="min-h-screen font-serif dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-row"
  >
    <!-- Sidebar -->
    <aside
      :class="[
        'bg-white dark:bg-gray-900 shadow-lg px-4 py-8 fixed h-full transform transition-all duration-200 z-40',
        isSidebarCollapsed ? 'w-16' : 'w-64',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
      ]"
    >
      <!-- Loading state -->
      <div
        v-if="loadingProfile"
        class="absolute inset-0 bg-white/70 dark:bg-gray-900/70 flex items-center justify-center z-50"
      >
        <div
          class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lime-500"
        ></div>
      </div>

      <!-- Cancel Button (Mobile) -->
      <button
        @click="toggleMobileMenu"
        class="md:hidden p-2 absolute top-2 right-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
      >
        <Icon name="mdi:close" class="size-6" />
      </button>

      <!-- Profile Section -->
      <div class="mb-6 flex flex-col items-center">
        <button
          class="flex items-center justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full mb-2"
        >
          <NuxtImg
            :src="employee.avatar"
            class="size-20 rounded-full"
            alt="Profile picture"
          />
        </button>

        <h2
          class="text-lg font-semibold text-gray-800 dark:text-white"
          v-if="!isSidebarCollapsed"
        >
          Hello {{ employee.name || "User" }}
        </h2>

        <p class="text-sm text-gray-500" v-if="!isSidebarCollapsed">
          {{ employee.email || " " }}
        </p>
        <span
          v-if="!isSidebarCollapsed && employee.verificationStatus"
          class="text-xs mt-1 px-2 py-1 rounded-full"
          :class="{
            'bg-green-100 text-green-800':
              employee.verificationStatus === 'verified',
            'bg-yellow-100 text-yellow-800':
              employee.verificationStatus !== 'verified',
          }"
        >
          {{
            employee.verificationStatus === "verified"
              ? "Verified"
              : "Pending Verification"
          }}
        </span>
      </div>

      <!-- Error message -->
      <div
        v-if="profileError"
        class="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-2 rounded mb-4 text-sm"
      >
        {{ profileError }}
      </div>

      <!-- Navigation Links -->
      <nav>
        <ul>
          <li v-for="(item, index) in navItems" :key="index" class="mb-2">
            <!-- Parent Menu Item -->
            <NuxtLink
              v-if="!item.children"
              :to="item.link"
              class="flex items-center p-2 hover:bg-lime-500 dark:hover:bg-lime-500 rounded"
              active-class="bg-lime-500 dark:bg-lime-500 text-white"
            >
              <Icon :name="item.icon" class="size-6" />
              <span v-if="!isSidebarCollapsed" class="ml-2">{{
                item.label
              }}</span>
            </NuxtLink>

            <!-- Parent Menu Item with Submenu -->
            <div v-else>
              <button
                @click="toggleSubMenu(index)"
                class="flex items-center justify-between w-full p-2 hover:bg-lime-500 dark:hover:bg-lime-500 rounded"
              >
                <div class="flex items-center">
                  <Icon :name="item.icon" class="size-6" />
                  <span v-if="!isSidebarCollapsed" class="ml-2">{{
                    item.label
                  }}</span>
                </div>
                <Icon
                  :name="
                    openSubMenus.includes(index)
                      ? 'mdi:chevron-up'
                      : 'mdi:chevron-down'
                  "
                  class="size-6"
                />
              </button>

              <!-- Submenu -->
              <ul
                v-if="openSubMenus.includes(index)"
                class="pl-6 mt-2 space-y-2"
              >
                <li
                  v-for="(child, childIndex) in item.children"
                  :key="childIndex"
                >
                  <NuxtLink
                    :to="child.link"
                    class="flex items-center p-2 hover:bg-lime-500 dark:hover:bg-lime-500 rounded"
                    active-class="bg-lime-500 dark:bg-lime-500 text-white"
                  >
                    <Icon :name="child.icon" class="size-6" />
                    <span v-if="!isSidebarCollapsed" class="ml-2">{{
                      child.label
                    }}</span>
                  </NuxtLink>
                </li>
              </ul>
            </div>
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
        class="mt-6 w-full p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        @click="logout"
        :disabled="loadingProfile"
      >
        <span v-if="!loadingProfile">Logout</span>
        <span v-else class="flex items-center justify-center">
          <Icon name="eos-icons:loading" class="animate-spin size-5" />
        </span>
      </button>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Sticky Header -->
      <header
        class="sticky top-0 z-10 bg-[#F3F3F3] shadow-sm dark:bg-gray-900 px-4 py-2 flex justify-between items-center"
      >
        <!-- Hamburger Menu and Profile Circle (Small Screens) -->
        <div class="flex items-center space-x-4 md:hidden">
          <button
            @click="toggleMobileMenu"
            class="p-2 bg-white dark:bg-gray-800 rounded shadow"
          >
            <Icon name="mdi:menu" class="size-5" />
          </button>
        </div>

        <!-- Search Bar -->
        <div class="flex-1 flex justify-center md:justify-center">
          <div class="relative max-w-md w-full">
            <input
              type="text"
              placeholder="Search..."
              class="pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-lime-500 w-full"
              :disabled="loadingProfile"
            />
            <Icon
              name="mdi:magnify"
              class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
            />
          </div>
        </div>

        <!-- Right Side: Language, Dark Mode, Notification -->
        <div class="hidden md:flex items-center mr-8 space-x-2">
          <LanguageSwitcher />
          <DarkModeToggle />

          <!-- Notification Icon -->
          <div class="relative">
            <button
              class="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              @click="toggleNotificationDropdown"
              :disabled="loadingProfile"
            >
              <Icon
                name="mdi:bell-outline"
                class="size-6 text-gray-600 dark:text-gray-400"
              />
              <span
                v-if="unreadNotifications > 0"
                class="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full size-5 flex items-center justify-center"
              >
                {{ unreadNotifications }}
              </span>
            </button>

            <!-- Notification Dropdown -->
            <div
              v-if="isNotificationDropdownOpen"
              class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50"
              v-click-outside="() => (isNotificationDropdownOpen = false)"
            >
              <ul>
                <li v-for="(notification, index) in notifications" :key="index">
                  <a
                    href="#"
                    class="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    @click.prevent="handleNotificationClick(notification)"
                  >
                    {{ notification.message }}
                  </a>
                </li>
                <li v-if="notifications.length === 0">
                  <span
                    class="block px-4 py-2 text-gray-500 dark:text-gray-400 text-sm"
                  >
                    No notifications
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      <!-- Main Content Area -->
      <div class="p-4 dark:bg-gray-900 bg-[#F3F3F3]">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import backendAPI from "@/networkServices/api/backendApi.js";
import { useAuthStore } from "@/stores/auth";
import { ref, onMounted } from "vue";

// Reactive state
const isSidebarOpen = ref(false);
const isSidebarCollapsed = ref(false);
const isNotificationDropdownOpen = ref(false);
const openSubMenus = ref([]);
const loadingProfile = ref(false);
const profileError = ref(null);
const authStore = useAuthStore();

// Notifications
const notifications = ref([]);
const unreadNotifications = ref(0);

// Employee data with default values
const employee = ref({
  name: "",
  email: "",
  avatar: "/default-avatar.jpg",
  role: "",
  profileComplete: false,
});

// Fetch maid profile
const fetchProfile = async () => {
  try {
    loadingProfile.value = true;
    profileError.value = null;

    // Ensure auth store is hydrated
    await authStore.hydrate();

    // Check authentication and token validity
    if (!authStore.isAuthenticated) {
      throw new Error("Not authenticated");
    }

    // Try to refresh token if expired
    const tokenValid = await authStore.checkTokenRefresh();
    if (!tokenValid) {
      throw new Error("Session expired");
    }

    // Fetch profile with authorization header
    const response = await backendAPI.get("/profile", {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    });

    // Update employee data
    employee.value = {
      name: response.data.first_name || "Maid User",
      email: response.data.email || authStore.user?.email || "",
      avatar: response.data.identity_image_url || "/default-avatar.jpg",
      identityImage: response.data.identity_image_url,
      profileComplete: response.data.profileComplete || false,
      verificationStatus: response.data.verification_status,
    };

    // Update user data in store
    // authStore.setUser({
    //   ...authStore.user,
    //   ...employee.value,
    // });
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    profileError.value =
      error.response?.data?.message ||
      error.message ||
      "Failed to load profile";

    if (error.response?.status === 401) {
      authStore.logout();
      navigateTo("/login");
    }
  } finally {
    loadingProfile.value = false;
  }
};

// Fetch notifications
const fetchNotifications = async () => {
  try {
    const response = await backendAPI.get("/notifications", {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    });
    notifications.value = response.data.notifications || [];
    unreadNotifications.value = response.data.unreadCount || 0;
  } catch (error) {
    console.error("Failed to fetch notifications:", error);
  }
};

// Handle notification click
const handleNotificationClick = (notification) => {
  // Mark as read
  backendAPI.patch(`/notifications/${notification.id}/read`, null, {
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`,
    },
  });

  // Navigate or perform action
  if (notification.link) {
    navigateTo(notification.link);
  }

  // Close dropdown
  isNotificationDropdownOpen.value = false;
};

onMounted(async () => {
  await fetchProfile();
});

// Navigation items
const navItems = [
  { label: "Dashboard", link: "/maids/dashboard", icon: "mdi:home" },
  {
    label: "Applications",
    icon: "mdi:apps",
    children: [
      {
        label: "Job Applications",
        link: "/maids/dashboard/applications",
        icon: "mdi:application",
      },
      {
        label: "Job Offers",
        link: "/maids/dashboard/offers",
        icon: "mdi:briefcase",
      },
    ],
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

const toggleNotificationDropdown = () => {
  if (!loadingProfile.value) {
    isNotificationDropdownOpen.value = !isNotificationDropdownOpen.value;
    if (isNotificationDropdownOpen.value && unreadNotifications.value > 0) {
      markNotificationsAsRead();
    }
  }
};

// Mark notifications as read
const markNotificationsAsRead = async () => {
  try {
    await backendAPI.patch("/notifications/mark-as-read", null, {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    });
    unreadNotifications.value = 0;
  } catch (error) {
    console.error("Failed to mark notifications as read:", error);
  }
};

// Toggle submenu
const toggleSubMenu = (index) => {
  if (!loadingProfile.value) {
    if (openSubMenus.value.includes(index)) {
      openSubMenus.value = openSubMenus.value.filter((i) => i !== index);
    } else {
      openSubMenus.value.push(index);
    }
  }
};

// Logout function
const logout = async () => {
  if (loadingProfile.value) return;

  try {
    loadingProfile.value = true;
    await backendAPI.post("/auth/logout", null, {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    });
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    authStore.logout();
    navigateTo("/login");
    loadingProfile.value = false;
  }
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>
