import { Observer } from './common/Observer'
import pxmu from 'pxmu'
let allUser = document.getElementById('allUser')
let btn = document.getElementById("btn")


fetch("/Api/get_all_user")
.then(res=>res.json())
.then(({ error, data }) => {
   // 判断data是否成功
    if (!error) {
        allUser.innerHTML = data.map(val => `<div class="col-3">
            <div class="card">
                <img src="${val.headpic}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${val.nickname}</h5>
                    <p class="card-text">清澈的爱只给祖国</p>
                    <a href="#"id="btn" class=" btn btn-primary" data-target="${val.username}">查看该用户的相册</a>
                </div>
            </div>
        </div>`).join('')
    }
});


