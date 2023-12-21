
const base = "https://twitter.com/intent/tweet?ref_src=twsrc%5Etfw%7Ctwcamp%5Ebuttonembed%7Ctwterm%5Eshare%7Ctwgr%5E&url=https%3A%2F%2Fedodo2.github.io%2Fother%2Fhachiban%2Fstart.html&hashtags=出口_edodo2&text=";
const ihen = "異変";
const deguchi = "出口";
const tango = ["異常", "山口", "出先", "異界", "岐阜", "茨城", "長野", "兵庫", "入口", "味方", "出国", "改変", "畏怖", "秋田", "田園", "谷口", "青森", "岩手", "理性"];
const RenderHtmlApp = {
    data() {
        return {
            twibun: base,
            load: false,
            time: 0,
            nums: [],
            now: 0,
            start: 0,
            timer: null,
            go: true
        }
    },
    methods: {
        setup() {
            this.nums = [];
            this.go = Math.random() < 0.5;
            var numslength = 0;
            var ihennum = -1;
            var degnum = -1;
            if (!this.go) {
                ihennum = Math.floor(Math.random() * 16);
            }
            if (this.now == 8) {
                degnum = Math.floor(Math.random() * 16);
            }
            while (numslength < 16) {
                var tan = Math.floor(Math.random() * tango.length);
                if (ihennum == numslength) {
                    numslength = this.nums.push(ihen);
                }
                else if (degnum == numslength) {
                    numslength = this.nums.push(deguchi);
                }
                else if (!this.nums.includes(tango[tan])) {
                    numslength = this.nums.push(tango[tan]);
                }
            }
        },
        push(n) {
            if (this.go && this.now < 9) {
                if (n == "出口") {
                    clearInterval(this.timer);
                    this.time = new Date().getTime() - this.start;
                    this.twibun = base + (this.time / 1000) + "秒"
                    this.end = true;
                } else {
                    this.now++;
                    this.setup();
                }
            } else {
                this.now = 0;
                this.setup();
            }
        },
        back() {
            if (this.go && this.now < 9) {
                this.now = 0;
                this.setup();
            } else {
                if (this.now < 8) {
                    this.now++;
                }
                if (this.now > 8) {
                    this.now = 8;
                }
                this.setup();
            }
        },
        reset() {
            this.load = false;
            this.time = 0;
            this.nums = [];
            this.now = 0;
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

const vm = app.mount('#hachiban');

