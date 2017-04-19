/* 判断滑动事件 */
//返回角度
function GetSlideAngle(dx, dy) {
    return Math.atan2(dy, dx) * 180 / Math.PI;
}

//根据起点和终点返回方向 1：下滑，2：上滑，3：向左，4：向右,0：未滑动
function GetSlideDirection(startX, startY, endX, endY) {
    var dy = startY - endY;
    var dx = endX - startX;
    var result = 0;

    //如果滑动距离太短
    if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
        return result;
    }

    var angle = GetSlideAngle(dx, dy);
    if (angle >= -45 && angle < 45) {
        result = 4;
    } else if (angle >= 45 && angle < 135) {
        result = 1;
    } else if (angle >= -135 && angle < -45) {
        result = 2;
    } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
        result = 3;
    }

    return result;
}

var vComm = {
    stopTouchFn : function(e){
        e.preventDefault();
    },
    stopTouch : function(){
        document.addEventListener('touchmove', this.stopTouchFn, false);
    },
    allowTouch : function(){
        document.removeEventListener('touchmove', this.stopTouchFn, false);
    },
    /*--获取url参数值函数**/
    getUrlPara :  function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    },
    /*--合并对象函数**/
    extend : function (optOld, optNew) {
        for (var name in optNew) {
            if (optNew.hasOwnProperty(name)) {
                optOld[name] = optNew[name];
            }
        }
    },
    /*--数组去重函数**/
    unique : function(arr) {
      var ret = []
      var hash = {}

      for (var i = 0; i < arr.length; i++) {
        var item = arr[i]
        var key = typeof(item) + item
        if (hash[key] !== 1) {
          ret.push(item)
          hash[key] = 1
        }
      }
      return ret;
    },
    /*--密码明文显示--*/
    showPWD : function(obj){
        obj.each(function () {
            $(this).unbind("click").on("click", function () {
                if ($(this).parent().find("input").attr("type") === "text") {
                    $(this).parent().find("input").attr("type", "password");
                    $(this).hide();
                    $(this).prev().show();
                } else {
                    $(this).parent().find("input").attr("type", "text");
                    $(this).hide();
                    $(this).next().show();
                }
            });
        });
    },
    //判断是否微信
    is_weixin : function(){
        var ua = navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i)=="micromessenger") {
            return true;
        } else {
            return false;
        }
    },
    //判断是否支付宝
    is_zhifubao : function(){
        if(navigator.userAgent.indexOf("AlipayClient")===-1){
            return false;
        } else {
            return true;
        }
    },
    //判断是否ios系统
    is_ios : function(){
        var uAgent = window.navigator.userAgent;
        
        if(uAgent.match(/iphone/i) == "iphone"){
            return true;
        } else {
            return false;
        }
    },
    //判断是否android系统
    is_android : function(){
        var uAgent = window.navigator.userAgent;
        
        if(uAgent.match(/android/i) == "android"){
            return true;
        } else {
            return false;
        }
    },
    //图片加载失败
    imgError : function(imgSrc, e){
        e.target.src=imgSrc;
    },
    
    /*--密码明文显示**/
    showPWD : function(){
        $(".login-icon-eye").each(function () {
            $(this).unbind("click").on("click", function () {
                if ($(this).parent().find("input").attr("type") === "text") {
                    $(this).parent().find("input").attr("type", "password");
                    $(this).hide();
                    $(this).prev().show();
                } else {
                    $(this).parent().find("input").attr("type", "text");
                    $(this).hide();
                    $(this).next().show();
                }
            });
        });
    },
    /* 加载更多插件-提示文本 */
    endScrollRefresh : function(flag){
        $(".comm-load-more").remove();
        if (flag) {
            $("#scroller").append('<div class="comm-load-more"><span class="loadingText"></span>正在努力的加载...</div>');
        } else {
            $("#scroller").append('<div class="comm-load-more">没有更多数据了</div>');
            setTimeout(function(){
                $(".comm-load-more").remove();
            },800);
        }
    },
    refresh : function(){
        $(".comm-load-more").remove();
    },
    /*滑动触摸屏 - 判断操作类型*/
    isSlideTouch : function(obj, callback) {
        var startX, startY;

        obj.on("touchstart", function (ev) {
            var ev = ev || window.event;
            ev.preventDefault();
            startX = ev.touches[0].pageX;
            startY = ev.touches[0].pageY;
        });
        obj.on("touchend", function (ev) {
            var ev = ev || window.event,
                endX, endY;

            endX = ev.changedTouches[0].pageX;
            endY = ev.changedTouches[0].pageY;

            var direction = GetSlideDirection(startX, startY, endX, endY);
            switch (direction) {
                case 0:
                    //没滑动
                    if (callback && typeof callback == 'function') {
                        callback.call(obj, "d0");
                    }
                    break;
                case 1:
                    //下滑
                    if (callback && typeof callback == 'function') {
                        callback.call(obj, "d1");
                    }
                    break;
                case 2:
                    //上滑
                    if (callback && typeof callback == 'function') {
                        callback.call(obj, "d2");
                    }
                    break;
                case 3: //右滑
                    break;
                case 4: //左滑
                    if (callback && typeof callback == 'function') {
                        callback.call(obj, "d4");
                    }
                    break;
                default:
                    break;
            }
        });
    }
}