(function() {
    // Load the script
    var script = document.createElement("SCRIPT");
    script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
    script.type = 'text/javascript';
    script.onload = function() {
        var $ = window.jQuery;
        // Use $ here...
    };
    document.getElementsByTagName("head")[0].appendChild(script);
})();

//function ListOfCards(title, listOfCards, addButton, parent);


$(document).ready(function () {
  var board = $(".board #list-list");
  var listOfLists = board.find(".list-cards"); //last one is a button'
  console.log(listOfLists);
  var modalCLose = $(".close-modal");
  //board button
  var boardBtn = $("#boards-btn");
  var dropdownContent = $(".dropdown-content");
  //menu buttoms
  var menuBtn = $("#menu-btn");
  var menuBtnExit = $("#menu-btn-exit");
  var optionsContent = $(".options-content");
  var addNewList = $("#add-new-list");

  //functions
  addNewList.click( function () {
    console.log(board);
    var newList ="<div id=\"list-cards\" class=\"list-cards\"><h3 id=\"card-object\" contenteditable=\"true\">Title of list of cards</h3><div id=\"cards\"></div><div id=\"card-object\" class=\"card add-card\"><button type=\"button\">Add a new card +</button></div></div>";
    board.append(newList);
    listOfLists = board.find(".list-cards");
    console.log(listOfLists, board);
  });

  board.on("click", ".list-cards button", function () {
    var newCard = "<div id=\"card-object\" class=\"card\"><p>Name of Card</p><p>edit</p></div>";
    console.log($(this).parent().parent().find("#cards"));
    $(this).parent().parent().find("#cards").append(newCard);
    //board.find(".list-cards #cards").append(newCard);
  });

  board.on("click", ".list-cards #cards .card", function () {
    console.log(1, board);
    console.log(this);
    $(this).remove();

  });

  boardBtn.click(function () {
    console.log(dropdownContent.css("display") );
    if (dropdownContent.css("display") === "block") {
      dropdownContent.css("display", "none");
    } else {
      dropdownContent.css("display", "block");
    }
  });

  menuBtn.click(function () {
    optionsContent.css("display", "block");
  });
  menuBtnExit.click(function () {
    optionsContent.css("display", "none");
  });

  modalCLose.click( function() {
    $(".modal").css("display", "none");
    $("body").css("overflow", "scroll");
  });


});
