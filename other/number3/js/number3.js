const base = "https://twitter.com/intent/tweet?ref_src=twsrc%5Etfw%7Ctwcamp%5Ebuttonembed%7Ctwterm%5Eshare%7Ctwgr%5E&url=https%3A%2F%2Fedodo2.github.io%2Fother%2Fnumber3%2Fstart.html&hashtags=1から順に押すやつエンドレス_edodo2&text=";
const RenderHtmlApp = {
    data() {
        return {
            gameStarted: false,
            twibun: base,
            load: false,
            now: "",
            nums: [],
            hoju: [],
            hoju2: [],
            hojuCount: 0,
            timer: null,
            time: "",
            startTime: 0,
        }
    },
    methods: {
        startGame() {
            this.gameStarted = true;
            this.reset();
        },
        firstSet() {
            this.now = 1;
            this.nums = this.makeList(1);
            this.hoju = this.makeList(17);
            this.hoju2 = this.makeList(33);
        },
        makeList(st) {
            let list = [];
            let numslength = 0;
            while (numslength < 16) {
                let num = Math.floor(Math.random() * 16) + st;
                if (!list.includes(num)) {
                    numslength = list.push(num);
                }
            }
            return list;
        },
        push(index) {
            if (this.nums[index] == this.now) {
                let n = this.now++;
                this.nums[index] = this.hoju.pop();
                if (this.hoju.length < 1 && n % 16 == 0) {
                    this.hoju = this.hoju2;
                    this.hojuCount++;
                    this.hoju2 = this.makeList(16 * (this.hojuCount + 2) + 1);
                }
            }
        },
        start() {
            this.firstSet();
            this.startTime = new Date().getTime();
            this.timer = setInterval(this.timeMane, 50);
        },
        timeMane() {
            this.time = this.now * 1000 - (new Date().getTime() - this.startTime);
            if (this.time < 0) {
                this.end();
            }
        },
        end() {
            clearInterval(this.timer);
            this.timer = null;
            this.twibun = base + "" + (this.now) + "秒耐えた";
            modal.show();
        },
        reset() {
            this.hojuCount = 0;
            this.nums = [];
            this.hoju = [];
            this.hoju2 = [];
            modal.hide();
            setTimeout(this.start, 1000);
        }
    },
    mounted() {
        window.onload = () => {
            document.getElementById('loading').classList.remove("d-none");
            this.load = true;
            setTimeout(this.start, 1000);
        }
    }
};
const app = Vue.createApp(RenderHtmlApp);

const vm = app.mount('#number3');

const modal = new bootstrap.Modal(document.getElementById('endmodal'), {
    keyboard: false
});