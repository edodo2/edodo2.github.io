const SUITS = [
    { code: 's', symbol: '♠', isRed: false, name: 'スペード' },
    { code: 'h', symbol: '♥', isRed: true, name: 'ハート' },
    { code: 'd', symbol: '♦', isRed: true, name: 'ダイヤ' },
    { code: 'c', symbol: '♣', isRed: false, name: 'クラブ' }
];

const RANK_NAMES = {
    14: 'A', 13: 'K', 12: 'Q', 11: 'J', 10: '10',
    9: '9', 8: '8', 7: '7', 6: '6', 5: '5', 4: '4', 3: '3', 2: '2'
};

function createDeck() {
    const deck = [];
    for (const suit of SUITS) {
        for (let rank = 2; rank <= 14; rank++) {
            deck.push({
                suit: suit.code,
                symbol: suit.symbol,
                isRed: suit.isRed,
                rank: rank,
                rankName: RANK_NAMES[rank]
            });
        }
    }
    return deck;
}

function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function combinations(arr, k) {
    const results = [];
    function helper(start, combo) {
        if (combo.length === k) {
            results.push([...combo]);
            return;
        }
        for (let i = start; i < arr.length; i++) {
            combo.push(arr[i]);
            helper(i + 1, combo);
            combo.pop();
        }
    }
    helper(0, []);
    return results;
}

function evaluate5CardHand(cards) {
    const sorted = [...cards].sort((a, b) => b.rank - a.rank);
    const ranks = sorted.map(c => c.rank);
    const suits = sorted.map(c => c.suit);

    const isFlush = suits.every(s => s === suits[0]);

    let isStraight = false;
    let straightTop = 0;

    const uniqueRanks = [...new Set(ranks)];
    if (uniqueRanks.length === 5) {
        if (ranks[0] - ranks[4] === 4) {
            isStraight = true;
            straightTop = ranks[0];
        } else if (ranks[0] === 14 && ranks[1] === 5 && ranks[2] === 4 && ranks[3] === 3 && ranks[4] === 2) {
            isStraight = true;
            straightTop = 5;
        }
    }

    if (isFlush && isStraight) {
        return {
            category: 8,
            categoryName: "ストレートフラッシュ",
            score: [8, straightTop],
            desc: `ストレートフラッシュ (${RANK_NAMES[straightTop]}ハイ)`
        };
    }

    const counts = {};
    for (const r of ranks) {
        counts[r] = (counts[r] || 0) + 1;
    }

    const countEntries = Object.entries(counts).map(([r, c]) => ({
        rank: Number(r),
        count: c
    }));
    countEntries.sort((a, b) => b.count - a.count || b.rank - a.rank);

    if (countEntries[0].count === 4) {
        const quadRank = countEntries[0].rank;
        const kicker = countEntries[1].rank;
        return {
            category: 7,
            categoryName: "フォーカード",
            score: [7, quadRank, kicker],
            desc: `フォーカード (${RANK_NAMES[quadRank]})`
        };
    }

    if (countEntries[0].count === 3 && countEntries[1].count === 2) {
        const tripRank = countEntries[0].rank;
        const pairRank = countEntries[1].rank;
        return {
            category: 6,
            categoryName: "フルハウス",
            score: [6, tripRank, pairRank],
            desc: `フルハウス (${RANK_NAMES[tripRank]} & ${RANK_NAMES[pairRank]})`
        };
    }

    if (isFlush) {
        return {
            category: 5,
            categoryName: "フラッシュ",
            score: [5, ...ranks],
            desc: `フラッシュ (${RANK_NAMES[ranks[0]]}ハイ)`
        };
    }

    if (isStraight) {
        return {
            category: 4,
            categoryName: "ストレート",
            score: [4, straightTop],
            desc: `ストレート (${RANK_NAMES[straightTop]}ハイ)`
        };
    }

    if (countEntries[0].count === 3) {
        const tripRank = countEntries[0].rank;
        const k1 = countEntries[1].rank;
        const k2 = countEntries[2].rank;
        return {
            category: 3,
            categoryName: "スリーカード",
            score: [3, tripRank, k1, k2],
            desc: `スリーカード (${RANK_NAMES[tripRank]})`
        };
    }

    if (countEntries[0].count === 2 && countEntries[1].count === 2) {
        const p1 = countEntries[0].rank;
        const p2 = countEntries[1].rank;
        const kicker = countEntries[2].rank;
        return {
            category: 2,
            categoryName: "ツーペア",
            score: [2, p1, p2, kicker],
            desc: `ツーペア (${RANK_NAMES[p1]} & ${RANK_NAMES[p2]})`
        };
    }

    if (countEntries[0].count === 2) {
        const pairRank = countEntries[0].rank;
        const k1 = countEntries[1].rank;
        const k2 = countEntries[2].rank;
        const k3 = countEntries[3].rank;
        return {
            category: 1,
            categoryName: "ワンペア",
            score: [1, pairRank, k1, k2, k3],
            desc: `ワンペア (${RANK_NAMES[pairRank]})`
        };
    }

    return {
        category: 0,
        categoryName: "ハイカード",
        score: [0, ...ranks],
        desc: `ハイカード (${RANK_NAMES[ranks[0]]}ハイ)`
    };
}

function compareScores(scoreA, scoreB) {
    const len = Math.max(scoreA.length, scoreB.length);
    for (let i = 0; i < len; i++) {
        const valA = scoreA[i] !== undefined ? scoreA[i] : -1;
        const valB = scoreB[i] !== undefined ? scoreB[i] : -1;
        if (valA > valB) return 1;
        if (valA < valB) return -1;
    }
    return 0;
}

function evaluate7CardHand(cards7) {
    const combos = combinations(cards7, 5);
    let best = null;
    for (const combo of combos) {
        const evalRes = evaluate5CardHand(combo);
        if (!best || compareScores(evalRes.score, best.score) > 0) {
            best = evalRes;
        }
    }
    return best;
}

function getShareUrl(currentStreak, maxStreak) {
    const shareText = `テキサスホールデム勝敗予想で【${currentStreak}連勝】達成！ (最高: ${maxStreak}連勝) #テキサスホールデム勝敗予想 #edodo2`;
    const shareHashtags = "テキサスホールデム勝敗予想,edodo2";
    const shareUrl = "https://edodo2.github.io/other/holdem/";
    return "https://twitter.com/intent/tweet?text=" + encodeURIComponent(shareText) +
        "&hashtags=" + encodeURIComponent(shareHashtags) +
        "&url=" + encodeURIComponent(shareUrl);
}

const RenderHtmlApp = {
    data() {
        return {
            heroCards: [],
            villainCards: [],
            boardCards: [],
            phase: 'guessing', // 'guessing' | 'revealed'
            userChoice: null, // 'win' | 'loss' | 'tie'
            actualResult: null, // 'win' | 'loss' | 'tie'
            heroEval: null,
            villainEval: null,
            currentStreak: 0,
            maxStreak: 0,
            resultMessage: "",
            isCorrect: false,
            twibun: ""
        };
    },
    mounted() {
        this.deal();
    },
    methods: {
        deal() {
            const deck = shuffle(createDeck());
            this.heroCards = [deck[0], deck[1]];
            this.villainCards = [deck[2], deck[3]];
            this.boardCards = [deck[4], deck[5], deck[6], deck[7], deck[8]];

            this.phase = 'guessing';
            this.userChoice = null;
            this.actualResult = null;
            this.heroEval = null;
            this.villainEval = null;
            this.resultMessage = "";
            this.isCorrect = false;

            this.updateTweetUrl();
        },
        makeGuess(choice) {
            if (this.phase !== 'guessing') return;

            this.userChoice = choice;
            this.phase = 'revealed';

            this.heroEval = evaluate7CardHand([...this.heroCards, ...this.boardCards]);
            this.villainEval = evaluate7CardHand([...this.villainCards, ...this.boardCards]);

            const comp = compareScores(this.heroEval.score, this.villainEval.score);
            if (comp > 0) {
                this.actualResult = 'win';
            } else if (comp < 0) {
                this.actualResult = 'loss';
            } else {
                this.actualResult = 'tie';
            }

            if (this.userChoice === this.actualResult) {
                this.isCorrect = true;
                if (this.userChoice === 'tie') {
                    this.currentStreak = this.currentStreak === 0 ? 1 : this.currentStreak * 2;
                    this.resultMessage = "正解！引き分け的中につき連勝数2倍！";
                } else {
                    this.currentStreak += 1;
                    this.resultMessage = "正解！連勝数+1！";
                }
                if (this.currentStreak > this.maxStreak) {
                    this.maxStreak = this.currentStreak;
                }
            } else {
                this.isCorrect = false;
                this.currentStreak = 0;
                const resultTextMap = { 'win': '勝ち (Hero勝利)', 'loss': '負け (相手勝利)', 'tie': '引き分け' };
                this.resultMessage = `不正解... 正解は「${resultTextMap[this.actualResult]}」でした。連勝はリセットされました。`;
            }

            this.updateTweetUrl();
        },
        updateTweetUrl() {
            this.twibun = getShareUrl(this.currentStreak, this.maxStreak);
        }
    }
};

if (typeof Vue !== "undefined") {
    const app = Vue.createApp(RenderHtmlApp);
    app.mount("#holdem");
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        createDeck,
        shuffle,
        combinations,
        evaluate5CardHand,
        evaluate7CardHand,
        compareScores,
        getShareUrl
    };
}
