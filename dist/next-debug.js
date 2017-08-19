(function () {

  var global = global || this || self || window;
  var nx = global.nx || require('next-js-core2');
  var EMPTY_ARR = [];
  var ALERT_START = '=== ALERT START === \n';
  var ALERT_END = '=== ALERT  END === \n';
  var ENTER = '\n';

  //import library:
  nx.is = nx.is || require('next-is');
  nx.type = nx.type || require('next-type');
  nx.escape = nx.escape || require('next-escape');


  var NxDebug = nx.declare('nx.Debug', {
    statics:{
      stringify: function(inObj){
        var arr;
        if (inObj == null) {
          return inObj + '';
        }
        if (typeof inObj != 'string' && inObj.toJSON) { //JK: IE8的字符串的toJSON有问题，丢了引号
          return inObj.toJSON();
        }
        var type = nx.type(inObj);
        switch (type) {
          case 'string':
            return '"' + nx.escape(inObj) + '"';
          case 'number':
            var ret = inObj.toString();
            return /N/.test(ret) ? 'null' : ret;
          case 'boolean':
          case 'function':
            return inObj.toString();
          case 'date':
            return 'new Date(' + inObj.getTime() + ')';
          case 'array':
            for (var arr = [], i = 0; i < inObj.length; i++) {
              arr[i] = this.stringify(inObj[i]);
            }
            return '[' + arr.join(',') + ']';
          case 'object':
            if (nx.isPlainObject(inObj)) {
              arr = [];
              for (i in inObj) {
                arr.push('"' + nx.escape(i) + '":' + this.stringify(inObj[i]));
              }
              return '{' + arr.join(',') + '}';
            }
        }
        return 'null'; //无法序列化的，返回null;
      },
      alert: function(){
        if( typeof alert !== 'undefined' ){
          var args = EMPTY_ARR.slice(arguments);
          alert(ALERT_START + args.join(ENTER) + ALERT_END);
        }
      }
    }
  });


  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxDebug;
  }

}());
