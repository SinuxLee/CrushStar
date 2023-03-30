const GameConfig = require('GameConfig')
const GameTools = require('GameTools')
const GameUiTools = require('GameUiTools')
const GameData = require('GameData')
cc.Class({
  extends: cc.Component,
  properties: {
    backColor: cc.Node,
    backButton: cc.Node, // 返回按钮
    reviveButton: cc.Node // 复活按钮
  },

  onLoad () {
    GameTools.submitScore(GameData.heightScore) // 提交得分
    if (GameData.heightScore > GameData.getHeightScore()) {
      GameData.setHeightScore(GameData.heightScore)
    }
    GameUiTools.setButtonClickEvents(this, this.backButton, 'buttonFunc')
    GameUiTools.setButtonClickEvents(this, this.reviveButton, 'buttonFunc')
  },

  buttonFunc: function (event) {
    const button = event.target
    if (this.reviveButton == button) {
      GameTools.playSimpleAudioEngine(0)
      if (GameData.getGameIntegral() >= 30) {
        GameConfig.IS_GAME_OVER = false
        GameConfig.GameLogic.backGame()
        GameData.setGamePropNumber(0, 1)
        GameData.setGamePropNumber(1, 1)
        GameData.setGamePropNumber(2, 1)
        GameData.setGameIntegral(-30)
        GameConfig.GameScene.setGamePropNumber(0)
        GameConfig.GameScene.setGamePropNumber(1)
        GameConfig.GameScene.setGamePropNumber(2)
        this.node.destroy()
        if (GameConfig.IS_GAME_MUSIC) {
          GameTools.playBackgroundMusic()
        }
      }
    } else if (this.backButton == button) {
      GameTools.playSimpleAudioEngine(0)
      this.loadingResource()
    }
    return true
  },
  loadingResource: function () {
    GameTools.removeRankData()
    GameData.setHaveGameData(false)
    GameData.setGamePassNum(1)
    GameConfig.loadingSceneType = GameConfig.LoadingSceneType.LoadingSceneBackGame
    GameConfig.mainMenu = GameConfig.MainMenu.MainMenuSpace
    cc.director.loadScene('LoadingScene')
  }
})
