var boardBtn = $("#boards-btn");
var dropdownContent = $(".dropdown-content");

$(document).ready(function () {

  boardBtn.click(function () {
    console.log(dropdownContent.css("display") );
    if (dropdownContent.css("display") === "block") {
      dropdownContent.css("display", "none");
    } else {
      dropdownContent.css("display", "block");
    }
  });
})
