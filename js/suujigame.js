
var param = location.search;
const base = "https://twitter.com/intent/tweet?ref_src=twsrc%5Etfw%7Ctwcamp%5Ebuttonembed%7Ctwterm%5Eshare%7Ctwgr%5E&url=https%3A%2F%2Fedodo2.github.io%2Fother%2Fsuika%2Fstart.html&hashtags=スウジゲーム_edodo2&text=";
const RenderHtmlApp = {
    data() {
        return {
            gameStarted: false,
            twibun: base,
            load: false,
            score: 0,
            nums: [],
            next: 1,
            max: 1,
            stop: false,
            end: false
        }
    },
    methods: {
        startGame() {
            this.gameStarted = true;
        },
        setup() {
            let numslength = 0;
            while (numslength < 16) {
                numslength = this.nums.push("");
            }
        },
        push(n) {
            if (!this.stop) {
                if (this.nums[n] == "") {
                    this.stop = true;
                    this.nums[n] = this.next;
                    this.score += this.next;
                    this.check(n);
                    this.next = Math.floor(Math.random() * (this.max - 1)) + 1;
                    if (this.next < 1) {
                        this.next = 1;
                    }
                    this.stop = false;
                }
            }
        },
        check(n) {
            let isDo = true;
            while (isDo) {
                isDo = false;
                if (n < 12) {
                    if (this.nums[n + 4] == this.nums[n]) {
                        this.nums[n + 4] = "";
                        this.nums[n] += 1;
                        isDo = true;
                    }
                }
                if (n > 3) {
                    if (this.nums[n - 4] == this.nums[n]) {
                        this.nums[n - 4] = "";
                        this.nums[n] += 1;
                        isDo = true;
                    }
                }
                if (n % 4 > 0) {
                    if (this.nums[n - 1] == this.nums[n]) {
                        this.nums[n - 1] = "";
                        this.nums[n] += 1;
                        isDo = true;
                    }
                }
                if (n % 4 < 3) {
                    if (this.nums[n + 1] == this.nums[n]) {
                        this.nums[n + 1] = "";
                        this.nums[n] += 1;
                        isDo = true;
                    }
                }
            }
            if (this.nums[n] > this.max) {
                this.max = this.nums[n];
            }
            let numslength = 0;
            let endd = true;
            while (numslength < 16) {
                if (this.nums[numslength] == "") {
                    endd = false;
                }
                numslength++;
            }
            if (endd) {
                this.twibun = base + this.score + "点"
                this.end = true;
            }
        },
        reset() {
            this.load = false;
            this.nums = [];
            this.stop = false;
            this.next = 1;
            this.max = 1;
            this.score = 0;
            this.setup();
            this.stop = false;
            this.end = false;
            this.load = true;
        }
    },
    mounted() {
        window.onload = () => {
            document.getElementById('loading').classList.remove("d-none");
            this.setup();
            this.load = true;
        };
    }
};
const app = Vue.createApp(RenderHtmlApp);

const vm = app.mount('#suujigame');

