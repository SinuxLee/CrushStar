var GameConfig = require("GameConfig");
var GameTools = require("GameTools");
var GameData = require("GameData");
var GameUiTools = require("GameUiTools");
cc.Class({
    extends: cc.Component,
    properties: {
        propType: cc.Sprite,
        porpNumberLabel: cc.Label,
        porpNumberNode: cc.Node,
        addNode: cc.Node,
        propTypeNumber: 0,
    },

    onLoad() {
        if (this.propTypeNumber == 0) {
            GameUiTools.getSpriteFrame("pop_game/popgame_25", this.propType);
        } else if (this.propTypeNumber == 1) {
            GameUiTools.getSpriteFrame("pop_game/popgame_31", this.propType);
        } else if (this.propTypeNumber == 2) {
            GameUiTools.getSpriteFrame("pop_game/popgame_30", this.propType);
        }
        this.setPropType();
    },

    setPropType() {
        if (GameData.getGamePropNumber(this.propTypeNumber) > 0) {
            this.porpNumberNode.active = true;
            this.porpNumberLabel.string = GameData.getGamePropNumber(this.propTypeNumber);
            this.addNode.active = false;
        } else {
            this.porpNumberNode.active = false;
            this.addNode.active = true;
        }
    },
});
