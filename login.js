var signUpForm = document.querySelector("#sign-up-form");
var password = document.querySelector("#password");
var confirmPassword = document.querySelector("#confirm-password")
console.log(password, confirmPassword);

signUpForm.addEventListener("submit", function (e) {
  if(password.value !== confirmPassword.value) {
    e.preventDefault();
    alert("The passwords are different");
  }
});
/*
var document
e.preventdefualt

submit
*/
