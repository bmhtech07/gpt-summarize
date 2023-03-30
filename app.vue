<template>
  <div class="container mx-auto flex flex-col max-w-3xl space-y-8 justify-center">
    <textarea v-model="formData.report" placeholder="Paste your text here" rows="8" class="mt-16 p-2 rounded-lg shadow-md border-gray-100 text-gray-500 focus:outline-emerald-300" />
    <div class="flex space-x-8">
      <HeadlessDropdown :listItems="promptOptions" class="w-full" @selected="formData.prompt = $event.item"/>
      <button class="w-56 px-3 py-2 rounded-lg bg-emerald-400 font-semibold text-gray-100 disabled:opacity-70" :disabled="pending" @click="submit">
        <div v-if="!pending">Summarize</div>
        <div v-else class="flex items-center transition-all duration-500">
          <Icon  name="spinner" class="mr-2 h-5 w-5 dark:text-white fill-white stroke-white left-1/2 top-1/2 animate-spin transition-opacity" />
          Processing...
        </div> 
      </button>
    </div>
    <Transition>
      <div v-if="response" class="whitespace-pre-wrap text-lg text-gray-500">
        {{ response }}
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { prompts as promptOptions } from '~~/config/prompts';

const pending = ref<boolean>(false);
const response = ref<string | null>(null);
const formData = ref({
  report: <any>null,
  prompt: <number | null>null
});


const submit = () => {
  pending.value = true;
  $fetch('/api/summarise',  {
    method: "POST",
    body: formData.value
  })
  .then((res: any) => {
    pending.value = false;
    console.log(res.choices[0].message.content);
    response.value = res.choices[0].message.content;
  })
  .catch((err) => {
    pending.value = false;
    console.log(err);
  })
};

</script>
