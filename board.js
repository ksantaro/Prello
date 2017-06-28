//function ListOfCards(title, listOfCards, addButton, parent);
var username = "Kenny";
//Data Structure
var map = {};
var ajaxLOLInfo;
var listOfListsInfo;
var populateLists = [];
$.get("http://thiman.me:1337/kenneths/list", function (json) {
    console.log(json);
    ajaxLOLInfo = json;
    var listOfListsInfo = ajaxLOLInfo;
    //PopulateUsinglistOflistsInfo
    for(var num = 0; num <  listOfListsInfo.length; num++) {
      populateLists.push(listOfListsInfo[num]);
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
  });
/*
$.ajax({
    // The URL for the request
    url: "http://thiman.me:1337/kenneths/list",
    // The data to send (will be converted to a query string)
    // Whether this is a POST or GET request
    type: "GET",
    // The type of data we expect back
    dataType : "json",
})
  // Code to run if the request succeeds (is done);
  // The response is passed to the function
  .done(function( json ) {
    console.log(json);
    ajaxLOLInfo = json;
    var listOfListsInfo = ajaxLOLInfo;
    //PopulateUsinglistOflistsInfo
    for(var num = 0; num <  listOfListsInfo.length; num++) {
      populateLists.push(listOfListsInfo[num]);
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
  })
  // Code to run if the request fails; the raw request and
  // status codes are passed to the function
  .fail(function( xhr, status, errorThrown ) {
    alert( "Sorry, there was a problem!" );
    console.log( "Error: " + errorThrown );
    console.log( "Status: " + status );
    console.dir( xhr );
  });
  // Code to run regardless of success or failure;
  //.always(function( xhr, status ) {
  //  alert( "Runs No matter what" );
  //});;
  */
  console.log(ajaxLOLInfo);
listOfListsInfo = populateLists;
/*
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
*/
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
    listOfLists = board.find(".list-cards");
    $.post("http://thiman.me:1337/kenneths/list", function(response) {});
    $.get("http://thiman.me:1337/kenneths/list", function(response) {
      var uListID = response[response.length - 1]._id
      var newObjectList = {
        _id: uListID,
        id: "" + col,
        title: "Title",
        cards: [],
        key: "kenneths"
      }
      listOfListsInfo.push(newObjectList);
      var newList ="<div class=\"list-cards\" id=\""+ col +"\"><div class=\"list-cards-title\"><h3 contenteditable=\"true\">Title</h3><span class=\"remove-list-cards\">x</span></div><div class=\"cards\"></div><div id=\"card-object\" class=\"card add-card\"><button type=\"button\">Add a new card +</button></div></div>";
      col++;
      board.append(newList);
      $.ajax({
        url: "http://thiman.me:1337/kenneths/list/" + uListID,
        data : newObjectList,
        type: "PATCH",
        dataType: "json"
      });
    });
  });
  //delete a list
  board.on("click", ".list-cards .remove-list-cards", function() {
    var listToDelete = $(this).parent().parent();
    var listID = listToDelete.attr("id");
    console.log(listID);
    listToDelete.remove();
    var newBoard = $(".board");
    var newLists = $(".list-list .list-cards");
    console.log(newLists);
    listOfListsInfo.splice(listID, 1);
    for(var num = 0; num < listOfListsInfo.length; num++) {
        $(newLists[num]).attr("id", "" + num);
        listOfListsInfo[num].id = num;
      for(var num2 = 0; num2 < listOfListsInfo[num].cards.length; num2++) {
        $($(newLists[num]).find(".cards .card")[num2]).attr("id", "" + num + num2 );
        listOfListsInfo[num].cards[num2].id = "" + num + num2;
      }
    }
    console.log("listOfListsInfo",listOfListsInfo);
    col--;
    $.get("http://thiman.me:1337/kenneths/list", function (response) {
      var uListID = response[listID]._id;
      $.ajax({
        url: "http://thiman.me:1337/kenneths/list/" + uListID,
        type: "DELETE",
        dataType: "json"
      });
        for(var num = 0; num < listOfListsInfo.length; num++) {
          var uListID = listOfListsInfo[num]._id;
          $.ajax({
            url: "http://thiman.me:1337/kenneths/list/" + uListID,
            data: listOfListsInfo[num],
            type: "PATCH",
            dataType: "json"
          });
          for(var num2 = 0; num2 < listOfListsInfo[num].cards.length; num2++) {
            var uCardID = listOfListsInfo[num].cards[num2]._id
            $.ajax({
              url: "http://thiman.me:1337/kenneths/list/" + uListID + "/card/" + uCardID,
              data: listOfListsInfo[num].cards[num2],
              type: "PATCH",
              dataType: "json"
            });
          }
        }
    });
  });
  //create a card
  board.on("click", ".list-cards button", function () {
    // Create in listOfListsInfo and Map
    var listIndex = $(this).parent().parent().attr("id");
    var cardIndex = listOfListsInfo[listIndex].cards.length;
    $.get("http://thiman.me:1337/kenneths/list/", function(json) {
      var uListID = json[listIndex]._id;
      $.post("http://thiman.me:1337/kenneths/list/" + uListID + "/card", function (response) {
          console.log(response);
          var uCardID = response.cards[cardIndex]._id;
          listOfListsInfo[listIndex].cards[cardIndex]._id = uCardID;
          console.log(listOfListsInfo[listIndex].cards[cardIndex]);
          $.ajax({
            url: "http://thiman.me:1337/kenneths/list/" + uListID + "/card/" + uCardID,
            data: listOfListsInfo[listIndex].cards[cardIndex],
            type: "PATCH",
            dataType: "json"
          });
      });
    });
    var newCardInfo = { id: "" + listIndex + cardIndex, name: "Card Name", description: "Placeholder description",
      labels: ["Example Label"], comments: ["I am an example comment"], members: [username]};
    listOfListsInfo[listIndex].cards.push(newCardInfo);
    map[newCardInfo.id] = { listIndex, cardIndex };
    //create in page
    var newCard = $("<div/>").addClass("card").attr("id", newCardInfo.id);
    newCard.append("<p>"+ newCardInfo.name +"</p><p>edit/info</p>");
    console.log($(this).parent().parent().find(".cards"));
    $(this).parent().parent().find(".cards").append(newCard);
  });
  //Delete a Card
  body.on("click", ".modal button.delete", function() {
    var cardToDelete = $(this).parent().parent().parent();
    var cardID = cardToDelete.attr("id");
    console.log(cardID);
    cardToDelete.remove();
    console.log($(".board #" + cardID));
    $(".board #" + cardID).remove();
    var newBoard = $(".board");
    var newLists = $(".list-list .list-cards");
    var listIndex = map[cardID].listIndex;
    var cardIndex = map[cardID].cardIndex;
    var uListID = listOfListsInfo[listIndex]._id;
    var uCardID = listOfListsInfo[listIndex].cards[cardIndex]._id;
    for(var num = 0; num < listOfListsInfo[listIndex].cards.length; num++) {
      //console.log($(newLists[num]));
        $($(newLists[listIndex]).find(".cards .card")[num]).attr("id", "" + listIndex + num);
        listOfListsInfo[listIndex].cards[num].id = "" + listIndex + num;
    }
    $.ajax({
      url: "http://thiman.me:1337/kenneths/list/" + uListID + "/card/" + uCardID,
      type: "DELETE",
      dataType: "json"
    }).done(function(response) {
      listOfListsInfo[listIndex].cards.splice(cardIndex, 1);
      for (var num = 0; num < listOfListsInfo[listIndex].cards.length; num++) {
        $.ajax({
          url: "http://thiman.me:1337/kenneths/list/" + uListID + "/card/" + uCardID,
          data: listOfListsInfo[listIndex].cards[num],
          type: "PATCH",
          dataType: "json"
        })
      }
    });
  });
  //list cards title set in data Structure
  board.on("keyup ", ".list-cards h3", function (e) {
    var parentId = $(this).parent().parent().attr("id");
    var newTitleValue = $(this).html();
    listOfListsInfo[parentId].title = newTitleValue;
    var uListID = listOfListsInfo[parentId]._id;
    $.ajax({
      url: "http://thiman.me:1337/kenneths/list/" + uListID,
      data: listOfListsInfo[parentId],
      type: "PATCH",
      dataType: "json"
    });
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
          members.append($("<p/>").attr("id", "" + num).addClass("member").html(cardMembers[num]).append($("<span/>").html("x")));
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
        labels.append($("<p/>").attr("id", "" + num).addClass("label").html(cardLabels[num]).append($("<span/>").html("x")));
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
        $("<div/>").addClass("comment-line").attr("id","" + num)
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
    var cardID = $(this).parent().parent().parent().attr("id");
    var listIndex = map[cardID].listIndex;
    var cardIndex = map[cardID].cardIndex;
    var newTitleValue = $(this).html();
    var uListID = listOfListsInfo[listIndex]._id;
    var uCardID = listOfListsInfo[listIndex].cards[cardIndex]._id;
    console.log(newTitleValue);
    console.log(cardID);
    listOfListsInfo[listIndex].cards[cardIndex].name = newTitleValue;
    $($($("#" + cardID).find("p"))[0]).html(newTitleValue);
    $.ajax({
      url: "http://thiman.me:1337/kenneths/list/" + uListID + "/card/" + uCardID,
      data: listOfListsInfo[listIndex].cards[cardIndex],
      type: "PATCH",
      dataType: "json"
    });
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
        if (memberFormValue.length > 0) {
          var cardID = $(this).parent().parent().parent().parent().parent().attr("id");
          var listIndex = map[cardID].listIndex;
          var cardIndex = map[cardID].cardIndex;
          var uListID = listOfListsInfo[listIndex]._id;
          var uCardID = listOfListsInfo[listIndex].cards[cardIndex]._id;
          $(".member-button").before("<p id=" + (listOfListsInfo[listIndex].cards[cardIndex].members.length) +" class=\"member\">" + memberFormValue + "<span>x</span></p>");
          $(this).find("input").val("");
          $(".input-member-name").css("display", "none");
          listOfListsInfo[listIndex].cards[cardIndex].members.push(memberFormValue);
          $.ajax({
            url: "http://thiman.me:1337/kenneths/list/" + uListID + "/card/" + uCardID,
            data: listOfListsInfo[listIndex].cards[cardIndex],
            type: "PATCH",
            dataType: "json"
          });
        }
        return false;
    }
  });
  // Fullview Delete A Member
  body.on("click", ".modal .members p", function () {
    var cardID = $(this).parent().parent().parent().attr("id");
    var listIndex = map[cardID].listIndex;
    var cardIndex = map[cardID].cardIndex;
    var uListID = listOfListsInfo[listIndex]._id;
    var uCardID = listOfListsInfo[listIndex].cards[cardIndex]._id;
    var memberID = parseInt($(this).attr("id"));
    var listOfMembers = $(this).parent();
    $(this).remove();
    listOfMembers = listOfMembers.find("p");
    for (var num = 0; num < listOfMembers.length; num++) {
      $(listOfMembers[num]).attr("id", "" + num);
    }
    listOfListsInfo[listIndex].cards[cardIndex].members.splice(memberID, 1);
    $.ajax({
      url: "http://thiman.me:1337/kenneths/list/" + uListID + "/card/" + uCardID,
      data: listOfListsInfo[listIndex].cards[cardIndex],
      type: "PATCH",
      dataType: "json"
    });
  });
  //Fullview - Show Add Label Dropdown
  body.on("click",".modal .labels button", function() {
    if ($(".input-label-name").css("display") === "block") {
      $(".input-label-name").css("display", "none");
    } else {
      $(".input-label-name").css("display", "block");
    }
  });
  //Fullview Add A Label
  body.on("keypress", ".modal .labels form", function(e) {
    if(e.which == 13) {
        e.preventDefault();
        var labelFormValue = $(this).find("input").val();
        console.log(labelFormValue.length);
        if (labelFormValue.length > 0) {
          var cardID = $(this).parent().parent().parent().parent().parent().attr("id");
          var listIndex = map[cardID].listIndex;
          var cardIndex = map[cardID].cardIndex;
          var uListID = listOfListsInfo[listIndex]._id;
          var uCardID = listOfListsInfo[listIndex].cards[cardIndex]._id;
          $(".label-button").before("<p id=" + (listOfListsInfo[listIndex].cards[cardIndex].labels.length) +" class=\"label\">" + labelFormValue + "<span>x</span></p>");
          $(this).find("input").val("");
          $(".input-label-name").css("display", "none");
          listOfListsInfo[listIndex].cards[cardIndex].labels.push(labelFormValue);
          $.ajax({
            url: "http://thiman.me:1337/kenneths/list/" + uListID + "/card/" + uCardID,
            data: listOfListsInfo[listIndex].cards[cardIndex],
            type: "PATCH",
            dataType: "json"
          });
        }
        return false;
    }
  });
  //Fullview Delete a label
  body.on("click", ".modal .labels p", function () {
    var cardID = $(this).parent().parent().parent().attr("id");
    var listIndex = map[cardID].listIndex;
    var cardIndex = map[cardID].cardIndex;
    var uListID = listOfListsInfo[listIndex]._id;
    var uCardID = listOfListsInfo[listIndex].cards[cardIndex]._id;
    var labelID = parseInt($(this).attr("id"));
    var listOfLabels = $(this).parent();
    $(this).remove();
    listOfLabels = listOfLabels.find("p");
    for (var num = 0; num < listOfLabels.length; num++) {
      $(listOfLabels[num]).attr("id", "" + num);
    }
    listOfListsInfo[listIndex].cards[cardIndex].labels.splice(labelID, 1);
    $.ajax({
      url: "http://thiman.me:1337/kenneths/list/" + uListID + "/card/" + uCardID,
      data: listOfListsInfo[listIndex].cards[cardIndex],
      type: "PATCH",
      dataType: "json"
    });
  });
  //Fullview Edit Description
  body.on("click", ".modal .description .edit", function() {
    var descriptionText = $(this).parent().find(".description-text");
    if (descriptionText.attr("contenteditable") === "true") {
      var newDescription = descriptionText.html();
      var cardID = $(this).parent().parent().parent().attr("id");
      console.log(cardID);
      var listIndex = map[cardID].listIndex;
      var cardIndex = map[cardID].cardIndex;
      var uListID = listOfListsInfo[listIndex]._id;
      var uCardID = listOfListsInfo[listIndex].cards[cardIndex]._id;
      descriptionText.attr("contenteditable", "false");
      //Send to storage
      listOfListsInfo[listIndex].cards[cardIndex].description = newDescription;
      $(this).html("edit");
      $.ajax({
        url: "http://thiman.me:1337/kenneths/list/" + uListID + "/card/" + uCardID,
        data: listOfListsInfo[listIndex].cards[cardIndex],
        type: "PATCH",
        dataType: "json"
      });
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
      var cardID = $(this).parent().parent().parent().parent().attr("id");
      var listIndex = map[cardID].listIndex;
      var cardIndex = map[cardID].cardIndex;
      var uListID = listOfListsInfo[listIndex]._id;
      var uCardID = listOfListsInfo[listIndex].cards[cardIndex]._id;
      console.log(cardID);
      var commentLine = $("<div/>").addClass("comment-line").attr("id", "" + (1 + listOfListsInfo[listIndex].cards[cardIndex].members.length));
      var member = $("<p/>").addClass("member").html(username);
      var comment = $("<p/>").addClass("comment-text").html(commentText)
      var commentDelete = $("<span/>").addClass("comment-delete").html("Delete Comment");
      commentLine.append(member).append(comment).append(commentDelete);
      $(this).parent().parent().find(".comment-section").prepend(commentLine);
      $(this).parent().find("textarea").val("");
      listOfListsInfo[listIndex].cards[cardIndex].comments.unshift(commentText);
      var listOfComments = $(this).parent().parent().find(".comment-section").find(".comment-line");
      for (var num = 0; num < listOfComments.length; num++) {
        $(listOfComments[num]).attr("id", "" + num);
      }
      $.ajax({
        url: "http://thiman.me:1337/kenneths/list/" + uListID + "/card/" + uCardID,
        data: listOfListsInfo[listIndex].cards[cardIndex],
        type: "PATCH",
        dataType: "json"
      });
    }
  });
  //Delete A Comment
  body.on("click",".modal .comments .comment-section .comment-line .comment-delete", function() {
    var cardID = $(this).parent().parent().parent().parent().parent().attr("id");
    var listIndex = map[cardID].listIndex;
    var cardIndex = map[cardID].cardIndex;
    var uListID = listOfListsInfo[listIndex]._id;
    var uCardID = listOfListsInfo[listIndex].cards[cardIndex]._id;
    var commentID = parseInt($($(this).parent()).attr("id"));
    var listOfComments = $(this).parent().parent();
    $(this).parent().remove();
    listOfComments = listOfComments.find(".comment-line");
    for (var num = 0; num < listOfComments.length; num++) {
      $(listOfComments[num]).attr("id", "" + num);
    }
    listOfListsInfo[listIndex].cards[cardIndex].comments.splice(commentID, 1);
    $.ajax({
      url: "http://thiman.me:1337/kenneths/list/" + uListID + "/card/" + uCardID,
      data: listOfListsInfo[listIndex].cards[cardIndex],
      type: "PATCH",
      dataType: "json"
    });
  });

});
