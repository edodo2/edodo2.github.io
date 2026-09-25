function fnv1aHash(str) {
    let hash = 2166136261;
    for (let i = 0; i < str.length; i++) {
        hash ^= str.charCodeAt(i);
        hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
}

function decideChoice(strA, strB) {
    const hA = fnv1aHash(strA);
    const hB = fnv1aHash(strB);
    const diff = Math.abs(hA - hB);
    const isEven = (diff % 2 === 0);

    let adopted;
    if (isEven) {
        if (hA > hB) {
            adopted = strA;
        } else if (hB > hA) {
            adopted = strB;
        } else {
            adopted = strA >= strB ? strA : strB;
        }
    } else {
        if (hA < hB) {
            adopted = strA;
        } else if (hB < hA) {
            adopted = strB;
        } else {
            adopted = strA <= strB ? strA : strB;
        }
    }

    return {
        hashA: hA,
        hashB: hB,
        diff: diff,
        isEven: isEven,
        adopted: adopted
    };
}

const RenderHtmlApp = {
    data() {
        return {
            textA: "",
            textB: "",
            hasResult: false,
            resultText: "",
            hashA: 0,
            hashB: 0,
            diff: 0,
            isEven: false,
            twibun: ""
        };
    },
    computed: {
        canEvaluate() {
            return this.textA.trim() !== "" && this.textB.trim() !== "";
        }
    },
    methods: {
        evaluate() {
            if (!this.canEvaluate) return;

            const res = decideChoice(this.textA, this.textB);
            this.hashA = res.hashA;
            this.hashB = res.hashB;
            this.diff = res.diff;
            this.isEven = res.isEven;
            this.resultText = res.adopted;
            this.hasResult = true;

            const shareText = "言い切り君で「" + this.textA + "」と「" + this.textB + "」を比較した結果、「" + this.resultText + "」！ #言い切り君 #edodo2";
            const shareHashtags = "言い切り君,edodo2";
            const shareUrl = "https://edodo2.github.io/other/iikiri/";
            this.twibun = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(shareText) + "&hashtags=" + encodeURIComponent(shareHashtags) + "&url=" + encodeURIComponent(shareUrl);
        }
    }
};

if (typeof Vue !== "undefined") {
    const app = Vue.createApp(RenderHtmlApp);
    app.mount("#iikiri");
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = { fnv1aHash, decideChoice };
}
