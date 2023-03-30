const LoadingSceneType = {
  LoadingSceneFirst: 0, // 首次进入
  LoadingSceneEnterGame: 1, // 进入游戏
  LoadingSceneBackGame: 2// 返回游戏
}
const MainMenu = {
  MainMenuNumClassic: 0, // 经典模式
  MainMenuNumPop: 5, // 消除叠加模式
  MainMenuNumPopStar: 6, // 消灭星星模式
  MainMenuSpace: 7// 清空
}

const PropsMenu = {
  PropsMenuBackout: 0, // 撤销功能
  PropsMenuDestroyCard: 1, // 销毁一个卡片
  PropsMenuExchangeCard: 2, // 调换卡片
  PropsMenuShrinkNum: 3, // 使卡片数字除2
  PropsMenuRemoveAcross: 4, // 使卡片横排消除
  PropsMenuRemoveVertical: 5, // 使卡片竖排消除
  PropsMenuSpace: 6// 清空
}

const GameConfig = {
  GameName: '一起消灭星星',
  GameClubButton: null, // 游戏圈按钮
  GameScene: null,
  GameLogic: null,

  LoadingSceneType,
  MainMenu,
  PropsMenu,

  DEVICE_WIDTH: 720, // 屏幕宽度
  DEVICE_HEIGHT: 1280,

  CARD_WIDTH: 0, // 卡片宽度
  CAED_LINES: 4, // 卡片个数

  MAIN_MENU_NUM: -1000, // 模式类型标识

  loadingSceneType: LoadingSceneType.LoadingSceneFirst, // 加载界面
  mainMenu: MainMenu.MainMenuSpace, // 主选择菜单

  propsMenu: PropsMenu.PropsMenuSpace, // 道具功能

  IS_GAME_MUSIC: true, // 游戏音效

  IS_GAME_SHARE: false, // 游戏分享
  IS_GAME_OVER: false, // 游戏是否结束
  IS_GAME_WIN: false // 游戏是否胜利
}
module.exports = GameConfig
