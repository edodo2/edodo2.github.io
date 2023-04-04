const RenderHtmlApp = {
  data() {
    return {
      map: "□□□□□□□□□□□□□□□□□□□□□□□",
      n: 1,
      now: -1,
      roll: false,
      furu: "ふる",
      dice: "../image/dice/1.svg",
      answer: "",
      dicef: [false, false, false, false, false, false]
    }
  },
  methods: {
    ca() {
      if (this.editting && this.moCheck) {
        theyModal.show();
      }
    },
    diceroll() {
      this.roll = true;
      this.furu = "";
      this.n = Math.floor(Math.random() * 6) + 1;
      this.now = (this.now + this.n) % 23;
      this.map = this.map.substring(0, this.now) + dai[this.n][this.now] + this.map.substring(this.now + 1);
      this.dice = "../image/dice/" + this.n + ".svg";
    },
    ans() {
      if (this.answer != kai[this.n]) {
        this.answer = "";
        return;
      }
      if (this.dicef[this.n - 1]) {
        return;
      }
      this.dicef[this.n - 1] = true;
      if (this.dicef[0] && this.dicef[1] && this.dicef[2] && this.dicef[3] && this.dicef[4] && this.dicef[5]) {
        theyModal.show();
      } else {
        yourModal.show();
      }
    }
  }
}
Vue.createApp(RenderHtmlApp).mount('#diceapp');

const yourModal = new bootstrap.Modal(document.getElementById('amodal'), {
  keyboard: false
})

const theyModal = new bootstrap.Modal(document.getElementById('cmodal'), {
  keyboard: false
})

const dai = ["さいこう','ぴんぞろ','わからん','つくつくぼうし", "日本一高い山の名前に含まれる二文字の花って何？", "福岡ソフトバンクホークスのホークスって何の鳥？", "懸賞生活で一躍有名に本名は浜津智明その芸名は？", "折りたたみ式の道具と最も大事な事柄の同音異義語", "税負担率の高い嗜好品紙巻加熱式などがあるのは？", "他の答えをふまえるとわかる気がする六は多分何？", "大なぞ思いついたら追加しますね"];
const kai = ["こうこくひ','かれーらいす','わんたん','まきはら", "ふじ", "たか", "なすび", "おうぎ", "たばこ", "ざとう", "ソースコードを見たんだね"];

