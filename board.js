//function ListOfCards(title, listOfCards, addButton, parent);

//Data Structure
var map = {};
var listOfListsInfo = [
  {
    id: "0",
    title: "First Template",
    cards: [
        { id: "00", name: "Card 1", description: "Placeholder description",
          labels: ["Label 1", "Label 2"], comments: ["Comment1", "Comment2"]},
        { id: "01", name: "Card 2", description: "Placeholder description",
          labels: ["Label 1", "Label 2"], comments: ["Comment1", "Comment2"]}
      ]
  },
  {
    id: "1",
    title: "Second Template",
    cards: [
      { id: "10", name: "Card 1", description: "Placeholder description",
        labels: ["Label 1", "Label 2"], comments: ["Comment1", "Comment2"]},
      { id: "11", name: "Card 2", description: "Placeholder description",
        labels: ["Label 1", "Label 2"], comments: ["Comment1", "Comment2"]}
    ]
  }];
  var board = $(".board #list-list");
  var col = 0;
  var row = 0;

  /*
  IDs were removed
  <div id="list-cards" class="list-cards">
    <h3 id="h3-title" contenteditable="true">Title of list of cards</h3>
    <div id="cards">
      <div id="card-object" class="card">
        <p>Name of Card</p>
        <p>edit</p>
      </div>
      <div id="card-object" class="card">
        <p>Name of Card</p>
        <p>edit</p>
      </div>
    </div>
    <div id="card-object" class="card add-card">
      <button type="button">Add a new card +</button>
    </div>
  </div> */
$(document).ready(function () {
  //PopulateUsinglistOflistsInfo
  for(var num = 0; num <  listOfListsInfo.length; num++) {
    var list = listOfListsInfo[num];
    var listIndex = num;
    var listId = list.id;
    var listDiv = $('<div/>').addClass("list-cards").attr("id",listId);
    var titleDiv = $('<h3/>').attr("contenteditable","true").html(list.title);
    var cards = $('<div/>').addClass('cards');
    col++;
    row = 0;
      for(var num2 = 0; num2 < list.cards.length; num2++) {
        var cardIndex = num2;
        var card = list.cards[num2];
        var cardId = card.id;
        map[cardId] = { listIndex, cardIndex }; // { listIndex: listIndex, cardIndex: cardIndex }
        var cardDiv = $('<div/>').attr('id', cardId).addClass("card");
        var cardTitle = $('<p/>').html(card.name);
        cardDiv.append(cardTitle).append(`<p>edit</p>`); //Helpful later on data-cardid="${cardId}"
        cards.append(cardDiv);
        row++;
      }
    var removeButton = "<span class=\"remove-list-cards\">x</span>";
    var titleContainer = $('<div/>').addClass("list-cards-title");
    titleContainer.append(titleDiv).append(removeButton);
    listDiv.append(titleContainer).append(cards);
    listDiv.append("<div class=\"card add-card\"><button type=\"button\">Add a new card +</button></div>");
    board.append(listDiv);
  }
  console.log("Debug",map, col, row);

  //Selectors
  var listOfLists = board.find(".list-cards"); //last one is a button'
  console.log(listOfLists);
  var modalClose = $(".close-modal");
  //board button
  var boardBtn = $("#boards-btn");
  var dropdownContent = $(".dropdown-content");
  //menu buttoms
  var menuBtn = $("#menu-btn");
  var menuBtnExit = $("#menu-btn-exit");
  var optionsContent = $(".options-content");
  var addNewList = $("#add-new-list");
  //Unique ID
  /*var col = 0;
  var row = 0;
  var cardID = [];
  for (col; col < listOfLists.length; col++) {
    for (row; row < listOfLists.find(".list-cards #cards .card").length; row++) {
      console.log("debug",listOfLists.find(".list-cards"))
      console.log(col, row);
    }
  }*/
  //console.log(cardID);
  //functions
  addNewList.click( function () {
    console.log(board);
    var newList ="<div class=\"list-cards\" id=\""+ col +"\"><div class=\"list-cards-title\"><h3 contenteditable=\"true\">Title</h3><span class=\"remove-list-cards\">x</span></div><div class=\"cards\"></div><div id=\"card-object\" class=\"card add-card\"><button type=\"button\">Add a new card +</button></div></div>";
    board.append(newList);
    listOfLists = board.find(".list-cards");
    console.log(listOfLists, board);
    listOfListsInfo.push({
      id: "" + col,
      title: "Title",
      cards: []
    });
      col++;
  });

  board.on("click", ".list-cards button", function () {
    // Create in listOfListsInfo and Map
    var listIndex = $(this).parent().parent().attr("id");
    var cardIndex = listOfListsInfo[listIndex].cards.length;
    var newCardInfo = { id: "" + listIndex + cardIndex, name: "Card Name", description: "Placeholder description",
      labels: [], comments: []};
    listOfListsInfo[listIndex].cards.push(newCardInfo);
    map[newCardInfo.id] = { listIndex, cardIndex };
    //create in page
    var newCard = $("<div/>").addClass("card").attr("id", newCardInfo.id);
    newCard.append("<p>Name of Card</p><p>edit</p>");
    console.log($(this).parent().parent().find(".cards"));
    $(this).parent().parent().find(".cards").append(newCard);
  });

  board.on("keyup", ".list-cards h3", function () {
    var parentId = $(this).parent().parent().attr("id");
    var newTitleValue = $(this).html();
    listOfListsInfo[parentId].title = newTitleValue;

  });

  board.on("click", ".list-cards .card", function () {
    console.log($(this));

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

  modalClose.click( function() {
    $(this).parent().parent().parent().remove();
    $("body").css("overflow", "auto");
  });


});
