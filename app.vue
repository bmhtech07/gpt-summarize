<template>
  <div class="flex flex-col max-w-lg space-y-8">
    <textarea v-model="formData.report" />
    <HeadlessDropdown :listItems="promptOptions" @selected="formData.prompt = $event.item"/>
    <button class="rounded-lg px-3 py-2 bg-emerald-800" @click="submit">
      Summarize
    </button>
    <div class="text-4xl">
      {{ response }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { prompts as promptOptions } from '~~/config/prompts';

const pending = ref<boolean>(false);
const response = ref<string | null>("Response will be here");
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
