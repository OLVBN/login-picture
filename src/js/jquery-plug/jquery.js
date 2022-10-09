import $ from "jquery";
import pxmu from 'pxmu'
$(function () {
  // 修改默认配置
  $.autoClearButtonInput.setDefault({
    icon: "my_input_close_button", // 自定义关闭按钮样式
    enableValidation: true,
  });

  $('#registerPassword').autoClearButtonInput('create');
  $('#confirmPass').autoClearButtonInput('create');
  $('#registerPassword').autoClearButtonInput('clearWarn');
  $('#loginusername').autoClearButtonInput('clearWarn');
  

  $(".clear").autoClearButtonInput('setValidateFunction',function(data){
    return checkPhone(data);
})

  
  $(".clear").change(function () {
    var valid = $(".clear").autoClearButtonInput("validate");
    if (valid) {
      // your logic
    } else {
      // your logic
    }
  });


});

function checkPhone(phone) {
  if (phone == null || phone == "") {
    return false;
  }

  if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{4,16}$/.test(phone)) {
    return false;
  }

  return true;
}
