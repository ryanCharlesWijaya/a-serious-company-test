import './assets/main.css'

import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import axios from 'axios'

// Request interceptor
axios.interceptors.request.use((config: Record<string, any>) => {
    const default_headers = {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    };

    const headers = (config.headers !== undefined)
        ? {...default_headers, ...config.headers}
        : default_headers;

    // Modify the request config here
    return {
        ...config,
        ...{
            headers: headers
        }
    }
  })

const app = createApp(App)

app.use(router)

app.mount('#app')
