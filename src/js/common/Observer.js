var obj = {

};

// 返回一个新对象 这个新对象有两个方法 1 添加事件 2 执行事件
var Observer = {
    on(name, fun) {
        if (obj[name] instanceof Array) {
            obj[name].push(fun)
        } else {
            obj[name] = [fun];
        }
    },
    emit(name, ...arr) {
        if (obj[name]) {
            obj[name].forEach(fun => fun(...arr))
        } else {
            // 自定义错误信息
            throw new Error("没有" + name + "事件")
        }
    }
}

export {
    Observer,
    Observer as default
}