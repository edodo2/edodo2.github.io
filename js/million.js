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
            ans: [],
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
            if (this.ans[this.stage] % this.kazu == n % this.kazu) {
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
        },
        reset(){
            theyModal.hide();
            this.twibun= "https://twitter.com/intent/tweet?hashtags=Million_edodo2_April_Fool&ref_src=twsrc%5Etfw%7Ctwcamp%5Ebuttonembed%7Ctwterm%5Eshare%7Ctwgr%5E&url=https%3A%2F%2Fedodo2.github.io%2Fmillion%2Fstart.html&text=";
            this.kekka2 = "結果を";
            this.rizaruto= "第1ステージで失敗";
            this.clear= false;
            this.stage= 0;
            this.ritu= 1;
            this.kekka= [false, false, false, false, false, false, false];
            this.taku= [2, 2, 2, 5, 10, 25, 100];
            this.setsumei= "挑戦する確率を選んでください";
            this.challenge= false;
            this.kazu= 0;
            this.ima= 0;
            let now = new Date();
            this.ans = [now.getFullYear(), now.getMonth() + 1, now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds()];
        }
    },
    mounted() {
        window.onload = () => {
            document.getElementById('loading').classList.remove("d-none");
            this.reset();
            this.load = true;
        }
    }
};
const app = Vue.createApp(RenderHtmlApp);

const vm = app.mount('#app');

const theyModal = new bootstrap.Modal(document.getElementById('cmodal'), {
    keyboard: false
});

