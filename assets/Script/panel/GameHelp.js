const GameConfig = require('GameConfig')
const GameTools = require('GameTools')
const GameUiTools = require('GameUiTools')
cc.Class({
  extends: cc.Component,
  properties: {
    backColor: cc.Node,
    backButton: cc.Node // 返回按钮
  },

  onLoad () {
    GameUiTools.setButtonClickEvents(this, this.backButton, 'buttonFunc')
  },

  buttonFunc: function (event) {
    const button = event.target
    if (this.backButton == button) {
      GameTools.playSimpleAudioEngine(0)
      this.node.destroy()
    }
    return true
  }
})
