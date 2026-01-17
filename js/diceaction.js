
var param = location.search;
const RenderHtmlApp = {
    data() {
        return {
            gameStarted: false,
            twibun: "https://twitter.com/intent/tweet?ref_src=twsrc%5Etfw%7Ctwcamp%5Ebuttonembed%7Ctwterm%5Eshare%7Ctwgr%5E&url=https%3A%2F%2Fedodo2.github.io%2Fother%2Fdiceaction%2Fstart.html&hashtags=チンチロ_edodo2&text=",
            load: false,
            dice: [1, 1, 1],
            dis: [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
            points: [50000, 50000, 50000, 50000],
            stop: [true, true, true],
            kekka: "",
            kekkas: ["", "", ""],
            count: 3,
            rolling: true,
            shu: 1,
            start: 0,
            now: 0,
            oya: ["(親)", "", "", ""],
            korolling: false,
            kake: [1000, 3000, 5000, 10000],
            sentaku: true,
            bets: ["", "", "", ""],
            yaku: { "ひふみ": -1, "目なし": 0, "1": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "シゴロ": 7, "アラシ": 8, "ピンゾロ": 9 },
            stock: [true, true, true, true],
            name: ["一郎", "次郎", "三郎", "あなた"],
            mou: "",
            end: false
        }
    },
    methods: {
        startGame() {
            this.gameStarted = true;
        },
        roll() {
            if (this.rolling == false) {
                this.rolling = true;
                this.stop = [false, false, false];
                this.count--;
                this.kekka = "";
                this.korokoro(0);
                this.korokoro(1);
                this.korokoro(2);
            }
        },
        korokoro(n) {
            this.dice[n] = Math.floor(Math.random() * 6) + 1;
            if (Math.random() > 0.1) {
                setTimeout(this.korokoro, 100, n);
            } else {
                this.stop[n] = true;
                this.dicestop();
            }
        },
        dicestop() {
            if (this.stop[0] && this.stop[1] && this.stop[2]) {
                this.hantei();
            }
        },
        hantei() {
            if (this.dice[0] == this.dice[1] && this.dice[2] == this.dice[1]) {
                if (this.dice[0] == 1) {
                    this.kekka = "ピンゾロ";
                } else {
                    this.kekka = "アラシ";
                }
            } else if (this.dice[0] == this.dice[1]) {
                this.kekka = this.dice[2];
            } else if (this.dice[1] == this.dice[2]) {
                this.kekka = this.dice[0];
            } else if (this.dice[0] == this.dice[2]) {
                this.kekka = this.dice[1];
            } else if (this.dice.includes(4) && this.dice.includes(5) && this.dice.includes(6)) {
                this.kekka = "シゴロ";
            } else if (this.dice.includes(1) && this.dice.includes(2) && this.dice.includes(3)) {
                this.kekka = "ひふみ";
            } else {
                this.kekka = "目なし";
                if (this.count > 0) {
                    this.rolling = false;
                }
            }
            if (this.rolling) {
                setTimeout(this.next, 1000);
            }
        },
        tsugi() {
            this.oya = ["", "", "", ""];
            this.kekkas = ["", "", ""];
            this.kekka = "";
            if (this.start == 3) {
                setTimeout(this.final, 1000);
            } else {
                this.count = 3;
                this.start++;
                this.oya[this.start] = "(親)";
                this.childset();
            }
        },
        final() {
            var las = 0;
            for (i = 0; i < 4; i++) {
                if (this.points[i] < this.points[las]) {
                    las = i;
                }
            }
            if (this.points[las] < 0 && this.stock[las]) {
                this.stock[las] = false;
                this.mou = this.name[las] + "「正味もう一周」";
                this.shu++;
                this.start = 0;
                this.childset();
            } else {
                this.mou = "終了";
                this.twibun = this.twibun + this.points[3] + "pt";
                this.end = true;
            }
        },
        kakutei() {
            for (i = 0; i < 4; i++) {
                if (this.start != i) {
                    this.hikaku(i);
                }
            }
            setTimeout(this.tsugi, 1000);
        },
        hikaku(i) {
            var oyaku = "";
            if (this.start == 3) {
                oyaku = this.kekka;
            } else {
                oyaku = this.kekkas[this.start];
            }
            var koyaku = "";
            if (i == 3) {
                koyaku = this.kekka;
            } else {
                koyaku = this.kekkas[i];
            }
            if (oyaku == koyaku) {
                this.points[this.start] += this.bets[i];
                this.points[i] -= this.bets[i];
            } else if (this.yaku[oyaku] > this.yaku[koyaku]) {
                var bairitu = 1;
                if (this.yaku[koyaku] < 0) {
                    bairitu *= 2;
                }
                if (oyaku == "シゴロ") {
                    bairitu *= 2;
                }
                if (oyaku == "アラシ") {
                    bairitu *= 3;
                }
                if (oyaku == "ピンゾロ") {
                    bairitu *= 5;
                }
                this.points[this.start] += this.bets[i] * bairitu;
                this.points[i] -= this.bets[i] * bairitu;
            } else {
                var bairitu = 1;
                if (this.yaku[oyaku] < 0) {
                    bairitu *= 2;
                }
                if (koyaku == "シゴロ") {
                    bairitu *= 2;
                }
                if (koyaku == "アラシ") {
                    bairitu *= 3;
                }
                if (koyaku == "ピンゾロ") {
                    bairitu *= 5;
                }
                this.points[this.start] -= this.bets[i] * bairitu;
                this.points[i] += this.bets[i] * bairitu;
            }
            this.bets[i] = "";
        },
        next() {
            this.count = 3;
            this.now = (this.now + 1) % 4;
            if (this.now == (this.start + 1) % 4) {
                setTimeout(this.kakutei, 1000);
            } else if (this.now == 3) {
                this.rolling = false;
            } else {
                this.koroll(this.now);
            }
        },
        star() {
            this.count = 3;
            this.oya[this.start] = "(親)";
            this.now = (this.start + 1) % 4;
            if (this.now == 3) {
                this.rolling = false;
            } else {
                this.koroll(this.now);
            }
        },
        koroll(n) {
            this.kekkas[n] = "";
            this.korolling = true;
            this.count--;
            this.stop = [false, false, false]
            setTimeout(this.kokorokoro, 100, n, 0)
            setTimeout(this.kokorokoro, 100, n, 1)
            setTimeout(this.kokorokoro, 100, n, 2)
        },
        kokorokoro(n, m) {
            this.dis[n][m] = Math.floor(Math.random() * 6) + 1;
            if (Math.random() > 0.1) {
                setTimeout(this.kokorokoro, 100, n, m);
            } else {
                this.stop[m] = true;
                this.kodicestop(n);
            }
        },
        kodicestop(n) {
            if (this.stop[0] && this.stop[1] && this.stop[2]) {
                this.kohantei(n);
            }
        },
        kohantei(n) {
            if (this.dis[n][0] == this.dis[n][1] && this.dis[n][2] == this.dis[n][1]) {
                if (this.dis[n][0] == 1) {
                    this.kekkas[n] = "ピンゾロ";
                } else {
                    this.kekkas[n] = "アラシ";
                }
            } else if (this.dis[n][0] == this.dis[n][1]) {
                this.kekkas[n] = this.dis[n][2];
            } else if (this.dis[n][1] == this.dis[n][2]) {
                this.kekkas[n] = this.dis[n][0];
            } else if (this.dis[n][0] == this.dis[n][2]) {
                this.kekkas[n] = this.dis[n][1];
            } else if (this.dis[n].includes(4) && this.dis[n].includes(5) && this.dis[n].includes(6)) {
                this.kekkas[n] = "シゴロ";
            } else if (this.dis[n].includes(1) && this.dis[n].includes(2) && this.dis[n].includes(3)) {
                this.kekkas[n] = "ひふみ";
            } else {
                this.kekkas[n] = "目なし";
                if (this.count > 0) {
                    this.korolling = false;
                }
            }
            if (this.korolling) {
                setTimeout(this.next, 100);
            } else {
                setTimeout(this.koroll, 1000, n);
            }
        },
        set(yyyy) {
            this.bets[3] = yyyy;
            this.mou = ""
            this.star();
            this.sentaku = false;
        },
        childset() {
            for (i = 0; i < 3; i++) {
                if (this.start != i) {
                    this.bets[i] = this.kake[Math.floor(Math.random() * 4)] * this.shu;
                    var ifif = this.kake[Math.floor(Math.random() * 4)] * this.shu;
                    if (this.bets[i] < ifif) {
                        this.bets[i] = ifif;
                    }
                }
            }
            if (this.start < 3) {
                this.sentaku = true;
            } else {
                setTimeout(this.star, 1000);
            }
        },
        reset() {
            this.twibun = "https://twitter.com/intent/tweet?ref_src=twsrc%5Etfw%7Ctwcamp%5Ebuttonembed%7Ctwterm%5Eshare%7Ctwgr%5E&url=https%3A%2F%2Fedodo2.github.io%2Fother%2Fdiceaction%2Fstart.html&hashtags=チンチロ_edodo2&text=";
            this.dice = [1, 1, 1];
            this.dis = [[1, 1, 1], [1, 1, 1], [1, 1, 1]];
            this.points = [50000, 50000, 50000, 50000];
            this.stop = [true, true, true];
            this.kekka = "";
            this.kekkas = ["", "", ""];
            this.count = 3;
            this.rolling = true;
            this.shu = 1;
            this.start = 0;
            this.now = 0;
            this.oya = ["(親)", "", "", ""];
            this.korolling = false;
            this.kake = [1000, 3000, 5000, 10000];
            this.sentaku = true;
            this.bets = ["", "", "", ""];
            this.stock = [true, true, true, true];
            this.name = ["一郎", "次郎", "三郎", "あなた"];
            this.mou = "";
            this.end = false;
            this.childset();
        }

    },
    mounted() {
        window.onload = () => {
            document.getElementById('loading').classList.remove("d-none");
            this.load = true;
            this.childset();
        };
    }
};
const app = Vue.createApp(RenderHtmlApp);

app.component('child', {
    data() { return { name: ["一郎", "次郎", "三郎"] } },
    props: ['n', 'dis', 'points', 'oya', 'kekkas', 'bets'],
    template: `
    <div class="col h-100 card">
    <div class="h-50 card">
        <div class="h-50">
            {{name[n]}}{{oya}}
        </div>
        <div class="h-50">
            {{points[n]}}pt
        </div>
    </div>
    <div class="h-25 m-0">{{kekkas[n]}}<br>{{bets[n]}}</div>
    <div class="h-25">
      <div class="row h-100">
        <div class="col h-100"><img :src="'../../image/dice/'+ dis[n][0] + '.svg'" class="h-100 w-100"></div>
        <div class="col h-100"><img :src="'../../image/dice/'+ dis[n][1] + '.svg'" class="h-100 w-100"></div>
        <div class="col h-100"><img :src="'../../image/dice/'+ dis[n][2] + '.svg'" class="h-100 w-100"></div>
      </div>
    </div>
  </div>`
});
const vm = app.mount('#diceaction');

