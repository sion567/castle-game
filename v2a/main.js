new Vue({
    name: 'game',
    el: '#app',
    data: state,
    mounted() {
        console.log(this.$data === state)
    },
    template: `<div id="#app"> {{worldRatio}} </div>`
})

//修改的是state对象
//state对象已经为Vue实例的data属性,Vue可以对其做出响应
window.addEventListener('resize', () => {
    state.worldRatio = getWorldRatio()
})