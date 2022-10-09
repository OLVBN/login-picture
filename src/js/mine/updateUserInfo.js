// 本模块负责维护用户个人信息
// 引入jquery  发送jsonp请求
import $ from "jquery";

import pxmu from "pxmu"

// 获取省份下拉框
let provinces = document.getElementById("province");



let $province = $("#province");
let $city = $("#city");
let $district = $("#district");

$province.on("change", function () {
  $.ajax({
    url: "https://fts.jd.com/area/get",
    data: { fid: $province.val() },
    jsonpCallback: "aaa",
    dataType: "jsonp",
    success(data) {
      $city.html(
        "<option class='d-none'>----</option>" +
          data
            .map((val) => `<option value=${val.id}>${val.name}</option>`)
            .join("")
      );
    },
  });

  $city.empty();
  $district.html("");
});

$city.on("change", function () {
  $.ajax({
    url: "https://fts.jd.com/area/get",
    data: { fid: $city.val() },
    jsonpCallback: "aaa",
    dataType: "jsonp",
    success(data) {
      $district.html(
        "<option class='d-none'>----</option>" +
          data
            .map((val) => `<option value=${val.id}>${val.name}</option>`)
            .join("")
      );
    },
  });
  $district.html("");
});




let username = document.getElementById("userName");
let password = document.getElementById("password");
let nickname = document.getElementById("nickname");
let phoneNumber = document.getElementById("phoneNumber");
let email = document.getElementById("email");
let sex = document.getElementById("sex");
let province = document.getElementById("province");
let city = document.getElementById("city");
let district = document.getElementById("district");
let personalSign = document.getElementById("personalSign");


let btn = document.getElementById("btn")
btn.onclick =async function(){
    let obj ={
        authrization:localStorage.getItem("token"),
        username:username.value,
        password:password.value,
        nickname:nickname.value,
        phoneNumber:phoneNumber.value,
        email:email.value,
        sex:sex.value,
        province:province.value,
        city:city.value,
        district:district.value,
        personalSign:personalSign.value

    }


    var string = ""
    for(var i in obj){
        string += i +"=" + obj[i]+"&"
    }
    string = string.slice(0,-1)

    let res = await fetch('/Api/update_user_info',{
        method:"post",
        body:string,
        headers:{
            "Content-type":"application/x-www-form-urlencoded"
        }
    })


    let data = await res.json();
    console.log(data)
    console.log(obj)
    pxmu.success("修改成功")
}




fetch("/Api/get_all_user_info?authrization="+localStorage.getItem("token"))
.then(res=>res.json())
.then(function(data){
    if(data.error===0){
        let{city:cityValue,district:districtValue,email:emailValue,nickname:nicknameValue,password:passwordValue,personalSign:personalSignValue,phoneNumber:phoneNumberValue,province:provinceValue,sex:sexValue,username:usernameValue }=data.data

        email.value = emailValue || ""
        nickname.value = nicknameValue
        password.value = passwordValue
        personalSign.value = personalSignValue ||""
        phoneNumber.value = phoneNumberValue || ""
        sex.value = sexValue
        username.value = usernameValue






        $.ajax({
            url: "https://fts.jd.com/area/get",
            data: { fid: 4744 },
            callbackname: "aaa",
            dataType: "jsonp", 
            success(data) {
              provinces.innerHTML =
                "<option class='d-none'>----</option>" +
                data
                  .map((val) => `<option value=${val.id}>${val.name}</option>`)
                  .join("");

                  if(!provinceValue){
                    return
                  }
                  province.value = provinceValue

                  $.ajax({
                    url: "https://fts.jd.com/area/get",
                    data: { fid: provinceValue},
                    callbackname: "aaa",
                    dataType: "jsonp", // 关键是这一条
                    success(data) {
                      city.innerHTML =
                        "<option class='d-none'>----</option>" +
                        data
                          .map((val) => `<option value=${val.id}>${val.name}</option>`)
                          .join("");
                          city.value = cityValue

                          $.ajax({
                            url: "https://fts.jd.com/area/get",
                            data: { fid: cityValue },
                            callbackname: "aaa",
                            dataType: "jsonp", // 关键是这一条
                            success(data) {
                                district.innerHTML =
                                "<option class='d-none'>----</option>" +
                                data
                                  .map((val) => `<option value=${val.id}>${val.name}</option>`)
                                  .join("");
                                  district.value = districtValue;
                            },
                          });

                    },
                  });
            },
          });

        city.value = cityValue
        district.value = districtValue
        province.value = provinceValue
        return
    }
})