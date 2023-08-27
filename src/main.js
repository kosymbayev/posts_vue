import { createApp } from 'vue'
import App from './App.vue'

import components from './components/UI';

const app = createApp(App);

components.forEach(component => {// Глобальная регистрация компонентов
    app.component(component.name, component);
})

app.mount('#app');
