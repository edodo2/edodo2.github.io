const base = "https://twitter.com/intent/tweet?ref_src=twsrc%5Etfw%7Ctwcamp%5Ebuttonembed%7Ctwterm%5Eshare%7Ctwgr%5E&url=https%3A%2F%2Fedodo2.github.io%2Fother%2Fparade%2Fstart.html&hashtags=行進_edodo2&text=";
const RenderHtmlApp = {
    data() {
        return {
            gameStarted: false,
            twibun: base,
            load: false,
            score: 1,
            my: 1,
            here: 1,
            mySpace: ["", 1, ""],
            stage: [["0", "0", "0"], ["0", "0", "0"], ["0", "0", "0"], ["0", "0", "0"]],
            teki: false,
        }
    },
    methods: {
        startGame() {
            this.gameStarted = true;
            this.reset();
        },
        push(index) {
            let newSpace = [];
            this.here = index;
            for (let i = 0; i < 3; i++) {
                if (index == i) {
                    newSpace.push(this.my);
                } else {
                    newSpace.push("");
                }
            }
            this.mySpace = newSpace;
        },
        turn() {
            this.attack();
            this.mySet(this.stage.pop());
            this.stage.unshift(this.makeNext());
            this.push(this.here);
            if (this.my > 0) {
                setTimeout(this.turn, 1000);
            } else {
                setTimeout(this.end, 1000);
            }
        },
        end() {
            this.twibun = base + "Score:" + this.score;
            modal.show();
        },
        reset() {
            this.score = 1;
            this.my = 1;
            this.here = 1;
            this.mySpace = ["", 1, ""];
            this.stage = [["0", "0", "0"], ["0", "0", "0"], ["0", "0", "0"], ["0", "0", "0"]];
            this.teki = false;
            modal.hide();
            setTimeout(this.turn, 1000);
        },
        attack() {
            let newStage = [];
            let end = false;
            for (let i = 3; i > -1; i--) {
                let targetStage = this.stage[i];
                if (end) {
                    newStage.unshift(targetStage);
                    continue;
                }
                let newSt = [];
                for (let j = 0; j < 3; j++) {
                    let num = targetStage[j] + "";
                    if (num == 0) {
                        newSt.push(num);
                        continue;
                    }
                    if (j != this.here) {
                        newSt.push(num);
                        continue;
                    }
                    if (num.startsWith("×")) {
                        newSt.push(num);
                        continue;
                    }
                    if (num.startsWith("+")) {
                        newSt.push(num);
                        continue;
                    }
                    if (num.startsWith("-")) {
                        newSt.push(num);
                        continue;
                    }
                    num = targetStage[j] - this.my;
                    newSt.push(num > 0 ? num : 0);
                    end = true;
                }
                newStage.unshift(newSt);
            }
            this.stage = newStage;
        },
        mySet(touch) {
            let dodon = touch[this.here] + "";
            if (dodon.startsWith("×")) {
                this.my = this.my + this.my;
            }
            if (dodon.startsWith("+")) {
                this.my = this.my + parseInt(dodon.slice(1));
            }
            if (dodon.startsWith("-")) {
                this.my = this.my - dodon.slice(1);
            }
            for (let i = 0; i < 3; i++) {
                dodon = touch[i] + "";
                if (dodon.startsWith("×")) {
                    continue;
                }
                if (dodon.startsWith("+")) {
                    continue;
                }
                if (dodon.startsWith("-")) {
                    continue;
                }
                this.my = this.my - touch[i];
            }
            if (this.my > this.score) {
                this.score = this.my;
            }
        },
        makeNext() {
            let st = [];
            this.teki = false;
            for (let i = 0; i < 3; i++) {
                st.push(this.randomSt());
            }
            return st;
        },
        randomSt() {
            if (Math.random() < 0.8) {
                return "0";
            }
            if (Math.random() < 0.1) {
                return "×2"
            }
            if (Math.random() < 0.3) {
                return "+" + (Math.floor((Math.random() * this.my)) + 1);
            }
            if (Math.random() < 0.5) {
                return "-" + (Math.floor((Math.random() * this.my)) + 1);
            }
            if (this.teki) {
                return "0";
            }
            this.teki = true;
            return Math.floor((Math.random() * this.my * 3)) + 1;
        }
    },
    mounted() {
        window.onload = () => {
            document.getElementById('loading').classList.remove("d-none");
            this.load = true;
            setTimeout(this.turn, 1000);
        }
    }
};
const app = Vue.createApp(RenderHtmlApp);

const vm = app.mount('#parade');

const modal = new bootstrap.Modal(document.getElementById('endmodal'), {
    keyboard: false
});