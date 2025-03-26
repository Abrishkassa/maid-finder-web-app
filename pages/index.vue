<template>
  <div class="bg-[#F3F3F3] dark:bg-[#191A23] min-h-screen">
    <!-- Hero Section -->
    <div
      class="max-w-7xl mx-auto px-8 py-12 grid md:grid-cols-2 gap-8 items-center mb-8"
    >
      <!-- Left Content -->
      <div>
        <h1
          class="text-4xl md:text-5xl font-bold text-gray-800 dark:text-[#F3F3F3] mb-4"
        >
          {{ $t("welcome") }}
        </h1>
        <p class="text-gray-600 dark:text-[#F3F3F3] mb-6">
          {{ $t("description") }}
        </p>
        <a
          href="#"
          class="px-6 py-3 text-white bg-black hover:text-black hover:bg-lime-400 dark:bg-[#B9FF66] dark:text-[#191A23] font-medium text-regular rounded-lg dark:hover:bg-[#A0E55C] transition"
        >
          Get Started
        </a>
      </div>

      <!-- Right Content -->
      <div class="flex justify-center">
        <img
          src="/public/MaidPic.png"
          alt="maid pic"
          class="max-w-full h-auto"
        />
      </div>
    </div>

    <!-- Searchbar -->
    <div class="mb-8 flex justify-center items-center gap-2">
      <!-- Search Bar -->
      <input
        type="text"
        placeholder="Search among maids"
        class="w-full md:w-1/2 p-2 border border-lime-300 dark:border-lime-600 rounded-lg focus:border-lime-300 dark:focus:border-lime-400 outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
      />

      <!-- Toggle Filters Button -->
      <button
        class="py-2 px-8 text-white bg-black hover:bg-lime-400 hover:text-black rounded-lg flex items-center gap-2 transition-all duration-300"
      >
        Search
      </button>
    </div>

    <!-- Maid Section -->
    <section class="max-w-7xl mx-auto py-6 px-8 text-center">
      <div class="mx-auto items-center px-8 mb-8">
        <h2
          class="text-2xl font-serif font-semibold dark:bg-[#191A23] text-lime-500 px-3 py-1 rounded-md"
        >
          Latest profiles
        </h2>
        <p
          class="font-serif ml-2 align-text-top text-gray-600 dark:text-[#F3F3F3]"
        >
          Find the perfect helper for your home today!
        </p>
      </div>

      <!-- Maid Carousel -->
      <div class="relative group">
        <!-- Carousel Container -->
        <div class="overflow-hidden">
          <div
            class="flex transition-transform duration-500 ease-in-out"
            :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
          >
            <div
              v-for="(chunk, index) in chunkedMaids"
              :key="index"
              class="w-full flex-shrink-0"
            >
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6 px-8">
                <div
                  v-for="maid in chunk"
                  :key="maid.id"
                  class="bg-white dark:bg-gray-800 shadow-lg rounded-lg px-6 py-3 flex flex-col items-left hover:shadow-xl transition-shadow"
                >
                  <img
                    :src="maid.picture"
                    alt="Maid Picture"
                    class="w-48 h-48 object-cover rounded-md mx-auto"
                  />
                  <div class="text-left mt-3">
                    <p class="font-bold dark:text-[#F3F3F3]">
                      Name: {{ maid.name }}
                    </p>
                    <p class="dark:text-[#F3F3F3]">
                      Location: {{ maid.location }}
                    </p>
                    <p class="text-gray-500 dark:text-[#F3F3F3]">
                      Available for Full-time & Part-time
                    </p>
                  </div>
                  <div class="flex gap-2 mt-4 justify-between">
                    <button
                      @click="navigateTo(`/maids/${maid.id}`)"
                      class="border-2 hover:border-[#B9FF66] text-[#191A23] dark:text-white px-4 py-2 rounded-md font-semibold"
                    >
                      View Details
                    </button>
                    <button
                      class="hover:border-[#B9FF66] text-[#191A23] dark:text-white border-2 px-4 py-2 rounded-md font-semibold"
                    >
                      Hire Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Arrows (shown on hover) -->
        <button
          @click="prevSlide"
          class="absolute left-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          :disabled="currentSlide === 0"
        >
          <Icon name="mdi:chevron-left" size="24" />
        </button>
        <button
          @click="nextSlide"
          class="absolute right-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          :disabled="currentSlide === chunkedMaids.length - 1"
        >
          <Icon name="mdi:chevron-right" size="24" />
        </button>

        <!-- Indicator Dots -->
        <div class="flex justify-center mt-4 space-x-2">
          <button
            v-for="(_, index) in chunkedMaids"
            :key="index"
            @click="goToSlide(index)"
            class="w-3 h-3 rounded-full transition-colors"
            :class="{
              'bg-lime-500': currentSlide === index,
              'bg-gray-300 dark:bg-gray-600': currentSlide !== index,
            }"
          ></button>
        </div>
      </div>

      <!-- See All Button -->
      <div class="flex sm:flex-row justify-center items-center gap-4 mt-8">
        <button
          @click="showAllMaids"
          class="px-4 sm:px-6 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition-colors duration-200"
        >
          see all
          <Icon name="mdi:arrow-right" />
        </button>
      </div>
    </section>

    <!-- How it Works Section -->
    <section class="max-w-7xl mx-auto py-6 px-8 text-center">
      <div class="mx-auto items-center px-8 mb-8">
        <h2
          class="text-3xl font-serif font-semibold dark:bg-[#191A23] text-lime-500 px-3 py-1 rounded-md"
        >
          How it works
        </h2>
        <p
          class="font-serif ml-2 align-text-top text-gray-600 dark:text-[#F3F3F3]"
        >
          Step by step Guide
        </p>
      </div>

      <div class="flex flex-col justify-around mt-4 px-8">
        <div
          v-for="(step, index) in steps"
          :key="index"
          class="flex-1 min-w-[200px] my-2 py-4 px-8 dark:text-white bg-white dark:bg-gray-800 shadow-md rounded-xl text-left cursor-pointer"
          :class="{
            'bg-[#B9FF66] border-[#B9FF66] ': activeStep === index,
          }"
          @click="toggleStep(index)"
        >
          <div class="flex items-center justify-between">
            <h3 class="text-xl font-serif font-bold mb-2 dark:text-white">
              {{ step.title }}
            </h3>
            <Icon
              name="ic:baseline-arrow-drop-down"
              class="w-10 h-10 transition-transform duration-200"
              :class="{ 'rotate-180': activeStep === index }"
              style="color: black"
            />
          </div>

          <div
            v-if="activeStep === index"
            class="border-t-2 border-black my-2"
          ></div>
          <p
            v-if="activeStep === index"
            class="font-serif text-gray-700 dark:text-white text-wrap mt-2"
          >
            {{ step.description }}
          </p>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="max-w-7xl mx-auto py-6 px-8 bg-[#F3F3F3] dark:bg-[#191A23]">
      <!-- Header Section -->
      <div class="mx-auto text-center px-8 mb-8">
        <h2
          class="text-3xl font-serif font-semibold dark:bg-[#191A23] text-lime-500 px-3 py-1 rounded-md"
        >
          Services
        </h2>
        <p class="font-serif text-gray-600 dark:text-[#F3F3F3] mt-2">
          At our organization, we offer a range of services to help householders
          get the helper they need.
        </p>
      </div>

      <!-- Services Grid -->
      <div
        class="font-serif grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4"
      >
        <!-- Loop through services -->
        <div
          v-for="(service, index) in services"
          :key="index"
          class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center"
        >
          <div class="flex flex-col items-center px-5 py-6 gap-2">
            <Icon :name="service.icon" class="w-12 h-12 mb-4 text-[#B9FF66]" />
            <h3 class="text-xl font-semibold mb-4 dark:text-[#F3F3F3]">
              {{ service.title }}
            </h3>
          </div>
          <p class="text-gray-600 dark:text-[#F3F3F3] mb-4">
            {{ service.description }}
          </p>
          <div class="flex items-center justify-center gap-2">
            <Icon
              name="solar:round-arrow-right-up-bold"
              class="w-6 h-6 text-black dark:text-[#F3F3F3] mr-2"
            />
            <a
              href="#"
              class="text-black dark:text-[#F3F3F3] hover:text-[#B9FF66]"
            >
              Learn more
            </a>
          </div>
        </div>
      </div>
    </section>
    <!-- CTA Section -->
    <section
      class="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 bg-[#F3F3F3] dark:bg-[#191A23]"
    >
      <div
        class="container mx-auto bg-white dark:bg-gray-800 font-serif border-2 rounded-2xl px-6 sm:px-12 py-8 sm:py-10 text-left"
      >
        <!-- Heading -->
        <h2 class="text-2xl sm:text-3xl font-bold mb-2 dark:text-[#F3F3F3]">
          Let's make things happen
        </h2>

        <!-- Description -->
        <p
          class="text-gray-600 dark:text-[#F3F3F3] mb-6 sm:mb-8 max-w-full sm:max-w-96"
        >
          Contact us today to learn more about how our maid-finding services can
          help you find the perfect helper for your home with ease and
          confidence.
        </p>

        <!-- Hire Now Button -->
        <a
          href="#"
          class="inline-block bg-black hover:text-black hover:bg-lime-400 dark:bg-[#B9FF66] text-white dark:text-[#191A23] font-semibold px-6 py-2 rounded-md dark:hover:bg-[#A0E55C] transition-colors duration-200"
        >
          Hire Now
        </a>
      </div>
    </section>

    <!-- Team Members Section -->
    <section class="max-w-7xl mx-auto py-6 px-8 bg-[#F3F3F3] dark:bg-[#191A23]">
      <div class="container mx-auto px-4">
        <!-- Header Section -->
        <div class="text-center mb-8">
          <h2
            class="text-3xl font-serif font-semibold dark:bg-[#191A23] text-lime-500 px-3 py-1 rounded-md inline-block"
          >
            Teams
          </h2>
          <p
            class="max-w-2xl mx-auto font-serif mt-2 text-gray-600 dark:text-[#F3F3F3]"
          >
            Meet the skilled and experienced team dedicated to connecting you
            with the perfect maid for your home needs.
          </p>
        </div>

        <!-- Team Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
          <!-- Loop through team members -->
          <div
            v-for="(member, index) in teamMembers"
            :key="index"
            class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center"
          >
            <div class="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-2"></div>
            <h3 class="text-xl font-semibold dark:text-[#F3F3F3]">
              {{ member.name }}
            </h3>
            <p class="text-gray-500 dark:text-[#F3F3F3] mb-4">
              {{ member.role }}
            </p>
            <div class="text-left">
              <div
                class="border-t border-black dark:border-[#F3F3F3] my-2"
              ></div>
              <p class="text-gray-600 dark:text-[#F3F3F3] text-wrap">
                {{ member.description }}
              </p>
            </div>
          </div>
        </div>

        <!-- See All Team Button -->
        <div class="text-center mt-8">
          <a
            href="#"
            class="inline-block hover:text-black hover:bg-lime-400 bg-black dark:bg-[#B9FF66] text-white dark:text-[#191A23] font-semibold px-6 py-2 rounded-md dark:hover:bg-[#A0E55C] transition-colors duration-200"
          >
            See all team
          </a>
        </div>
      </div>
    </section>
    <!-- Contact Form Section -->
    <section class="py-12 bg-[#F3F3F3] dark:bg-[#191A23] font-serif">
      <div class="container mx-auto px-4">
        <!-- Header Section -->
        <div class="text-center mb-8">
          <h2
            class="text-3xl font-semibold dark:bg-[#191A23] text-lime-500 px-3 py-1 rounded-md inline-block"
          >
            Contact Us
          </h2>
          <p class="max-w-2xl mx-auto mt-2 text-gray-600 dark:text-[#F3F3F3]">
            Let's Get The Helper You Need
          </p>
        </div>

        <!-- Contact Form -->
        <form
          @submit.prevent="submitForm"
          class="max-w-2xl mx-auto dark:bg-gray-800 bg-white p-8 rounded-lg shadow-md"
        >
          <!-- Name Input -->
          <div class="mb-6">
            <label
              for="name"
              class="block text-gray-700 dark:text-[#F3F3F3] font-semibold mb-2"
              >Name</label
            >
            <input
              type="text"
              id="name"
              v-model="form.name"
              class="w-full px-4 py-2 border border-gray-300 dark:border-[#F3F3F3] rounded-md focus:outline-none focus:ring-2 focus:ring-[#B9FF66] dark:bg-[#191A23] dark:text-[#F3F3F3]"
              placeholder="Enter your name"
            />
          </div>

          <!-- Email Input -->
          <div class="mb-6">
            <label
              for="email"
              class="block text-gray-700 dark:text-[#F3F3F3] font-semibold mb-2"
              >Email*</label
            >
            <input
              type="email"
              id="email"
              v-model="form.email"
              class="w-full px-4 py-2 border border-gray-300 dark:border-[#F3F3F3] rounded-md focus:outline-none focus:ring-2 focus:ring-[#B9FF66] dark:bg-[#191A23] dark:text-[#F3F3F3]"
              placeholder="Enter your email"
              required
            />
          </div>

          <!-- Message Input -->
          <div class="mb-6">
            <label
              for="message"
              class="block text-gray-700 dark:text-[#F3F3F3] font-semibold mb-2"
              >Message*</label
            >
            <textarea
              id="message"
              v-model="form.message"
              class="w-full px-4 py-2 border border-gray-300 dark:border-[#F3F3F3] rounded-md focus:outline-none focus:ring-2 focus:ring-[#B9FF66] dark:bg-[#191A23] dark:text-[#F3F3F3]"
              rows="5"
              placeholder="Enter your message"
              required
            ></textarea>
          </div>

          <!-- Submit Button -->
          <div class="text-center">
            <button
              type="submit"
              class="w-full bg-black dark:bg-[#B9FF66] text-white dark:text-[#191A23] font-semibold px-6 py-2 rounded-md hover:bg-[#191A23] dark:hover:bg-[#A0E55C] transition-colors duration-200"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const activeStep = ref(null);
const currentSlide = ref(0);
let slideInterval = ref(null);
const autoSlideDelay = 5000; // 5 seconds

const maids = ref([
  {
    id: 1,
    name: "Gete Wame",
    location: "Addis Ababa",
    picture: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Marta Lemma",
    location: "Dire Dawa",
    picture: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Sara Tesfaye",
    location: "Bahir Dar",
    picture: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    name: "Alem Gebre",
    location: "Gondar",
    picture: "https://via.placeholder.com/150",
  },
  {
    id: 5,
    name: "Tigist Hailu",
    location: "Mekele",
    picture: "https://via.placeholder.com/150",
  },
  {
    id: 6,
    name: "Yordanos Assefa",
    location: "Hawassa",
    picture: "https://via.placeholder.com/150",
  },
  // Add more maids as needed
]);

const steps = ref([
  {
    title: "01 Browse verified maids",
    description:
      "Browse Verified Maids with Confidence. Explore a curated selection of experienced and background-checked maids. Each profile includes detailed information, skills, and reviews to help you find the perfect match for your household needs. Hire with confidence, knowing you’re choosing from trusted professionals.",
  },
  {
    title: "02 Check profiles & reviews",
    description:
      "Check profiles and reviews to ensure you are selecting the best maid for your needs.",
  },
  {
    title: "03 Implementation",
    description:
      "Implement the chosen maid's services into your household routine.",
  },
  {
    title: "04 Pay securely & get service",
    description:
      "Pay securely and start receiving the services from your chosen maid.",
  },
]);

// Function to toggle the active step
const toggleStep = (index) => {
  activeStep.value = activeStep.value === index ? null : index;
};

// Service data
const services = ref([
  {
    icon: "ic:baseline-people",
    title: "Maid Listing & Profiles",
    description:
      "Browse through a curated list of verified maids with detailed profiles.",
  },
  {
    icon: "ic:baseline-search",
    title: "Advanced Search & Filters",
    description:
      "Use advanced search and filters to find the perfect maid for your needs.",
  },
  {
    icon: "ic:baseline-security",
    title: "Background Check",
    description:
      "Ensure the safety and reliability of your chosen maid with thorough background checks.",
  },
  {
    icon: "ic:baseline-description",
    title: "Contract & Agreement Management",
    description: "Manage contracts and agreements seamlessly with our tools.",
  },
  {
    icon: "ic:baseline-support-agent",
    title: "Customer Support & Assistance",
    description:
      "Get dedicated customer support and assistance whenever you need it.",
  },
  {
    icon: "ic:baseline-analytics",
    title: "Analytics and Tracking",
    description: "Track and analyze the performance of your household helpers.",
  },
]);

// Team data
const teamMembers = ref([
  {
    name: "Manuhe Wolde",
    role: "CEO and Co-Founder",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    name: "Kenaol Bekele",
    role: "Junior Front-end Dev",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    name: "Gutu Tamiru",
    role: "Junior Back-end Dev and Co-Founder",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
]);

// Reactive state for form data
const form = ref({
  name: "",
  email: "",
  message: "",
});

// Function to handle form submission
const submitForm = () => {
  console.log("Form Data:", form.value);
  alert("Message sent successfully!");
  // Reset form after submission
  form.value = {
    name: "",
    email: "",
    message: "",
  };
};

const showAllMaids = () => {
  navigateTo("/maids/maidlist"); // Reset to the first page
};

const chunkedMaids = computed(() => {
  const chunkSize = 3;
  const chunks = [];
  for (let i = 0; i < maids.value.length; i += chunkSize) {
    chunks.push(maids.value.slice(i, i + chunkSize));
  }
  return chunks;
});

const nextSlide = () => {
  if (currentSlide.value < chunkedMaids.value.length - 1) {
    currentSlide.value++;
  } else {
    currentSlide.value = 0; // Loop back to first slide
  }
  resetAutoSlide();
};

const prevSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--;
  } else {
    currentSlide.value = chunkedMaids.value.length - 1; // Loop to last slide
  }
  resetAutoSlide();
};

const goToSlide = (index) => {
  currentSlide.value = index;
  resetAutoSlide();
};

const startAutoSlide = () => {
  slideInterval.value = setInterval(() => {
    nextSlide();
  }, autoSlideDelay);
};

const resetAutoSlide = () => {
  clearInterval(slideInterval.value);
  startAutoSlide();
};

onMounted(() => {
  startAutoSlide();
});

onUnmounted(() => {
  clearInterval(slideInterval.value);
});
// // Reactive state for email input
// const email = ref("");

// // Function to handle newsletter subscription
// const subscribe = () => {
//   console.log("Subscribed with email:", email.value);
//   alert("Thank you for subscribing!");
//   email.value = ""; // Clear the input after submission
// };
</script>
