import { Observer } from './common/Observer'
import pxmu from 'pxmu'

const container = document.querySelector('#container');
const signInButton = document.querySelector('#signIn');
const signUpButton = document.querySelector('#signUp');

signUpButton.addEventListener('click',() => container.classList.add('right-panel-active'))
signInButton.addEventListener('click',() => container.classList.remove('right-panel-active'))



// 定义用户名锁 和密码锁
let usernameLock = false;
let passwordLock = false;

let registerUsername = document.getElementById('registerUsername');
let registerPassword = document.getElementById('registerPassword');
let confirmPassword = document.getElementById('confirmPassword');
let registerBtn = document.getElementById('registerBtn');


registerUsername.onblur =async function(){
    let username = this.value
    if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{4,16}$/.test(username)) {
        pxmu.fail("请输入4到16位由大小写字母与数字组成的账号！")
        return
      }
    let string = `username=${username}`;
    let res = await fetch("/Api/checkusername?"+string);
    let { error, data } = await res.json();
    if (!error) {
        pxmu.success(data)
        // 开锁
        usernameLock = true;
        return;
    }
    // 关锁
    usernameLock = false;
    pxmu.fail(data)


}


registerPassword.onblur = function () {
    // 获取密码
    let password = this.value;
    // 正则验证
    if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{4,16}$/.test(password)) {
        pxmu.fail("密码不符合需求：字母开头，允许5-16字节，允许字母数字下划线");
        // 关锁
        passwordLock = false;
        return
    }
    pxmu.success("可以使用")
    passwordLock = true;
}


// 注册
registerBtn.onclick = async function () {
    // 判断用户名锁和密码锁
    if (!usernameLock || !passwordLock) {
        pxmu.fail("用户名或者密码不正确，请重新检查")
        return;
    }
    let res = await fetch("/Api/regist", {
        method: "post",
        body: "username=" + registerUsername.value + "&password=" + registerPassword.value,
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        }
    })

    let {error, data} = await res.json();
    console.log(error, data)

    // 如果成功
    if(!error) {
        
        pxmu.success(data+"请登录");
        return;
    }
    pxmu.fail(data);

    
}