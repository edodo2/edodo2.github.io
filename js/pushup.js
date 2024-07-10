
var param = location.search;
const RenderHtmlApp = {
    data() {
        return {
            twibun: "https://twitter.com/intent/tweet?ref_src=twsrc%5Etfw%7Ctwcamp%5Ebuttonembed%7Ctwterm%5Eshare%7Ctwgr%5E&url=https%3A%2F%2Fedodo2.github.io%2Fother%2Fpushup%2Fstart.html&text=",
            load: false,
            count: "start",
            addok: false,
            quick: param == "?mode=1",
            counter: null,
            now: 0,
            pre: 0
        }
    },
    methods: {
        add() {
            if (this.count == "start") {
                this.start();
            } else if (this.addok) {
                this.addok = this.quick;
                if (this.quick) {
                    var now = new Date().getTime();
                    if (now - this.pre < 100) {
                        return;
                    }
                    this.pre = now;
                }
                this.count++;
            }
        },
        start() {
            // 開始時に全画面表示
            document.documentElement.requestFullscreen();

            this.count = 5;
            setTimeout(this.down, 1000);
        },
        down() {
            this.count--;
            if (this.count > 0) {
                setTimeout(this.down, 1000);
            } else {
                this.addok = true;
                if (this.quick) {
                    setTimeout(this.qu, 180000);
                } else {
                    this.counter = setInterval(this.up, 2000);
                }
            }
        },
        up() {
            this.now++;
            if (this.count < this.now) {
                clearInterval(this.counter);
                this.twibun = this.twibun + "エンドレス腕立て 記録:" + this.count + "回&hashtags=2秒毎腕立て";
                theyModal.show();

                // カウント終了時に全画面表示を解除
                document.exitFullscreen();
            } else {
                this.addok = true;
            }
        },
        qu() {
            this.twibun = this.twibun + "3分間腕立て 記録:" + this.count + "回&hashtags=3分間腕立て";
            theyModal.show();

            // カウント終了時に全画面表示を解除
            document.exitFullscreen();
        }
    },
    mounted() {
        window.onload = () => {
            document.getElementById('loading').classList.remove("d-none");
            this.load = true;
        };
    }
};
const app = Vue.createApp(RenderHtmlApp);

const vm = app.mount('#pushapp');

const theyModal = new bootstrap.Modal(document.getElementById('cmodal'), {
    keyboard: false
});

