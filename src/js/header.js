import {Observer} from './common/Observer'
import pxmu from 'pxmu';
let headPic = document.getElementById("headPic");
let username = document.getElementById("username");
let exit = document.getElementById("exit");
let login = document.getElementById("login");
let regist = document.getElementById("regist");
let userInfo = document.getElementById('userInfo')
let loginAndRegister = document.getElementById('loginAndRegister')
let wrap = document.getElementById('wrap')
let content = document.getElementById("content")

// 登录按钮 
login.onclick = function() {
    // 通知登录模块显示出来
    Observer.emit("login-show")

    regist.classList.add('d-none')
}


// 注册按钮
regist.onclick = function() {
    Observer.emit("regist-show")

    login.classList.add('d-none')
    wrap.classList.add('d-none')
}



async function getUserInfo() {
    // 发送请求
    let res = await fetch("/Api/getUserInfo?authrization=" + localStorage.getItem("token"))
    let { error,data:{headpic,nickname} }= await res.json();
    
    if(!error){
        userInfo.classList.remove("d-none")


        headPic.src= headpic;
        username.innerHTML = nickname;
        loginAndRegister.classList.add("d-none")
        
        return
    }
    loginAndRegister.classList.remove("d-none")
    userInfo.classList.add("d-none")
}

Observer.on("getUserInfo",getUserInfo)
Observer.emit("getUserInfo")

exit.onclick = function(){
    localStorage.removeItem("token")
    pxmu.success("退出成功")
    Observer.emit("getUserInfo")
    regist.classList.remove("d-none")
    // wrap.classList.remove('d-none')

    location.href='/'
}