
const RenderHtmlApp = {
    data() {
        return {
            otherlist: [{
                title: "腕立て伏せカウンター",
                text1: "タッチパネル専用",
                text2: "エンドレス(2秒に1回)モードと3分間とにかくやるモードがあります。",
                href: "pushup",
                linktext: "腕立て伏せをする"
            },
            {
                title: "チンチロ",
                text1: "正味もう1周",
                text2: "ほぼ運だけスコアアタック",
                href: "diceaction",
                linktext: "賽を振る"
            },
            {
                title: "1から30まで押すやつ",
                text1: "反射神経とか",
                text2: "実力スコアアタック",
                href: "number",
                linktext: "測定する"
            }
            ,
            {
                title: "出口",
                text1: "異変を見逃さないこと",
                text2: "短編RTAコンテンツです。",
                href: "hachiban",
                linktext: "プレイする"
            }
            ,
            {
                title: "スウジゲーム",
                text1: "定期的に流行るので",
                text2: "くっついて増えるタイプのやつ",
                href: "suika",
                linktext: "プレイする"
            }
            ,
            {
                title: "AIさんもく",
                text1: "AIとの戦い",
                text2: "AI[要出典]",
                href: "aisanmoku",
                linktext: "プレイする"
            }
            ]
        }
    },
    methods: {
    },
    mounted() {
    }
};
const app = Vue.createApp(RenderHtmlApp);
const vm = app.mount('#other');