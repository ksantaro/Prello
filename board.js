//function ListOfCards(title, listOfCards, addButton, parent);
var username = "Kenny";
//Data Structure
var map = {};
var listOfListsInfo = [
  {
    id: "0",
    title: "First Template",
    cards: [
        { id: "00", name: "Card 1", description: "Placeholder description",
          labels: ["Label 1", "Label 2"], comments: ["Comment1", "Comment2"], members : ["Temp Member"]},
        { id: "01", name: "Card 2", description: "Placeholder description",
          labels: ["Label 1", "Label 2"], comments: ["Comment1", "Comment2"], members: ["Temp Member"]}
      ]
  },
  {
    id: "1",
    title: "Second Template",
    cards: [
      { id: "10", name: "Card 1", description: "Placeholder description",
        labels: ["Label 1", "Label 2"], comments: ["Comment1", "Comment2"], members: ["Temp Member"]},
      { id: "11", name: "Card 2", description: "Placeholder description",
        labels: ["Label 1", "Label 2"], comments: ["Comment1", "Comment2"], members: ["Temp Member"]}
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
        cardDiv.append(cardTitle).append(`<p>edit/info</p>`); //Helpful later on data-cardid="${cardId}"
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
  var body = $("body");
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
  var modal = $(".modal");
  var fullview = $(".card-fullview");
  "JUST TARGET FULLVIEW, THEN $THIS.attr(id) WOULD KNOW WHICH CARD IT CAME FROM ---> IF YOU GIVE IT THE ID"
  "TARGET FULLVIEW -> (BOARD FULLVIEW (TO DELEGATE))"
  "FULLVIEW LISTENER NAME OF CARD "
    "(CHANGEABLE contenteditable, IF IT CHANGES, DO IT TO THE CARD AND DATABASE IT BELONGS TO )"
  "FULLVIEW LISTENER .edit"
    "(set .description-text to contenteditable=true and edit text to save)"
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

  //add a new list
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
  //create a card
  board.on("click", ".list-cards button", function () {
    // Create in listOfListsInfo and Map
    var listIndex = $(this).parent().parent().attr("id");
    var cardIndex = listOfListsInfo[listIndex].cards.length;
    var newCardInfo = { id: "" + listIndex + cardIndex, name: "Card Name", description: "Placeholder description",
      labels: [], comments: [], members: [username]};
    listOfListsInfo[listIndex].cards.push(newCardInfo);
    map[newCardInfo.id] = { listIndex, cardIndex };
    //create in page
    var newCard = $("<div/>").addClass("card").attr("id", newCardInfo.id);
    newCard.append("<p>"+ newCardInfo.name +"</p><p>edit/info</p>");
    console.log($(this).parent().parent().find(".cards"));
    $(this).parent().parent().find(".cards").append(newCard);
  });
  //list cards title set in data Structure
  board.on("keyup ", ".list-cards h3", function (e) {
    var parentId = $(this).parent().parent().attr("id");
    var newTitleValue = $(this).html();
    listOfListsInfo[parentId].title = newTitleValue;
  });
  //Show Board dropdown
  boardBtn.click(function () {
    console.log(dropdownContent.css("display") );
    if (dropdownContent.css("display") === "block") {
      dropdownContent.css("display", "none");
    } else {
      dropdownContent.css("display", "block");
    }
  });
  //Show + Close Menu dropdown
  menuBtn.click(function () {
    optionsContent.css("display", "block");
  });
  menuBtnExit.click(function () {
    optionsContent.css("display", "none");
  });
  //Destroy Modal if Modal its clicked outside the modal
  body.on("click",".modal", function(e) {
    if ($(this).is(e.target) && $(this).has(e.target).length === 0) {
      $(this).remove();
      $("body").css("overflow", "auto");
    }

  });
  //Close Modal Button
  body.on("click", ".modal .close-modal",function() {
    console.log($(this).parent().parent().parent());
    $(this).parent().parent().parent().remove();
    $("body").css("overflow", "auto");
  });
  //Open Fullview
  /*
  <div class="modal" id="22">
  <div class="card-fullview">
    <div class="card-fullview-title">
      <h2 contenteditable="true">Name of Card</h2>
      <span class="close-modal">X</span>
    </div>
    <div class="members">
      <h3>Members</h3>
      <p class="member">User2 <span>x</span></p>
      <p class="member">User1 <span>x</span></p>
      <p class="member">User3 <span>x</span></p>
      <p class="member">User3 <span>x</span></p>
      <p class="member">User3 <span>x</span></p>
      <p class="member">User3 <span>x</span></p>
      <p class="member">User3 <span>x</span></p>
      <p class="member">User3 <span>x</span></p>

      <div class="member-button">
        <button type="button" class="member">+</button>
        <div class="input-member-name">
          <form onsubmit="false" id="member-form">
            <input type="text" placeholder="type member's name"></input>
          </form>
        </div>
      </div>

    </div>
    <div class="description">
      <h3>Description</h3>
      <p class="description-text" contenteditable="false">Placeholder text for an actual description of the card. </p>
      <p class="edit">Edit</p>
    </div>
    <div class="labels">
      <h3>Labels</h3>
      <p class="label">Label 1<span>x</span></p>
      <p class="label">Label 2<span>x</span></p>
      <p class="label">Label 3<span>x</span></p>
      <p class="label">Label 4<span>x</span></p>
      <p class="label">Label 222222<span>x</span></p>
      <p class="label">Label 222222<span>x</span></p>
      <p class="label">Label 222222<span>x</span></p>
      <p class="label">Label 222222<span>x</span></p>
      <p class="label">Label 222222<span>x</span></p>
      <div class="label-button">
        <button type="button">+</button>
        <div class="input-label-name">
          <form onsubmit="false">
            <input type="text" placeholder="type label name"></input>
          </form>
        </div>
      </div>
    </div>
    <div class="comments">
      <h3>Add a comment</h3>
      <form class="comment-form">
        <textarea class="comment-box" type="text" placeholder="Write a comment..."></textarea>
      <br><button class="comment-button" type="button">Send</button></form><br>
      <div class="comment-line"><p class="member">User1</p><p class="comment-text">
        Placeholder comment Placeholder comment Placeholder comment Placeholder comment
        Placeholder comment Placeholder comment Placeholder comment Placeholder comment
        Placeholder comment Placeholder comment Placeholder comment Placeholder comment
      </p><span class="comment-delete">Delete Comment</span></div>
      <div class="comment-line"><p class="member">User1</p><p class="comment-text">
        Placeholder comment Placeholder comment Placeholder comment Placeholder comment
        Placeholder comment Placeholder comment Placeholder comment Placeholder comment
        Placeholder comment Placeholder comment Placeholder comment Placeholder comment
      </p><span class="comment-delete">Delete Comment</span></div>
    </div>
    <div class="add-delete">
      <button class="delete" type="button">Delete</button>
    </div>
  </div>
  </div> */
  board.on("click", ".list-cards .cards .card", function () {
    console.log($(this).attr("id"));
    var cardID = $(this).attr("id");
    var cardIndex = map[cardID].cardIndex;
    var listIndex = map[cardID].listIndex;
    var cardInfo = listOfListsInfo[listIndex].cards[cardIndex];
    var cardName = cardInfo.name;
    var cardDescription = cardInfo.description;
    var cardLabels = cardInfo.labels;
    var cardComments = cardInfo.comments;
    var cardMembers = cardInfo.members;
    //Build fullview
    var modal = $("<div/>").addClass("modal").attr("id", cardID);
    var fullview = $("<div/>").addClass("card-fullview");
    var title = $("<div/>").addClass("card-fullview-title")
                .append($("<h2/>").attr("contenteditable", "true").html(cardName))
                .append($("<span/>").addClass("close-modal").html("X"));
    var members = $("<div/>").addClass("members").append($("<h3/>").html("Members"));
          for (var num = 0; num < cardMembers.length; num++) {
          members.append($("<p/>").addClass("member").html(cardMembers[num]).append($("<span/>").html("x")));
          }
          members.append($("<div/>").addClass("member-button")
                    .append($("<button/>").attr("type","button").addClass("member").html("+"))
                    .append($("<div/>").addClass("input-member-name")
                      .append($("<form/>").attr("onsubmit","false").attr("id","member-form")
                        .append($("<input/>").attr("type","text").attr("placeholder","type member's name")))));
    var description = $("<div/>").addClass("description")
                        .append($("<h3/>").html("Description"))
                        .append($("<p/>").addClass("description-text").attr("contenteditable", "false").html(cardDescription))
                        .append($("<p/>").addClass("edit").html("Edit"));
    var labels = $("<div/>").addClass("labels").append($("<h3/>").html("Labels"));
      for (var num = 0; num < cardLabels.length; num++) {
        labels.append($("<p/>").addClass("label").html(cardLabels[num]).append($("<span/>").html("x")));
      }
      labels.append($("<div/>").addClass("label-button")
                .append($("<button/>").attr("type","button").addClass("label").html("+"))
                .append($("<div/>").addClass("input-label-name")
                  .append($("<form/>").attr("onsubmit","false")
                    .append($("<input/>").attr("type","text").attr("placeholder","type label's name")))));
    var comments = $("<div/>").addClass("comments")
                    .append($("<h3/>").html("Add a comment"))
                    .append($("<form/>").addClass("comment-form")
                      .append($("<textarea/>").addClass("comment-box").attr("type","text").attr("placeholder","Write a comment..."))
                      .append($("<br/>")).append($("<button/>").addClass("comment-button").attr("type","button").html("Send")).append("<br/>"))
                    .append($("<div/>").addClass("comment-section"));
    for(var num = 0; num < cardComments.length; num++) {
      comments.find(".comment-section").append(
        $("<div/>").addClass("comment-line")
        .append($("<p/>").addClass("member").html(username))
        .append($("<p/>").addClass("comment-text").html(cardComments[num]))
        .append($("<span/>").addClass("comment-delete").html("Delete Comment"))
      );
    }
    var addDelete = $("<div/>").addClass("add-delete").append($("<button/>").addClass("delete").attr("type","button").html("Delete"));
    fullview.append(title).append(members).append(description).append(labels).append(comments).append(addDelete);
    modal.append(fullview);
    body.append(modal);

  });
  //Fullview Save Title
  body.on("keyup ", ".modal .card-fullview-title h2", function (e) {
    //var parentId = $(this).parent().parent().attr("id"); //FIND ID OF THE CARD
    var newTitleValue = $(this).html();
    console.log(newTitleValue);
    //listOfListsInfo[parentId].title = newTitleValue;
  });
  //Fullview - Show Add Member Dropdown
  body.on("click",".modal .members button", function() {
    if ($(".input-member-name").css("display") === "block") {
      $(".input-member-name").css("display", "none");
    } else {
      $(".input-member-name").css("display", "block");
    }
  });
  //Fullview Add A Member
  body.on("keypress", ".modal .members form", function(e) {
    if(e.which == 13) {
        e.preventDefault();
        var memberFormValue = $(this).find("input").val();
        console.log(memberFormValue.length);
        if (memberFormValue.length > 0) {
          $(".member-button").before("<p class=\"member\">" + memberFormValue + "<span>x</span></p>");
          $(this).find("input").val("");
          $(".input-member-name").css("display", "none");
        }
        return false;
    }
  });
  //Fullview - Show Add Label Dropdown
  body.on("click",".modal .labels button", function() {
    if ($(".input-label-name").css("display") === "block") {
      $(".input-label-name").css("display", "none");
    } else {
      $(".input-label-name").css("display", "block");
    }
  });
  //Fullview Show Add A Label
  body.on("keypress", ".modal .labels form", function(e) {
    if(e.which == 13) {
        e.preventDefault();
        var labelFormValue = $(this).find("input").val();
        console.log(labelFormValue.length);
        if (labelFormValue.length > 0) {
          $(".label-button").before("<p class=\"label\">" + labelFormValue + "<span>x</span></p>");
          $(this).find("input").val("");
          $(".input-label-name").css("display", "none");
        }
        return false;
    }
  });
  //Fullview Edit Description
  body.on("click", ".modal .description .edit", function() {
    var descriptionText = $(this).parent().find(".description-text");
    if (descriptionText.attr("contenteditable") === "true") {
      var newDescription = descriptionText.html();
      console.log(newDescription);
      descriptionText.attr("contenteditable", "false");
      //Send to storage
      $(this).html("edit");
      //Send val
    } else {
      descriptionText.attr("contenteditable", "true");
      $(this).html("save");
    }
  });
  //Fullview Add Comment
  body.on("click",".modal .comments .comment-button", function(e) {
    e.preventDefault();
    var commentText = $(this).parent().find("textarea").val();
    console.log(commentText);
    if (commentText.length > 0) {
      console.log("im in");
      var commentLine = $("<div/>").addClass("comment-line");
      var member = $("<p/>").addClass("member").html(username);
      var comment = $("<p/>").addClass("comment-text").html(commentText)
      var commentDelete = $("<span/>").addClass("comment-delete").html("Delete Comment");
      commentLine.append(member).append(comment).append(commentDelete);
      $(this).parent().parent().find(".comment-section").prepend(commentLine);
      $(this).parent().find("textarea").val("");
    }
  });


});
