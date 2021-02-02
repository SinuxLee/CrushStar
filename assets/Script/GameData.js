var GameConfig = require("GameConfig");
var GameTools = require("GameTools");
var GameData = {
    scoreCard0: [], //记录当前位置
    scoreCard1: [], //记录第一次位置
    scoreCard2: [], //记录第二次位置
    scoreCard3: [], //记录第三次位置
    score0: 0, // 记录当前得分
    score1: 0, // 记录第一次得分
    score2: 0,// 记录第二次得分
    score3: 0,// 记录第三次得分
    heightScore: 0, // 最高分
    bestNum: 2, //最大数字

    initData: function () {
        this.scoreCard0 = new Array();
        this.scoreCard1 = new Array();
        this.scoreCard2 = new Array();
        this.scoreCard3 = new Array();
        for (let i = 0; i < GameConfig.CAED_LINES; i++) {
            this.scoreCard0[i] = Array();
            this.scoreCard1[i] = Array();
            this.scoreCard2[i] = Array();
            this.scoreCard3[i] = Array();
        }
        this.score0 = 0; // 记录当前得分
        this.score1 = 0; // 记录第一次得分
        this.score2 = 0;// 记录第二次得分
        this.score3 = 0;// 记录第三次得分
        this.heightScore = 0; // 最高分
        this.bestNum = 2; //最大数字
    },
    getChallengeLevelNum: function () {
        return 7;
    },
    getChallengeLevelData: function (type) {
        if (type == 0) {
            return "1000100000001000000010001";
        }
        else if (type == 1) {
            return "1101110001000001000111011";
        }
        else if (type == 2) {
            return "1100100001001001000010011";
        }
        else if (type == 3) {
            return "0111000100000000010001110";
        }
        else if (type == 4) {
            return "0001100001100011000011000";
        }
        else if (type == 5) {
            return "0000000100011100010000000";
        }
        else if (type == 6) {
            return "1000101010000000101010001";
        }
    },
    getGameData: function (cardNum, cardX, cardY) {
        return GameTools.getItemByLocalStorage("gameData_" + GameConfig.MAIN_MENU_NUM + "_" + cardNum + "_" + cardX + "_" + cardY, 0);
    },

    setGameData: function (gameData, cardNum, cardX, cardY) {
        cc.sys.localStorage.setItem("gameData_" + GameConfig.MAIN_MENU_NUM + "_" + cardNum + "_" + cardX + "_" + cardY, gameData);
    },

    getGameScoreData: function (scoreNum) {
        return GameTools.getItemByLocalStorage("score_" + GameConfig.MAIN_MENU_NUM + "_" + scoreNum, 0);
    },

    setGameScoreData: function (score, scoreNum) {
        cc.sys.localStorage.setItem("score_" + GameConfig.MAIN_MENU_NUM + "_" + scoreNum, score);
    },

    isHaveGameData: function () {
        return GameTools.getItemByLocalStorage("isHaveGameData_" + GameConfig.MAIN_MENU_NUM, false);
    },

    setHaveGameData: function (isHaveGameData) {
        cc.sys.localStorage.setItem("isHaveGameData_" + GameConfig.MAIN_MENU_NUM, isHaveGameData);
    },

    getScoreNum: function () {
        return GameTools.getItemByLocalStorage("ScoreNum_" + GameConfig.MAIN_MENU_NUM, 0);
    },

    setScoreNum: function (ScoreNum) {
        cc.sys.localStorage.setItem("ScoreNum_" + GameConfig.MAIN_MENU_NUM, ScoreNum);
    },
    getHeightScore: function () {
        return GameTools.getItemByLocalStorage("BestScoreNum_" + GameConfig.MAIN_MENU_NUM, 0);
    },

    setHeightScore: function (heightScore) {
        cc.sys.localStorage.setItem("BestScoreNum_" + GameConfig.MAIN_MENU_NUM, heightScore);
    },
    getIsRecordHeightNum: function (heightNum) {
        return GameTools.getItemByLocalStorage("isRecordHeightNum_" + GameConfig.MAIN_MENU_NUM + "_" + heightNum, false);
    },

    setIsRecordHeightNum: function (heightNum, isRecord) {
        cc.sys.localStorage.setItem("isRecordHeightNum_" + GameConfig.MAIN_MENU_NUM + "_" + heightNum, isRecord);
    },

    setGameRewards: function (num) { //设置游戏奖励
        if ((num >= 1024) && !this.getIsRecordHeightNum(num)) {
            GameTools.playSimpleAudioEngine(3);
            this.setIsRecordHeightNum(num, true);
        }
        let gameIntergralNum = 0;
        switch (num) {
            case 128:
                if (GameConfig.mainMenu != GameConfig.MainMenu.MainMenuNumPop && GameConfig.mainMenu != GameConfig.MainMenu.MainMenuNumPopStar) {
                    gameIntergralNum = 4 - GameConfig.CAED_LINES;
                }
                break;
            case 256:
                if (GameConfig.mainMenu != GameConfig.MainMenu.MainMenuNumPop && GameConfig.mainMenu != GameConfig.MainMenu.MainMenuNumPopStar) {
                    gameIntergralNum = 5 - GameConfig.CAED_LINES;
                }
                else {
                    gameIntergralNum = 1;
                }
                break;
            case 512:
                if (GameConfig.mainMenu != GameConfig.MainMenu.MainMenuNumPop && GameConfig.mainMenu != GameConfig.MainMenu.MainMenuNumPopStar) {
                    gameIntergralNum = 6 - GameConfig.CAED_LINES;
                }
                else {
                    gameIntergralNum = 2;
                }
                break;
            case 1024:
                if (GameConfig.mainMenu != GameConfig.MainMenu.MainMenuNumPop && GameConfig.mainMenu != GameConfig.MainMenu.MainMenuNumPopStar) {
                    gameIntergralNum = 7 - GameConfig.CAED_LINES;
                }
                else {
                    gameIntergralNum = 3;
                }
                break;
            case 2048:
                if (GameConfig.mainMenu != GameConfig.MainMenu.MainMenuNumPop && GameConfig.mainMenu != GameConfig.MainMenu.MainMenuNumPopStar) {
                    gameIntergralNum = 8 - GameConfig.CAED_LINES;
                }
                else {
                    gameIntergralNum = 4;
                }
                break;
            case 4096:
                if (GameConfig.mainMenu != GameConfig.MainMenu.MainMenuNumPop && GameConfig.mainMenu != GameConfig.MainMenu.MainMenuNumPopStar) {
                    gameIntergralNum = 9 - GameConfig.CAED_LINES;
                }
                else {
                    gameIntergralNum = 5;
                }
                break;
            case 8192:
                if (GameConfig.mainMenu != GameConfig.MainMenu.MainMenuNumPop && GameConfig.mainMenu != GameConfig.MainMenu.MainMenuNumPopStar) {
                    gameIntergralNum = 10 - GameConfig.CAED_LINES;
                }
                else {
                    gameIntergralNum = 6;
                }
                break;
            case 16384:
                if (GameConfig.mainMenu != GameConfig.MainMenu.MainMenuNumPop && GameConfig.mainMenu != GameConfig.MainMenu.MainMenuNumPopStar) {
                    gameIntergralNum = 11 - GameConfig.CAED_LINES;
                }
                else {
                    gameIntergralNum = 7;
                }
                break;
            case 65536:
                if (GameConfig.mainMenu != GameConfig.MainMenu.MainMenuNumPop && GameConfig.mainMenu != GameConfig.MainMenu.MainMenuNumPopStar) {
                    gameIntergralNum = 12 - GameConfig.CAED_LINES;
                }
                else {
                    gameIntergralNum = 8;
                }
                break;
            case 131072:
                if (GameConfig.mainMenu != GameConfig.MainMenu.MainMenuNumPop && GameConfig.mainMenu != GameConfig.MainMenu.MainMenuNumPopStar) {
                    gameIntergralNum = 13 - GameConfig.CAED_LINES;
                }
                else {
                    gameIntergralNum = 9;
                }
                break;
            default:
                break;
        }
        if (gameIntergralNum > 0) {
            this.setGameIntegral(gameIntergralNum);
        }
        return gameIntergralNum;
    },

    getGamePropNumber(propType) {
        return GameTools.getItemByLocalStorage("gameProp" + propType, 0);
    },

    setGamePropNumber(propType, number) {
        GameTools.setItemByLocalStorage("gameProp" + propType, GameTools.getItemByLocalStorage("gameProp" + propType, 0) + number);
    },

    getGameIntegral: function () //获取积分
    {
        return GameTools.getGameIntegral();
    },
    setGameIntegral: function (letrgral) {
        GameTools.setGameIntegral(this.getGameIntegral() + letrgral);
    },
    isGameHelp: function () { //判断游戏是否进行了帮助
        return GameTools.getItemByLocalStorage("isGameHelp" + GameConfig.mainMenu, false);
    },
    setGameHelp: function (gameHelp) {
        cc.sys.localStorage.setItem("isGameHelp" + GameConfig.mainMenu, gameHelp);
    },
    getGamePassNum: function () {
        return GameTools.getItemByLocalStorage("passNum" + GameConfig.mainMenu, 1);
    },
    setGamePassNum: function (passNum) {
        cc.sys.localStorage.setItem("passNum" + GameConfig.mainMenu, passNum);
    },
    getGamePassScore: function () {
        let passNum = GameData.getGamePassNum();
        return (1000 + (passNum - 1) * 1500 + (passNum - 1) * (passNum - 1) * 500);
    },

    loadGameData: function (isLoad) {
        if (isLoad) {
            for (let i = 0; i < GameConfig.CAED_LINES; i++) {
                for (let j = 0; j < GameConfig.CAED_LINES; j++) {
                    this.scoreCard0[i][j] = this.getGameData(0, i, j);
                    this.bestNum = this.bestNum > this.scoreCard0[i][j] ? this.bestNum : this.scoreCard0[i][j];
                    if (this.checkGameData(this.scoreCard0[i][j])) {
                        return true;
                    }
                    this.scoreCard1[i][j] = this.getGameData(1, i, j);
                    this.scoreCard2[i][j] = this.getGameData(2, i, j);
                    this.scoreCard3[i][j] = this.getGameData(3, i, j);
                }
            }
            this.scoreNum = this.getScoreNum();
            this.score0 = this.getGameScoreData(0);
            this.score1 = this.getGameScoreData(1);
            this.score2 = this.getGameScoreData(2);
            this.score3 = this.getGameScoreData(3);
            GameConfig.IS_GAME_WIN = (this.bestNum >= 2048 ? true : false);
        } else {
            this.setHeightScore(this.heightScore);
            for (let i = 0; i < GameConfig.CAED_LINES; i++) {
                for (let j = 0; j < GameConfig.CAED_LINES; j++) {
                    this.setGameData(this.scoreCard0[i][j], 0, i, j);
                    this.setGameData(this.scoreCard1[i][j], 1, i, j);
                    this.setGameData(this.scoreCard2[i][j], 2, i, j);
                    this.setGameData(this.scoreCard3[i][j], 3, i, j);
                }
            }
            this.setScoreNum(this.scoreNum);
            this.setGameScoreData(this.score0, 0);
            this.setGameScoreData(this.score1, 1);
            this.setGameScoreData(this.score2, 2);
            this.setGameScoreData(this.score3, 3);
            this.setHaveGameData(true);
        }
        return false;
    },
    checkGameData: function (gameData) {
        if (gameData == 0) {
            return false;
        }
        let num = 1;
        for (let i = 1; i < 25; i++) {
            if (gameData == num) {
                return false;
            }
            num *= 2;
        }
        if (gameData == -1) {
            return false;
        }
        return true;
    },
};

module.exports = GameData;