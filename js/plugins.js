// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function noop() {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.
// フォームの要素を無効化したり有効化したりする機能追加
jQuery.fn.extend({
  checked:function(){
    return jQuery(this).attr('checked');
  },
  disabled:function(value){
    // 引数がないとき、disabledのときtrueを返す
    if(value===undefined) return $(this).attr("disabled")!==undefined;

    if(value){
      // 引数がtrueのとき、無効化する
      $(this).attr("disabled","disabled");
    } else {
      // 引数がfalseのとき、有効化する
      $(this).removeAttr("disabled");
    }
  }
});


var _ua = (function(){
return {
  ltIE6:typeof window.addEventListener == "undefined" && typeof document.documentElement.style.maxHeight == "undefined",
  ltIE7:typeof window.addEventListener == "undefined" && typeof document.querySelectorAll == "undefined",
  ltIE8:typeof window.addEventListener == "undefined" && typeof document.getElementsByClassName == "undefined",
  IE:document.uniqueID,
  Firefox:window.sidebar,
  Opera:window.opera,
  Webkit:!document.uniqueID && !window.opera && !window.sidebar && window.localStorage && typeof window.orientation == "undefined",
  Mobile:typeof window.orientation != "undefined"
}
})();

