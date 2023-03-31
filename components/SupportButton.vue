<template>
  <a
    href="https://www.buymeacoffee.com/sendjoy" 
    target="_blank"
    class="rounded-lg justify-center transition-colors duration-300 text-slate-100 bg-teal-600 hover:bg-teal-500 hover:text-white"
  >
    Support us<span v-if="emoji" class="ml-1">🙏</span>
  </a>
</template>

<script setup lang="ts">
defineProps<{
  emoji: boolean;
}>();
</script>