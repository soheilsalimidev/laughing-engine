<script setup lang="ts">
import { ref } from 'vue'
import { useIntl } from 'vue-intl'

type mess = {
  name: string
  value: string
}
const openDropdown = ref(false)
const values = ref<mess[]>([{ name: 'dsfdsf', value: 'sdff' }])
const text = ref<string>('')
const init = useIntl()

const arrayToObject = <T extends Record<K, any>, K extends keyof any> (
    array: T[] = [],
    getKey: (item: T) => K,
    getValue: (item: T) => K
) =>
    array.reduce((obj, cur) => {
      const key = getKey(cur)
      const value = getValue(cur)
      return ({ ...obj, [key]: value })
    }, {} as Record<K, T>)

const cal = () => {
  console.log(arrayToObject(values.value, item => item.name, item => item.value))
  console.log(init.formatMessage({
    defaultMessage: text.value,
    id: 'message'
  }, arrayToObject(values.value, item => item.name, item => item.value)))
}

const addText = (v: mess) => {
  openDropdown.value = false
  text.value = text.value + (`{${v.name}}`)
}

</script>

<template>
  <div class="p-5">
    <div class=" w-3/5">
      <div class="grid gap-6 mb-6 md:grid-cols-2" v-for="(v,index) of values" :key="index">
        <div>
          <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">name</label>
          <input type="text" id="first_name"
                 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                 placeholder="value" required v-model="v.name">
        </div>
        <div>
          <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">value</label>
          <input type="text" id="last_name"
                 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                 placeholder="value" required v-model="v.value">
        </div>
      </div>
    </div>
    <button @click="values.push({name:'',value:''})" type="button"
            class="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800">
      <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
           xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"></path>
      </svg>
      <span class="sr-only">Icon description</span>
    </button>


    <form>
      <div class="mb-4 w-full bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
        <div class="flex justify-between items-center py-2 px-3 border-b dark:border-gray-600">
          <div class="flex flex-wrap items-center divide-gray-200 sm:divide-x dark:divide-gray-600">
            <div class="flex items-center space-x-1 sm:pr-4">
              <button @click="openDropdown=!openDropdown" id="dropdownDividerButton"
                      data-dropdown-toggle="dropdownDivider"
                      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      type="button">Dropdown divider
                <svg class="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div id="dropdownDivider"
                   v-if="openDropdown"
                   class="z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDividerButton">
                  <li @click="addText(v)" v-for="(v,index) of values" :key="index">
                    {{ v.name }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="py-2 px-4 bg-white rounded-b-lg dark:bg-gray-800">
          <label for="editor" class="sr-only">Publish post</label>
          <textarea id="editor" rows="8"
                    v-model="text"
                    class="block px-0 w-full text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                    placeholder="Write an article..." required=""></textarea>
        </div>
      </div>
      <button @click.prevent="cal"
              class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
        Publish post
      </button>
    </form>
  </div>
</template>

<style scoped>

</style>
