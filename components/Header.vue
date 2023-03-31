<!-- eslint-disable max-len -->
<template>
  <Transition>
    <div v-if="navMenuActive" class="opacity-20 bg-black fixed top-0 left-0 h-screen w-full z-50" @click="toggleMobileMenu" />
  </Transition>
  <nav id="header" class="flex justify-between items-center h-16 px-4 md:px-8 bg-white border-b sticky top-0 z-[49]">
    <NuxtLink :to="{ name: 'index' }" class="flex items-center text-2xl font-bold text-emerald-500">
      <Icon name="send-joy" class="w-7 h-7 mr-2 stroke-slate-100 stroke-[30]" />
      <h1 class="hidden sm:flex">
        Summarize with GPT-4
      </h1>
      <Transition>
        <h1 v-if="!navMenuActive" class="flex sm:hidden">
          Summarize with GPT-4
        </h1>
      </Transition>
    </NuxtLink>
    <div class="flex items-center space-x-6">
      <Transition>
        <SupportButton v-show="!navMenuActive" emoji class="py-0.5 px-2 hidden md:flex" />
      </Transition>
      <button class="flex items-center justify-center w-12 h-12 rounded-full bg-gray-50 hover:border-emerald-700 hover:border z-10" @click="(toggleMobileMenu)">
        <Bars3Icon class="m-4 h-6 w-6 fill-emerald-600" />
      </button>
    </div>
  </nav>  
  <Transition name="slide-left">
    <NavigationSideMenu
      v-if="navMenuActive"
      id="dropdown"
      class="fixed flex bg-white"
      @click="toggleMobileMenu"
    />
  </Transition>
</template>

<script setup lang="ts">
import { Bars3Icon } from '@heroicons/vue/20/solid';

const navMenuActive = ref(false);

const toggleMobileMenu = () => {
  // displayOverlay.value = !displayOverlay.value;
  navMenuActive.value = !navMenuActive.value;
  navMenuActive.value ? document.body.setAttribute("style", "overflow: hidden;") : document.body.removeAttribute("style", "overflow: hidden;");
};

</script>