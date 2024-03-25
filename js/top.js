
const RenderHtmlApp = {
    data() {
        return {
            nazolist: [{
                title: "Picture",
                text1: "久しぶりウェブ謎",
                text2: "動作環境調べてないな",
                href: "picture"
            },
            {
                title: "Dice",
                text1: "なんか思いついたので作った",
                text2: "むずい",
                href: "dice"
            }
            ,
            {
                title: "Calendar",
                text1: "ローディング初実装",
                text2: "デザイン崩れたらすまん",
                href: "calendar"
            }
            ,
            {
                title: "Applications",
                text1: "一区切り",
                text2: "PDCAのAです。",
                href: "applications"
            }
            ,
            {
                title: "Million",
                text1: "エイプリルフールにかこつけて嘘みたいに難しくしました",
                text2: "クリア者出てほしい、ガチ攻略勢求",
                href: "million"
            }
            ,
            {
                title: "Escape",
                text1: "いわゆる脱出ゲームです",
                text2: "気に入っていただけるといいのですが",
                href: "escape"
            }
            ,
            {
                title: "Signup",
                text1: "一発ネタ",
                text2: "難易度高いかも",
                href: "signup"
            }]
        }
    },
    methods: {
    },
    mounted() {
    }
};
const app = Vue.createApp(RenderHtmlApp);
const vm = app.mount('#top');