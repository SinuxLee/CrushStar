var GameConfig = require("GameConfig");
var GameTools = require("GameTools");
var GameUiTools = require("GameUiTools");
var CardSprite = cc.Class({
    extends: cc.Node,
    properties: {
        cardSprite: null,
        number: 0,// 显示数字
        isSelect: false,//记录是否选中
        isFirstSelect: false,//记录是否为第一次选中
    },
    ctor: function () {
        this.cardSprite = this.addComponent(cc.Sprite);
    },
	//特价9.9元一套cocoscreator代码联系Q2483367084 
//截图 链接：https://share.weiyun.com/leGAHpnB 密码：b9udtv
    statics: {
        createCardSprite: function (numbers, CardSpriteX, CardSpriteY) {
            let cardSprite = new CardSprite();
            // 自定义初始化
            cardSprite.initCard(numbers, CardSpriteX, CardSpriteY);
            return cardSprite;
        }
    },
    initCard: function (numbers, CardSpriteX, CardSpriteY)// 初始化
    {
        // 初始化数字
        this.number = numbers;
        this.CardShow();
        this.setPosition(CardSpriteX, CardSpriteY);
        this.width = GameConfig.CARD_WIDTH;
        this.height = GameConfig.CARD_WIDTH;
        this.cardSprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
    },
    CardShow: function () {
        // 判断数字的大小来调整颜色
        if (this.number == 1) {
             GameUiTools.getSpriteFrame("pop_game/barrier", this.cardSprite);
        } else if (this.number == -1) {
            GameUiTools.getSpriteFrame("pop_game/popgame_61", this.cardSprite);
        } else if (this.number == 0) {
            // this.cardSprite.spriteFrame = GameUiTools.getSpriteFrame("pop_game/emptyl");
            GameUiTools.getSpriteFrame("pop_game/emptyl", this.cardSprite );
        } else if (this.number >= 2 && this.number <= 131072) {
            // this.cardSprite.spriteFrame = GameUiTools.getSpriteFrame("pop_game/n" + this.number);
            GameUiTools.getSpriteFrame("pop_game/n" + this.number, this.cardSprite);
        }
    },
    setNumber: function (number) {
        this.number = number;
    },
    getNumber: function () {
        return this.number;
    },
    /*
*创建点击特效
*ClickType 0移除特效 1点击动画特效 2点击静态特效
*/
    CardClickShow(ClickType) {
        if (ClickType == 0) {
            this.removeAllChildren();
            this.isSelect = false;
            this.isFirstSelect = false;
        } else {
            let move = cc.moveBy(0.05, cc.v2(0, 2));
            this.runAction(cc.sequence(move, move.reverse()));
            this.isSelect = true;
            let effects = new cc.Node();
            GameUiTools.getSpriteFrame("pop_game/popgame_61", effects.addComponent(cc.Sprite));
            let w = effects.getContentSize().height;
            let scale = this.getContentSize().height / w;
            effects.setScale(scale);
            this.addChild(effects);
            if (ClickType == 1) {
                this.isFirstSelect = true;
                let move1 = cc.scaleBy(0.4, 1.15);
                let actions = cc.sequence(move1, move1.reverse());
                effects.runAction(actions.repeatForever());
            } else if (ClickType == 2) {
                effects.setScale(scale + 0.05);
            }
        }
    },
    getIsSelect() {
        return this.isSelect;
    },
    getIsFirstSelect() {
        return this.isFirstSelect;
    },
    isVisible() {
        return this.opacity == 255;
    },
    setVisible(isTrue) {
        this.opacity = isTrue ? 255 : 0;
    }
});

module.exports = CardSprite;