const now = new Date();
const regexp = /\+$|-$|\*$/;
const RenderHtmlApp = {
    data() {
        return {
            load: false,
            now: 0,
            text: "",
            humi: ["ふみだい", "", "", ""],
            item: new Map(),
            nowi: "",
            maku: 0,
            bednum: 0,
            hi: -1,
            hion: [false, false],
            light: true,
            rimo: false,
            mon: false,
            kamiget: false,
            left: true,
            migi: true,
            right: false,
            hasamiF: false,
            dai: "",
            jo: [[0, 0, 0, 0], [14, 14, 14, 14]],
            eng: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P",
                "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
        }
    },
    methods: {
        move(n) {
            this.base();
            this.now += n;
            this.now = this.now % 4;
        },
        door() {
            if (this.nowi == "かぎ") {
                theyModal.show();
            }
            this.base();
            this.text = "開かない 「かぎ」が必要だ";
        },
        humu(n) {
            this.text = "";
            if (this.humi[n] == "ふみだい") {
                this.humi = ["", "", "", ""];
                this.item.set("ふみだい", map["ふみだい"]);
                this.text = "よっこいしょ";
            } else if (this.nowi == "ふみだい") {
                this.humi[n] = "ふみだい";
                this.item.delete("ふみだい");
                this.text = "とりあえず置いておこう";
            } else {
                this.text = "ここに何か置けそうな気がする";
            }
            this.nowi = "";
        },
        icli(key) {
            if (this.nowi == key) {
                this.nowi = "";
                this.text = "";
            } else {
                this.nowi = key;
                this.text = this.item.get(key);
            }
        },
        tana() {
            this.text = "";
            if (this.kamiget) {
                this.text = "ここにはもう何もない";
            } else if (this.humi[1] == "ふみだい") {
                if (this.nowi == "ライト") {
                    if (this.light) {
                        this.now = 4;
                        this.text = "よく見える、何か書いてあるな";
                    } else {
                        this.text = "電池が入っていないので暗いままだ";
                    }
                } else {
                    this.text = "暗くてよく見えない、手を突っ込むのは怖い";
                }
            } else {
                this.text = "棚のようだが、高くてよく見えない";
            }
        },
        base() {
            this.text = "";
            this.nowi = "";
        },
        bed() {
            this.base();
            // this.now = 5;
            this.bednum++;
            this.text = "寝心地は良さそう、何もない";
        },
        makura() {
            this.base();
            this.maku++;
            this.text = "何かありそうなもんだけど、何にもないな"
        },
        sagyo() {
            this.base();
            this.hi = -1;
            this.now = 6;
            this.text = "アイテムに何かするのに最適な場所だ";
        },
        katakana() {
            if (this.hasamiF) {
                this.text = "ここにはもう何もない";
            } else if (this.nowi == "カギ") {
                this.hi = -2;
                this.now = 6;
                this.left = false;
                this.text = "こっちの鍵だったか、ほしいのは扉の鍵なんだよな";
            } else {
                this.text = "開かない 「カギ」が必要だ";
            }
            this.nowi = "";
        },
        hikida(n) {
            this.base();
            if (this.hion[n]) {
                this.text = "ここにはもう何もない";
            } else {
                this.hi = n;
                this.now = 6;
                this.text = "開かない 4桁錠的なことなのだろうか";
            }
        },
        tada() {
            this.base();
            if (this.item.has("ライト")) {
                this.text = "ここにはもう何もない";
            } else {
                this.text = "ライトを手に入れた";
                this.item.set("ライト", map["ライト"]);
            }
        },
        monita() {
            if (this.mon) {
                this.text = "O S O I 遅いってことか？？ 直線的なフォントなのも関係しているのだろうか？";
            } else if (this.nowi == "リモコン") {
                if (!this.rimo) {
                    this.text = "反応がない 電池が入ってないもんな";
                } else {
                    this.text = "動いた O S O I どういうことだ？";
                    this.mon = true;
                }
            } else {
                this.text = "何も表示されていない";
            }
            this.nowi = "";
        },
        kami() {
            this.base();
            this.kamiget = true;
            this.now = 1;
            this.text = "OPEN と書いてある紙を手に入れた";
            this.item.set("かみ", map["かみ"]);
        },
        setsumei() {
            this.base();
            this.text = `置いたアイテムに他のアイテムを使用したり、組み合わせたりできます。
            『ばらす』で置いてあるアイテムを分解しようとします`;
        },
        barasu() {
            if (this.dai) {
                if (this.dai == "ライト") {
                    if (this.light) {
                        this.text = "電池を取り出した";
                        this.light = false;
                        this.item.set("でんち", map["でんち"]);
                        this.item.set("ライト", map["ライト"]);
                        this.dai = "";
                    } else {
                        this.text = "入っていない電池は取り出せない";
                    }
                } else if (this.dai == "リモコン") {
                    if (this.rimo) {
                        this.text = "電池を取り出した";
                        this.rimo = false;
                        this.item.set("でんち", map["でんち"]);
                        this.item.set("リモコン", map["リモコン"]);
                        this.dai = "";
                    } else {
                        this.text = "入っていない電池は取り出せない";
                    }
                } else {
                    this.text = "分解できなかった";
                }
            } else {
                this.text = "何も置いてないので分解できない";
            }
            this.nowi = "";
        },
        oku() {
            if (this.dai != "") {
                if (this.nowi == "") {
                    this.item.set(this.dai, map[this.dai]);
                    this.text = "おかえり";
                    this.dai = "";
                } else {
                    if (this.dai == "でんち") {
                        if (this.nowi == "ライト" && !this.light) {
                            this.text = "電池を入れた";
                            this.dai = "";
                            this.light = true;
                            this.item.set("ライト", map["ライト"]);
                            this.nowi = "";
                        }
                        if (this.nowi == "リモコン" && !this.rimo) {
                            this.text = "電池を入れた";
                            this.dai = "";
                            this.rimo = true;
                            this.item.set("リモコン", map["リモコン"]);
                            this.nowi = "";
                        }
                    } else if (this.nowi == "でんち") {
                        if (this.dai == "ライト" && !this.light) {
                            this.text = "電池を入れた";
                            this.dai = "";
                            this.light = true;
                            this.item.delete("でんち");
                            this.item.set("ライト", map["ライト"]);
                            this.nowi = "";
                        }
                        if (this.dai == "リモコン" && !this.rimo) {
                            this.text = "電池を入れた";
                            this.dai = "";
                            this.rimo = true;
                            this.item.delete("でんち");
                            this.item.set("リモコン", map["リモコン"]);
                            this.nowi = "";
                        }
                    }
                    else if (this.dai == "み" || this.dai == "み ") {
                        if (this.nowi == "か") {
                            this.item.delete(this.nowi);
                            if(this.dai == "み"){
                                this.item.delete("み ");
                                this.item.set("み", map["み"]);
                            }
                            this.item.set("かみ", map["かみ"]);
                            this.dai = "";
                            this.text = "OPENと書かれている紙に戻った";
                        }
                        if (this.nowi == "み" || this.nowi == "み ") {
                            this.item.delete(this.nowi);
                            this.item.set("みみ", map["みみ"]);
                            this.dai = "";
                            this.text = "パンの端っこが急に出てきた";
                        }
                        if (this.nowi == "ぎ") {
                            this.item.delete(this.nowi);
                            if(this.dai == "み "){
                                this.item.delete("み");
                                this.item.set("み ", map["み "]);
                            }
                            this.item.set("みぎ", map["みぎ"]);
                            this.dai = "";
                            this.text = "右のイデアだ";
                        }
                    } else if (this.nowi == "み" || this.nowi == "み ") {
                        if (this.dai == "か") {
                            this.item.delete("み ");
                            this.item.set("かみ", map["かみ"]);
                            this.dai = "";
                            this.text = "OPENと書かれている紙に戻った";
                        }
                        if (this.dai == "み" || this.dai == "み ") {
                            this.item.delete(this.nowi);
                            this.item.set("みみ", map["みみ"]);
                            this.dai = "";
                            this.text = "パンの端っこが急に出てきた";
                        }
                        if (this.dai == "ぎ") {
                            this.item.delete("み");
                            this.item.set("みぎ", map["みぎ"]);
                            this.dai = "";
                            this.text = "右のイデアだ";
                        }
                    }
                    else if (this.dai == "か") {
                        if (this.nowi == "み" || this.nowi == "み ") {
                            this.item.delete("み ");
                            this.item.set("かみ", map["かみ"]);
                            this.dai = "";
                            this.text = "OPENと書かれている紙に戻った";
                        }
                        if (this.nowi == "ぎ") {
                            this.item.delete(this.nowi);
                            this.item.set("かぎ", map["かぎ"]);
                            this.dai = "";
                            this.text = "これで出られるぞ！！！";
                        }
                    } else if (this.nowi == "か") {
                        if (this.dai == "み" || this.dai == "み ") {
                            if(this.dai == "み"){
                                this.item.delete("み ");
                                this.item.set("み", map["み"]);
                            }
                            this.item.delete(this.nowi);
                            this.item.set("かみ", map["かみ"]);
                            this.dai = "";
                            this.text = "OPENと書かれている紙に戻った";
                        }
                        if (this.dai == "ぎ") {
                            if(this.dai == "み "){
                                this.item.delete("み");
                                this.item.set("み ", map["み "]);
                            }
                            this.item.delete(this.nowi);
                            this.item.set("かぎ", map["かぎ"]);
                            this.dai = "";
                            this.text = "これで出られるぞ！！！";
                        }
                    } else if (this.dai == "かみ" && this.nowi == "はさみ") {
                        this.dai = "";
                        this.item.set("か", map["か"]);
                        this.item.set("み ", map["み "]);
                        this.text = "切れた";
                    } else if (this.dai == "みみ" && this.nowi == "はさみ") {
                        this.dai = "";
                        this.item.set("み", map["み"]);
                        this.item.set("み ", map["み "]);
                        this.text = "切れた";
                    } else if (this.dai == "みぎ" && this.nowi == "はさみ") {
                        this.dai = "";
                        this.item.set("み", map["み"]);
                        this.item.set("ぎ", map["ぎ"]);
                        this.text = "切れた";
                    } else {
                        this.text = "組み合わせられそうにない";
                    }
                    this.nowi = "";
                    // ここに組み合わせなどを描く
                }
            } else if (this.nowi == "") {
                this.text = "なんでも置けそう";
            } else {
                this.item.delete(this.nowi);
                this.dai = this.nowi;
                this.nowi = "";
                this.text = "さてと";
            }
        },
        up(n) {
            this.jo[this.hi][n]++;
            if (this.hi == 0) {
                this.jo[this.hi][n] = this.jo[this.hi][n] % 10;
            } else {
                this.jo[this.hi][n] = this.jo[this.hi][n] % 26;
            }
            this.hihan();
        },
        down(n) {
            if (this.jo[this.hi][n] > 0) {
                this.jo[this.hi][n]--;
                if (this.hi == 0) {
                    this.jo[this.hi][n] = this.jo[this.hi][n] % 10;
                } else {
                    this.jo[this.hi][n] = this.jo[this.hi][n] % 26;
                }
            } else {
                if (this.hi == 0) {
                    this.jo[this.hi][n] = 9;
                } else {
                    this.jo[this.hi][n] = 25;
                }
            }
            this.hihan();
        },
        hihan() {
            if (this.hi == 0 && this.jo[this.hi][0] == 0 && this.jo[this.hi][1] == 5 && this.jo[this.hi][2] == 0 && this.jo[this.hi][3] == 1) {
                this.item.set("カギ", map["カギ"]);
                this.move(1);
                this.text = "開いた、鍵だ、ついに出れるのか？";
                this.hion[0] = true;
            }
            if (this.hi == 1 && this.jo[this.hi][0] == 14 && this.jo[this.hi][1] == 15 && this.jo[this.hi][2] == 4 && this.jo[this.hi][3] == 13) {
                this.item.set("リモコン", map["リモコン"]);
                this.move(1);
                this.text = "開いた、リモコンだなこれは";
                this.hion[1] = true;
            }
        },
        hasaget() {
            this.item.set("はさみ", map["はさみ"]);
            this.move(1);
            this.hasamiF = true;
            this.base();
            this.text = "鉄板アイテムだ、大事そう";
        },
        migiFunc() {
            if (this.nowi == "はさみ") {
                if (this.kamiget && this.item.has("ライト")) {
                    this.item.set("み", map["み"]);
                    this.item.set("ぎ", map["ぎ"]);
                    this.text = "正面以外認識できなくなった、動けない";
                    this.migi = false;
                } else {
                    this.text = "いま「みぎ」を切ってしまうと詰む、必須アイテムを持った状態で切ろう(天の声)";
                }
                this.nowi = "";
            } else {
                this.move(1);
            }
        },
        setr() {
            if (this.nowi == "ライト") {
                this.right = true;
                this.text = "右に向けるようになった、助かる";
                this.item.delete("ライト");
            } else {
                this.text = "動けない、方向転換できるようにしないと";
            }
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
const vm = app.mount('#escape');

const theyModal = new bootstrap.Modal(document.getElementById('cmodal'), {
    keyboard: false
});

const map = {
    "かみ": "OPENと書いてある",
    "ライト": "電池式の懐中電灯だ",
    "ふみだい": "いわゆる踏み台だ",
    "でんち": "いわゆる乾電池だ",
    "リモコン": "まぁモニターに使うんだろうな",
    "はさみ": "ひらがな2文字のものが切れる気がする",
    "カギ": "扉があくといいんだが",
    "かぎ": "ついに手に入れた、あとは出るだけ",
    "みぎ": "私が見てはいけない気がする",
    "みみ": "もう理屈がわからない",
    "か": "うまく認識できない",
    "ぎ": "うまく認識できない",
    "み": "うまく認識できない",
    "み ": "うまく認識できない",
};

