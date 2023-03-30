<template>
  <div class="container mx-auto flex flex-col max-w-3xl space-y-8 justify-center">
    <textarea v-model="formData.report" placeholder="Paste your text here" rows="8" class="mt-16 p-2 rounded-lg shadow-md border-gray-100 text-gray-500 focus:outline-emerald-300" />
    <div class="flex space-x-8">
      <HeadlessDropdown :listItems="promptOptions" class="w-full" @selected="formData.prompt = $event.item"/>
      <button class="min-w-48 px-3 py-2 rounded-lg bg-emerald-400 font-semibold text-gray-100" @click="submit">
        <span v-if="!pending">Summarize</span>
        <Icon v-if="pending" name="spinner" class="ml-2 h-5 w-5 dark:text-white fill-white stroke-white transition-opacity left-1/2 top-1/2 animate-spin" />
      </button>
    </div>
    <Transition name="fad">
      <div v-if="response" class="text-lg text-gray-500">
        {{ response }}
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { prompts as promptOptions } from '~~/config/prompts';

const defaultText = ref<any>("Paste your text here");
const pending = ref<boolean>(false);
const response = ref<string | null>(null);
const formData = ref({
  report: <any>null,
  prompt: <number>promptOptions[0].item
});


const submit = () => {
  pending.value = true;
  $fetch('/api/summarise',  {
    method: "POST",
    body: formData.value
  })
  .then((res: any) => {
    pending.value = false;
    response.value = res.choices[0].message.content;
  })
  .catch((err) => {
    pending.value = false;
    console.log(err);
  })
};

</script>
