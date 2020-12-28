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
      
      <div class="world">
        <castle v-for="(player, index) in players" :player="player" :index="index" />
        <div class="land" />
      </div>

      <transition name="hand">
        <hand v-if="!activeOverlay" :cards="testHand" @card-play="testPlayCard" />
      </transition>

      <transition name="fade">
        <div class="overlay-background" v-if="activeOverlay" />
      </transition>
      
      <transition name="zoom">
       <overlay v-if="activeOverlay" :key="activeOverlay">
        <component :is="'overlay-content-' + activeOverlay" 
        :player="currentPlayer" 
        :opponent="currentOpponent" 
        :players="players"/>
       </overlay>
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
        },
        testPlayCard(c){
            console.log("testPlayCard", c);
            const index = this.testHand.indexOf(c)
            this.testHand.splice(index, 1)
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

/*
样式问题：pointer-events
pointer-events是css3的一个属性，指定在什么情况下元素可以成为鼠标事件的target（包括鼠标的样式）
auto——效果和没有定义pointer-events属性相同，鼠标不会穿透当前层。在SVG中，该值和visiblePainted的效果相同。
none——元素永远不会成为鼠标事件的target（目标）。但是，当其后代元素的pointer-events属性指定其他值时，鼠标事件可以指向后代元素，在这种情况下，鼠标事件将在捕获或冒泡阶段触发父元素的事件侦听器。实际上默认就可以穿透当前层，因为pointer-events默认为auto
*/

/*
transition-group的子元素必须由唯一的key做标识
特性的key属性：
vue更新存在于v-for循环中的dom元素列表时,会尽量最小化应用于dmo的操作，vue会尽可能地复用元素，为了性能优化的角度
使用key，告诉vue将循环中的dom当中单独的dom对待
*/

/*
slot,
在标签之间添加一些内容，这些内容被包含在DOM中,并替换掉<slot>标签
*/

/*
 vue提供了一个特殊的组件可以把其转换为任意组件：component组件,只需将它的is prop设置为一个组件名或者html标签
 <component is="h1">H1</component>
 <component is="overlay-content-player-turn" />
 is porp和其他任何prop一样，因此可以使用v-bind指令并结合js表达式来动态修改组件

 不用担心尚未使用的prop，它不会影响各个浮层的正常逻辑
 */