const now = new Date();
const regexp = /\+$|-$|\*$/;
const RenderHtmlApp = {
  data() {
    return {
      load: false,
      width: window.innerWidth,
      height: window.innerHeight,
      home: true,
      twi: false,
      mail: false,
      sho: false,
      newmail: false,
      tuto: false,
      coun: false,
      stopw: false,
      ligh: false,
      calculator: false,
      apps: [false, false, false, false, false, false, false, false, false, false, false, false],
      mailstep: 0,
      counNum: 0,
      countNow: [0, 0, 0],
      countMok: [20, 100, 10000],
      stopNum: 0,
      stopStarts: [-5000, -5000, -5000],
      stopNow: ["", "", ""],
      stopMok: [5, 10, 10000],
      lightNow: [0, 0, 0],
      lightNum: 0,
      lightMok: [9, 16, 10000],
      li: {
        0: { 0: [0, 0, 0], 1: [0, 0, 0], 2: [0, 0, 0] },
        1: { 0: [0, 0, 0, 0], 1: [0, 0, 0, 0], 2: [0, 0, 0, 0], 3: [0, 0, 0, 0] },
        2: { 0: [0, 0, 0, 0], 1: [0, 0, 0, 0], 2: [0, 0, 0, 0], 3: [0, 0, 0, 0] }
      },
      limax: [3, 4, 4],
      calNum: 0,
      calNow: "",
      clearNum: 0,
      ans: 0,
      tnow: 0,
      twiC: 0,
      twiT: ""
    }
  },
  methods: {
    hom() {
      this.clearCount();
      this.alloff();
      this.home = true;
      if (this.mailstep == 1 && this.clearNum > 0) {
        this.mailstep = 2;
        this.newmail = true;
      }
      if (this.mailstep == 2 && this.clearNum > 6) {
        this.mailstep = 3;
        this.newmail = true;
        this.calNow = "";
        this.calNum = 10000;
      }
      if (this.mailstep == 3) {
        this.countMok[2] = this.calNum;
        this.stopMok[2] = this.calNum;
        this.lightMok[2] = this.calNum;
      }

    },
    shop() {
      this.alloff();
      this.sho = true;
    },
    twitter() {
      this.alloff();
      this.twi = true;
    },
    mai() {
      this.newmail = false;
      this.alloff();
      this.mail = true;
    },
    count(n) {
      this.alloff();
      this.counNum = n;
      this.coun = true;
    },
    countUp(n) {
      this.countNow[n] = this.countNow[n] + 1;
    },
    tutorial() {
      this.alloff();
      this.tuto = true;
    },
    stopwatch(n) {
      this.alloff();
      this.stopNum = n;
      this.stopw = true;
    },
    stopStart(n) {
      this.stopNow[n] = "測定中";
      this.stopStarts[n] = new Date().getTime();
    },
    stopStop(n) {
      this.stopNow[n] = (new Date().getTime() - this.stopStarts[n]) / 1000;
    },
    light(n) {
      this.alloff();
      this.lightNum = n;
      this.ligh = true;
    },
    lightUp(n, x, y) {
      this.li[n][x][y] = !this.li[n][x][y];
      if (x - 1 > -1) {
        this.li[n][x - 1][y] = !this.li[n][x - 1][y];
      }
      if (x + 1 < this.limax[n]) {
        this.li[n][x + 1][y] = !this.li[n][x + 1][y];
      }
      if (y - 1 > -1) {
        this.li[n][x][y - 1] = !this.li[n][x][y - 1];
      }
      if (y + 1 < this.limax[n]) {
        this.li[n][x][y + 1] = !this.li[n][x][y + 1];
      }
      this.lightNow[n] = 0;
      for (i = 0; i < this.limax[n]; i++) {
        for (j = 0; j < this.limax[n]; j++) {
          if (this.li[n][i][j]) {
            this.lightNow[n]++;
          }
        }
      }
    },
    cal() {
      this.alloff();
      this.calculator = true;
      if (this.mailstep < 1) {
        this.mailstep = 1;
        this.newmail = true;
      }
    },
    ca(n) {
      if (this.calNow.length > 10) {
        return;
      }
      if (this.calNow == 0) {
        this.calNow = "";
      }
      this.calNow = this.calNow + "" + n;
    },
    capmk(pmk) {
      if (this.calNum != 0) {
        this.calNow = this.calNum + "";
      }
      if (this.calNow.match(regexp)) {
        this.calNow = this.calNow.substr(0, this.calNow.length - 1);
        if (this.calNow = "*") {
          this.calNow = "";
        }
      };
      if (this.calNow.length > 10) {
        return;
      }
      if (this.calNow == 0) {
        this.calNow = "";
      }
      this.calNow = this.calNow + "" + pmk;
    },
    ac() {
      this.calNow = "";
      this.calNum = 0;
    },
    ec() {
      if (this.calNow.match(regexp)) {
        this.calNow = this.calNow.substr(0, this.calNow.length - 1);
      };
      if (this.calNow.length < 1) {
        return;
      };
      let result = Function('return (' + this.calNow + ');')();
      if (result > 999999) {
        result = 999999;
      }
      if (result < -999999) {
        result = -999999;
      }
      this.calNum = result;
    },
    alloff() {
      this.home = false;
      this.twi = false;
      this.mail = false;
      this.sho = false;
      this.tuto = false;
      this.coun = false;
      this.stopw = false;
      this.ligh = false;
      this.calculator = false;
    },
    appt(n) {
      this.apps[n] = true;
    },
    clearCount() {
      let count = 0;
      if (this.countNow[0] >= this.countMok[0]) count++;
      if (this.countNow[1] >= this.countMok[1]) count++;
      if (this.countNow[2] >= this.countMok[2]) count++;
      if (this.stopNow[0] >= this.stopMok[0] - 0.5 && this.stopNow[0] <= this.stopMok[0] + 0.5) count++;
      if (this.stopNow[1] >= this.stopMok[1] - 0.5 && this.stopNow[1] <= this.stopMok[1] + 0.5) count++;
      if (this.stopNow[2] != "" && this.stopNow[2] >= this.stopMok[2] - 0.5 && this.stopNow[2] <= this.stopMok[2] + 0.5) count++;
      if (this.lightNow[0] == this.lightMok[0]) count++;
      if (this.lightNow[1] == this.lightMok[1]) count++;
      if (this.lightNow[2] == this.lightMok[2]) count++;
      if (this.ans == 166160) count++;
      this.clearNum = count;
    },
    twiapp(n) {
      this.twiT = this.twiT + Answer[n]
      this.twiC = this.twiT.length;
      if (this.twiC == 12) {
        if (this.twiT == "Applications") {
          theyModal.show();
        } else {
          this.twiC = 0;
          this.twiT = "";
        }
      }
    }
  },
  mounted() {
    window.onload = () => {
      document.getElementById('loading').classList.remove("d-none");
      this.load = true;
    }
    setInterval(() => {
      this.tnow = (this.tnow + 1) % 10;
    }, 500)
  }
};
const app = Vue.createApp(RenderHtmlApp);

app.component('house', {
  methods: {
    hom() {
      this.$emit("hom");
    }
  },
  props: ['c', 'p', 'n'],
  template: `
  <div class="row text-center m-3 sticky-bottom">
    <div class="col">
    <img src="../image/ca/chevron-left.svg" class="w-50" :class="{'d-none': !c || !p}" data-bs-target="#dataList" data-bs-slide="prev">
    </div>
    <div class="col">
      <img src="../image/ca/house.svg" class="w-50" @click="hom">
    </div>
    <div class="col">
    <img src="../image/ca/chevron-right.svg" class="w-50" :class="{'d-none': !c || !n}" data-bs-target="#dataList" data-bs-slide="next">
    </div>
  </div>`
});

// 
const Answer = ["o","p","i","t","l","n","c","a","s","A"];

app.component('card', {
  data() {
    return {
      month: now.getMonth() + 1,
      day: now.getDate(),
    }
  },
  template: `
  <div class="h-25 p-3">
  <div class="card h-100">
    <div class="h-25"></div>
    <div class="card-body">
      <h5 class="card-title">{{month}}/{{day}}</h5>
      <h6 class="card-subtitle mb-2 text-muted">Web謎『Applications』</h6>
      <p class="card-text">目標:クリアツイートボタンの表示</p>
    </div>
    <div class="h-25"></div>
   </div></div>`
});



const vm = app.mount('#app');

const theyModal = new bootstrap.Modal(document.getElementById('cmodal'), {
  keyboard: false
});

