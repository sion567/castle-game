new Vue({
    name: 'game',
    el: '#app',
    data: state,
    computed: {
    },
    mounted() {
        console.log(this.$data === state)
    },
    template: `<div id="#app"> 
      <top-bar :turn="turn" :current-player-index="currentPlayerIndex" :players="players"/>
      <transition name="hand">
      <hand :cards="testHand" v-if="!activeOverlay"/>
      </transition>
    </div>`,
    methods: {
        handlePlay(){
            console.log("you played a card!");
        },
        createTestHand(){
            const cards=[]
            //遍历获取卡牌的id
            const ids = Object.keys(cards)
            for (let i=0;i<5;i++){ //抽5张卡牌
                cards.push(this.testDrawCard())
            }
            return cards
        },
        testDrawCard(){
            //使用id随机选取一张卡牌
            const ids = Object.keys(cards)
            const randomId = ids[Math.floor(Math.random() * ids.length)]
            //返回一张新的卡牌
            return {
                uid: cardUid++, //卡牌的唯一标识符
                id: randomId, //定义的id
                def: cards[randomId] //定义对象
            }
        }
    },
    created() {
        this.testHand = this.createTestHand()
        console.log("testHand", this.testHand)
    },
})

//修改的是state对象
//state对象已经为Vue实例的data属性,Vue可以对其做出响应
window.addEventListener('resize', () => {
    state.worldRatio = getWorldRatio()
})

/*
使用prop实现从父组件到子组件的通信
我们希望子组件反过来与父组件通信，不能使用prop，要使用自定义组件。
在组件内部，使用$emit这个特殊方法触发的事件可以被父组件捕获到
该方法接收一个固定的参数，即事件类型：this.#emit('play')
也可以添加一些参数传递到处理函数的方法中：this.#emit('play', 'orange', 42)
在同一个vue实例中，可以使用名为$on的特殊方法监听自定义事件this.$on('play', ()=>{.....})
同时$emit方法还会触发一个play事件到父组件中,可以在父组件模板中使用v-on指令监听该事件:<card v-on:play="handlePlay">

vue的自定义事件与浏览器事件系统是完全分开的，方法$on与$emit并不是addEventListener和dispatchEvent的别名，
这也就是组件中需要使用.native修饰符来监听浏览器事件(如click)
*/

/*
如果要通过v-if和v-show添加或移除某个组件时实现过渡效果，可以用<transition>，它会自动将下列css应用到元素中
元素添加时:v-enter-active  >  v-enter  >  v-enter-to
元素移除时:v-leave-active  >  v-leave  >  v-leave-to
如果需要复用这个动画，可以给它取个名字<transition name="fade">,css使用fade-enter-active替换v-enter-active
*/