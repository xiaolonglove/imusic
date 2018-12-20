let count = 0;

export default function jsonp(option) {
  var opts = {
    url: null,
    name: null,  // 传递的回调名
    param: "callback", // 传递的回调函数名称
    timeout: 6000,
    params: {},
  };
  opts = Object.assign({}, opts, option)

  function originJsonp(opts, fn){
    if ('function' == typeof opts) {
      fn = opts;
      opts = {};
    }
    var url =opts.url;
    var name = opts.name || '_jsonp'+count++;
    var callback =  opts.param || "callback";
    var params = opts.params || {};
    var timeout = (null != opts.timeout) ? parseInt(opts.timeout) : 60000;
    var target = document.getElementsByTagName('script')[0] || document.head;
    var script;
    var timer;

    if (typeof timeout === "number" &&  timeout != NaN) {
      timer = setTimeout(function(){
        cleanup();
        if (fn) fn(new Error('Timeout'));
      }, timeout);
    }

    //清除添加到dom的jsop
    function cleanup(){
      if (script.parentNode) script.parentNode.removeChild(script);
      window[name] = function () {};
      if (timer) clearTimeout(timer);
    }

    function cancel(){
      if (window[name]) {
        cleanup();
      }
    }

    window[name] = function(data){
      cleanup();
      if (fn) fn(null, data);
    };

    url += (~url.indexOf('?') ? '&' : '?')  + param(params) + '&'+callback+'=' + encodeURIComponent(name);
    url = url.replace('?&', '?');

    // create script
    script = document.createElement('script');
    script.src = url;
    target.parentNode.insertBefore(script, target);
    return cancel;
  }

  return new Promise((res, rej) => {
    originJsonp(opts, (err, data) => {
      if (!err) {
        res(data)
      } else {
        rej(err)
      }
    })
  })
}

export function param(data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += '&' + k + '=' + encodeURIComponent(value)
  }
  return url ? url.substring(1) : ''
}