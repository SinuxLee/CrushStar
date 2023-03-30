const GameConfig = require('GameConfig')
const GameTools = require('GameTools')
const GameData = require('GameData')
const GameUiTools = require('GameUiTools')
cc.Class({
  extends: cc.Component,
  properties: {
    backColor: cc.Node,
    title: cc.Sprite,
    propType: cc.Sprite,
    helpText: cc.Label,
    backButton: cc.Node, // 返回按钮
    getPropButton: cc.Node // 获取按钮
  },

  onLoad () {
    GameUiTools.setButtonClickEvents(this, this.backButton, 'buttonFunc')
    GameUiTools.setButtonClickEvents(this, this.getPropButton, 'buttonFunc')
  },

  setPropType (propType) {
    this.propTypeNumber = propType
    if (propType == 0) {
      ameUiTools.getSpriteFrame('pop_game/popgame_46', this.title)
      GameUiTools.getSpriteFrame('pop_game/popgame_25', this.propType)
      this.helpText.string = '敲碎你不想要的星星'
    } else if (propType == 1) {
      GameUiTools.getSpriteFrame('pop_game/popgame_38', this.title)
      GameUiTools.getSpriteFrame('pop_game/popgame_31', this.propType)
      this.helpText.string = '可炸掉选中的横排和竖排的星星'
    } else if (propType == 2) {
      GameUiTools.getSpriteFrame('pop_game/popgame_57', this.title)
      GameUiTools.getSpriteFrame('pop_game/popgame_30', this.propType)
      this.helpText.string = '点击星星，可和周围星星交换'
    }
  },

  buttonFunc: function (event) {
    const button = event.target
    if (this.backButton == button) {
      GameTools.playSimpleAudioEngine(0)
      this.node.destroy()
    } else if (this.getPropButton == button) {
      GameTools.playSimpleAudioEngine(0)
      GameTools.sharePicture()
      GameData.setGamePropNumber(this.propTypeNumber, 1)
      GameConfig.GameScene.setGamePropNumber(this.propTypeNumber)
      this.node.destroy()
    }
    return true
  }
})
