<!-- eslint-disable max-len -->
<template>
  <div class="">
    <Listbox v-model="selectedListItem">
      <div class="relative mt-1">
        <ListboxButton class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span class="block truncate text-gray-600 text-xs ms:text-base">{{ selectedListItem.prompt }}</span>
          <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </ListboxButton>

        <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
          <ListboxOptions class="absolute mt-1 max-h-60 w-full overflow-x-scroll rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            <ListboxOption v-for="(listItem, index) in listItems" v-slot="{ active, selected }" :key="index" :value="listItem" as="template">
              <li :class="[ active ? 'bg-emerald-50 text-emerald-800' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-5 md:pl-10 pr-4 text-xs md:text-base', ]">
                <span :class="[ selected ? 'font-medium' : 'font-normal', 'block truncate', ]">{{ listItem.prompt }}</span>
                <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-1 md:pl-3 text-emerald-600">
                  <CheckIcon class="h-3 w-3 md:h-5 md:w-5" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>

<script setup lang="ts">
import { Listbox, ListboxButton, ListboxOptions, ListboxOption, } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

const props = defineProps<{
  listItems: object[]
}>();

const emit = defineEmits<{ (event: "selected", newValue) }>();

const selectedListItem = ref<{item: number, prompt:string}>(props.listItems[0])

onMounted(() => {
  emit("selected", selectedListItem.value)
})

watch(selectedListItem, () => {
  emit("selected", selectedListItem.value)
});
</script>
