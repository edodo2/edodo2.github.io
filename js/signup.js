const RenderHtmlApp = {
    data() {
        return {
            gameStarted: false,
            load: false,
            count: 0,
            pass: "",
            alert: []
        }
    },
    methods: {
        startGame() {
            this.gameStarted = true;
        },
        start() {
            modal.show();
        },
        send() {
            this.alert = [];
            reg.forEach((regexp,index) => {
                let t = this.pass;
                if(index > 3){
                    t = t.toUpperCase();
                }
                if(!regexp.test(t)){
                   this.alert.push(al[index]);
                }
            });
            if(this.alert.length < 1){
                theyModal.show();
            }else{
                this.count++;
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

const vm = app.mount('#signup');

const theyModal = new bootstrap.Modal(document.getElementById('cmodal'), {
    keyboard: false
});

const modal = new bootstrap.Modal(document.getElementById('modal'), {
    keyboard: false
});

const al = ["使用できない文字が含まれています",
    "桁数が不正です",
    "アルファベット大文字が含まれていません",
    "アルファベット小文字が含まれていません",
    "数字が含まれていません",
    "記号が含まれていません"]

const reg = [
    /^[a-zA-Z]+$/,
    /^.{12}$/,
    /^.*[A-Z]+.*$/,
    /^.*[a-z]+.*$/,
    /^.*NUMBER.*$/,
    /^.*SYMBOL.*$/,
]

