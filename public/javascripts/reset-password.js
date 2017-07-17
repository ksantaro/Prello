$("#sign-up-form").attr("action", "/reset-password/" + hashKey + "/user/" + userID);
console.log(hashKey);
var signUpForm = document.querySelector("#sign-up-form");
var password = document.querySelector("#password");
var confirmPassword = document.querySelector("#confirm-password");
var signUpFormJ = $("#sign-up-form");
var body = $("body");
console.log(signUpForm);

signUpForm.addEventListener("submit", function (e) {
  if(password.value !== confirmPassword.value) {
    e.preventDefault();
    var createModal = $("<div/>").attr("id", "email-no-small").addClass("modal-menu").append($("<div/>").addClass("add-new-board")
      .append($("<h2/>").html("Passwords are different"))
      .append($("<span/>").html("X")));
    body.append(createModal);
  } else {
    var createModal = $("<div/>").attr("id", "email-no-small").addClass("modal-menu").append($("<div/>").addClass("add-new-board")
      .append($("<h2/>").html("Successful Change"))
      .append($("<span/>").html("X")));
    body.append(createModal);
    setTimeout(function () {
       window.location.href = "http://localhost:3000/login"; //will redirect to your blog page (an ex: blog.html)
    }, 3500)
  }
});

//Close Modal If clicked elsewhere
body.on("click",".modal-menu", function(e) {
  if ($(this).is(e.target) && $(this).has(e.target).length === 0) {
    $(this).remove();
    $("body").css("overflow", "auto");
}});
//Close Modal
body.on("click", ".modal-menu span", function(e) {
  $(this).parent().parent().remove();
});


$(document).ready(function () {


})
