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
      <card :def="testCard" @play="handlePlay"/>
    </div>`,
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
