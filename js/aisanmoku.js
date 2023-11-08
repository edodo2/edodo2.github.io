
const RenderHtmlApp = {
    data() {
        return {
            twibun: "https://twitter.com/intent/tweet?ref_src=twsrc%5Etfw%7Ctwcamp%5Ebuttonembed%7Ctwterm%5Eshare%7Ctwgr%5E&url=https%3A%2F%2Fedodo2.github.io%2Fother%2Fdiceaction%2Fstart.html&hashtags=チンチロ_edodo2&text=",
            load: false,
            turn: "O",
            you: "O",
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
            // this.wait = true;
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
            this.turn = this.turn == "O" ? "X" : "O";
            this.sanmoku = val;
            this.hantei(n, m);
        },
        hantei(n, m) {

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
                        if (this.sanmoku[i][j] == 0) {
                            inval.push(0);
                        } else {
                            inval.push("X");
                        }
                    }
                    val.push(inval);
                }
                nou.set(this.sanmoku,val);
            }
            let kakuritsu= nou.get(this.sanmoku);
        },
        gakushu() {

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

