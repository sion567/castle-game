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
    computed: {
        height(){
            return 220 * this.ratio + 40
        }
    }
})