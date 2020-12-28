var cardUid = 0
// The consolidated state of our app
var state = {
  // World
  worldRatio: getWorldRatio(),
  // game
  turn: 1,    //当前回合数
  testHand: [],  //TODO:临时测试用,手牌
  activeOverlay: null, //用户界面
  players: [
    {
      name: '张三丰'
    },{
      name: '李莫愁'
    }
  ],    //玩家对象数组
  currentPlayerIndex: Math.round(Math.random())    //只产生0或1,当前玩家在players数组中的索引
}
