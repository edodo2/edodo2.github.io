const RenderHtmlApp = {
    data() {
        return {
            gameStarted: false,
            load: false,
            width: window.innerWidth,
            height: window.innerHeight,
            ichi: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            ans: ['?', '?', '?', '?'],
            ansNow: 0,
            typ: [-1, -1, -1, -1],
            count: 0,
            twibun: "https://twitter.com/intent/tweet?ref_src=twsrc%5Etfw%7Ctwcamp%5Ebuttonembed%7Ctwterm%5Eshare%7Ctwgr%5E&url=https%3A%2F%2Fedodo2.github.io%2Fother%2Flock%2Fstart.html&text=",
        }
    },
    methods: {
        startGame() {
            this.gameStarted = true;
        },
        numosu(n) {
            this.typ[this.ansNow] = n;
            this.ansNow++;
            if (this.ansNow > 3) {
                if (this.ans[0] == this.typ[0]
                    && this.ans[1] == this.typ[1]
                    && this.ans[2] == this.typ[2]
                    && this.ans[3] == this.typ[3]) {
                    this.count++;
                    this.set();
                }
                this.typ = [-1, -1, -1, -1];
                this.ansNow = 0;
            }
        },
        set() {
            var next = "" + new Date().getMilliseconds();
            while (next.length < 3) {
                next = "0" + next;
            }
            this.ans[0] = this.count % 10;
            this.ans[1] = next[0];
            this.ans[2] = next[1];
            this.ans[3] = next[2];
        },
        change() {

        },
        start() {
            this.count = 5;
            setTimeout(this.down, 1000);
        },
        down() {
            this.count--;
            if (this.count > 0) {
                setTimeout(this.down, 1000);
            } else {
                setTimeout(this.end, 30000);
                this.set();
            }
        },
        end() {
            this.twibun = this.twibun + "30秒もあれば " + this.count + " 回ロック解除できます&hashtags=ロック解除ゲーム"
            theyModal.show();
        }
    },
    mounted() {
        window.onload = () => {
            document.getElementById('loading').classList.remove("d-none");
            this.load = true;
            this.start();
        };
    }
};
const app = Vue.createApp(RenderHtmlApp);

const vm = app.mount('#lockapp');

const theyModal = new bootstrap.Modal(document.getElementById('cmodal'), {
    keyboard: false
});

