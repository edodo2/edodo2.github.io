const RenderHtmlApp = {
  data() {
    return {
      gameStarted: false,
      load: false,
      width: window.innerWidth,
      height: window.innerHeight,
      home: true,
      calendar: false,
      memo: false,
      se: false,
      search: "",
      caltitle: 1,
      a: false,
      b: false,
      c: false,
      d: false,
      aa: false,
      bb: false,
      cc: false,
      dd: false,
      pass: "",
      id: "",
      twitter: false,
      line: false,
      facebook: false,
      picture: false,
      calenda: false,
      memoo: false,
      scount: 0,
      comm: ""
    }
  },
  methods: {
    startGame() {
      this.gameStarted = true;
    },
    cal() {
      this.home = false;
      this.calendar = true;
      this.memo = false;
      this.se = false;
    },
    hom() {
      this.calendar = false;
      this.home = true;
      this.memo = false;
      this.se = false;
    },
    mem() {
      this.calendar = false;
      this.home = false;
      this.memo = true;
      this.se = false;
    },
    came() {
      offcanvas.show();
    },
    person() {
      seModal.show();
    },
    signin() {
      if (ip[this.id] != null) {
        if (p[ip[this.id]] == this.pass) {
          this[this.id + this.id] = true;
          this[this.id] = true;
        }
      }
      this.id = "";
      this.pass = "";
    },
    sea() {
      this.calendar = false;
      this.home = false;
      this.memo = false;
      this.se = true;
      this.scount = 0;
      this.comm = "";
      let regex = new RegExp(this.search)
      this.twitter = regex.test("twitter");
      this.line = regex.test("line");
      this.facebook = regex.test("facebook");
      this.picture = regex.test("picture");
      this.calenda = regex.test("calendar");
      this.memoo = regex.test("memo");
      this.twitter ? this.scount++ : "";
      this.line ? this.scount++ : "";
      this.facebook ? this.scount++ : "";
      this.picture ? this.scount++ : "";
      this.calenda ? this.scount++ : "";
      this.memoo ? this.scount++ : "";
      if (this.scount == 3) {
        this.comm = "result";
      }
      if (p[9] == this.search) {
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
const now = new Date();

app.component('card', {
  data() {
    return {
      year: now.getFullYear(),
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
      <h6 class="card-subtitle mb-2 text-muted">Web謎『Calendar』</h6>
      <p class="card-text">余白を埋めるためだけの文</p>
    </div>
    <div class="h-25"></div>
   </div></div>`
});
app.component('days', {
  template: `
  <div class="row text-center text-wrap">
  <div class="col">日</div>
  <div class="col">月</div>
  <div class="col">火</div>
  <div class="col">水</div>
  <div class="col">木</div>
  <div class="col">金</div>
  <div class="col">土</div>
</div>`
});

app.component('task', {
  props: ['day', 'a', 'b', 'c', 'd', 'out'],
  template: `<div class="col border h-100 p-0 w-7-1" :class="{'bg-light': out}">
  <div class="h-20 w-100">{{day}}</div>
  <div class="h-20 text-wrap bg-info card w-100" :class="{'d-none': !a}">{{a == 'arrow' ? '' : a}} <img src="../image/ca/arrow-left.svg" class="h-100" :class="{'d-none': a != 'arrow'}"></div>
  <div class="h-20 text-wrap bg-success card w-100" :class="{'d-none': !b}">{{b == 'arrow' ? '' : b}} <img src="../image/ca/arrow-right.svg" class="h-100" :class="{'d-none': b != 'arrow'}"></div>
  <div class="h-20 text-wrap bg-warning card w-100" :class="{'d-none': !c}">{{c == 'arrow' ? '' : c}} <img src="../image/ca/arrow-left.svg" class="h-100" :class="{'d-none': c != 'arrow'}"></div>
  <div class="h-20 text-wrap bg-danger card w-100" :class="{'d-none': !d}">{{d == 'arrow' ? '' : d}} <img src="../image/ca/arrow-right.svg" class="h-100" :class="{'d-none': d != 'arrow'}"></div>
  </div>`
});


const vm = app.mount('#calendarapp');

const theyModal = new bootstrap.Modal(document.getElementById('cmodal'), {
  keyboard: false
});

const seModal = new bootstrap.Modal(document.getElementById('modal'), {
  keyboard: false
});

const offcanvas = new bootstrap.Offcanvas('#offcanvasC');
const ip = { "a": 1, "b": 3, "c": 6, "d": 10 }
const p = ["スルー", "pass", "gyro", "intelligence", "カシコ", "結果", "result", "ぴんふ", "dice", "サイ", "jack", "コロ"];

const carousel = document.getElementById('dataList')
carousel.addEventListener('slide.bs.carousel', function (event) {
  vm.$data.caltitle = event.to + 1;
});

