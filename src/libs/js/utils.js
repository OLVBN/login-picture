var QF = {
    rand: function (m, n) {
        if (n < m) {
            var temp = n;
            n = m;
            m = temp;
        }
        return parseInt(Math.random() * (n - m + 1)) + m
    },
    scrollAnimate: function (targetPos, time) {
        // 计算公式 
        var nowPos = document.body.scrollTop || document.documentElement.scrollTop;
        // 计算总距离
        var allDistance = nowPos - targetPos;
        // 默认定义单次运动时间是20ms
        var allCount = time / 20;
        // 定义变量 保存单次步长
        var step = allDistance / allCount;

        // 定义变量保存已经走的步数
        var count = 0;
        // 开启定时器
        var timer = setInterval(function () {
            document.body.scrollTop -= step;
            document.documentElement.scrollTop -= step;
            count++;
            if (count >= allCount) {
                clearInterval(timer)
            }

        }, 20)

    },
    animate: function (dom, cssObj, duration, callback) {
        // 获取元素现在的属性值
        var obj = getComputedStyle(dom);

        var nowObj = {};
        // 为了得到要动画的属性名 得通过for in 循环
        for (var i in cssObj) {
            // 第一次i是left 
            // 第二次i是top
            // 第三次i是opacity
            nowObj[i] = parseInt(obj[i])
        }
        // 定义已经走的步数
        var count = 0;
        // 定义一个总次数
        var allCount = duration / 20;
        // 开启定时器 定时器的间隔是20ms
        var timer = setInterval(function () {
            // 累计步数
            count++;
            // 循环改变每一条属性
            for (var i in cssObj) {
                if (i === "opacity") {
                    dom.style[i] = nowObj[i] + (cssObj[i] - nowObj[i]) / allCount * count
                } else {
                    dom.style[i] = nowObj[i] + (cssObj[i] - nowObj[i]) / allCount * count + "px"
                }
            }

            // 判断停止条件
            if (count >= allCount) {
                clearInterval(timer);
                // if (callback) {
                // callback();
                // }

                callback && callback();
            }
        }, 20)
    },
    offset: function (dom) {
        // 思路：不论页面结构如何更改 算法都是一层一层往上加
        var obj = {
            left: 0,
            top: 0
        }

        // 循环累加
        while (dom != document.body) {
            // 累加每一段的间距和边框宽度
            obj.left += dom.offsetLeft + dom.clientLeft;
            obj.top += dom.offsetTop + dom.clientTop;
            // 让dom指向上一层
            dom = dom.offsetParent;
        }


        return obj;

    },
    randomColor: function () {
        return `rgb(${this.rand(0, 255)}, ${this.rand(0, 255)},${this.rand(0, 255)})`
    },

    get: function (url, data, callback, type = "json") {
        let querystring = "";
        if (typeof data === "object") {
            for (var i in data) {
                // 假设data是 {a: 1, b: 2,c: 3}
                querystring += i + "=" + data[i] + "&";
            }
            querystring = querystring.slice(0, -1);
        } else {
            querystring = data;
        }
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                if (type === "json") {
                    callback(JSON.parse(xhr.responseText))
                } else if (type === "text") {
                    callback(xhr.responseText)
                }
            }
        }
        xhr.open("GET", url + "?" + querystring, true);
        // xhr.setRequestHeader("X-qf-header", encodeURIComponent("你好帅"))
        xhr.send();
    },

    post(url, data, callback) {
        let querystring = "";
        if (typeof data === "object") {
            for (var i in data) {
                // 假设data是 {a: 1, b: 2,c: 3}
                querystring += i + "=" + data[i] + "&";
            }
            querystring = querystring.slice(0, -1);
        } else {
            querystring = data;
        }
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                callback(JSON.parse(xhr.responseText))
            }
        }
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
        xhr.send(querystring);
    }
}

