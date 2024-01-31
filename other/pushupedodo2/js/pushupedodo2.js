import counter from "./counter.js";

const RenderHtmlApp = {
    data() {
        return {
            count : 0
        }
    },
    methods: {
    },
    mounted() {
        pushups.forEach(element => {
            this.count+=element;
        });
        
    }
};

const app = Vue.createApp(RenderHtmlApp);
app.component('counter',counter);
const vm = app.mount('#pushupedodo2');