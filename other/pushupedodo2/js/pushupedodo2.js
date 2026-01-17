import counter from "./counter.js";

const RenderHtmlApp = {
    data() {
        return {
            gameStarted: false,
            count : []
        }
    },
    methods: {
        startGame() {
            this.gameStarted = true;
        }
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