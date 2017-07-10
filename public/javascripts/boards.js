var boardBtn = $("#boards-btn");
var dropdownContent = $(".dropdown-content");
var listBoards = $(".list-boards");
var rowList = $('.row-list');
var addButton = $(".list-boards button");
var modal = $(".modal-menu");
var modalClose = $(".modal-menu span");
var body = $("body");
var menuAddButton = $(".dropdown-content a:last-child");
var username;

var listOfBoards = [];

$.get("http://localhost:3000/username",function(response) {
  username = response;
});

$.get("http://localhost:3000/board", function(response) {
  console.log(response);
  for (var num = 0; num < response.length; num++) {
    if (response[num].user === username) {
      listOfBoards.push(response[num]);
      console.log(response[num]);
      console.log(response[num]._id);
    }
  }
  for (var num = 0; num < listOfBoards.length; num++) {
    addButton.before($("<a/>").attr("href","./index/" + listOfBoards[num]._id).html(listOfBoards[num].name));
    menuAddButton.before($("<a/>").attr("href","./index/" + listOfBoards[num]._id).html(listOfBoards[num].name));
  }
});



$(document).ready(function () {



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
    var createModal = $("<div/>").addClass("modal-menu").append($("<div/>").addClass("add-new-board")
      .append($("<h2/>").html("Title"))
      .append($("<span/>").html("X"))
      .append($("<input/>").attr("type","text").attr("placeholder","title of the new board"))
      .append($("<button/>").attr("type","button").html("Create")));
    body.append(createModal);
    dropdownContent.css("display", "none");

  });
  //Open Modal Menu Add Button
  menuAddButton.click(function(e) {
    var createModal = $("<div/>").addClass("modal-menu").append($("<div/>").addClass("add-new-board")
      .append($("<h2/>").html("Title"))
      .append($("<span/>").html("X"))
      .append($("<input/>").attr("type","text").attr("placeholder","title of the new board"))
      .append($("<button/>").attr("type","button").html("Create")));
    body.append(createModal);
    dropdownContent.css("display", "none");
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
  //Create A board
  body.on("click", ".modal-menu button", function(e) {
    var titleValue = $($(this).parent().find("input")).val();
    var newBoard = {
      name : titleValue, id : listOfBoards.length + "", user : username, lists : [],
    };
    $(this).parent().parent().remove();
    $.ajax({
      type: "POST",
      url: "http://localhost:3000/board",
      data: {name: newBoard.name, id: newBoard.id, user: newBoard.user},
      success: function(response) {
        addButton.before($("<a/>").attr("href","./index/" + response._id).html(titleValue));
        menuAddButton.before($("<a/>").attr("href","./index/" + response._id ).html(titleValue));
        newBoard._id = response._id;
        listOfBoards.push(newBoard);

      },
      dataType: "json"
    });
  });

});
