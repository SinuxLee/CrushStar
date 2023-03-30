const CardSprite = require('CardSprite')
const GameConfig = require('GameConfig')
const GameData = require('GameData')
const AnimLayerTool = require('AnimLayerTool')
const GameTools = require('GameTools')
const GameUiTools = require('GameUiTools')
const TAG_card = 1006
const GamePopStar = cc.Class({
  extends: cc.Node,
  properties: {
    firstX: null, // 点击元素
    firstY: null, // 点击元素
    endX: null,
    endY: null,
    selectNumber: 0, // 选中数字
    selectAmount: 0, // 选中卡片数
    score: 0, // 分数,
    cardArr: null, // 储存卡片类
    firstClickNum: new Array()// 记录交换位置
  },
  ctor: function () {
    this.x = -GameConfig.DEVICE_WIDTH / 2
    this.y = -GameConfig.DEVICE_HEIGHT / 2
    this.setContentSize(GameConfig.DEVICE_WIDTH * 4, GameConfig.DEVICE_HEIGHT * 4)
    this.init()
  },
  init: function () {
    this.cardArr = new Array()
    for (let i = 0; i < GameConfig.CAED_LINES; i++) {
      this.cardArr[i] = Array()
    }
    this.firstClickNum[0] = -1
    this.firstClickNum[1] = -1
    this.initUI()
  },
  initUI () {
    // 设置触摸事件监听
    this.on(cc.Node.EventType.TOUCH_START, this.onTouchBegan, this)

    this.createCardSprite() // 创建4X4卡片
    if (GameData.isHaveGameData()) {
      this.score = GameData.score0
      for (let i = 0; i < GameConfig.CAED_LINES; i++) {
        for (let j = 0; j < GameConfig.CAED_LINES; j++) {
          this.cardArr[i][j].number = GameData.scoreCard0[i][j]
          this.cardArr[i][j].CardShow()
          if (GameData.scoreCard2[i][j] == 1) {
            this.cardArr[i][j].setVisible(false)
          }
        }
      }
    } else {
      for (let i = 0; i < GameConfig.CAED_LINES; i++) {
        for (let j = 0; j < GameConfig.CAED_LINES; j++) {
          AnimLayerTool.moveButtonAnim(this.cardArr[i][j], true, AnimLayerTool.MoveButtonAnimType.up)
        }
      }
      GameData.score0 = 0
      GameData.score1 = 0
      GameData.scoreNum = 0
      this.score = 0
      for (let i = 0; i < GameConfig.CAED_LINES; i++) {
        for (let j = 0; j < GameConfig.CAED_LINES; j++) {
          GameData.scoreCard3[i][j] = 0
          GameData.scoreCard2[i][j] = 0
          GameData.scoreCard1[i][j] = this.cardArr[i][j].number
          GameData.scoreCard0[i][j] = this.cardArr[i][j].number
        }
      }
    }
  },
  onTouchBegan (event) {
    // 获取触摸的X轴和Y轴
    const touchPoint = event.touch.getLocation() // 获取OpenGL坐标（即cocos2d-x坐标，原点在左下角）
    const self = event.getCurrentTarget()
    if (GameConfig.propsMenu != GameConfig.PropsMenu.PropsMenuSpace) {
      self.GamePopStarProperty(touchPoint)
      return false
    } else { // 碰撞检测
      if (self.selectAmount == 0) {
        for (let i = 0; i < GameConfig.CAED_LINES; i++) {
          for (let j = 0; j < GameConfig.CAED_LINES; j++) {
            if (self.cardArr[i][j].isVisible() && self.cardArr[i][j].getBoundingBoxToWorld().contains(touchPoint)) {
              GameTools.playSimpleAudioEngine(1)
              self.cardArr[i][j].CardClickShow(1)
              self.inspectionSelect(i, j)
            }
          }
        }
        self.cardVanish()
      }
      return true
    }
  },

  // 道具模式
  GamePopStarProperty (touchPoint) {
    // 碰撞检测
    for (let i = 0; i < GameConfig.CAED_LINES; i++) {
      for (let j = 0; j < GameConfig.CAED_LINES; j++) {
        if (this.cardArr[i][j].isVisible() && this.cardArr[i][j].getBoundingBoxToWorld().contains(touchPoint)) {
          GameTools.playSimpleAudioEngine(0)
          if (GameConfig.propsMenu == GameConfig.PropsMenu.PropsMenuDestroyCard) {
            this.cardArr[i][j].setVisible(false)
            this.cardVanishAni(0)
            GameData.setGamePropNumber(0, -1)
            GameConfig.GameScene.setGamePropNumber(0)
            GameConfig.propsMenu = GameConfig.PropsMenu.PropsMenuSpace
            return
          } else if (GameConfig.propsMenu == GameConfig.PropsMenu.PropsMenuExchangeCard) {
            if (this.firstClickNum[0] == -1) {
              this.firstClickNum[0] = i
              this.firstClickNum[1] = j
              if (i > 0 && this.cardArr[i - 1][j].isVisible()) {
                this.cardArr[i - 1][j].CardClickShow(1)
              }
              if (i < GameConfig.CAED_LINES - 1 && this.cardArr[i + 1][j].isVisible()) {
                this.cardArr[i + 1][j].CardClickShow(1)
              }
              if (j > 0 && this.cardArr[i][j - 1].isVisible()) {
                this.cardArr[i][j - 1].CardClickShow(1)
              }
              if (j < GameConfig.CAED_LINES - 1 && this.cardArr[i][j + 1].isVisible()) {
                this.cardArr[i][j + 1].CardClickShow(1)
              }
              // AnimLayerTool.createExchangeCardAnim(this.cardArr[i][j], i, j);
            } else {
              if (((Math.abs(i - this.firstClickNum[0]) == 1) && ((j - this.firstClickNum[1]) == 0)) ||
                                (((i - this.firstClickNum[0]) == 0) && (Math.abs(j - this.firstClickNum[1]) == 1))) {
                this.cancelSelect()
                AnimLayerTool.createMoveAnim(this.cardArr[i][j], this.cardArr[this.firstClickNum[0]][this.firstClickNum[1]], true)
                AnimLayerTool.createMoveAnim(this.cardArr[this.firstClickNum[0]][this.firstClickNum[1]], this.cardArr[i][j], true)
                const num = this.cardArr[i][j].getNumber()
                this.cardArr[i][j].setNumber(
                  this.cardArr[this.firstClickNum[0]][this.firstClickNum[1]].getNumber())
                this.cardArr[this.firstClickNum[0]][this.firstClickNum[1]].setNumber(
                  num)
                this.firstClickNum[0] = -1
                this.firstClickNum[1] = -1
                GameData.setGamePropNumber(2, -1)
                GameConfig.GameScene.setGamePropNumber(2)
                this.cardVanishAni(0) // 检测
              } else {
                this.firstClickNum[0] = -1
                this.firstClickNum[1] = -1
                this.cancelSelect()
              }
              GameConfig.propsMenu = GameConfig.PropsMenu.PropsMenuSpace
            }
            return
          } else if (GameConfig.propsMenu == GameConfig.PropsMenu.PropsMenuRemoveAcross) {
            for (let z = 0; z < GameConfig.CAED_LINES; z++) {
              AnimLayerTool.callFuncPopStarAnim(null, this.cardArr[z][j])
              this.cardArr[z][j].setVisible(false)
              AnimLayerTool.callFuncPopStarAnim(null, this.cardArr[i][z])
              this.cardArr[i][z].setVisible(false)
            }
            GameData.setGamePropNumber(1, -1)
            GameConfig.GameScene.setGamePropNumber(1)
            this.cardVanishAni(0)
            GameConfig.propsMenu = GameConfig.PropsMenu.PropsMenuSpace
            return
          }
        }
      }
    }
    if (this.firstClickNum[0] != -1) {
      this.cancelSelect()
      this.firstClickNum[0] = -1
      this.firstClickNum[1] = -1
    }
    GameConfig.propsMenu = GameConfig.PropsMenu.PropsMenuSpace
  },

  cardVanishAni (dt) { // 卡片消失监听动画
    this.doDown()
    this.doLeft()
    this.doCheck(0)
    this.selectAmount = 0
  },

  cancelSelect () { // 取消选择
    for (let i = 0; i < GameConfig.CAED_LINES; i++) {
      for (let j = 0; j < GameConfig.CAED_LINES; j++) {
        if (this.cardArr[i][j].getIsSelect()) {
          this.cardArr[i][j].CardClickShow(0)
        }
      }
    }
    this.selectAmount = 0
  },

  cardVanish () { // 卡片消失
    if (this.selectAmount >= 2) {
      let firstCardI, firstCardJ
      let deTime = 0
      for (let i = 0; i < GameConfig.CAED_LINES; i++) {
        for (let j = 0; j < GameConfig.CAED_LINES; j++) {
          if (this.cardArr[i][j].getIsFirstSelect()) {
            firstCardI = i
            firstCardJ = j
          }
          if (this.cardArr[i][j].getIsSelect()) {
            this.cardArr[i][j].CardClickShow(0)
            // this.cardArr[i][j].setVisible(false);
            AnimLayerTool.createPopStarAnim(this.cardArr[i][j], (deTime++) * 0.1)
            // AnimLayerTool.callFuncPopStarAnim(this.cardArr[i][j]);
          }
        }
      }

      this.score = this.score + this.selectAmount * this.selectAmount * 5
      AnimLayerTool.createScoreMoveAnim(this.cardArr[firstCardI][firstCardJ], this.selectAmount * this.selectAmount * 5, false)// 加分动画
      AnimLayerTool.createShowMessageBoxAward(this.getParent(), this.selectAmount)// 展示奖励对话框

      const scoreNum = GameData.setGameRewards(this.selectNumber) // 获取奖励
      AnimLayerTool.createScoreMoveAnim(this.cardArr[firstCardI][firstCardJ], scoreNum, true)
      GameUiTools.scheduleOnce(this, this.cardVanishAni, deTime * 0.1)
      // this.cardVanishAni(0);
    } else {
      this.cancelSelect()
    }
    return false
  },
  // 选择点中卡片
  inspectionSelect (i, j) {
    this.cardArr[i][j].CardClickShow(2)
    this.selectAmount++
    this.selectNumber = this.cardArr[i][j].getNumber()
    if (i >= 1 && this.cardArr[i - 1][j].isVisible() && !this.cardArr[i - 1][j].getIsSelect()) {
      if (this.selectNumber == this.cardArr[i - 1][j].getNumber()) {
        this.inspectionSelect(i - 1, j)
      }
    }
    if (j < GameConfig.CAED_LINES - 1 && this.cardArr[i][j + 1].isVisible() &&
            !this.cardArr[i][j + 1].getIsSelect()) {
      if (this.selectNumber == this.cardArr[i][j + 1].getNumber()) {
        this.inspectionSelect(i, j + 1)
      }
    }
    if (i < GameConfig.CAED_LINES - 1 && this.cardArr[i + 1][j].isVisible() &&
            !this.cardArr[i + 1][j].getIsSelect()) {
      if (this.selectNumber == this.cardArr[i + 1][j].getNumber()) {
        this.inspectionSelect(i + 1, j)
      }
    }
    if (j >= 1 && this.cardArr[i][j - 1].isVisible() &&
            !this.cardArr[i][j - 1].getIsSelect()) {
      if (this.selectNumber == this.cardArr[i][j - 1].getNumber()) {
        this.inspectionSelect(i, j - 1)
      }
    }
  },
  doDown () {
    let isdo = false
    for (let x = 0; x < GameConfig.CAED_LINES; x++) {
      for (let y = 0; y < GameConfig.CAED_LINES; y++) {
        for (let y1 = y + 1; y1 < GameConfig.CAED_LINES; y1++) {
          if (this.cardArr[x][y1].isVisible()) {
            if (!this.cardArr[x][y].isVisible()) {
              AnimLayerTool.createMoveAnim(this.cardArr[x][y1], this.cardArr[x][y], false)
              this.cardArr[x][y].setNumber(this.cardArr[x][y1].getNumber())
              this.cardArr[x][y].setVisible(true)
              this.cardArr[x][y1].setVisible(false)
              this.cardArr[x][y1].CardShow()
              y--
              isdo = true
            }
            break
          }
        }
      }
    }
    return isdo
  },
  doLeft () {
    let isdo = false
    for (let x = 0; x < GameConfig.CAED_LINES; x++) {
      for (let x1 = x + 1; x1 < GameConfig.CAED_LINES; x1++) {
        if (this.cardArr[x1][0].isVisible()) {
          if (!this.cardArr[x][0].isVisible()) {
            for (let y = 0; y < GameConfig.CAED_LINES; y++) {
              if (this.cardArr[x1][y].isVisible()) {
                AnimLayerTool.createMoveAnim(this.cardArr[x1][y], this.cardArr[x][y], false)
              }
              this.cardArr[x][y].setNumber(this.cardArr[x1][y].getNumber())
              this.cardArr[x][y].setVisible(this.cardArr[x1][y].isVisible())
              this.cardArr[x1][y].setVisible(false)
              this.cardArr[x1][y].CardShow()
            }
            x--
            isdo = true
          }
          break
        }
      }
    }
    return isdo
  },
  // 根据屏幕大小创建卡片
  createCardSprite () {
    for (let i = 0; i < GameConfig.CAED_LINES; i++) {
      for (let j = 0; j < GameConfig.CAED_LINES; j++) {
        const card = CardSprite.createCardSprite(this.randomCreateCardNumber(),
          GameConfig.CARD_WIDTH * i + GameConfig.DEVICE_WIDTH / 20.0 + GameConfig.CARD_WIDTH / 2.0,
          GameConfig.CARD_WIDTH * j + GameConfig.DEVICE_HEIGHT / 8.0)
        this.cardArr[i][j] = card
        // this.addChild(card, i, j);
        // 版本调整
        this.addChild(card)
      }
    }
  },
  // 随机产生数字
  randomCreateCardNumber () {
    // let num = cc.random0To1() * 5;
    const num = Math.random() * 5
    const returnNum = Math.pow(2, (Math.floor(num) + 1))
    return returnNum
  },
  // 自动生成卡片
  autoCreateCardNumber (dt) {
    // this.removeChildByTag(TAG_passSprit);
    for (let i = 0; i < GameConfig.CAED_LINES; i++) {
      for (let j = 0; j < GameConfig.CAED_LINES; j++) {
        this.cardArr[i][j].setVisible(true)
        this.cardArr[i][j].setNumber(this.randomCreateCardNumber())
        this.cardArr[i][j].CardShow()
        AnimLayerTool.moveButtonAnim(this.cardArr[i][j], true, AnimLayerTool.MoveButtonAnimType.up)
      }
    }
    GameData.setGamePassNum(GameData.getGamePassNum() + 1)
    GameConfig.GameScene.setPassNum()
    GameConfig.GameScene.progressBar.scaleX = 0
    GameUiTools.scheduleOnce(this, this.doCheck, 0.15)
  },
  setScore () {
    GameConfig.GameScene.setScore(this.score)
  },
  doCheck (dt) {
    this.saveMemoryInformation() // 保存临时信息
    // this.setScore(score);
    let isGameOver = true
    let isPassGame = true
    for (let y = 0; y < GameConfig.CAED_LINES; y++) {
      for (let x = 0; x < GameConfig.CAED_LINES; x++) {
        if (this.cardArr[x][y].isVisible()) {
          if (x < GameConfig.CAED_LINES - 1 && this.cardArr[x + 1][y].isVisible() &&
                        (this.cardArr[x + 1][y].getNumber() == this.cardArr[x][y].getNumber())) {
            isPassGame = false
            break
          }
          if (y < GameConfig.CAED_LINES - 1 && this.cardArr[x][y + 1].isVisible() &&
                        (this.cardArr[x][y + 1].getNumber() == this.cardArr[x][y].getNumber())) {
            isPassGame = false
            break
          }
        } else {
          isGameOver = false
        }
      }
    }
    if (isPassGame) {
      let deTime = 0
      for (let i = 0; i < GameConfig.CAED_LINES; i++) {
        for (let j = 0; j < GameConfig.CAED_LINES; j++) {
          if (this.cardArr[i][j].isVisible()) {
            if (deTime < 5) {
              AnimLayerTool.createPopStarAnim(this.cardArr[i][j], (++deTime) * 0.5)
            } else {
              AnimLayerTool.createPopStarAnim(this.cardArr[i][j], deTime * 0.5)
            }
          }
        }
      }
      if (deTime < 5) {
        this.score = this.score + (5 - deTime) * (5 - deTime) * 5
        AnimLayerTool.createScoreMoveAnim(this.cardArr[2][2], (5 - deTime) * (5 - deTime) * 5, false)// 加分动画
      }
      if (this.score < GameData.getGamePassScore()) {
        GameUiTools.scheduleOnce(this, this.gameOver, 1 + deTime * 0.5)
      } else {
        AnimLayerTool.createShowMessageBoxAward(this.getParent(), -1)
        // GameUiTools.scheduleOnce(this, this.autoCreateCardNumber, 1 + deTime * 0.5);
        GameUiTools.scheduleOnce(this, this.gamePass, 1 + deTime * 0.5)
      }
    }
  },

  gamePass () {
    GameUiTools.loadingLayer('panel/GamePass')
  },

  gameOver (dt)// 游戏结束
  {
    GameConfig.IS_GAME_OVER = true
    GameUiTools.loadingLayer('panel/GameOver')
    // cc.loader.loadRes("panel/GameOver", (err, prefab) => {
    //     let node = cc.instantiate(prefab);
    //     GameConfig.GameScene.node.addChild(node);
    // });
  },

  /**
     *撤销游戏
     */
  backGame () {
    if (GameData.scoreNum == 1) {
      for (let i = 0; i < GameConfig.CAED_LINES; i++) {
        for (let j = 0; j < GameConfig.CAED_LINES; j++) {
          this.cardArr[i][j].setNumber(GameData.scoreCard1[i][j])
          this.cardArr[i][j].CardShow()
          if (GameData.scoreCard3[i][j] == 1) {
            this.cardArr[i][j].setVisible(false)
          } else {
            this.cardArr[i][j].setVisible(true)
          }
        }
      }
      this.score = GameData.score1
      GameData.scoreNum = 0
      GameData.score0 = GameData.score1
      for (let i = 0; i < GameConfig.CAED_LINES; i++) {
        for (let j = 0; j < GameConfig.CAED_LINES; j++) {
          GameData.scoreCard2[i][j] = GameData.scoreCard3[i][j]
          GameData.scoreCard0[i][j] = GameData.scoreCard1[i][j]
        }
      }
      this.setScore()
    } else {
      GameTools.toastMessage(4)
    }
  },

  saveMemoryInformation () {
    if (GameData.scoreNum == 0) {
      GameData.scoreNum = 1
    }
    GameData.score1 = GameData.score0
    GameData.score0 = this.score
    for (let i = 0; i < GameConfig.CAED_LINES; i++) {
      for (let j = 0; j < GameConfig.CAED_LINES; j++) {
        GameData.scoreCard3[i][j] = GameData.scoreCard2[i][j]
        GameData.scoreCard2[i][j] = (this.cardArr[i][j].isVisible() ? 0 : 1)
        GameData.scoreCard1[i][j] = GameData.scoreCard0[i][j]
        GameData.scoreCard0[i][j] = this.cardArr[i][j].getNumber()
        GameData.bestNum = GameData.bestNum > this.cardArr[i][j].getNumber() ? GameData.bestNum : this.cardArr[i][j].getNumber()
      }
    }
  }
})

module.exports = GamePopStar
