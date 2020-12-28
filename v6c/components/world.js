Vue.component('castle', {
    template: `<div class="castle" :class="'player-' + index">
    <img class="building" :src="'svg/castle' + index + '.svg'" />
    <img class="ground" :src="'svg/ground' + index + '.svg'" />
    <!--  稍后在这里添加一个城堡旗帜(castle-banners)组件  -->
    <castle-banners :player="player" />
    </div>`,
    props: ['player', 'index']
})
Vue.component('castle-banners', {
    template: `<div class="banners">
      <!--  食物  -->
      <img class="food-icon" src="svg/food-icon.svg" />
      <!--  这里是小气泡  -->
      <bubble type="food" :value="player.food" :ratio="foodRatio" />
      <!--   这里是旗帜蓝  -->
      <banner-bar class="food-bar" color="#288339" :ratio="foodRatio" />

      <!-- 生命值  -->
      <img class="health-icon" src="svg/health-icon.svg" />
      <!--  这里是小气泡  -->
      <bubble type="health" :value="player.health" :ratio="healthRatio" />
      <!--  这里是旗帜蓝  -->
      <banner-bar class="health-bar" color="#9b2e2e" :ratio="healthRatio" />
      </div>
    `,
    props: ['player'],
    computed: {
        foodRatio(){
            return this.player.food/maxFood
        },
        healthRatio(){
            return this.player.health/maxHealth
        }
    }
})
/**
 * type  区分食物还是生命值
 * value 在小气泡中显示数值
 * ratio 当前值除以最大值,计算小气泡的垂直位置
 */
Vue.component('bubble', {
    template: `<div class="stat-bubble" :class="type + '-bubble'" :style="bubbleStyle">
      <img :src="'svg/' + type + '-bubble.svg'" />
      <div class="counter">{{value}}</div>
    </div>`,
    props: ['type', 'value', 'ratio'],
    computed: {
        bubbleStyle(){
            return {
                top: (this.ratio * 220 + 40) * state.worldRatio + 'px'
            }
        }
    }
})
/** #号后面跟上<script>标签模板的ID */
Vue.component('banner-bar', {
    template: '#banner',
    props: ['color', 'ratio'],
    data() {
        return {
            height: 0
        }
    },
    createe(){
        this.height = this.targetHeight
    },
    computed: {
        targetHeight(){
            return 220 * this.ratio + 40
        }
    },
    watch:{
        targetHeight(newVal, oldVal){
            const vm = this;
            new TWEEN.Tween({value: oldVal}).easing(TWEEN.Easing.Cubic.InOut).to({value: newVal}, 500)
            .onUpdate(function(){   //onUpdate回調方法中,this上下文是Tween對象
                vm.height = this.value.toFixed(0)
            })
            .start()
        }
    }
})

const cloudAnimationDurations = {
    min: 10000,
    max: 50000
}
Vue.component('cloud', {
    template:`<div class="cloud" :class="'cloud-'+type" :style="css">
     <img :src="'svg/cloud'+type+'.svg'" @load="initPosition"/>
    </div>
    `,
    data(){
        return {
            css: {
                transform: 'none',
                zIndex: 0
            }
        }
    },
    methods:{
        setPosition(left, top) {
            this.css.transform = `translate(${left}px, ${top}px)`
        },
        initPosition() {
            const width = this.$el.clientWidth
            this.setPosition(-width, 0)
        },
        startAnimation(delay = 0) {
            const vm = this;
            const width = vm.$el.clientWidth
            const {min, max} = cloudAnimationDurations
            const animationDuration = Math.random() * (max-min) + min
            this.css.zIndex = Math.round(max - animationDuration)
            const top = Math.random() * (window.innerHeight * 0.3)
            new TWEEN.Tween({value: -width}).to({value:window.innerWidth}, animationDuration).delay(delay)
            .onUpdate(function(){
                vm.setPosition(this.value, top)
            })
            .onComplete(() => {
                this.startAnimation(Math.random() * 10000)
            })
            .start()
        }
    },
    mounted() {
        this.startAnimation(-Math.random() * cloudAnimationDurations.min)
    },
    props: ['type']
})