const now = new Date();
const RenderHtmlApp = {
    data() {
        return {
            load: false,
            twibun: "https://twitter.com/intent/tweet?hashtags=Million_edodo2_April_Fool&ref_src=twsrc%5Etfw%7Ctwcamp%5Ebuttonembed%7Ctwterm%5Eshare%7Ctwgr%5E&url=https%3A%2F%2Fedodo2.github.io%2Fmillion%2Fstart.html&text=",
            kekka2: "結果を",
            rizaruto: "第1ステージで失敗",
            clear: false,
            stage: 0,
            ritu: 1,
            kekka: [false, false, false, false, false, false, false],
            taku: [2, 2, 2, 5, 10, 25, 100],
            setsumei: "挑戦する確率を選んでください",
            challenge: false,
            kazu: 0,
            ima: 0,
        }
    },
    methods: {
        set(n) {
            this.kazu = this.taku[n];
            this.ima = n;
            this.challenge = true;
            this.setsumei = "当ててください、チャンスは1回のみです"
        },
        go(n) {
            if (ans[this.stage] % this.kazu == n % this.kazu) {
                this.kekka[this.ima] = true;
                this.challenge = false;
                this.setsumei = "挑戦する確率を選んでください";
                this.ritu = this.ritu * this.kazu;
                this.stage++;
                if (this.stage > 6) {
                    this.clear = true;
                    this.rizaruto = "Clear!!!!";
                    this.kekka2 = "クリア";
                    this.twibun = this.twibun + "%E3%80%8EMillion%E3%80%8F 完全制覇 " + "1/" + this.ritu;
                    theyModal.show();
                }
            } else {
                this.rizaruto = "第" + (this.stage + 1) + "ステージで失敗";
                if (this.stage == 6) {
                    this.rizaruto = "FINALステージで失敗";
                }
                this.twibun = this.twibun + "%E3%80%8EMillion%E3%80%8F " + this.rizaruto + " 1/" + this.ritu;
                theyModal.show();
            }
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

const ans = [now.getFullYear(), now.getMonth() + 1, now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds()];

const vm = app.mount('#app');

const theyModal = new bootstrap.Modal(document.getElementById('cmodal'), {
    keyboard: false
});

