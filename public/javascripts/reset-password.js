$("#sign-up-form").attr("action", "/reset-password/" + hashKey + "/user/" + userID);
console.log(hashKey);
var signUpForm = document.querySelector("#sign-up-form");
var password = document.querySelector("#password");
var confirmPassword = document.querySelector("#confirm-password");
var signUpFormJ = $("#sign-up-form");
console.log(signUpForm);

signUpForm.addEventListener("submit", function (e) {
  if(password.value !== confirmPassword.value) {
    e.preventDefault();
    alert("The passwords are different");
  } else {
    alert("success");
  }
});

$(document).ready(function () {


})
