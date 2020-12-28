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