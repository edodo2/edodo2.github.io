const twtx = "https://twitter.com/intent/tweet?ref_src=twsrc%5Etfw%7Ctwcamp%5Ebuttonembed%7Ctwterm%5Eshare%7Ctwgr%5E&url=https%3A%2F%2Fedodo2.github.io%2Fother%2Faisanmoku%2Fstart.html&hashtags=AIさんもく_edodo2&text=";
const RenderHtmlApp = {
    data() {
        return {
            twibun: "",
            load: false,
            gakushunum: 0,
            uragakushunum: 0,
            turn: "O",
            you: "O",
            win: "",
            wake: false,
            wait: false,
            xnou: new Map(),
            onou: new Map(),
            kioku: [],
            sanmoku: [["", "", ""], ["", "", ""], ["", "", ""]],
            end: false,
            maru: 0,
            batsu: 0,
            uramaru: 0,
            urabatsu: 0,
            nextf: true,
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
            if (n + m == 2 && this.sanmoku[(n + 1) % 3][(m + 2) % 3] == this.turn && this.sanmoku[(n + 2) % 3][(m + 4) % 3] == this.turn) {
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
            let hikiwake = true;
            for (i = 0; i < 3; i++) {
                for (j = 0; j < 3; j++) {
                    if (this.sanmoku[i][j] == "") {
                        hikiwake = false;
                    }
                }
            }
            this.wake = hikiwake;
            if (this.wake) {
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
        getst(sanmoku) {
            let sanst = "";
            for (i = 0; i < 3; i++) {
                for (j = 0; j < 3; j++) {
                    if (sanmoku[i][j] == "") {
                        sanst = sanst + "Y";
                    } else {
                        sanst = sanst + sanmoku[i][j];
                    }
                }
            }
            return sanst;
        },
        keiwa(kakuritsu) {
            let kei = 0;
            for (i = 0; i < 3; i++) {
                for (j = 0; j < 3; j++) {
                    if (kakuritsu[i][j] != "X") {
                        kei = kei + kakuritsu[i][j];
                    }
                }
            }
            return kei;
        },
        ainou(nou) {
            let sanst = this.getst(this.sanmoku);
            if (!nou.has(sanst)) {
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
                nou.set(sanst, val);
            }
            let kakuritsu = nou.get(sanst);
            // if (this.you == "" && Math.random() < 0.2 && this.gakushunum % 5 == 0) {
            //     let val = [];
            //     for (i = 0; i < 3; i++) {
            //         let inval = [];
            //         for (j = 0; j < 3; j++) {
            //             if (this.sanmoku[i][j] == "") {
            //                 inval.push(1);
            //             } else {
            //                 inval.push("X");
            //             }
            //         }
            //         val.push(inval);
            //     }
            //     kakuritsu = val;
            // }
            let kei = this.keiwa(kakuritsu);
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
            if (this.you != "" && this.win != "" && this.win != this.you) {
                this.end = true;
                this.nextf = false;
                this.twibun = twtx +  "【AIさんもく】 " + this.uragakushunum + "点";
                return;
            }
            if (this.win == "O") {
                this.maru++;
                this.uramaru++;
            }
            else if (this.win == "X") {
                this.batsu++;
                this.urabatsu++;
            }

            this.kioku.length;
            let san = [["", "", ""], ["", "", ""], ["", "", ""]];

            for (k = 0; k < this.kioku.length; k++) {
                let km = this.kioku[k];
                if (k % 2 == 0) {
                    let iswin = this.win == "O" //|| this.hikiwake;
                    if (!this.onou.has(this.getst(san))) {
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
                        this.onou.set(this.getst(san), val);
                    }
                    let kakuritsu = this.onou.get(this.getst(san));
                    let val = [];
                    for (i = 0; i < 3; i++) {
                        let inval = [];
                        for (j = 0; j < 3; j++) {
                            if (kakuritsu[i][j] != "X") {
                                if (km.n == i && km.m == j) {
                                    if (iswin) {
                                        inval.push(kakuritsu[i][j] + 1);
                                    } else {
                                        inval.push(kakuritsu[i][j]);
                                    }
                                } else { inval.push(kakuritsu[i][j]); }

                            } else {
                                inval.push("X");
                            }
                        }
                        val.push(inval);
                    }
                    this.onou.set(this.getst(san), val);
                } else {
                    let iswin = this.win == "X" || this.hikiwake;
                    if (!this.xnou.has(this.getst(san))) {
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
                        this.xnou.set(this.getst(san), val);
                    }
                    let kakuritsu = this.xnou.get(this.getst(san));
                    let val = [];
                    for (i = 0; i < 3; i++) {
                        let inval = [];
                        for (j = 0; j < 3; j++) {
                            if (kakuritsu[i][j] != "X") {
                                if (km.n == i && km.m == j) {
                                    if (iswin) {
                                        inval.push(kakuritsu[i][j] + 1);
                                    }
                                    else {
                                        let num = kakuritsu[i][j];
                                        inval.push(num);
                                    }
                                } else { inval.push(kakuritsu[i][j]); }

                            } else {
                                inval.push("X");
                            }
                        }
                        val.push(inval);
                    }
                    this.xnou.set(this.getst(san), val);
                }

                let val = [];
                for (i = 0; i < 3; i++) {
                    let inval = [];
                    for (j = 0; j < 3; j++) {
                        if (km.n == i && j == km.m) {
                            if (k % 2 == 0) {
                                inval.push("O");
                            } else {
                                inval.push("X");
                            }

                        } else {
                            inval.push(san[i][j]);
                        }
                    }
                    val.push(inval);
                }
                san = val;
            }
            this.gakushunum++;
            this.uragakushunum++;
            this.kioku = [];
            if (this.you != "" && this.you == this.win) {
                this.end = true;
                return;
            }
            if (this.you != "" && "" == this.win) {
                this.you = this.you == "X" ? "O" : "X";
                this.end = false;
                this.wait = false;
                this.win = "";
                this.turn = "O";
                this.sanmoku = [["", "", ""], ["", "", ""], ["", "", ""]];
                if (this.turn != this.you) {
                    this.ai();
                }
                return;
            }

            let nanika = this.gakushunum > 99999 ? 20000 :this.gakushunum > 9999 ? 10000 : this.gakushunum > 100 ? 1000 : this.gakushunum > 10 ? 100 : this.gakushunum > 1 ? 10 : 1;
            // nanika = 1000000;
            if (this.gakushunum % 100 == 0 || this.gakushunum % nanika == 0) {
                if (this.gakushunum % nanika == 0) {
                    this.you = Math.random() < 0.5 ? "O" : "X";
                    this.end = false;
                    this.wait = false;
                    this.win = "";
                    this.turn = "O";
                    this.sanmoku = [["", "", ""], ["", "", ""], ["", "", ""]];
                    if (this.turn != this.you) {
                        this.ai();
                    }
                } else {
                    setTimeout(this.rep);
                }
            } else {
                this.you = ""
                this.end = false;
                this.turn = "O"
                this.wait = true;
                this.win = "";
                this.sanmoku = [["", "", ""], ["", "", ""], ["", "", ""]];
                this.ai();
            }
        },
        next() {
            this.you = ""
            this.end = false;
            this.turn = "O"
            this.wait = true;
            this.win = "";
            this.sanmoku = [["", "", ""], ["", "", ""], ["", "", ""]];
            this.ai();
        },
        rep() {
            if (this.uragakushunum > 10000) {
                //     if(this.uramaru / this.uragakushunum > 0.5){
                //         this.onou = new Map();
                //         this.uragakushunum = 0;
                //         this.uramaru = 0;
                //         this.urabatsu = 0;
                //     }
                //     if(this.urabatsu / this.uragakushunum > 0.5){
                //         this.xnou = new Map();
                this.uragakushunum = 0;
                this.uramaru = 0;
                this.urabatsu = 0;
                //     }
            }

            this.xnou.forEach((value, key) => {
                if (this.keiwa(value) < 100) {
                    return;
                }
                let val = [];
                for (i = 0; i < 3; i++) {
                    let inval = [];
                    for (j = 0; j < 3; j++) {
                        if (value[i][j] != "X") {
                            inval.push(Math.floor(value[i][j] * 0.49) + 1)
                        } else {
                            inval.push("X");
                        }
                    }
                    val.push(inval);
                }
                this.xnou.set(key, val);
            });
            this.onou.forEach((value, key) => {
                if (this.keiwa(value) < 100) {
                    return;
                }
                let val = [];
                for (i = 0; i < 3; i++) {
                    let inval = [];
                    for (j = 0; j < 3; j++) {
                        if (value[i][j] != "X") {
                            inval.push(Math.floor(value[i][j] * 0.49) + 1)
                        } else {
                            inval.push("X");
                        }
                    }
                    val.push(inval);
                }
                this.onou.set(key, val);
            });

            this.you = ""
            this.end = false;
            this.turn = "O"
            this.wait = true;
            this.win = "";
            this.sanmoku = [["", "", ""], ["", "", ""], ["", "", ""]];
            this.ai();
        }
    },
    mounted() {
        window.onload = () => {
            document.getElementById('loading').classList.remove("d-none");
            this.you = Math.random() < 0.5 ? "O" : "X";
            if (this.turn != this.you) {
                this.ai();
            }
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

