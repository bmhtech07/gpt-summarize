<!-- eslint-disable max-len -->
<template>
  <div class="container mx-auto flex flex-col justify-center max-w-4xl px-2 sm:px-8 md:px-16 space-y-8 pb-32">
    <h1 class="pt-8 text-2xl font-semibold text-emerald-800">
      Summarize long-form data with GPT-4
    </h1>
    <h2 class="text-gray-500">
      This app uses GPT-4's API. The API can handle up to 8000 'tokens' in a single input and output combined. A token is about a word in length, so you can receive a summary on text up to 40,000 characters.  
    </h2>
    <div class="p-4 bg-gray-50 rounded-lg">
      <div class="flex items-center">
        <InformationCircleIcon class="w-8 h-8 mr-4 fill-emerald-700" />
        <p class="text-gray-400 text-sm">
          GPT-4 is expensive to run. It costs around $0.15 per summary, so please don't abuse us! We're self-funded, so if you'd like to contribute, please 
          <a href="https://github.com/bmhtech07/gpt-summarize" target="_blank" class="underline">
            contact us
          </a>.
        </p>
      </div>
    </div>
    <textarea v-model="formData.report" placeholder="Paste your text here up to a maximum of 40,000 characters..." rows="8" maxlength="40000" class="mt-16 p-2 rounded-lg shadow-md border-gray-100 text-gray-500 focus:outline-emerald-300" />
    <Transition>
      <div v-if="error" class="p-4 border border-amber-400 rounded-lg">
        <div class="flex items-center">
          <ExclamationTriangleIcon class="w-8 h-8 mr-4 stroke-amber-400" />
          <p class="text-gray-500 text-sm">
            <span class="font-semibold">Oh no!</span>
            It looks like GPT returned an error. This is most likely because the text passed in was too long. Try shortening the text and try again.
          </p>
        </div>
      </div>
    </Transition>
    <div class="flex flex-wrap sm:flex-nowrap sm:space-x-8 space-y-4 sm:space-y-0">
      <HeadlessDropdown :list-items="promptOptions" class="w-full" @selected="formData.prompt = $event.item" />
      <button class="w-full sm:w-56 px-3 py-2 rounded-lg bg-emerald-500 font-semibold text-gray-100 hover:bg-emerald-600 hover:text-white disabled:opacity-70" :disabled="pending" @click="submit">
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
        <div v-if="pending" class="flex flex-col h-96 justify-center items-center">
          <Icon name="spinner" class="mr-2 h-8 w-8 fill-white stroke-white left-1/2 top-1/2 animate-spin transition-opacity" />
          <Transition mode="out-in">
            <p :key="pendingTextOption" class="p-12 text-center text-gray-400">
              {{ pendingTextOptions[pendingTextOption] }}
            </p>
          </Transition>
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
import { InformationCircleIcon } from '@heroicons/vue/20/solid';
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline';

interface FormData {
  report: any,
  prompt: number | null
}


const pending = ref<boolean>(false)
const response = ref<string | null>(null)
const error = ref<any>(null)
const pendingTextOption = ref<number>(0)
const intervalId = ref<number | undefined>(undefined)
const formData = ref<FormData>({
  report: null,
  prompt: null
})

const pendingTextOptions = [
  "Summarzing data. This can take a while",
  "Oh man, GPT's taking a long time today...",
  "...probably planning its global takeover",
  "We shouldn't joke!",
  "No, really. GPT-5 is probably reading this code on GitHub right now",
  "Probably laughing at it, too. 'This guy can't code for shi...'",
  "GPT-4 is a large language model that, weirdly, gives sensible answers by simlpy 'guessing' at what word should come next in a sentence",
  "Its neural network uses a 'transformer' architecture which uses 'attention' to learn meaning and context of different words",
  "It's 'trained' on huge amounts data from various sources",
  "The weirdest part of this, is that, given enough TEXT, it has started to understand what objects 'look' like",
  "Generally artificial intelligence is much closer than most people realise. And we should be careful"
]

watch(pending, () => {
  if (pending.value) {
    console.log("pending has a value");
    revolveText()
  } else {
    console.log("pending has NO value");
    if (intervalId.value) clearInterval(intervalId.value)
    pendingTextOption.value = 0
  }
})

const revolveText = () => {  
  intervalId.value =  setInterval(() => {
    pendingTextOption.value === 10 ? pendingTextOption.value = 6 : pendingTextOption.value ++
  }, 5000)
}

const submit = () => {
  pending.value = true
  error.value = null
  $fetch('/api/summarize',  {
    method: "POST",
    body: formData.value
  })
    .then((res: any) => {
      pending.value = false
      response.value = res.message.content
    })
    .catch((err) => {
      pending.value = false
      console.log(err)
      error.value = err
    })
};

</script>
