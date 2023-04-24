
var param = location.search;
const base = "https://twitter.com/intent/tweet?ref_src=twsrc%5Etfw%7Ctwcamp%5Ebuttonembed%7Ctwterm%5Eshare%7Ctwgr%5E&url=https%3A%2F%2Fedodo2.github.io%2Fother%2Fnumber%2Fstart.html&hashtags=1から30まで押すやつ_edodo2&text=";
const RenderHtmlApp = {
    data() {
        return {
            twibun: base,
            load: false,
            time: 0,
            nums: [],
            hoju: [],
            now: 1,
            start: 0,
            timer: null
        }
    },
    methods: {
        setup() {
            var numslength = 0;
            while (numslength < 16) {
                var num = Math.floor(Math.random() * 16) + 1;
                if (!this.nums.includes(num)) {
                    numslength = this.nums.push(num);
                }
            }
            numslength = 0;
            while (numslength < 14) {
                var num = Math.floor(Math.random() * 14) + 17;
                if (!this.hoju.includes(num)) {
                    numslength = this.hoju.push(num);
                }
            }
        },
        push(n) {
            if (this.now == this.nums[n]) {
                if (this.now < 15) {
                    this.nums[n] = this.hoju.pop();
                    this.now++;
                } else {
                    this.nums[n] = "";
                    if (this.now > 29) {
                        clearInterval(this.timer);
                        this.time = new Date().getTime() - this.start;
                        this.twibun = base + (this.time / 1000) + "秒"
                        this.end = true;
                    }
                    this.now++;
                }
            }
        },
        reset() {
            this.load = false;
            this.time = 0;
            this.nums = [];
            this.hoju = [];
            this.now = 1;
            this.start = 0;
            clearInterval(this.timer);
            this.setup();
            this.end = false;
            this.load = true;
            this.start = new Date().getTime();
            this.timer = setInterval(() => {
                this.time = new Date().getTime() - this.start;
            }, 50);
        }
    },
    mounted() {
        window.onload = () => {
            document.getElementById('loading').classList.remove("d-none");
            this.setup();
            this.load = true;
            this.start = new Date().getTime();
            this.timer = setInterval(() => {
                this.time = new Date().getTime() - this.start;
            }, 50);
        };
    }
};
const app = Vue.createApp(RenderHtmlApp);

const vm = app.mount('#number');

