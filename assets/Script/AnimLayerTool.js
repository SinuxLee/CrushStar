var CardSprite = require("CardSprite");
var GameConfig = require("GameConfig");
var GameTools = require("GameTools");
var GameUiTools = require("GameUiTools");
var DEVICE_WIDTH = GameConfig.DEVICE_WIDTH;
var DEVICE_HEIGHT = GameConfig.DEVICE_HEIGHT;
var MoveButtonAnimType = {
    up: 0,//向上
    down: 1,//向下
    left: 2,//向左
    right: 3,//向右
    leftUp: 4,//左上
    leftDown: 5,//左下
    rightUp: 6,//右上
    rightDown: 7,//右下
};
var AnimLayerTool = {
    moveButtonAnimTime: 0.3,// 按钮动画移动时间
    MoveButtonAnimType: MoveButtonAnimType,
    bottonAnim: function (button) {// 创建按钮特效
        let arrayNode = new Array();
        if (button.length == undefined) {
            arrayNode[0] = button;
        } else {
            arrayNode = button;
        }
        for (let i = 0; i < arrayNode.length; i++) {
            // let time = cc.random0To1() * 5 + 1;
            let time = Math.random() * 5 + 1;
            let width = arrayNode[i].height / 20.0;
            let anim1 = cc.jumpBy(time, cc.v2(width, 0), width, 1);
            let anim2 = cc.jumpBy(time, cc.v2(-width, 0), -width, 1);
            let anim3 = cc.scaleBy(0.3, 1.1, 0.9);
            let anim4 = cc.delayTime(time);
            let actions = cc.sequence(anim1, anim2, anim3, anim3.reverse(), anim4);
            arrayNode[i].runAction(actions.repeatForever());
        }
    },
    createShowMessageBox(x, y, name, rotation, parentNode) {
    },
    createShowMessageBoxAward(parentNode, engineType) //创建奖励消息提示框
    {
        let message = new cc.Node();
        if (engineType == -1) {
            // message.addComponent(cc.Sprite).spriteFrame = GameTools.love2048FrameCache.getSpriteFrame("toast6");
        } else if (engineType < 6) {
            return;
        } else if (engineType < 8) {
            GameUiTools.getSpriteFrame("pop_nopack/txt_good", message.addComponent(cc.Sprite));
        } else if (engineType < 10) {
            GameUiTools.getSpriteFrame("pop_nopack/txt_cool",message.addComponent(cc.Sprite));
        } else if (engineType < 12) {
            GameUiTools.getSpriteFrame("pop_nopack/txt_verygood", message.addComponent(cc.Sprite));
        } else if (engineType < 14) {
            GameUiTools.getSpriteFrame("pop_nopack/txt_smart", message.addComponent(cc.Sprite));
        } else {
            GameUiTools.getSpriteFrame("pop_nopack/txt_boom", message.addComponent(cc.Sprite));
        }
        GameTools.playSimpleAudioEngine(3);
        message.setPosition(0, 0);
        // message.setOpacity(0);
        message.opacity = 0;
        parentNode.addChild(message);

        let action1 = cc.fadeIn(0.5);
        let action2 = cc.delayTime(1);
        let action3 = cc.fadeOut(0.5);
        let moveFinish = cc.callFunc(this.callFuncAddScore, this, message);
        let action4 = cc.sequence(action1, action2, action3, moveFinish);
        message.runAction(action4);
    },
    moveButtonAnim: function (button, isShow, moveButtonAnimType) {// 按钮消失或出现动画
        let positionX = button.x;
        let positionY = button.y;
        let size = button.getContentSize();
        if (isShow) {
            switch (moveButtonAnimType) {
                case 0:// up:
                    button.setPosition(positionX, DEVICE_HEIGHT + size.height);
                    break;
                case 1:// down:
                    button.setPosition(positionX, -size.height);
                    break;
                case 2:// left:
                    button.setPosition(-size.width, positionY);
                    break;
                case 3:// right:
                    button.setPosition(DEVICE_WIDTH + size.width, positionY);
                    break;
                case 4:// leftUp:
                    button.setPosition(-size.width, DEVICE_HEIGHT + size.height);
                    break;
                case 5:// leftDown:
                    button.setPosition(-size.width, -size.height);
                    break;
                case 6:// rightUp:
                    button.setPosition(DEVICE_WIDTH + size.width, DEVICE_HEIGHT + size.height);
                    break;
                case 7:// rightDown:
                    button.setPosition(DEVICE_WIDTH + size.width, -size.height);
                    break;
                default:
                    break;
            }
            let anim1 = cc.moveTo(this.moveButtonAnimTime, cc.v2(positionX, positionY));
            button.runAction(anim1);
        }
        else {
            let anim1;
            switch (moveButtonAnimType) {
                case 0:// up:
                    anim1 = cc.moveTo(this.moveButtonAnimTime, cc.v2(positionX, DEVICE_HEIGHT + size.height));
                    break;
                case 1:// down:
                    anim1 = cc.moveTo(this.moveButtonAnimTime, cc.v2(positionX, -size.height));
                    break;
                case 2:// left:
                    anim1 = cc.moveTo(this.moveButtonAnimTime, cc.v2(-size.width, positionY));
                    break;
                case 3:// right:
                    anim1 = cc.moveTo(this.moveButtonAnimTime, cc.v2(DEVICE_WIDTH + size.width, positionY));
                    break;
                case 4:// leftUp:
                    anim1 = cc.moveTo(this.moveButtonAnimTime, cc.v2(-size.width, DEVICE_HEIGHT + size.height));
                    break;
                case 5:// leftDown:
                    anim1 = cc.moveTo(this.moveButtonAnimTime, cc.v2(-size.width, -size.height));
                    break;
                case 6:// rightUp:
                    anim1 = cc.moveTo(this.moveButtonAnimTime, cc.v2(DEVICE_WIDTH + size.width, DEVICE_HEIGHT + size.height));
                    break;
                case 7:// rightDown:
                    anim1 = cc.moveTo(this.moveButtonAnimTime, cc.v2(DEVICE_WIDTH + size.width, -size.height));
                    break;
                default:
                    break;
            }
            button.runAction(anim1);
        }
    },

    createAddScore(addScore) //创建加分动画
    {
        let addScoreSprite = new cc.Node();
        let lable = addScoreSprite.addComponent(cc.Label);
        lable.font = GameTools.numberLabelAtlas;
        lable.string = ":" + addScore;
        addScoreSprite.setPosition(-46, 505);
        // addScoreSprite.setOpacity(100);
        addScoreSprite.opacity = 0;
        GameConfig.GameScene.node.addChild(addScoreSprite);
        let move1 = cc.moveBy(0.3, 0, 106);
        let move2 = cc.fadeIn(0.2);
        let move3 = cc.spawn(move1, move2);
        let moveFinish = cc.callFunc(this.callFuncAddScore, this, addScoreSprite);
        addScoreSprite.runAction(cc.sequence(move3, moveFinish));
    },
    callFuncAddScore(sender, node) //创建加分动画监听
    {
        sender.destroy();
    },
    createScoreMoveAnim: function (from, score, scoreType) { //创建得分移动动画
        if (score > 0) {
            let scoreNumberTTF = new cc.Node();
            let lable = scoreNumberTTF.addComponent(cc.Label);
            lable.font = GameTools.numberLabelAtlas;
            lable.string = ":" + score;
            scoreNumberTTF.setPosition(from.x, from.y);
            from.getParent().addChild(scoreNumberTTF);
            let moveFinish = cc.callFunc(this.callFuncScoreMoveAnim, this, scoreNumberTTF);
            let move1 = null;
            if (scoreType) {
                move1 = cc.moveTo(1, 58 + 360, 408 + 640);
            } else {
                move1 = cc.moveTo(1, -259 + 360, 290 + 640);
            }
            move1.easing(cc.easeExponentialIn());
            scoreNumberTTF.runAction(cc.sequence(move1, moveFinish));
        }
    },
    callFuncScoreMoveAnim: function (sender, scoreNumberTTF) { //得分移动动画监听
        GameConfig.GameLogic.setScore();
        scoreNumberTTF.destroy();
    },

    createChangeCardNumAnim: function (card, num) //创建移除动画
    {
        let cardSprite = CardSprite.createCardSprite(card.getNumber(), card.getPositionX(), card.getPositionY());
        card.getParent().addChild(cardSprite);
        card.active = false;
        card.setNumber(num);
        cardSprite.setNumber(num);

        let action2 = cc.scaleTo(0.3, 0);
        action2.easing(cc.easeBackIn())
        let action3 = cc.scaleTo(0.1, 1);
        let moveFinish1 = cc.callFunc(this.callFuncChangeCardNum1, this, cardSprite);
        let moveFinish2 = cc.callFunc(this.callFuncChangeCardNum2, this, [cardSprite, card]);
        let actions = cc.sequence(action2, moveFinish1, action3, moveFinish2);
        cardSprite.runAction(actions);
    },
    callFuncChangeCardNum1: function (sender, cardSprite) //卡片移除特效监听
    {
        cardSprite.CardShow();
    },
    callFuncChangeCardNum2: function (sender, funData) //卡片移除特效监听
    {
        let cardSprite = funData[0];
        let card = funData[1];
        card.CardShow();
        card.active = true;
        cardSprite.destroy();
    },
    createExchangeCardAnim: function (card, z, x) //创建道具交换特效
    {
        let X = card.getPositionX();
        let Y = card.getPositionY();
        let unitSize = GameConfig.CARD_WIDTH / (GameConfig.CAED_LINES + 1);
        let move1 = cc.scaleBy(0.4, 1.15);
        let actions = cc.sequence(move1, move1.reverse());
        if (z > 0) {
            let card1 = CardSprite.createCardSprite(-1, X - unitSize - GameConfig.CARD_WIDTH, Y);
            card.getParent().addChild(card1);
            card1.runAction(actions.clone().repeatForever());
        }
        if (z < GameConfig.CAED_LINES - 1) {
            let card2 = CardSprite.createCardSprite(-1, X + unitSize + GameConfig.CARD_WIDTH, Y);
            card.getParent().addChild(card2);
            card2.runAction(actions.clone().repeatForever());
        }
        if (x > 0) {
            let card3 = CardSprite.createCardSprite(-1, X, Y - unitSize - GameConfig.CARD_WIDTH);
            card.getParent().addChild(card3);
            card3.runAction(actions.clone().repeatForever());
        }
        if (x < GameConfig.CAED_LINES - 1) {
            let card4 = CardSprite.createCardSprite(-1, X, Y + unitSize + GameConfig.CARD_WIDTH);
            card.getParent().addChild(card4);
            card4.runAction(actions.clone().repeatForever());
        }
    },

    createRemoveExchangeCardAnim: function (card, z, x) //创建道具移除交换特效
    {
        if (z > 0) {
            card.getParent().removeChildByTag(2001);
        }
        if (z < GameConfig.CAED_LINES - 1) {
            card.getParent().removeChildByTag(2002);
        }
        if (x > 0) {
            card.getParent().removeChildByTag(2003);
        }
        if (x < GameConfig.CAED_LINES - 1) {
            card.getParent().removeChildByTag(2004);
        }
    },

    createScaleToCard: function (card) {// 创建卡片初始化动画
        let cardSprite = CardSprite.createCardSprite(card.number, card.x, card.y);
        card.getParent().addChild(cardSprite);
        card.active = false;
        cardSprite.setScale(0);
        let action2 = cc.scaleTo(0.3, 1);
        action2.easing(cc.easeBackOut());
        let moveFinish = cc.callFunc(this.callFuncCard1, this, [cardSprite, card]);
        cardSprite.runAction(cc.sequence(action2, moveFinish));
    },
    callFuncCard1: function (node, cardSprite) {
        cardSprite[1].CardShow();
        cardSprite[1].active = true
        cardSprite[0].destroy();
    },

    createMoveAnim: function (from, to, isShowAnim) {
        let cardSprite = CardSprite.createCardSprite(from.number, from.x, from.y);
        to.getParent().addChild(cardSprite);
        let i = 0;
        let moveFinish = cc.callFunc(this.callFuncCard2, this, [cardSprite, to, isShowAnim]);
        let move1 = cc.moveTo(0.3, cc.v2(to.x, to.y));
        if (i < 1) {
            move1 = cc.moveTo(0.1, cc.v2(to.x, to.y));
        } else if (i < 2) {
            move1.easing(cc.easeBackIn());
        } else if (i < 3) {
            move1.easing(cc.easeBackOut());
        } else if (i < 4) {
            move1.easing(cc.easeBackInOut());
        } else if (i < 5) {
            move1 = cc.jumpTo(0.3, cc.v2(to.x, to.y), GameConfig.CARD_WIDTH, 2);
        }
        cardSprite.runAction(cc.sequence(move1, moveFinish));
    },
    callFuncCard2: function (sender, to) {
        to[1].CardShow();
        if (to[2]) {
            to[0].number = to[1].number;
            to[0].CardShow();
            let scale = cc.scaleBy(0.02, 1.15);
            let moveFinish = cc.callFunc(this.callFuncCard3, this, to[0]);
            to[0].runAction(cc.sequence(scale, scale.reverse(), moveFinish));
        }
        else {
            to[0].destroy();
        }
    },
    callFuncCard3: function (sender, card) {
        card.destroy();
    },
    createPopStarAnim(from, dTime) //创建卡片爆炸特效
    {
        let moveFinish2 = cc.callFunc(this.callFuncPopStarAnim, this, from);
        // from.runAction(cc.sequence(cc.delayTime(dTime), moveFinish2, cc.hide()));
        from.runAction(cc.sequence(cc.delayTime(dTime), moveFinish2, cc.fadeOut()));
    },
    callFuncPopStarAnim(sender, from) //卡片爆炸特效监听
    {
        GameTools.playSimpleAudioEngine(0);
        let emitterNode = new cc.Node();
        emitterNode.setPosition(from.getPosition());
        let move_emitter = emitterNode.addComponent(cc.ParticleSystem);
        // let move_emitter = ParticleExplosion.createWithTotalParticles(30);
        // let move_emitter = new cc.ParticleSystem(30);
        switch (from.getNumber()) {
            // case 2:
            //     move_emitter.texture = "res/raw-assets/resources/particals/noe/partical_tex_yellow";
            //     break;
            // case 4:
            //     move_emitter.texture = "res/raw-assets/resources/particals/noe/partical_tex_blue";
            //     break;
            // case 8:
            //     move_emitter.texture = "res/raw-assets/resources/particals/noe/partical_tex_green";
            //     break;
            // case 16:
            //     move_emitter.texture = "res/raw-assets/resources/particals/noe/partical_tex_red";
            //     break;
            // case 32:
            //     move_emitter.texture = "res/raw-assets/resources/particals/noe/partical_tex_purple";
            //     break;
            case 2:
                move_emitter.texture = "pop_game/n6";
                break;
            case 4:
                move_emitter.texture = "pop_game/n6";
                break;
            case 8:
                move_emitter.texture = "pop_game/n6";
                break;
            case 16:
                move_emitter.texture = "pop_game/n6";
                break;
            case 32:
                move_emitter.texture = "pop_game/n6";
                break;
                
        }
        move_emitter.startColor = cc.color(255, 255, 255, 255);
        move_emitter.startColorVar = cc.color(0, 0, 0, 0);
        move_emitter.endColorVar = cc.color(0, 0, 0, 0);
        move_emitter.endColor = move_emitter.startColor;
        move_emitter.autoRemoveOnFinish = true;

        move_emitter.duration = 0.1;
        move_emitter.emissionRate = 100;
        move_emitter.life = 2;
        move_emitter.lifeVar = 0.5;
        move_emitter.angle = 90;
        move_emitter.angleVar = 360;
        move_emitter.custom = true;
        move_emitter.playOnLoad = true;
        from.getParent().addChild(emitterNode);
    },
};

module.exports = AnimLayerTool;