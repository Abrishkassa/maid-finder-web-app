<template>
  <div>
    <!-- Filters and Search -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >Search</label
          >
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search users..."
              class="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
              @input="debouncedSearch"
            />
            <Icon
              name="mdi:magnify"
              class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
            />
          </div>
        </div>

        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >Status</label
          >
          <select
            v-model="statusFilter"
            class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
            @change="fetchUsers"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>

        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >Role</label
          >
          <select
            v-model="roleFilter"
            class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
            @change="fetchUsers"
          >
            <option value="all">All Roles</option>
            <option v-for="role in availableRoles" :key="role" :value="role">
              {{ role }}
            </option>
          </select>
        </div>

        <div
          class="flex flex-col md:flex-row justify-between items-center mb-6 gap-4"
        >
          <NuxtLink
            to="/admin/users/create"
            class="inline-flex items-center px-4 py-2 bg-lime-600 hover:bg-lime-700 text-white rounded-lg transition-colors"
          >
            <Icon name="mdi:plus" class="size-5 mr-2" />
            Add User
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Users Table -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <!-- Loading State -->
      <div v-if="loading" class="p-8 flex items-center justify-center">
        <Spinner size="lg" />
      </div>

      <!-- Empty State -->
      <div
        v-else-if="users.length === 0"
        class="p-8 flex flex-col items-center justify-center text-center"
      >
        <Icon
          name="mdi:account-group"
          class="size-12 text-gray-400 dark:text-gray-500 mb-4"
        />
        <h3 class="text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">
          No users found
        </h3>
        <p class="text-gray-500 dark:text-gray-400 max-w-md">
          {{
            searchQuery
              ? "No users match your search criteria. Try a different search."
              : "There are no users in the system yet."
          }}
        </p>
        <NuxtLink
          v-if="!searchQuery"
          to="/admin/users/create"
          class="mt-4 inline-flex items-center px-4 py-2 bg-lime-600 hover:bg-lime-700 text-white rounded-lg transition-colors"
        >
          <Icon name="mdi:plus" class="size-5 mr-2" />
          Add New User
        </NuxtLink>
      </div>

      <!-- Table -->
      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                User
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                Role
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                Last Active
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
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
              class="hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 size-10">
                    <img
                      class="size-10 rounded-full object-cover"
                      :src="user.avatar || '/default-avatar.jpg'"
                      :alt="user.name"
                    />
                  </div>
                  <div class="ml-4">
                    <div
                      class="text-sm font-medium text-gray-900 dark:text-gray-100"
                    >
                      {{ user.name }}
                    </div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                      @{{ user.username }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 dark:text-gray-100">
                  {{ user.email }}
                </div>
                <div
                  v-if="user.email_verified_at"
                  class="text-xs text-gray-500 dark:text-gray-400"
                >
                  Verified
                </div>
                <div
                  v-else
                  class="text-xs text-yellow-600 dark:text-yellow-400"
                >
                  Unverified
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                  :class="{
                    'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200':
                      user.role === 'admin',
                    'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200':
                      user.role === 'manager',
                    'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200':
                      user.role === 'editor',
                    'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200':
                      user.role === 'user',
                  }"
                >
                  {{ user.role }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                  :class="{
                    'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200':
                      user.status === 'active',
                    'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200':
                      user.status === 'inactive',
                    'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200':
                      user.status === 'suspended',
                  }"
                >
                  {{ user.status }}
                </span>
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
              >
                {{ formatDate(user.last_active_at) }}
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
              >
                <div class="flex justify-end space-x-2">
                  <NuxtLink
                    :to="`/admin/users/${user.id}/edit`"
                    class="text-lime-600 dark:text-lime-400 hover:text-lime-900 dark:hover:text-lime-300"
                    title="Edit"
                  >
                    <Icon name="mdi:pencil" class="size-5" />
                  </NuxtLink>

                  <button
                    v-if="user.status === 'active'"
                    @click="toggleUserStatus(user)"
                    class="text-yellow-600 dark:text-yellow-400 hover:text-yellow-900 dark:hover:text-yellow-300"
                    title="Suspend"
                  >
                    <Icon name="mdi:pause" class="size-5" />
                  </button>

                  <button
                    v-else
                    @click="toggleUserStatus(user)"
                    class="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300"
                    title="Activate"
                  >
                    <Icon name="mdi:play" class="size-5" />
                  </button>

                  <button
                    @click="confirmDeleteUser(user)"
                    class="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                    title="Delete"
                  >
                    <Icon name="mdi:trash-can-outline" class="size-5" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div
        v-if="users.length > 0"
        class="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6"
      >
        <div
          class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
        >
          <div>
            <p class="text-sm text-gray-700 dark:text-gray-300">
              Showing
              <span class="font-medium">{{ pagination.from }}</span>
              to
              <span class="font-medium">{{ pagination.to }}</span>
              of
              <span class="font-medium">{{ pagination.total }}</span>
              results
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
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span class="sr-only">Previous</span>
                <Icon name="mdi:chevron-left" class="size-5" />
              </button>

              <template v-for="page in pagination.last_page">
                <button
                  v-if="
                    Math.abs(page - pagination.current_page) < 3 ||
                    page === 1 ||
                    page === pagination.last_page
                  "
                  :key="page"
                  @click="goToPage(page)"
                  :class="{
                    'z-10 bg-lime-50 dark:bg-lime-900 border-lime-500 dark:border-lime-600 text-lime-600 dark:text-lime-300':
                      pagination.current_page === page,
                    'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600':
                      pagination.current_page !== page,
                  }"
                  class="relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  {{ page }}
                </button>
                <span
                  v-else-if="Math.abs(page - pagination.current_page) === 3"
                  :key="`ellipsis-${page}`"
                  class="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  ...
                </span>
              </template>

              <button
                @click="nextPage"
                :disabled="pagination.current_page === pagination.last_page"
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span class="sr-only">Next</span>
                <Icon name="mdi:chevron-right" class="size-5" />
              </button>
            </nav>
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
          Delete User
        </h3>
        <p class="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">
          Are you sure you want to delete
          <span class="font-medium">{{ userToDelete?.name }}</span
          >? This action cannot be undone.
        </p>
        <div class="flex justify-center space-x-4">
          <button
            @click="showDeleteModal = false"
            class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            @click="deleteUser"
            class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center"
          >
            <Icon
              v-if="deleting"
              name="mdi:loading"
              class="animate-spin size-5 mr-2"
            />
            Delete
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
const statusFilter = ref("all");
const roleFilter = ref("all");
const availableRoles = ref(["admin", "manager", "editor", "user"]);
const pagination = ref({
  current_page: 1,
  last_page: 1,
  per_page: 15,
  from: 0,
  to: 0,
  total: 0,
});
const showDeleteModal = ref(false);
const userToDelete = ref(null);
const deleting = ref(false);

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
      status: statusFilter.value !== "all" ? statusFilter.value : undefined,
      role: roleFilter.value !== "all" ? roleFilter.value : undefined,
    };

    // Remove undefined params
    Object.keys(params).forEach(
      (key) => params[key] === undefined && delete params[key]
    );

    const { data } = await api.get("/admin/users", { params });
    users.value = data.data;
    pagination.value = {
      current_page: data.current_page,
      last_page: data.last_page,
      per_page: data.per_page,
      from: data.from,
      to: data.to,
      total: data.total,
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
  if (pagination.value.current_page < pagination.value.last_page) {
    pagination.value.current_page++;
    fetchUsers();
  }
};

const goToPage = (page) => {
  if (page !== pagination.value.current_page) {
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

const toggleUserStatus = async (user) => {
  try {
    const newStatus = user.status === "active" ? "inactive" : "active";
    await api.put(`/admin/users/${user.id}/status`, { status: newStatus });
    showToast(
      `User ${newStatus === "active" ? "activated" : "deactivated"}`,
      "success"
    );
    fetchUsers();
  } catch (error) {
    console.error("Error toggling user status:", error);
    showToast("Failed to update user status", "error");
  }
};

// Format date
const formatDate = (dateString) => {
  if (!dateString) return "Never";
  const date = new Date(dateString);
  return (
    date.toLocaleDateString() +
    " " +
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );
};

// Lifecycle
onMounted(() => {
  fetchUsers();
});

// Cleanup
onBeforeUnmount(() => {
  debouncedSearch.cancel();
});

definePageMeta({
  layout: "admin",
  middleware: ["auth", "admin"], // Add appropriate middleware
});
</script>
