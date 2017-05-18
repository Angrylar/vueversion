// var ua = navigator.userAgent.toLowerCase();
// var counter;
export default {
    name: 'turnplate',
    data () {
        return {
            alreadyLogin: true,
            residueTime: 0,
            userInfoMore: false,
            ueserInfoMsg: '',
            nameListArr: [],
            loginKey: undefined
        }
    },
    methods: {
        start() {
            console.log('mss');
        },
        isWXBrowser() {
            if (ua.match(/MicroMessenger/i) == "micromessenger") {
                return true;
            } else {
                console.log('123')
                return false;
            }
        },
        //		reset input value
        resetInputVal() {
            this.loginAccountNum = '';
            this.loginPassword = '';

            this.registerAccount = '';
            this.registerVcode = '';
            this.registerPwd = '';

            this.forgetPwdAccount = '';
            this.forgetPwdVcode = '';
            this.forgetPwdPassword = '';

            clearInterval(counter);
            this.registerCountDown = '验证码';
            this.resetPwdCountDown = '验证码';
            this.sendding = false;
        },
        //		弹窗等初始化
        winInit() {
            this.winShow = false;
            this.loginShow = false;
            this.registerShow = false;
            this.forgetPwdShow = false;
            this.jackpotShow = false;
            this.coverShow = false;
            this.shareAlertInfo = false;
            this.downloadAlertInfo = false;
            this.errAlertShow = false;
            this.resetInputVal();
        },

        //		打开登录窗口
        openLoginWin() {
            this.winShow = true;
            this.loginShow = true;
            this.registerShow = false;
            this.forgetPwdShow = false;
            this.jackpotShow = false;
            this.coverShow = true;
            this.shareAlertInfo = false;
            this.downloadAlertInfo = false;
            this.errAlertShow = false;
            this.resetInputVal();
        },
        //		打开注册窗口
        openRegisterWin() {
            this.winShow = true;
            this.loginShow = false;
            this.registerShow = true;
            this.forgetPwdShow = false;
            this.jackpotShow = false;
            this.coverShow = true;
            this.shareAlertInfo = false;
            this.downloadAlertInfo = false;
            this.errAlertShow = false;
            this.resetInputVal();
        },
        //		打开忘记密码窗口
        openForgetPwdWin() {
            this.winShow = true;
            this.loginShow = false;
            this.registerShow = false;
            this.forgetPwdShow = true;
            this.jackpotShow = false;
            this.coverShow = true;
            this.shareAlertInfo = false;
            this.downloadAlertInfo = false;
            this.errAlertShow = false;
            this.resetInputVal();
        },
        //		打开中奖弹窗
        openJackpotWin() {
            this.winShow = false;
            this.loginShow = false;
            this.registerShow = false;
            this.forgetPwdShow = false;
            this.jackpotShow = true;
            this.coverShow = true;
            this.shareAlertInfo = false;
            this.downloadAlertInfo = false;
            this.errAlertShow = false;
        },
        //		弹出微信页面分享方法提示
        openShareAlertInfo() {
            this.winShow = false;
            this.loginShow = false;
            this.registerShow = false;
            this.forgetPwdShow = false;
            this.jackpotShow = false;
            this.coverShow = true;
            this.shareAlertInfo = true;
            this.downloadAlertInfo = false;
            this.errAlertShow = false;
        },

        //		弹出微信下载方法提示
        openDownloadAlertInfo() {
            this.winShow = false;
            this.loginShow = false;
            this.registerShow = false;
            this.forgetPwdShow = false;
            this.jackpotShow = false;
            this.coverShow = true;
            this.shareAlertInfo = false;
            this.downloadAlertInfo = true;
            this.errAlertShow = false;
        },

        //弹出错误提示窗口
        openErrAlertWinInfo() {
            this.errCoverShow = true;
            this.errAlertShow = true;
        },

        //		隐藏错误提示窗口
        hideErrAlertWinInfo() {
            this.errCoverShow = false;
            this.errAlertShow = false;
        },

        //		关闭中奖信息弹窗
        closeJackpotWin() {
            this.winInit();
        },

        //		获取微信签名
        wxCode() {
            if (this.loginKey == undefined) {
                return;
            } else {
                var href = location.href.split('#')[0];
                var formData = {
                    loginKey: this.loginKey,
                    url: href
                }

                generalizeServer.shareofjssdk(formData, function (resp) {
                    if (resp.data.code == 'SUCCESS') {
                        this.$appId = resp.data.data.appId;
                        this.$timestamp = resp.data.data.timestamp;
                        this.$nonceStr = resp.data.data.nonceStr;
                        this.$signature = resp.data.data.signature;
                        this.shareNow();
                    } else if (resp.data.code == 'NOLOGINED') {
                        this.loginKey = undefined;
                        delCookie('vrseenActiveLK');
                        this.alreadyLogin = true;
                    }
                })
            }
        },

        getToken() {
            console.log(this)
            // server.getToken('', function (resp) {
            //     if (resp.data.code == 'SUCCESS') {
            //         console.log(resp.data.data.TokenKey);
            //         console.log(resp.data.data.TokenValue)
            //     } else {
            //         console.log(resp.data.code)
            //     }
            // }, function (err) {
            //     console.log(`err, ${err}`)
            // });
        }
    }
}

// console.log(this)

// this.default.methods.winInit();
// this.default.methods.getToken();
