var boardBtn = $("#boards-btn");
var dropdownContent = $(".dropdown-content");
var listBoards = $(".list-boards");
var rowList = $('.row-list');
var addButton = $(".list-boards button");
var modal = $(".modal");
var modalClose = $(".modal span");
var body = $("body");
var menuAddButton = $(".dropdown-content a:last-child");
var username;

var listOfBoards = [
  {
    name : "Temp Board 1", id : "0", user : "Temp1"
  }, {
    name: "Temp Board 2", id : "1", user : "Temp2"
  }
];

$.get("http://localhost:3000/username",function(response) {
  username = response;
});

$(document).ready(function () {

  for (var num = 0; num < listOfBoards.length; num++) {
    addButton.before($("<a/>").attr("href","./index").html(listOfBoards[num].name));
    menuAddButton.before($("<a/>").attr("href","./index").html(listOfBoards[num].name));
  }

  boardBtn.click(function () {
    console.log(dropdownContent.css("display") );
    if (dropdownContent.css("display") === "block") {
      dropdownContent.css("display", "none");
    } else {
      dropdownContent.css("display", "block");
    }
  });
  //Open Modal Main Add Button
  addButton.click(function (e) {
    var createModal = $("<div/>").addClass("modal").append($("<div/>").addClass("add-new-board")
      .append($("<h2/>").html("Title"))
      .append($("<span/>").html("X"))
      .append($("<input/>").attr("type","text").attr("placeholder","title of the new board"))
      .append($("<button/>").attr("type","button").html("Create")));
    body.append(createModal);
    dropdownContent.css("display", "none");

  });
  //Open Modal Menu Add Button
  menuAddButton.click(function(e) {
    var createModal = $("<div/>").addClass("modal").append($("<div/>").addClass("add-new-board")
      .append($("<h2/>").html("Title"))
      .append($("<span/>").html("X"))
      .append($("<input/>").attr("type","text").attr("placeholder","title of the new board"))
      .append($("<button/>").attr("type","button").html("Create")));
    body.append(createModal);
    dropdownContent.css("display", "none");
  });
  //Close Modal If clicked elsewhere
  body.on("click",".modal", function(e) {
    if ($(this).is(e.target) && $(this).has(e.target).length === 0) {
      $(this).remove();
      $("body").css("overflow", "auto");
  }});
  //Close Modal
  body.on("click", ".modal span", function(e) {
    $(this).parent().parent().remove();
  });
  //Create A board
  body.on("click", ".modal button", function(e) {
    var titleValue = $($(this).parent().find("input")).val();
    var newBoard = {
      name : titleValue, id : listOfBoards.length + "", user : username,
    };
    listOfBoards.push(newBoard);
    addButton.before($("<a/>").attr("href","./index").html(titleValue));
    menuAddButton.before($("<a/>").attr("href","./index").html(titleValue));
    $(this).parent().parent().remove();

  });

});
