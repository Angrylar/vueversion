<style lang="less">
    @import url('./turnplate.less');
</style>
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

        <!--<div class="login-alert-win" v-show='winShow'>
            <div class="close-win" @click='winInit()'></div>
            <div class="login-content" v-show='loginShow'>
                <form name="login">
                    <div class="input-border-line">
                        <div class="icon-position icon-accounter"></div>
                        <input class="noborder-input" type="tel" placeholder="请输入手机号" maxlength="11" v-model='loginAccountNum' />
                    </div class="input-border-line">
                    <div class="input-border-line">
                        <div class="icon-position icon-password"></div>
                        <input class="noborder-input" type="password" placeholder="请输入密码" v-model='loginPassword' maxlength="20" />
                    </div>
                    <div class="clear tips">
                        <span class="float-left register">没有账号？点击<span class="register-enter" @click='openRegisterWin()'>注册</span></span>
                        <span class="float-right forget-password-btn" @click='openForgetPwdWin()'>忘记密码</span>
                    </div>
                    <div class="login-btn-bar">
                        <input class="btn login-btn" type="button" value="登录" @click='userLogin()' />
                    </div>
                </form>
            </div>
            <div class="register-content" v-show='registerShow'>
                <form name="register">
                    <div class="input-border-line">
                        <div class="icon-position icon-accounter"></div>
                        <input class="noborder-input" type="tel" placeholder="请输入手机号" maxlength="11" v-model='registerAccount' />
                    </div>
                    <div class="input-border-line">
                        <div class="icon-position icon-checknum"></div>
                        <input class="noborder-input" type="text" placeholder="请输入验证码" maxlength="6" v-model='registerVcode' />
                        <span class="get-check-num-btn" ng-class='grayerShow' @click='registerGetVcode(registerAccount)'>{{registerCountDown}}</span>
                    </div>
                    <div class="input-border-line">
                        <div class="icon-position icon-password"></div>
                        <input class="noborder-input" type="password" placeholder="请输入密码" v-model='registerPwd' maxlength="20" />
                    </div>
                    <div class="clear tips">
                        <span class="float-left register">已有账号？点击<span class="register-enter" @click='openLoginWin()'>登录</span></span>
                        <span class="float-right forget-password-btn" @click='openForgetPwdWin()'>忘记密码</span>
                    </div>
                    <div class="login-btn-bar">
                        <input class="btn login-btn" type="button" value="注册" @click='userRegister()' />
                    </div>
                </form>
            </div>
            <div class="forget-password-content" v-show='forgetPwdShow'>
                <form name="forgetPwd">
                    <div class="input-border-line">
                        <div class="icon-position icon-accounter"></div>
                        <input class="noborder-input" type="tel" placeholder="请输入手机号" maxlength="11" v-model='forgetPwdAccount' />
                    </div>
                    <div class="input-border-line">
                        <div class="icon-position icon-checknum"></div>
                        <input class="noborder-input" type="text" placeholder="请输入验证码" maxlength="6" v-model='forgetPwdVcode' />
                        <span class="get-check-num-btn" ng-class='grayerShow' @click='forgetPwdGetVcode(forgetPwdAccount)'>{{resetPwdCountDown}}</span>
                    </div>
                    <div class="input-border-line">
                        <div class="icon-position icon-password"></div>
                        <input class="noborder-input" type="password" placeholder="请输入密码" v-model='forgetPwdPassword' maxlength="20" />
                    </div>
                    <div class="clear tips">
                        <div class="float-left register">没有账号？点击<span class="register-enter" @click='openRegisterWin()'>注册</span></div>
                        <div class="float-right forget-password-btn">已有账号？点击<span class="register-enter" @click='openLoginWin()'>登录</span></div>
                    </div>
                    <div class="login-btn-bar">
                        <input class="btn login-btn" type="button" value="修改密码" @click='userForgetPassword()' />
                    </div>
                </form>
            </div>
        </div>
        
        <div class="jackpot-msg" v-show='jackpotShow'>
            <div class="close-jackpot-msg" @click='closeJackpotWin()'></div>
            <div class="jackpot-info">
                <p>{{jackpotAlertMsg}}</p>
            </div>
            <div class="jackpot-img"></div>
            <div class="conform-get-btn" ng-click='receive()'></div>
        </div>
        <div class="cover" ng-show='coverShow' ng-click='winInit()'>
            
        </div>
        <div class="wx-alert-img" ng-show='shareAlertInfo' ng-click='hideShareAlert()'>
            
        </div>
        <div class="wx-download-img" ng-show='downloadAlertInfo' ng-click='hideDownloadAlert()'>
            
        </div>
        <div class="errAlertWin" ng-show='errAlertShow'>
            <p class="close-erralert-win" ng-click='iKnowIt()'></p>
            <h2>提示</h2>
            <div>{{errAlertInfo}}</div>
            <span ng-click='iKnowIt()'>知道了</span>
        </div>
        <div class="cover" ng-show='errCoverShow' ng-click=''></div>-->
    </div>
</template>

<!--<script src="./turnplate.js"></script>-->

