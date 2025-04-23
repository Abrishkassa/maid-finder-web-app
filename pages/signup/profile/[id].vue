<template>
  <div class="mx-auto w-full p-4 md:p-8 lg:w-1/2">
    <div v-if="isLoading" class="flex justify-center py-10">
      <Loader />
    </div>

    <template v-else>
      <div v-if="errorMessage" class="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
        {{ errorMessage }}
      </div>

      <h1 class="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
        Complete Your {{ userType === 'maid' ? 'Maid' : 'Household' }} Profile
      </h1>

      <form @submit.prevent="submitProfile" class="space-y-6">
        <!-- Common Fields -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              First Name <span class="text-red-500">*</span>
            </label>
            <input
              v-model="profile.first_name"
              type="text"
              required
              class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Last Name <span class="text-red-500">*</span>
            </label>
            <input
              v-model="profile.last_name"
              type="text"
              required
              class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Phone Number <span class="text-red-500">*</span>
          </label>
          <input
            v-model="profile.phone_number"
            type="tel"
            required
            class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>

        <!-- Household Specific Fields -->
        <template v-if="userType === 'household'">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Address <span class="text-red-500">*</span>
            </label>
            <input
              v-model="profile.address"
              type="text"
              required
              class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                City <span class="text-red-500">*</span>
              </label>
              <input
                v-model="profile.city"
                type="text"
                required
                class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                State/Province <span class="text-red-500">*</span>
              </label>
              <input
                v-model="profile.state"
                type="text"
                required
                class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Postal Code <span class="text-red-500">*</span>
            </label>
            <input
              v-model="profile.postal_code"
              type="text"
              required
              class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>
        </template>

        <!-- Maid Specific Fields -->
        <template v-if="userType === 'maid'">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Date of Birth <span class="text-red-500">*</span>
              </label>
              <input
                v-model="profile.date_of_birth"
                type="date"
                required
                class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nationality <span class="text-red-500">*</span>
              </label>
              <input
                v-model="profile.nationality"
                type="text"
                required
                class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Years of Experience <span class="text-red-500">*</span>
            </label>
            <input
              v-model="profile.years_of_experience"
              type="number"
              min="0"
              required
              class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Skills (comma separated) <span class="text-red-500">*</span>
            </label>
            <input
              v-model="profile.skills"
              type="text"
              placeholder="e.g., Cooking, Cleaning, Childcare"
              required
              class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Bio <span class="text-red-500">*</span>
            </label>
            <textarea
              v-model="profile.bio"
              required
              rows="4"
              class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            ></textarea>
          </div>
        </template>

        <div class="pt-4">
          <button
            type="submit"
            class="w-full rounded-lg bg-blue-600 px-4 py-3 font-bold text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            :disabled="isSubmitting"
          >
            <div class="flex items-center justify-center">
              <span v-if="!isSubmitting">Complete Profile</span>
              <Loader v-else />
            </div>
          </button>
        </div>
      </form>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import backendAPI from '@/networkServices/api/backendApi.js';
import { useAuthStore } from '@/stores/auth';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const Loader = {
  template: `
    <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  `,
};

const id = ref(route.params.id);
const userType = ref(id.value === '3' ? 'maid' : 'household');
const isLoading = ref(true);
const isSubmitting = ref(false);
const errorMessage = ref('');

// Initialize profile data based on user type
const profile = ref({
  first_name: '',
  last_name: '',
  phone_number: '',
  ...(userType.value === 'household' ? {
    address: '',
    city: '',
    state: '',
    postal_code: ''
  } : {
    date_of_birth: '',
    nationality: '',
    years_of_experience: 0,
    skills: '',
    bio: ''
  })
});

onMounted(async () => {
  if (!['2', '3'].includes(id.value)) {
    errorMessage.value = 'Invalid user type';
    return router.push('/signup');
  }

  // Check if user is authenticated and verified
  if (!authStore.isAuthenticated || !authStore.user?.is_verified) {
    errorMessage.value = 'Please verify your email first';
    return router.push(`/signup/verify/${id.value}?email=${route.query.email}`);
  }

  isLoading.value = false;
});

const submitProfile = async () => {
  isSubmitting.value = true;
  errorMessage.value = '';

  try {
    // Format the data before sending
    const payload = {
      ...profile.value,
      user_type: userType.value,
      ...(userType.value === 'maid' && {
        skills: profile.value.skills.split(',').map(skill => skill.trim())
      })
    };

    const response = await backendAPI.post('/profile', payload);

    if (response.data) {
      // Update user in store
      authStore.setUser({ ...authStore.user, profile_completed: true });
      
      // Redirect to dashboard
      await router.push(`/${userType.value}/dashboard`);
    } else {
      throw new Error('Failed to save profile');
    }
  } catch (error) {
    console.error('Profile submission error:', error);
    errorMessage.value = error.response?.data?.message || 
                        error.message || 
                        'Failed to save profile. Please try again.';
  } finally {
    isSubmitting.value = false;
  }
};

definePageMeta({
  layout: 'custom',
});
</script>

<style>
.dark {
  color-scheme: dark;
}

@media (max-width: 640px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  input, textarea {
    padding: 0.75rem;
  }
  button {
    padding: 0.75rem;
  }
}

input:focus, textarea:focus {
  outline: none;
}

input, textarea, button {
  transition: background-color 0.3s ease, border-color 0.3s ease,
    color 0.3s ease;
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>