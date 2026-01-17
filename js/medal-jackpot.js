/*
  medal-jackpot.js
  Vue-based simple jackpot with sequential stages:
  Stage1 success -> Stage2, Stage2 success -> Stage3
*/

const { createApp } = Vue;

const StageReel = {
  props: ['stage'],
  template: `
    <div class="mj-stage text-center">
      <div class="mj-stage-label">Stage {{stage.id}}</div>
      <div class="mj-reel">
        <img :src="symbolToPath(stage.currentSymbol)" class="mj-symbol" />
      </div>
    </div>
  `,
  methods: {
    symbolToPath(sym) {
      if (!sym) return '../../image/medal-jackpot/blank.svg';
      return '../../image/medal-jackpot/' + sym + '.svg';
    }
  }
};

const ResultModal = {
  props: ['result'],
  template: `
    <div class="modal-backdrop d-flex align-items-center justify-content-center">
      <div class="modal-content p-3" style="max-width:420px;">
        <h4>{{ result.won ? 'おめでとう！' : '残念' }}</h4>
        <p>到達・成功した段数: {{result.matchedStages}}</p>
        <p>払戻し: {{result.payout}}</p>
        <div class="d-flex justify-content-between mt-3">
          <a href="../index.html" class="btn btn-outline-secondary">戻る</a>
          <button class="btn btn-primary" @click="$emit('retry')">再挑戦</button>
        </div>
      </div>
    </div>
  `
};

const ControlPanel = {
  props: ['credits','bet','isSpinning'],
  template: `
    <div class="mj-controls">
      <div class="mb-2">Credits: <strong>{{credits}}</strong></div>
      <div class="mj-credits-visual mb-2">
        <img v-for="i in visualCount" :key="i" src="../../image/medal-jackpot/medal_gold.svg" class="coin-icon" />
      </div>
      <label class="form-label">Bet</label>
      <input type="number" min="1" :value="bet" @input="$emit('update-bet', $event.target.value)" class="form-control mb-2" />
      <button class="btn btn-primary" :disabled="isSpinning || credits<bet" @click="$emit('start')">スタート</button>
    </div>
  `,
  computed: {
    visualCount() { return Math.min(Math.max(Math.floor(this.credits/this.bet || 0), 0), 10) || Math.min(this.credits, 10); }
  }
};

const OddsDisplay = {
  props: ['stages'],
  template: `
    <div class="mt-3 mj-odds">
      <h5>Odds</h5>
      <ul class="list-unstyled mb-0">
        <li v-for="s in stages">Stage {{s.id}}: {{Math.round(s.odds*100)}}%</li>
      </ul>
    </div>
  `
};

const App = {
  components: { StageReel, ResultModal, ControlPanel, OddsDisplay },
  data() {
    return {
      gameStarted: false,
      credits: 100,
      bet: 1,
      isSpinning: false,
      stages: [
        { id: 1, status: 'idle', currentSymbol: 'blank', resultSymbol: null, odds: 0.30, spinDuration: 900 },
        { id: 2, status: 'idle', currentSymbol: 'blank', resultSymbol: null, odds: 0.15, spinDuration: 1200 },
        { id: 3, status: 'idle', currentSymbol: 'blank', resultSymbol: null, odds: 0.05, spinDuration: 1500 }
      ],
      result: { won: false, payout: 0, matchedStages: 0, symbols: [] },
      ui: { showResultModal: false }
    };
  },
  methods: {
    startGame() {
      this.gameStarted = true;
    },
    async startDraw() {
      if (this.isSpinning) return;
      if (this.credits < this.bet) return alert('クレジットが足りません');

      this.credits -= this.bet;
      this.isSpinning = true;
      this.result = { won: false, payout: 0, matchedStages: 0, symbols: [] };
      this.ui.showResultModal = false;

      // Sequential flow: proceed to next stage only when previous succeeded
      for (let i = 0; i < this.stages.length; i++) {
        const stage = this.stages[i];
        stage.status = 'spinning';
        stage.currentSymbol = 'blank';
        stage.resultSymbol = null;

        const stageResult = await this.runStage(i);
        stage.status = 'stopped';
        stage.resultSymbol = stageResult.symbol;
        this.result.symbols.push(stageResult.symbol);

        if (!stageResult.success) break; // stop sequence on first failure
      }

      // Count consecutive successes from the first stage
      let matched = 0;
      for (let i = 0; i < this.result.symbols.length; i++) {
        if (this.result.symbols[i] && this.result.symbols[i] !== 'blank') matched++; else break;
      }
      this.result.matchedStages = matched;

      // 指定された配当: Stage1=2倍, Stage2=6倍, Stage3=100倍
      // Stage2 を整数の 6 に設定します。
      const payoutTable = { 1: 2, 2: 6, 3: 100 };
      if (matched > 0) {
        this.result.won = true;
        const multiplier = payoutTable[matched] || 0;
        this.result.payout = this.bet * multiplier;
        this.credits += this.result.payout;
      } else {
        this.result.won = false;
        this.result.payout = 0;
      }

      this.isSpinning = false;
      // do not show modal; display inline result instead
      this.ui.showResultModal = false;
    },
    runStage(index) {
      return new Promise((resolve) => {
        const stage = this.stages[index];
        const symbols = ['medal_gold','medal_silver','medal_bronze','blank'];
        const totalSteps = 14 + Math.floor(Math.random() * 8);
        let step = 0;
        const interval = Math.max(30, Math.floor(stage.spinDuration / totalSteps));

        const iv = setInterval(() => {
          stage.currentSymbol = symbols[step % symbols.length];
          step++;
          if (step >= totalSteps) {
            clearInterval(iv);
            const success = Math.random() < stage.odds;
            const symbol = success ? 'medal_gold' : 'blank';
            stage.currentSymbol = symbol;
            resolve({ success, symbol });
          }
        }, interval);
      });
    },
    symbolToPath(sym) {
      if (!sym) return '../../image/medal-jackpot/blank.svg';
      return '../../image/medal-jackpot/' + sym + '.svg';
    }
  },
  template: `
    <div class="mj-container">
      <div class="row mb-3">
        <div class="col-8">
          <div class="mj-stages d-flex justify-content-between">
            <stage-reel v-for="stage in stages" :key="stage.id" :stage="stage"></stage-reel>
          </div>
        </div>
        <div class="col-4">
          <control-panel :credits="credits" :bet="bet" :isSpinning="isSpinning"
            @start="startDraw" @update-bet="val => { this.bet = Math.max(1, Number(val) || 1) }"></control-panel>
          <odds-display :stages="stages"></odds-display>
        </div>
      </div>
      <!-- inline result summary (no modal) -->
      <div class="result-summary mt-3" v-if="result.symbols.length>0">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">前回の結果</h5>
            <p class="card-text">到達・成功した段数: <strong>{{result.matchedStages}}</strong></p>
            <p class="card-text">払戻し: <strong>{{result.payout}}</strong></p>
            <div class="d-flex align-items-center">
              <div class="me-3">シンボル:</div>
              <div>
                <img v-for="(s,i) in result.symbols" :key="i" :src="symbolToPath(s)" class="mx-1" style="width:36px;height:36px;" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};

const vm = createApp(App).mount('#medal-jackpot-app');

// Update share button to include current credits, page URL and required hashtag
function updateShareLink(){
  try{
    const btn = document.getElementById('share-x');
    if(!btn) return;
    const credits = (vm && vm.credits) ? vm.credits : 0;
    const url = location.href;
    const text = `${credits}pt ${url} #メダルジャックポット_edodo2`;
    btn.href = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(text);
  }catch(e){ /* ignore */ }
}

updateShareLink();
// Reactively update share link when relevant data changes
if (vm && vm.$watch) {
  vm.$watch('credits', updateShareLink);
  vm.$watch('bet', updateShareLink);
  vm.$watch('result', updateShareLink, { deep: true });
}
