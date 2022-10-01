import { createApp } from 'vue'
import './index.css'
import App from './App.vue'
import 'flowbite'
import { createIntl } from 'vue-intl'


createApp(App).use(createIntl({
    locale: 'en',
    defaultLocale: 'en'
})).mount('#app')
