var acMod = angular.module('ang-commfn', []);

/*
 *
 *  header栏目- 是否启用
 *  返回按钮
 *
 */
acMod.directive('headerBack', function() {
  return {
    link: function(scope, element, attrs) {
        if(vComm.is_weixin() || vComm.is_zhifubao()){
            $(".header").remove();
        } else {
            $(".icon_back")[0].addEventListener("click",function(e){
                history.back();
            },false);
        }
    }
  }
});

/*
 *
 *  img图片加载不成功，加载默认图片
 *
 */
acMod.directive('errSrc', function() {
      return {
        link: function(scope, element, attrs) {
          element.bind('error', function() {
            if (attrs.src != attrs.errSrc) {
              attrs.$set('src', attrs.errSrc);
            }
          });
        }
      }
});