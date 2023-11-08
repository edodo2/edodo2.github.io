
const RenderHtmlApp = {
    data() {
        return {
            twibun: "https://twitter.com/intent/tweet?ref_src=twsrc%5Etfw%7Ctwcamp%5Ebuttonembed%7Ctwterm%5Eshare%7Ctwgr%5E&url=https%3A%2F%2Fedodo2.github.io%2Fother%2Fdiceaction%2Fstart.html&hashtags=チンチロ_edodo2&text=",
            load: false,
            gakushunum :0,
            turn: "O",
            you: "O",
            win: "",
            wait: false,
            xnou: new Map(),
            onou: new Map(),
            kioku: [],
            sanmoku: [["", "", ""], ["", "", ""], ["", "", ""]],
            end: false
        }
    },
    methods: {
        ton(n, m) {
            this.kioku.push({ n, m });
            let val = [];
            for (i = 0; i < 3; i++) {
                let inval = [];
                for (j = 0; j < 3; j++) {
                    if (n == i && j == m) {
                        inval.push(this.turn);
                    } else {
                        inval.push(this.sanmoku[i][j]);
                    }
                }
                val.push(inval);
            }

            this.sanmoku = val;
            this.hantei(n, m);
        },
        hantei(n, m) {
            if (this.sanmoku[(n + 1) % 3][m] == this.turn && this.sanmoku[(n + 2) % 3][m] == this.turn) {
                this.win = this.turn;
            }
            if (n == m && this.sanmoku[(n + 1) % 3][(m + 1) % 3] == this.turn && this.sanmoku[(n + 2) % 3][(m + 2) % 3] == this.turn) {
                this.win = this.turn;
            }
            if (n + m == 2 && this.sanmoku[(n +1) % 3][(m + 2) % 3] == this.turn && this.sanmoku[(n + 2) % 3][(m + 4) % 3] == this.turn) {
                this.win = this.turn;
            }
            if (this.sanmoku[n][(m + 1) % 3] == this.turn && this.sanmoku[n][(m + 2) % 3] == this.turn) {
                this.win = this.turn;
            }
            if (this.win != "") {
                this.wait = true;
                this.gakushu();
                return;
            }

            this.turn = this.turn == "O" ? "X" : "O";
            this.wait = this.turn != this.you;
            if (this.wait) {
                this.ai();
            }
        },
        ai() {
            if (this.turn == "O") {
                this.ainou(this.onou);
            } else {
                this.ainou(this.xnou);
            }
        },
        ainou(nou) {
            if (!nou.has(this.sanmoku)) {
                let val = [];
                for (i = 0; i < 3; i++) {
                    let inval = [];
                    for (j = 0; j < 3; j++) {
                        if (this.sanmoku[i][j] == "") {
                            inval.push(1);
                        } else {
                            inval.push("X");
                        }
                    }
                    val.push(inval);
                }
                nou.set(this.sanmoku, val);
            }
            let kakuritsu = nou.get(this.sanmoku);
            let kei = 0;
            for (i = 0; i < 3; i++) {
                for (j = 0; j < 3; j++) {
                    if (kakuritsu[i][j] != "X") {
                        kei = kei + kakuritsu[i][j];
                    }
                }
            }
            let oku = Math.floor(Math.random() * kei) + 1;

            kei = 0;
            for (i = 0; i < 3; i++) {
                for (j = 0; j < 3; j++) {
                    if (kakuritsu[i][j] != "X") {
                        kei = kei + kakuritsu[i][j];
                        if (kei >= oku) {
                            this.ton(i, j);
                            return;
                        }
                    }
                }
            }

        },
        gakushu() {
            this.kioku.length;
            let san = [["", "", ""], ["", "", ""], ["", "", ""]];

            for (k = 0; k < this.kioku.length; k++) {
                let km = this.kioku[k];
                if (k % 2 == 0) {
                    let iswin = this.win == "O";
                    if (!this.onou.has(san)) {
                        let val = [];
                        for (i = 0; i < 3; i++) {
                            let inval = [];
                            for (j = 0; j < 3; j++) {
                                if (san[i][j] == "") {
                                    inval.push(1);
                                } else {
                                    inval.push("X");
                                }
                            }
                            val.push(inval);
                        }
                        this.onou.set(san, val);
                    }
                    let kakuritsu = this.onou.get(san);
                    let val = [];
                    for (i = 0; i < 3; i++) {
                        let inval = [];
                        for (j = 0; j < 3; j++) {
                            if (kakuritsu[i][j] != "X") {
                                if (iswin && km.k == i && km.m == j) {
                                    inval.push(kakuritsu[i][j] + 1);
                                } else if (!iswin && (km.k != i || km.m != j)) {
                                    inval.push(kakuritsu[i][j] + 1);
                                } else { inval.push(kakuritsu[i][j]); }

                            } else {
                                inval.push("X");
                            }
                        }
                        val.push(inval);
                    }
                    this.onou.set(san, val);
                } else {
                    let iswin = this.win == "X";
                    if (!this.xnou.has(san)) {
                        let val = [];
                        for (i = 0; i < 3; i++) {
                            let inval = [];
                            for (j = 0; j < 3; j++) {
                                if (san[i][j] == "") {
                                    inval.push(1);
                                } else {
                                    inval.push("X");
                                }
                            }
                            val.push(inval);
                        }
                        this.xnou.set(san, val);
                    }
                    let kakuritsu = this.xnou.get(san);
                    let val = [];
                    for (i = 0; i < 3; i++) {
                        let inval = [];
                        for (j = 0; j < 3; j++) {
                            if (kakuritsu[i][j] != "X") {
                                if (iswin && km.k == i && km.m == j) {
                                    inval.push(kakuritsu[i][j] + 1);
                                } else if (!iswin && (km.k != i || km.m != j)) {
                                    inval.push(kakuritsu[i][j] + 1);
                                } else { inval.push(kakuritsu[i][j]); }

                            } else {
                                inval.push("X");
                            }
                        }
                        val.push(inval);
                    }
                    this.xnou.set(san, val);
                }

                let val = [];
                for (i = 0; i < 3; i++) {
                    let inval = [];
                    for (j = 0; j < 3; j++) {
                        if (km.k == i && j == km.m) {
                            inval.push("X");
                        } else {
                            inval.push(san[i][j]);
                        }
                    }
                    val.push(inval);
                }
                san = val;
            }
            this.gakushunum++;
            this.kioku = [];
            this.end = true;



        },
        reset(){
            this.end = false;
            this.wait = false;
            this.win = "";
            this.turn = "O";
            this.sanmoku = [["", "", ""], ["", "", ""], ["", "", ""]];
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

app.component('masus', {
    data() { return {} },
    props: ['koko', 'n', "wait"],
    methods: {
        ton(n, m) {
            this.$emit("ton", n, m);
        }
    },
    template: `
    <div class="row h-25">
    <button class="col h-100" :disabled="wait || koko[n][0] != ''" @click="ton(n,0)">
        {{koko[n][0]}}
    </button>
    <button class="col h-100" :disabled="wait || koko[n][1] != ''" @click="ton(n,1)">
        {{koko[n][1]}}
    </button>
    <button class="col h-100" :disabled="wait || koko[n][2] != ''" @click="ton(n,2)">
        {{koko[n][2]}}
    </button>
    </div>`
});
const vm = app.mount('#aisanmoku');

