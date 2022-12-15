let editting = false;
let now = 0;
let ouda = 0;
let moCheck = false;
let noC = false;
const RenderHtmlApp = {
  data() {
    return {
      editting: false,
      erace: false,
      hamme: false,
      now: now,
      pic2: "../image/kagu_window.png",
      moFlag: false,
      moCheck: false,
      mVa: "",
      checkMes: " 適切に設定、保存してください",
      hatena: "？？？？？",
      front: false,
      width: window.innerWidth,
      height: window.innerHeight,
      cng: false,
      vs: "",
      yokei: "@",
    }
  },
  methods: {
    edit() {
      this.editting = !this.editting;
      editting = this.editting;
    },
    eraser() {
      this.erace = true;
      this.hamme = false;
    },
    hammer() {
      this.erace = false;
      this.hamme = true;
    },
    etc() {
      this.now = now;
      this.moFlag = now == 3;
      this.mVa = list[now];
      this.checkMes = " 適切に設定、保存してください";
      myModal.show();
    },
    ham() {
      if (ouda < 10) {
        this.pic2 = "../image/kagu_window_broken.png"
      } else {
        this.pic2 = "../image/window12_waku.png"
      }
      ouda++;
    },
    add(char) {
      this.mVa = this.mVa + char;
    },
    ca() {
      if (this.editting && this.moCheck) {
        theyModal.show();
      } else {
        syncCamera(video, this.front);
        this.vs = this.front ? "-webkit-transform: scaleX(-1);" : "";
        if (noC) {
          this.cng = curSTREAM == null;
        }
        yourModal.show();
      }
    },
    del() {
      if (this.mVa.length > 0) {
        this.mVa = this.mVa.slice(0, -1);
      }
    },
    ch() {
      if (this.mVa != ans[2]) {
        this.checkMes = " 適切に設定されていないため、保存できません";
        return;
      } else {
        myModal.hide();
        moCheck = true;
        this.moCheck = true;
        list[3] = ans[2];
        this.hatena = list[3];
      }

    },
    tr() {
      if(this.yokei.length > 0){
        this.yokei = "";
        alert("余計なものを削除します");
      }else{
        alert("削除はもう働きません");
      }
    },
    repeat() {
      this.front = !this.front
      syncCamera(video, this.front);
      this.vs = this.front ? "-webkit-transform: scaleX(-1);" : "";
      if (noC) {
        this.cng = curSTREAM == null;
      }
    },
    stop() {
      if (curSTREAM !== null) {
        curSTREAM.getVideoTracks().forEach((camera) => {
          camera.stop();
        });
      }
      yourModal.hide();
    },
    share() {
      bsOffcanvas.show()
    }
  }
}
Vue.createApp(RenderHtmlApp).mount('#app');



const carousel = document.getElementById('dataList')
carousel.addEventListener('slide.bs.carousel', function (event) {
  if (editting) {
    return event.preventDefault();
  }
  if (event.to > 3 && !moCheck) {
    return event.preventDefault();
  }
  now = event.to;
})

const myModal = new bootstrap.Modal(document.getElementById('modal'), {
  keyboard: false
})

const yourModal = new bootstrap.Modal(document.getElementById('camodal'), {
  keyboard: false
})

const theyModal = new bootstrap.Modal(document.getElementById('cmodal'), {
  keyboard: false
})

let list = ["●▲■", "☆▽■", ["□◇■", "×■"], "？？？？？", "★■▼"];
const ans = ["□▽' , '▲■▽☆▽", "□▽▲■□▽▲■' ,  '▽☆▽▽□▽▲■▽☆▽☆▽", "□▲◇☆▽", "★■▼", "□◇■"];

const second = document.getElementById("second");
secondCanvas = second.getContext('2d');
brushRadius = (second.width / 100) * 5;
img = new Image();
img.onload = function () {
  secondCanvas.drawImage(img, 0, 0, 204, 324);
}
img.src = '../image/yogore.svg';
function detectLeftButton(event) {
  if ('buttons' in event) {
    return event.buttons === 1;
  } else if ('which' in event) {
    return event.which === 1;
  } else {
    return event.button === 1;
  }
}

function getBrushPos(xRef, yRef) {
  let secondRect = second.getBoundingClientRect();
  return {
    x: Math.floor((xRef - secondRect.left) / (secondRect.right - secondRect.left) * second.width),
    y: Math.floor((yRef - secondRect.top) / (secondRect.bottom - secondRect.top) * second.height)
  };
}

function drawDot(mouseX, mouseY) {
  secondCanvas.beginPath();
  secondCanvas.arc(mouseX, mouseY, brushRadius, 0, 2 * Math.PI, true);
  secondCanvas.fillStyle = '#000';
  secondCanvas.globalCompositeOperation = "destination-out";
  secondCanvas.fill();
}

second.addEventListener("mousemove", function (e) {
  let brushPos = getBrushPos(e.clientX, e.clientY);
  let leftBut = detectLeftButton(e);
  if (leftBut == 1) {
    drawDot(brushPos.x, brushPos.y);
  }
}, false);

second.addEventListener("touchmove", function (e) {
  e.preventDefault();
  let touch = e.targetTouches[0];
  if (touch) {
    let brushPos = getBrushPos(touch.pageX, touch.pageY);
    drawDot(brushPos.x, brushPos.y);
  }
}, false);
let CONSTRAINTS = {
  audio: false,
  video: {
    facingMode: null
  }
};

const video = document.getElementById("video");
let curSTREAM = null;
function syncCamera(video, is_front) {
  CONSTRAINTS.video.facingMode = (is_front) ? "user" : { exact: "environment" };
  if (curSTREAM !== null) {
    curSTREAM.getVideoTracks().forEach((camera) => {
      camera.stop();
    });
  }
  navigator.mediaDevices.getUserMedia(CONSTRAINTS)
    .then((stream) => {
      curSTREAM = stream;
      video.srcObject = stream;
      video.onloadedmetadata = (e) => {
        video.play();
      };
      return false;
    })
    .catch((err) => {
      if (!noC) {
        alert("カメラと接続できませんでした");
      }
      noC = true;
      return true;
    });
}

const bsOffcanvas = new bootstrap.Offcanvas('#offcanvasBottom');
