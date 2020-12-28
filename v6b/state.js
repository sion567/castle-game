var maxHealth = 10
var maxFood = 10
var handSize = 5
var cardUid = 0
// The consolidated state of our app
var state = {
  canPlay: false, //用于防止玩家回合中重复出牌。a出牌时，检查玩家是否已经出过牌。b在css中禁用手牌上的鼠标事件。
  // World
  worldRatio: getWorldRatio(),
  // game
  turn: 1,    //当前回合数
//  testHand: [],  //TODO:临时测试用,手牌
  get currentHand() {
    return state.currentPlayer.hand
  },
  activeOverlay: null, //保存当前显示浮层的名称，如果没有浮层显示，则为null
  players: [
    {
      name: '亚瑟王',
      //游戏开始时的状态
      food: 10,
      health: 10,
      skipTurn: false,  //是否跳过下回合
      skippedTurn: false,  //跳过了上个回合
      hand: [],
      lastPlayedCardId: null,
      dead: false,
    },{
      name: '莫德雷德',
      //游戏开始时的状态
      food: 10,
      health: 10,
      skipTurn: false,  //是否跳过下回合
      skippedTurn: false,  //跳过了上个回合
      hand: [],
      lastPlayedCardId: null,
      dead: false,
    }
  ],    //玩家对象数组
  currentPlayerIndex: Math.round(Math.random()),    //只产生0或1,当前玩家在players数组中的索引
  /*
  get 语句与 set 语句可以声明多次用来对应多个 getter 和 setter
  使用这种方法的好处是可以在声明属性的时候同时声明对应的 getter 和 setter
  var o = {
    get val(){
      //TODO
      return ;
    },
    set val(n){
      //TODO
    }
  }
  */
  get currentPlayer () {  //根据currentPlayerIndex返回player对象
    return state.players[state.currentPlayerIndex]
  },
  get currentOpponentId () {  //返回对手player的索引
    return state.currentPlayerIndex === 0 ? 1 : 0
  },
  get currentOpponent () {  //返回相应的player对象
    return state.players[state.currentOpponentId]
  },


  drawPile: pile,   //玩家可以抽牌的牌堆
  discardPile: {}   //玩家打出的所有卡牌都将从手牌中移除，并放到这个弃牌堆中。如果drawPile空了，将使用discardPile重新填满它
}
