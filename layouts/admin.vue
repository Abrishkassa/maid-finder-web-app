<template>
  <div
    class="min-h-screen font-sans bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 flex flex-col md:flex-row"
  >
    <!-- Mobile Sidebar Overlay -->
    <transition name="fade">
      <div
        v-if="isSidebarOpen"
        class="fixed inset-0 bg-black/50 z-30 md:hidden"
        @click="toggleMobileMenu"
      />
    </transition>

    <!-- Sidebar -->
    <aside
      :class="[
        'bg-white dark:bg-gray-800 shadow-lg fixed h-full transform transition-all duration-200 z-40',
        isSidebarCollapsed ? 'w-16' : 'w-64',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
      ]"
    >
      <div class="h-full flex flex-col">
        <!-- Mobile Close Button -->
        <button
          @click="toggleMobileMenu"
          class="md:hidden p-2 absolute top-2 right-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
        >
          <Icon name="mdi:close" class="size-6" />
        </button>

        <!-- Navigation Links -->
        <nav class="flex-1 overflow-y-auto py-4 px-2">
          <ul class="space-y-1">
            <li v-for="(item, index) in navItems" :key="index">
              <template v-if="!item.children">
                <NuxtLink
                  :to="item.link"
                  class="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  active-class="bg-gray-100 dark:bg-gray-700 font-medium"
                  @click="closeMobileMenu"
                >
                  <Icon :name="item.icon" class="size-5" />
                  <span v-if="!isSidebarCollapsed" class="ml-3">{{
                    item.label
                  }}</span>
                </NuxtLink>
              </template>
              <template v-else>
                <button
                  @click="toggleSubMenu(index)"
                  class="flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div class="flex items-center">
                    <Icon :name="item.icon" class="size-5" />
                    <span v-if="!isSidebarCollapsed" class="ml-3">{{
                      item.label
                    }}</span>
                  </div>
                  <Icon
                    :name="
                      openSubMenus.includes(index)
                        ? 'mdi:chevron-up'
                        : 'mdi:chevron-down'
                    "
                    class="size-5"
                  />
                </button>

                <transition name="slide">
                  <ul
                    v-if="openSubMenus.includes(index) && !isSidebarCollapsed"
                    class="pl-8 mt-1 space-y-1"
                  >
                    <li
                      v-for="(child, childIndex) in item.children"
                      :key="childIndex"
                    >
                      <NuxtLink
                        :to="child.link"
                        class="flex items-center p-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        active-class="bg-gray-100 dark:bg-gray-700 font-medium"
                        @click="closeMobileMenu"
                      >
                        <Icon :name="child.icon" class="size-4" />
                        <span class="ml-3">{{ child.label }}</span>
                      </NuxtLink>
                    </li>
                  </ul>
                </transition>
              </template>
            </li>
          </ul>
        </nav>

        <!-- Collapse Button -->
        <div class="p-2 border-t border-gray-200 dark:border-gray-700">
          <button
            @click="isSidebarCollapsed = !isSidebarCollapsed"
            class="w-full flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Icon
              :name="
                isSidebarCollapsed ? 'mdi:chevron-right' : 'mdi:chevron-left'
              "
              class="size-5 text-gray-600 dark:text-gray-400"
            />
            <span v-if="!isSidebarCollapsed" class="ml-2 text-sm"
              >Collapse</span
            >
          </button>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <div
      :class="[
        'flex-1 flex flex-col min-h-screen transition-all duration-200 overflow-hidden',
        isSidebarCollapsed ? 'md:ml-16' : 'md:ml-64',
      ]"
    >
      <!-- Sticky Header -->
      <header
        class="sticky top-0 z-20 bg-white dark:bg-gray-800 shadow-sm px-4 py-2 flex items-center justify-between"
      >
        <div class="flex items-center">
          <!-- Mobile Menu Button -->
          <button
            @click="toggleMobileMenu"
            class="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 mr-2"
          >
            <Icon name="mdi:menu" class="size-5" />
          </button>

          <!-- Page Title -->
          <div
            class="flex items-center text-sm text-gray-600 dark:text-gray-400"
          >
            <span class="font-medium text-gray-800 dark:text-gray-200">
              {{ activeTabLabel }}
            </span>
          </div>
        </div>

        <!-- Right Side Controls -->
        <div class="flex items-center space-x-2">
          <!-- Profile -->
          <div class="relative">
            <button
              @click="toggleDropdown('profile')"
              class="flex items-center space-x-1 focus:outline-none"
            >
              <div class="relative">
                <img
                  :src="employee.avatar"
                  alt="Profile"
                  class="size-8 rounded-full object-cover border-2 border-lime-500"
                />
              </div>
            </button>

            <div
              v-if="activeDropdown === 'profile'"
              class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50"
            >
              <div class="p-4 border-b border-gray-200 dark:border-gray-700">
                <p class="text-sm font-medium text-gray-800 dark:text-gray-200">
                  {{ employee.name }}
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {{ employee.email }}
                </p>
              </div>
              <div class="py-1">
                <NuxtLink
                  to="/admin/profile"
                  class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  @click="closeDropdowns"
                >
                  <div class="flex items-center">
                    <Icon name="mdi:account-outline" class="size-4 mr-2" />
                    My Profile
                  </div>
                </NuxtLink>
                <NuxtLink
                  to="/admin/settings"
                  class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  @click="closeDropdowns"
                >
                  <div class="flex items-center">
                    <Icon name="mdi:cog-outline" class="size-4 mr-2" />
                    Settings
                  </div>
                </NuxtLink>
              </div>
              <div class="py-1 border-t border-gray-200 dark:border-gray-700">
                <button
                  @click="logout"
                  class="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center"
                >
                  <Icon name="mdi:logout" class="size-4 mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Main Content Area -->
      <main class="flex-1 p-4 bg-gray-50 dark:bg-gray-900 overflow-auto">
        <div class="max-w-full">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";

const route = useRoute();
const authStore = useAuthStore();

// UI State
const isSidebarOpen = ref(false);
const isSidebarCollapsed = ref(false);
const activeDropdown = ref(null);
const openSubMenus = ref([]);

const navItems = [
  { label: "Dashboard", link: "/admin", icon: "mdi:view-dashboard" },
  { label: "Users", link: "/admin/userslist", icon: "mdi:account-group" },
  {
    label: "Settings",
    icon: "mdi:cog",
    children: [
      {
        label: "General",
        link: "/admin/settings/general",
        icon: "mdi:cog-outline",
      },
      {
        label: "Security",
        link: "/admin/settings/security",
        icon: "mdi:shield-lock-outline",
      },
    ],
  },
];

const employee = ref({
  name: authStore.user?.name || "Admin",
  email: authStore.user?.email || "admin@example.com",
  avatar: authStore.user?.avatar || "/default-avatar.png",
});

// Computed active tab label
const activeTabLabel = computed(() => {
  const currentPath = route.path;
  for (const item of navItems) {
    if (item.link === currentPath) return item.label;
    if (item.children) {
      const childItem = item.children.find(
        (child) => child.link === currentPath
      );
      if (childItem) return childItem.label;
    }
  }
  return "Dashboard"; // Default if no match found
});

// Methods
const toggleMobileMenu = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const closeMobileMenu = () => {
  if (window.innerWidth < 768) {
    isSidebarOpen.value = false;
  }
};

const toggleSubMenu = (index) => {
  const idx = openSubMenus.value.indexOf(index);
  idx > -1 ? openSubMenus.value.splice(idx, 1) : openSubMenus.value.push(index);
};

const toggleDropdown = (name) => {
  activeDropdown.value = activeDropdown.value === name ? null : name;
};

const closeDropdowns = () => {
  activeDropdown.value = null;
};

const logout = async () => {
  await authStore.logout();
  navigateTo("/login");
};
</script>

<style>
/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s ease;
  max-height: 500px;
  overflow: hidden;
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-10px);
}

/* Layout fixes */
html,
body {
  @apply overflow-x-hidden;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  @apply w-2 h-2;
}

::-webkit-scrollbar-track {
  @apply bg-gray-100 dark:bg-gray-800;
}

::-webkit-scrollbar-thumb {
  @apply bg-gray-300 dark:bg-gray-600 rounded-full;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-400 dark:bg-gray-500;
}
</style>
