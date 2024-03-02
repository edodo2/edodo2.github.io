import counter from "./counter.js";

const RenderHtmlApp = {
    data() {
        return {
            count : []
        }
    },
    methods: {
    },
    mounted() {

        pushups.forEach(element => {
            let c = 0;
            element.forEach(num =>{
                c+=num;
            }
            )
            this.count.push(c);
        });
        
    }
};

const app = Vue.createApp(RenderHtmlApp);
app.component('counter',counter);
const vm = app.mount('#pushupedodo2');