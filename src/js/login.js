import { Observer } from './common/Observer'
import pxmu from 'pxmu'
const container = document.querySelector('#container');
const signInButton = document.querySelector('#signIn');
const signUpButton = document.querySelector('#signUp');

signUpButton.addEventListener('click',() => container.classList.add('right-panel-active'))
signInButton.addEventListener('click',() => container.classList.remove('right-panel-active'))


      
  

let form = document.getElementById("container");
let login = document.getElementById('login');
let regist = document.getElementById('regist');

// let loginAndRegister =document.grtElementById('loginAndRegister')
let closeBtn = document.getElementById('closeBtn') 
let closeBtnLogin = document.getElementById('closeBtnLogin')
let loginusername = document.getElementById('loginusername')
let loginpassword = document.getElementById('loginpassword')
let loginBtn = document.getElementById('loginBtn')
let wrap = document.getElementById('wrap')



Observer.on("login-show", function () {
  form.classList.remove('d-none')
})

Observer.on("regist-show",function(){
  form.classList.remove('d-none')
})

Observer.on("login-hide",function(){
    form.classList.add('d-none')
    
})


closeBtn.onclick = function(){
    Observer.emit("login-hide")
    regist.classList.remove('d-none')
    login.classList.remove('d-none')
}
closeBtnLogin.onclick = function(){
    Observer.emit("login-hide")
    regist.classList.remove('d-none')
    login.classList.remove('d-none')
    wrap.classList.remove('d-none')
}




loginBtn.onclick = async function(){

    let username = loginusername.value;
    if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{4,16}$/.test(username)) {
        pxmu.fail("请输入4到16位由大小写字母与数字组成的账号！")
        return
      }
      
      let password = loginpassword.value;
      if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{4,16}$/.test(password)) {
        pxmu.fail("请输入4到16位由大小写字母与数字组成的账号！")
        return;
      }


      let obj = await fetch("/Api/login", {
        method: "post",
        headers: {
          "Content-type": "application/x-www-form-urlencoded"
        },
        body: "username=" + loginusername.value + "&password=" + loginpassword.value
      })

      let {error,data,token} = await obj.json()

      if(error===0){
        pxmu.success(data)
        localStorage.setItem("token",token);
        Observer.emit("login-hide");
        Observer.emit("getUserInfo")
        wrap.classList.remove('d-none')
        return
      }
        
      pxmu.fail(data)
       
    
      



      
}


login.onclick = function(){

  wrap.classList.add("d-none")
  container.classList.remove("d-none")
  
}
