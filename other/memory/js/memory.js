const base = "https://twitter.com/intent/tweet?ref_src=twsrc%5Etfw%7Ctwcamp%5Ebuttonembed%7Ctwterm%5Eshare%7Ctwgr%5E&url=https%3A%2F%2Fedodo2.github.io%2Fother%2Fmemory&hashtags=覚えて押すやつ_edodo2&text=";
const RenderHtmlApp = {
    data() {
        return {
            gameStarted: false,
            twibun: base,
            load: false,
            now: 1,
            nums: [],
            nextnums: [],
            ans: false,
            count: 1,
            startF:false
        }
    },
    methods: {
        startGame() {
            this.gameStarted = true;
            this.start();
        },
        firstSet() {
            this.count = 1;
            this.now = 1;
            this.nums = this.makeList(1);
            this.nextnums = this.makeList(2);
            this.ans = false;
        },
        makeList(n) {
            let list = [];
            let numslength = 0;
            while (numslength < n) {
                let num = Math.floor(Math.random() * n) + 1;
                if (!list.includes(num)) {
                    numslength = list.push(num);
                }
            }
            return list;
        },
        push(index) {
            if (this.nums[index] == this.count) {
                if (this.count >= this.now) {
                    this.next(this.now);
                } else {
                    this.count++;
                }
            } else {
                this.end();
            }
        },
        next(now) {
            this.now = now + 1;
            this.nums = this.nextnums;
            this.nextnums = this.makeList(now + 2);
            this.count = 1;
            this.ans = false;
            setTimeout(this.ansSet, 1000);
        }
        ,
        start() {
            this.startF = true;
            this.firstSet();
            setTimeout(this.ansSet, 1000);
        },
        ansSet() {
            this.ans = true;
        },
        end() {
            this.twibun = base + "記録:" + (this.now - 1);
            modal.show();
        },
        reset() {
            modal.hide();
            this.start();
        }
    },
    mounted() {
        window.onload = () => {
            document.getElementById('loading').classList.remove("d-none");
            this.load = true;
        }
    }
};
const app = Vue.createApp(RenderHtmlApp);

const vm = app.mount('#memory');

const modal = new bootstrap.Modal(document.getElementById('endmodal'), {
    keyboard: false
});