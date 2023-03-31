<!-- eslint-disable max-len -->
<template>
  <div class="right-0 top-0 flex flex-col pt-8 min-h-screen w-64 z-50">
    <div class="overflow-hidden">
      <div class="flex justify-center flex-col">
        <ul class="flex flex-col py-6 text-lg text-emerald-800">
          <li
            v-for="(item, index) in menuItems"
            :key="index"
            class="w-full"
          >
            <NuxtLink
              :to="{ name: item.name }"
              class="flex px-8 py-2 transition-colors duration-200 w-full font-semibold md:font-regular hover:bg-emerald-50  hover:font-medium"
            >
              {{ item.display }}
            </NuxtLink>
          </li>
          <!-- <li class="pt-3">
            <SupportButton emoji class="ml-8 px-2 py-1 text-lg font-medium" />
          </li> -->
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { menuItems } from "../../config";

</script>
