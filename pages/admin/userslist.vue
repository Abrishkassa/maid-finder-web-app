<template>
  <div class="space-y-6">
    <!-- Filters Card -->
    <div
      class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700"
    >
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <!-- Search -->
        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >Search Users</label
          >
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search by name, email..."
              class="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              @input="debouncedSearch"
            />
            <Icon
              name="mdi:magnify"
              class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 size-4"
            />
          </div>
        </div>

        <!-- Role Filter -->
        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >Role</label
          >
          <select
            v-model="roleFilter"
            class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
            @change="fetchUsers"
          >
            <option value="all">All Roles</option>
            <option
              v-for="role in availableRoles"
              :key="role.value"
              :value="role.value"
            >
              {{ role.label }}
            </option>
          </select>
        </div>

        <!-- Reset Filters -->
        <div class="flex items-end">
          <button
            @click="resetFilters"
            class="w-full px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content Card -->
    <div
      class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-200 dark:border-gray-700"
    >
      <!-- Loading State -->
      <div v-if="loading" class="p-8 flex items-center justify-center">
        <div class="flex flex-col items-center">
          <Spinner size="lg" />
          <p class="mt-3 text-sm text-gray-500 dark:text-gray-400">
            Loading users...
          </p>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-else-if="users.length === 0"
        class="p-8 flex flex-col items-center justify-center text-center"
      >
        <div class="p-4 bg-gray-100 dark:bg-gray-700 rounded-full mb-4">
          <Icon
            name="mdi:account-multiple"
            class="size-8 text-gray-400 dark:text-gray-500"
          />
        </div>
        <h3 class="text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">
          No users found
        </h3>
        <p class="text-gray-500 dark:text-gray-400 max-w-md text-sm mb-4">
          {{
            hasActiveFilters
              ? "No users match your current filters. Try adjusting your search criteria."
              : "There are no users in the system yet."
          }}
        </p>
        <NuxtLink
          v-if="!hasActiveFilters"
          to="/admin/users/create"
          class="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors shadow-sm text-sm"
        >
          <Icon name="mdi:plus" class="size-5 mr-2" />
          Create First User
        </NuxtLink>
        <button
          v-else
          @click="resetFilters"
          class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition-colors text-sm"
        >
          Clear Filters
        </button>
      </div>

      <!-- Users Table -->
      <div v-else>
        <div class="overflow-x-auto">
          <table
            class="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
          >
            <thead class="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  User
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Contact
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Role
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Created At
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody
              class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700"
            >
              <tr
                v-for="user in users"
                :key="user.id"
                class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <!-- User Column -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 size-10">
                      <img
                        class="size-10 rounded-full object-cover border border-gray-200 dark:border-gray-600"
                        :src="'/default-avatar.png'"
                        :alt="user.name"
                      />
                    </div>
                    <div class="ml-4">
                      <div
                        class="text-sm font-medium text-gray-900 dark:text-gray-100"
                      >
                        {{ user.name }}
                        <span
                          v-if="user.id === currentUserId"
                          class="ml-1 text-xs text-primary-600 dark:text-primary-400"
                          >(You)</span
                        >
                      </div>
                    </div>
                  </div>
                </td>

                <!-- Contact Column -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900 dark:text-gray-100">
                    {{ user.email }}
                  </div>
                </td>

                <!-- Role Column -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="px-2 py-1 inline-flex text-xs leading-4 font-medium rounded-full"
                    :class="{
                      'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200':
                        user.role === 1,
                      'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200':
                        user.role === 2,
                      'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200':
                        user.role === 3,
                      'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200':
                        user.role === 4,
                    }"
                  >
                    {{ user.role_name }}
                  </span>
                </td>

                <!-- Created At Column -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900 dark:text-gray-100">
                    {{ formatDate(user.created_at) }}
                  </div>
                </td>

                <!-- Actions Column -->
                <td
                  class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                >
                  <div class="flex justify-end space-x-2">
                    <Tooltip text="Edit User">
                      <NuxtLink
                        :to="`/admin/users/${user.id}/edit`"
                        class="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <Icon name="mdi:pencil-outline" class="size-5" />
                      </NuxtLink>
                    </Tooltip>

                    <Tooltip text="Delete User">
                      <button
                        @click="confirmDeleteUser(user)"
                        :disabled="user.id === currentUserId"
                        class="text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Icon name="mdi:trash-can-outline" class="size-5" />
                      </button>
                    </Tooltip>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div
          class="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6"
        >
          <div class="flex-1 flex items-center justify-between sm:hidden">
            <button
              @click="prevPage"
              :disabled="pagination.current_page === 1"
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50"
            >
              Previous
            </button>
            <div class="text-sm text-gray-700 dark:text-gray-300">
              Page {{ pagination.current_page }} of {{ pagination.total_pages }}
            </div>
            <button
              @click="nextPage"
              :disabled="pagination.current_page === pagination.total_pages"
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <div
            class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
          >
            <div>
              <p class="text-sm text-gray-700 dark:text-gray-300">
                Showing
                <span class="font-medium">{{
                  (pagination.current_page - 1) * 10 + 1
                }}</span>
                to
                <span class="font-medium">{{
                  Math.min(pagination.current_page * 10, pagination.total_users)
                }}</span>
                of
                <span class="font-medium">{{ pagination.total_users }}</span>
                users
              </p>
            </div>
            <div>
              <nav
                class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <button
                  @click="prevPage"
                  :disabled="pagination.current_page === 1"
                  class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span class="sr-only">Previous</span>
                  <Icon name="mdi:chevron-left" class="size-5" />
                </button>

                <template v-for="page in visiblePages" :key="page">
                  <button
                    v-if="typeof page === 'number'"
                    @click="goToPage(page)"
                    :class="{
                      'z-10 bg-primary-50 dark:bg-primary-900 border-primary-500 dark:border-primary-600 text-primary-600 dark:text-primary-300':
                        pagination.current_page === page,
                      'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600':
                        pagination.current_page !== page,
                    }"
                    class="relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  >
                    {{ page }}
                  </button>
                  <span
                    v-else
                    class="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    ...
                  </span>
                </template>

                <button
                  @click="nextPage"
                  :disabled="pagination.current_page === pagination.total_pages"
                  class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span class="sr-only">Next</span>
                  <Icon name="mdi:chevron-right" class="size-5" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <Modal
      :show="showDeleteModal"
      @close="showDeleteModal = false"
      max-width="sm"
    >
      <div class="p-6">
        <div
          class="flex items-center justify-center size-12 mx-auto bg-red-100 dark:bg-red-900 rounded-full mb-4"
        >
          <Icon
            name="mdi:alert-circle-outline"
            class="size-6 text-red-600 dark:text-red-400"
          />
        </div>
        <h3
          class="text-lg font-medium text-center text-gray-900 dark:text-gray-100 mb-2"
        >
          Confirm User Deletion
        </h3>
        <p class="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">
          You are about to permanently delete
          <span class="font-medium text-gray-900 dark:text-gray-100">{{
            userToDelete?.name
          }}</span
          >. This action cannot be undone.
        </p>
        <div class="flex justify-center space-x-4">
          <button
            @click="showDeleteModal = false"
            class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm"
          >
            Cancel
          </button>
          <button
            @click="deleteUser"
            class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center text-sm"
          >
            <Icon
              v-if="deleting"
              name="mdi:loading"
              class="animate-spin size-4 mr-2"
            />
            Delete User
          </button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup>
import { debounce } from "lodash";

// Data
const users = ref([]);
const loading = ref(true);
const searchQuery = ref("");
const roleFilter = ref("all");
const availableRoles = ref([
  { value: 1, label: "Admin" },
  { value: 2, label: "Household" },
  { value: 3, label: "Maid" },
  { value: 4, label: "Unknown" },
]);
const pagination = ref({
  current_page: 1,
  total_pages: 1,
  total_users: 0,
});
const showDeleteModal = ref(false);
const userToDelete = ref(null);
const deleting = ref(false);
const currentUserId = ref(null); // Assuming you have a way to get current user ID

// Computed
const hasActiveFilters = computed(() => {
  return searchQuery.value !== "" || roleFilter.value !== "all";
});

const visiblePages = computed(() => {
  const current = pagination.value.current_page;
  const last = pagination.value.total_pages;
  const delta = 2;
  const range = [];

  for (
    let i = Math.max(2, current - delta);
    i <= Math.min(last - 1, current + delta);
    i++
  ) {
    range.push(i);
  }

  if (current - delta > 2) {
    range.unshift("...");
  }
  if (current + delta < last - 1) {
    range.push("...");
  }

  range.unshift(1);
  if (last !== 1) range.push(last);

  return range;
});

// Methods
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString([], {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const resetFilters = () => {
  searchQuery.value = "";
  roleFilter.value = "all";
  fetchUsers();
};

// API (assuming you have an API helper)
const api = useNuxtApp().$api; // or your preferred API client

// Toast notification helper
const showToast = (message, type = "success") => {
  // Implement your toast notification logic here
  console.log(`${type}: ${message}`);
};

// Debounced search
const debouncedSearch = debounce(() => {
  fetchUsers();
}, 500);

// Fetch users
const fetchUsers = async () => {
  try {
    loading.value = true;
    const params = {
      page: pagination.value.current_page,
      search: searchQuery.value,
      role: roleFilter.value !== "all" ? roleFilter.value : undefined,
    };

    // Remove undefined params
    Object.keys(params).forEach(
      (key) => params[key] === undefined && delete params[key]
    );

    const { data } = await api.get("/admin/users", { params });
    users.value = data.users;
    pagination.value = {
      current_page: data.pagination.current_page,
      total_pages: data.pagination.total_pages,
      total_users: data.pagination.total_users,
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    showToast("Failed to fetch users", "error");
  } finally {
    loading.value = false;
  }
};

// Pagination
const prevPage = () => {
  if (pagination.value.current_page > 1) {
    pagination.value.current_page--;
    fetchUsers();
  }
};

const nextPage = () => {
  if (pagination.value.current_page < pagination.value.total_pages) {
    pagination.value.current_page++;
    fetchUsers();
  }
};

const goToPage = (page) => {
  if (page !== pagination.value.current_page && typeof page === "number") {
    pagination.value.current_page = page;
    fetchUsers();
  }
};

// User actions
const confirmDeleteUser = (user) => {
  userToDelete.value = user;
  showDeleteModal.value = true;
};

const deleteUser = async () => {
  try {
    deleting.value = true;
    await api.delete(`/admin/users/${userToDelete.value.id}`);
    showToast("User deleted successfully", "success");
    fetchUsers();
    showDeleteModal.value = false;
  } catch (error) {
    console.error("Error deleting user:", error);
    showToast("Failed to delete user", "error");
  } finally {
    deleting.value = false;
  }
};

// Lifecycle
onMounted(() => {
  fetchUsers();
  // Set current user ID (you'll need to implement this based on your auth system)
  // currentUserId.value = auth.user.id;
});

// Cleanup
onBeforeUnmount(() => {
  debouncedSearch.cancel();
});

definePageMeta({
  layout: "admin",
  // middleware: ["auth", "admin"], // Add appropriate middleware
});
</script>

<style scoped>
/* Add any custom styles here if needed */
</style>
