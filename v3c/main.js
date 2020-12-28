new Vue({
    name: 'game',
    el: '#app',
    data: state,
    computed: {
        testCard(){
            return cards.archers
        }
    },
    mounted() {
        console.log(this.$data === state)
    },
    template: `<div id="#app"> 
      <top-bar :turn="turn" :current-player-index="currentPlayerIndex" :players="players"/>
      <card :def="testCard" @click.native="handlePlay"/>
    </div>`, //vue针对组件有自己的事件系统,叫做“自定义事件”,这里vue期望的是一个自定义的click事件,而不是浏览器事件,要监听到组件的clikc事件,需要使用.native修饰符
    methods: {
        handlePlay(){
            console.log("you played a card!");
        }
    },
})

//修改的是state对象
//state对象已经为Vue实例的data属性,Vue可以对其做出响应
window.addEventListener('resize', () => {
    state.worldRatio = getWorldRatio()
})