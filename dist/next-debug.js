(function () {

  var global = global || this || self || window;
  var nx = global.nx || require('next-js-core2');

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
      /**
       * @thanks to:
       * https://stackoverflow.com/questions/18093782/javascript-or-jquery-show-multiple-variables-in-one-alert
       */
      alert: function(){
        if( typeof alert !== 'undefined' ){
            var argsArray = Array.prototype.slice.call(arguments);
            var i, result = "";
            var length = argsArray.length;
            for (i = 0; i < length; i++) {
              result += this.stringify( argsArray[i] );
              if (i < (length - 1)) result += ',  ';
            }
            alert(result);
        }
      }
    }
  });


  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxDebug;
  }

}());
