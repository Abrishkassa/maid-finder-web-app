<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div class="bg-white p-8 font-serif rounded-lg shadow-lg text-center max-w-xl w-full">
            <h1 class="w-full text-xl font-bold text-left text-gray-800 mb-4">Create your account as {{ roleName }}</h1>
            <!--Social Login Button-->
            <div class="flex flex-row justify-center items-center mb-4 gap-4">
                <button
                    class="w-full flex items-center justify-center px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50 transition duration-300">
                    <img src="https://telegram.org/favicon.ico" alt="Telegram" class="w-5 h-5 mr-2">
                    Continue with Telegram
                </button>
                <button
                    class="w-full flex items-center justify-center px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50 transition duration-300">
                    <img src="https://www.google.com/favicon.ico" alt="Google" class="w-5 h-5 mr-2">
                    Continue with Google
                </button>
            </div>

            <!--Divider-->
            <div class="relative mb-6">
                <div class="absolute inset-0 flex items-center">
                    <div class="w-full border-t border-gray-300"></div>
                </div>
                <div class="relative flex justify-center">
                    <span class="bg-white px-2 text-gray-500">or</span>
                </div>
            </div>


            <!-- Registration Form -->
            <form @submit.prevent="handleSubmit" class="space-y-4">
                <div>
                    <label class="block text-left text-gray-700 mb-2">Email</label>
                    <input placeholder="user@example.com" v-model="form.email" type="email"
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500">
                </div>
                <div>
                    <label class="block text-left text-gray-700 mb-2">Password</label>
                    <input placeholder="Enter a password" v-model="form.password" type="password"
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500">
                </div>
                <div>
                    <label class="block text-left text-gray-700 mb-2">Confirm Password</label>
                    <input placeholder="Confirm your password" v-model="form.confirmPassword" type="password"
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500">
                </div>
                <div class="flex items-center">
          <input type="checkbox" v-model="form.agreeTerms" class="mr-2">
          <label class="text-gray-700">I agree to the Terms & Conditions</label>
        </div>

                <button type="submit"
                    class="w-full bg-black text-white font-semibold px-6 py-2 rounded-lg hover:bg-lime-800 transition duration-300">
                    Signup
                </button>
            </form>


            <!-- Login Link -->
            <p class="text-center text-gray-600 mt-6">
                Already have an account? <NuxtLink to="/login" class="text-blue-500 hover:underline">Login</NuxtLink>
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

// Get the id parameter from the route
const route = useRoute();
const id = ref(route.params.id);

// Map role IDs to role names
const roleName = computed(() => {
    switch (id.value) {
        case '2':
            return 'Householder/Client';
        case '3':
            return 'Maid/Job Seeker';
        default:
            return 'Unknown Role';
    }
});

// Reactive form data
const form = ref({
    email: '',
    password: '',
    confirmPassword: '',
    roleId: id.value,// Include the role ID in the form data
    agreeTerms: false
});

// Handle form submission
const handleSubmit = () => {
    if (form.value.password !== form.value.confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    if (!form.value.agreeTerms) {
    alert('You must agree to the Terms & Conditions');
    return;
  }

    // Here you can add your form submission logic, e.g., API call
    console.log('Form submitted:', form.value);
    alert(`Registration successful as ${roleName.value}!`);
};

definePageMeta({
  layout: 'custom'
})
</script>

<style scoped>
/* Add any custom styles here */
</style>