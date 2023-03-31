<!-- eslint-disable max-len -->
<template>
  <div class="container mx-auto flex flex-col max-w-4xl px-2 sm:px-8 md:px-16 space-y-8 justify-center">
    <textarea v-model="formData.report" placeholder="Paste your text here up to a maximum of 40,000 characters..." rows="8" maxlength="40000" class="mt-16 p-2 rounded-lg shadow-md border-gray-100 text-gray-500 focus:outline-emerald-300" />
    <div class="flex space-x-8">
      <HeadlessDropdown :list-items="promptOptions" class="w-full" @selected="formData.prompt = $event.item" />
      <button class="w-56 px-3 py-2 rounded-lg bg-emerald-400 font-semibold text-gray-100 hover:bg-emerald-500 hover:text-white disabled:opacity-70" :disabled="pending" @click="submit">
        <div v-if="!pending">
          Summarize
        </div>
        <div v-else class="flex items-center transition-all duration-500">
          <Icon name="spinner" class="mr-2 h-5 w-5 fill-white stroke-white left-1/2 top-1/2 animate-spin transition-opacity" />
          Processing...
        </div> 
      </button>
    </div>
    <div class="rounded-lg bg-emerald-50">
      <Transition mode="out-in">
        <div v-if="pending" class="flex flex-col h-full justify-center items-center text-gray-500">
          <Icon name="spinner" class="mr-2 h-8 w-8 fill-white stroke-white left-1/2 top-1/2 animate-spin transition-opacity" />
          <p class="">
            This can sometimes take a while depending on the length of the text passed in
          </p>
        </div>
        <div v-else-if="response" class="p-4 rounded-lg shadow-md">
          <div class="flex justify-end -mr-2">
            <CopyButton :copy-target="response" />
          </div>
          <div class="whitespace-pre-wrap h-96 mt-6 text-gray-500 overflow-scroll">
            {{ response }}
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { prompts as promptOptions } from '~~/config/index.js';

interface FormData {
  report: any,
  prompt: number | null
}

const pending = ref<boolean>(false);
const response = ref<string | null>(null);
const formData = ref<FormData>({
  report: null,
  prompt: null
});

const submit = () => {
  pending.value = true;
  $fetch('/api/summarize',  {
    method: "POST",
    body: formData.value
  })
    .then((res: any) => {
      pending.value = false;
      response.value = res.message.content
    })
    .catch((err) => {
      pending.value = false;
      console.log(err);
    })
};

</script>
