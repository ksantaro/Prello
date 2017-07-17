var body = $("body");
if (email) {
  if (email === "email does not exsit") {
    var createModal = $("<div/>").attr("id", "email-no").addClass("modal-menu").append($("<div/>").addClass("add-new-board")
      .append($("<h2/>").html("User does not exsit"))
      .append($("<span/>").html("X")));
    body.append(createModal);
    //dropdownContent.css("display", "none");
  }
}

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
