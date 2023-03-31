<!-- eslint-disable max-len -->
<template>
  <button
    class="flex items-center justify-center px-2 h-10 w-40 bg-gray-50 rounded-lg text-gray-400 group hover:bg-emerald-400 hover:text-white transition-all duration-200"
    @click="copyToClipboard"
  >
    <Transition mode="out-in" :duration="{ enter: 200, leave: 200 }">
      <div v-if="!copied" class="flex items-center">
        <span class="text-sm font-semibold">Copy summary</span>
        <ClipboardDocumentIcon class="w-5 h-5 ml-2 stroke-gray-400 group-hover:stroke-white transition-all duration-200" aria-hidden="true" />
      </div>
      <div v-else class="flex items-center">
        <span class="text-sm font-semibold">Copied</span>
        <CheckIcon class="w-5 h-5 ml-2 fill-emerald-600" aria-hidden="true" />
      </div>
    </Transition>
  </button>
</template>

<script setup lang="ts">
import { ClipboardDocumentIcon } from "@heroicons/vue/24/outline";
import { CheckIcon } from "@heroicons/vue/20/solid";

const props = defineProps<{
    copyTarget: string;
  }>();

// const { copied, copyToClipboard } = useCopy(props.copyTarget);

const copied = ref(false);

const copyToClipboard = () => {
  const hiddenField = document.createElement("input"); // create field that we can copy text from
  document.body.appendChild(hiddenField); // required in order to actually have the field selectable
  hiddenField.value = props.copyTarget; // field value
  hiddenField.select(); // select
  hiddenField.setSelectionRange(0, 99999); // For mobile devices
  document.execCommand("copy"); // Copy the text inside the text field
  hiddenField.remove();
  copied.value = true;
  setTimeout(() => {
    copied.value = false; // delay 5 seconds, then reset
  }, 2000);
};
</script>
