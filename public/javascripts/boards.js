var boardBtn = $("#boards-btn");
var dropdownContent = $(".dropdown-content");
var listBoards = $(".list-boards");
var sharedBoards = $(".shared-boards");
var rowList = $('.row-list');
var addButton = $(".list-boards button");
var modal = $(".modal-menu");
var modalClose = $(".modal-menu span");
var body = $("body");
var menuAddButton = $(".dropdown-content a:last-child");
var username;
var listOfSharedBoards = [];

var listOfBoards = [];
var userID;

$.get("http://localhost:3000/username",function(response) {
  username = response;
});



$.get("http://localhost:3000/uniqueID", function(response) {
  userID = response;
});



$.get("http://localhost:3000/board", function(response) {
  console.log(response);
  for (var num = 0; num < response.length; num++) {
    console.log(response[num].userID);
    console.log(userID);
    if (response[num].userID === userID) {
      listOfBoards.push(response[num]);
      console.log(response[num]);
      console.log(response[num]._id);
    }
    for (var num2 = 0; num2 < response[num].userList.length; num2++) {
      if (response[num].userList[num2].user === userID) {
        listOfSharedBoards.push(response[num]);
      }
    }
  }
  for (var num = 0; num < listOfBoards.length; num++) {
    addButton.before($("<a/>").attr("id", num + "").attr("href","./index/" + listOfBoards[num]._id).html(listOfBoards[num].name));
    menuAddButton.before($("<a/>").attr("id", num + "").attr("href","./index/" + listOfBoards[num]._id).html(listOfBoards[num].name));
  }
  for (var num = 0; num < listOfSharedBoards.length; num++) {
    sharedBoards.append($("<a/>").attr("href","./index/" + listOfSharedBoards[num]._id).html(listOfSharedBoards[num].name));
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
      name : titleValue, id : listOfBoards.length + "", lists : [], userList : [], userID: userID
    };
    console.log(newBoard);
    $(this).parent().parent().remove();
    $.ajax({
      type: "POST",
      url: "http://localhost:3000/board",
      data: {name: newBoard.name, id: newBoard.id, userID: newBoard.userID},
      success: function(response) {
        addButton.before($("<a/>").attr("id", listOfBoards.length + "").attr("href","./index/" + response._id).html(titleValue));
        menuAddButton.before($("<a/>").attr("id", listOfBoards.length + "").attr("href","./index/" + response._id ).html(titleValue));
        newBoard._id = response._id;
        listOfBoards.push(newBoard);
        var url = response._id;
        console.log(url);
      },
      dataType: "json"
    });

  });

});
