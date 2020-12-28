Vue.component('top-bar', {
    template: `<div class="top-bar" :class="'player-'+currentPlayerIndex">
      <div class="player p0">{{players[0].name}}</div>
      <div class="turn-counter">
      <img class="arrow" src="svg/turn.svg" />
      <div class="turn">Turn： {{ turn }}</div>
      </div>
      <div class="player p1">{{players[1].name}}</div>
      </div>`,
    props: ['players','currentPlayerIndex','turn'], //利用props选项可以将prop添加到组件的定义中
    created() {
        console.log("1将prop添加到组件中"); //,
        console.log("2在主模板中使用v-bind的简写语法将应用的数据绑定到prop值上");
        console.log("3使用数据属性", this.players);
    }
})


Vue.component('card', {
  template: `<div class="card" :class="'type-'+def.type" @click="play">
    <div class="title">{{def.title}}</div>
    <img class="separator" src="svg/card-separator.svg">
    <div class="description"><div v-html="def.description"></div></div>
    <div class="note" v-if="def.note"><div v-html="def.note"></div></div>
    </div>
  </div>`,
  props: ['def'],
  methods: {
    play(){
      console.log("play");
      this.$emit('play');
    }
  }
})

Vue.component('hand', {
  template: `<div class="hand">
    <div class="wrapper">
     <transition-group name="card" tag="div" class="cards">
      <card v-for="card of cards" :key="card.uid" :def="card.def" @play="handlePlay(card)" />
     </transition-group>
    </div>
  </div>`,
  props: ['cards'],
  methods: {
    handlePlay(card){
      console.log("card-play", card);
      this.$emit('card-play', card); 
    }
  }
})


Vue.component("overlay", {
  template: `<div class="overlay" @click="handleClick">
    <div class="content">
      <!--  这里是插槽  -->
      <slot />
    </div>
  </div>`,
  methods: {
    handleClick(){
      this.$emit('close'); 
    }
  }
})
/**play-turn 浮层 */
Vue.component("overlay-content-player-turn", {
  template: `<div>
    <div class="big" v-if="player.skipTurn">{{player.name}},<br>your turn is skipped!</div>
    <div class="big" v-else>{{player.name}},<br>your turn has come!</div>
    <div>Tap to continue</div>
  </div>`,
  props: ['player'],
})
/**last-turn 浮层 */
Vue.component("overlay-content-last-play", {
  template: `<div>
    <div v-if="opponent.skippedTurn">{{opponent.name}} turn was skipped!</div>
    <template v-else>
      <div>{{opponent.name}} just played:</div>
      <card :def="lastPlayedCard">
    </template>
  </div>`,
  props: ['opponent'],
  computed: {
    lastPlayedCard(){
      return getLastPlayedCard(this.opponent)
    }
  }
})
/**game-result 浮层 */
Vue.component("player-result", { 
  template: `<div class="player-result" :class="result">
    <span class="name">{{player.name}}</span> is <span class="result">{{result}}</span>
  </div>`,
  props: ['player'],
  computed: {
    result(){
      return this.player.dead ? "defeated" : "victorious"
    }
  }
})
/**game-over 浮层 */
Vue.component("overlay-content-game-over", {
  template: `<div>
    <div class="big">Game Over</div>
    <player-result v-for="p in players" :player="p" />
  </div>`,
  props: ['players']
})