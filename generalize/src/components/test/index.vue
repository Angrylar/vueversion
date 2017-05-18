<template>
   <div id='turnplate' class="turnplate clear">
        <!--<p>{{msg}}</p>-->
        <div class="head-background">
            <div class="head-element"></div>
            <div class="head-timer"></div>
            <div class="head-star"></div>
            <div class="head-word"></div>
            <div class="luna-back"></div>
            <div class="free-login-btn" @click='openLoginWin()' v-show='alreadyLogin'>
                <p>登录/注册</p>
            </div>
            <div class="free-logined-info" v-show='!alreadyLogin'>
                <p @click='showUserInfo()'>
                    {{ueserInfoMsg}}
                    <span class="triangle-down"></span>
                </p>
                <div class="logined-msg-list" v-show='userInfoMore'>
                    <ul>
                        <li @click='userCenter()'>中奖信息</li>
                        <li @click='logout()'>退出</li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="luna-content">

            <div class="residue-chance">
                <span class="residue-times">{{residueTime}}</span>
            </div>

            <div class="turnplate-content">
                <div class="turnplate-disk"></div>
                <div class="pointer" @click='rolling()'></div>
                <div class="turnplate-bottom">

                </div>
            </div>


            <div class="download-share-bar clear">
                <div class="download-btn" @click='downloadAppStore()'>
                    <p>点击下载唯镜APP</p>
                </div>
                <div class="-mob-share-ui-button -mob-share-open share-btn" @click='shareThis()'></div>
            </div>

            <div class="name-list-outer">
                <h3>中奖名单</h3>
                <div class="name-list-scroller">
                    <ul class="name-list">
                        <li v-for='info in nameListArr'>
                            <span class="phone-num">{{info.mobile}}</span>
                            <span class="awards-name">{{info.awardMsg}}</span>
                            <span class="happen-time">{{info.time}}</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="active-detail">
                <h3>活动规则</h3>
                <ul>
                    <li>1.活动期间，首次登录唯见账号即可获取一次抽奖机会。</li>
                    <li>2.活动期间，首次下载并安装唯镜APP即可获取一次抽奖机会。</li>
                    <li>3.活动期间，每人每日分享活动页面当日即可获得一次抽奖机会。</li>
                    <li>4.活动期间，当日获得机会不可累积次日清零。</li>
                </ul>
            </div>

            <div class="active-detail bottom6rem">
                <h3>活动说明</h3>
                <ul>
                    <li>1.本次抽奖活动最终解释权归唯见科技所有。</li>
                    <li>2.中奖奖品可凭个人中心的中奖消息直接向活动现场人员领取。</li>
                    <li>3.礼品数量有限，先到先得。</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
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

console.log(this.$main)

// this.default.methods.winInit();
// this.default.methods.getToken();

</script>
