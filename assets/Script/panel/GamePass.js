var GameConfig = require("GameConfig");
var GameTools = require("GameTools");
var GameData = require("GameData");
var GameUiTools = require("GameUiTools");
cc.Class({
    extends: cc.Component,
    properties: {
        passLabel: cc.Label,
        scoreLabel: cc.Label,
        nextPassButton: cc.Node, //下一关按钮
        shareButton: cc.Node, //分享按钮
        backButton: cc.Node, //返回按钮
    },

    onLoad() {
        this.passLabel.string = "第  " + GameData.getGamePassNum() + "  关";
        this.scoreLabel.string = GameData.score0;
        GameUiTools.setButtonClickEvents(this, this.nextPassButton, "buttonFunc");
        GameUiTools.setButtonClickEvents(this, this.shareButton, "buttonFunc");
        GameUiTools.setButtonClickEvents(this, this.backButton, "buttonFunc");
    },

    buttonFunc: function (event) {
        let button = event.target;
        if (this.shareButton == button) {
            GameTools.playSimpleAudioEngine(0);
            GameTools.sharePicture();
        } else if (this.nextPassButton == button) {
            GameTools.playSimpleAudioEngine(0);
            this.node.destroy();
            GameConfig.GameLogic.autoCreateCardNumber();
        } else if (this.backButton == button) {
            GameTools.playSimpleAudioEngine(0);
            GameConfig.GameLogic.autoCreateCardNumber();
            GameConfig.GameLogic.saveMemoryInformation();
            this.loadingResource();
        }
        return true;
    },
    loadingResource: function () {
        GameConfig.loadingSceneType = GameConfig.LoadingSceneType.LoadingSceneBackGame;
        GameConfig.mainMenu = GameConfig.MainMenu.MainMenuSpace;
        cc.director.loadScene("LoadingScene");
    },
});
