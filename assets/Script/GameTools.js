const GameConfig = require('GameConfig')
var GameTools = {
  love2048FrameCache: null,
  numberLabelAtlas: null,
  backMusicIsPlay: null,
  playSimpleAudioEngine: function (engineType) {
    if (GameConfig.IS_GAME_MUSIC) {
      switch (engineType) {
        case 0:
          cc.audioEngine.play(cc.url.raw('resources/sounds/pop_star.mp3'), false, 0.5)
          break
        case 1:
          cc.audioEngine.play(cc.url.raw('resources/sounds/select.mp3'), false, 0.5)
          break
        case 2:
          cc.audioEngine.play(cc.url.raw('resources/sounds/landing.mp3'), false, 0.5)
          break
        case 3:
          cc.audioEngine.play(cc.url.raw('resources/sounds/cheers.mp3'), false, 0.5)
          break
        default:
          break
      }
    }
  },
  playBackgroundMusic: function () {
    if (GameConfig.IS_GAME_MUSIC) {
      if (GameTools.backMusicIsPlay == null) {
        GameTools.backMusicIsPlay = cc.audioEngine.play(cc.url.raw('resources/sounds/backMusic.mp3'), true, 0.5)
      }
    }
  },
  stopBackgroundMusic: function () {
    if (GameTools.backMusicIsPlay != null) {
      cc.audioEngine.stop(GameTools.backMusicIsPlay)
      GameTools.backMusicIsPlay = null
    }
  },
  getItemByLocalStorage: function (key, value) {
    const values = cc.sys.localStorage.getItem(key)
    if (values === undefined || values === null || values === '') {
      cc.sys.localStorage.setItem(key, value)
      return value
    }
    if (typeof value === 'boolean') {
      if (typeof values === 'boolean') {
        return values
      }
      return values == 'true'
    } else if (typeof value === 'number') {
      return Number(values)
    }
    return values
  },
  setItemByLocalStorage: function (key, value) {
    cc.sys.localStorage.setItem(key, value)
  },
  toastMessage (toastType) {
    cc.loader.loadRes('panel/ShowMessage', (err, prefab) => {
      if (!err) {
        const node = cc.instantiate(prefab)
        node.getComponent(cc.Component).toastType = toastType
        cc.director.getScene().children[0].addChild(node)
        // cc.director.getScene().getChildByName('Canvas').addChild(node);
      }
    })
  },
  sharePicture (pictureName) {
    let titleStr = '来跟我一起挑战浪漫2048吧。'
    if (pictureName == 'shareTicket') {
      titleStr = '看看你在群里排第几？来和我挑战浪漫2048吧。'
    } else if (pictureName == 'LotteryLayer') { // 抽奖页面分享
      titleStr = '浪漫2048福利大放送！快进来抽奖吧！'
    } else if (pictureName != undefined && pictureName != null) {
      titleStr = '我得了' + pictureName + '分,' + titleStr
    }
    if (cc.sys.platform === cc.sys.WECHAT_GAME) {
      window.wx.shareAppMessage({
        title: titleStr,
        query: 'x=' + GameConfig.MAIN_MENU_NUM,
        imageUrl: canvas.toTempFilePathSync({
          destWidth: 500,
          destHeight: 400
        }),
        success: (res) => {
          if (res.shareTickets != undefined && res.shareTickets.length > 0) {
            if (pictureName == 'shareTicket') {
              window.wx.postMessage({
                messageType: 5,
                MAIN_MENU_NUM: GameConfig.MAIN_MENU_NUM == -1000 ? 1 : GameConfig.MAIN_MENU_NUM,
                shareTicket: res.shareTickets[0]
              })
            }
          }
        }
      })
    } else {
      cc.log('执行了截图' + titleStr)
    }
  },
  getGameIntegral () { // 获取积分
    return this.getItemByLocalStorage('GameIntegral', 0)
  },
  setGameIntegral (intrgral) { // 设置积分
    cc.sys.localStorage.setItem('GameIntegral', intrgral)
  },
  commentGame () { // 评论
    if (cc.sys.platform === cc.sys.WECHAT_GAME) {
      window.wx.openCustomerServiceConversation({})
    } else {
      this.toastMessage(1)
      cc.log('执行了评论')
    }
  },
  checkFirstLoginGame () { // 检查是否首次登录
    const loginDate = Math.floor((new Date().getTime() - new Date(2018, 3, 18, 0, 0, 0, 0).getTime()) / (1000 * 60 * 60 * 24))
    if (loginDate > this.getItemByLocalStorage('FirstEnterGameDate', 0)) {
      cc.sys.localStorage.setItem('FirstEnterGameDate', loginDate)
      setTimeout(() => {
        this.setGameIntegral(this.getGameIntegral() + 100)
        this.toastMessage(9)
      }, 1500)
    }
  },

  setCardBackPath (num)// 设置卡片背景路径
  {
    // GameConfig.setCardBackPath(num, "card/nl2048.png");
  },

  userLogin () { // 用户登录
  },

  getRankData (shareTicket) { // 获取排行榜
    cc.loader.loadRes('panel/RankingListView', (err, prefab) => {
      if (!err) {
        const node = cc.instantiate(prefab)
        if (shareTicket != undefined) {
          node.getComponent(cc.Component).shareTicket = shareTicket
        }
        // node.setPosition(cc.p(0, 0));
        cc.director.getScene().children[0].addChild(node)
      }
    })
  },
  removeRankData () { // 移除排行榜数据
    if (cc.sys.platform === cc.sys.WECHAT_GAME) {
      window.wx.postMessage({
        messageType: 0
      })
    } else {
      cc.log('移除排行榜数据。')
    }
  },
  submitScore (score) { // 提交得分
    if (cc.sys.platform === cc.sys.WECHAT_GAME) {
      window.wx.postMessage({
        messageType: 3,
        MAIN_MENU_NUM: GameConfig.MAIN_MENU_NUM,
        score
      })
    } else {
      cc.log('提交得分:' + GameConfig.MAIN_MENU_NUM + ' : ' + score)
    }
  },

  getSelectAddNum (num) // 获取叠加数
  {
    if (num < 4) {
      num = 2
    } else if (num < 8) {
      num = 4
    } else if (num < 16) {
      num = 8
    } else if (num < 32) {
      num = 16
    } else if (num < 64) {
      num = 32
    } else if (num < 128) {
      num = 64
    } else if (num < 256) {
      num = 128
    } else if (num < 512) {
      num = 256
    } else if (num < 1024) {
      num = 512
    } else if (num < 2048) {
      num = 1024
    } else if (num < 4096) {
      num = 2048
    } else if (num < 8192) {
      num = 4096
    } else if (num < 16384) {
      num = 8192
    } else if (num < 32768) {
      num = 16384
    } else if (num < 65536) {
      num = 32768
    } else if (num < 131072) {
      num = 65536
    } else {
      num = 131072
    }
    return num
  }
}

module.exports = GameTools
