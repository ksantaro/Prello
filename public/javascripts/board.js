//function ListOfCards(title, listOfCards, addButton, parent);
var username;
var userEmail;
var curDate;
var boardName;
var boardID;
var originUser;
var originEmail;
var boardUsers;
var originUserID;
var userID;
socket.emit("url", url);
/*
socket.on('connection', function(socket){
  socket.join(url);
});
*/

function formatCurDate(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var month = date.getMonth() + 1;
  var year = date.getFullYear().toString().substr(-2);
  var day = date.getDate();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = month + "/" + day + '/' + year + ", " + hours + ':' + minutes + ' ' + ampm + " - ";
  return strTime;
}
//Data Structure
var map = {};
var ajaxLOLInfo;
var listOfListsInfo;
var populateLists = [];
var listOfBoards = [];
var listOfSharedBoards = [];
var menuAddButton = $(".dropdown-content #add-board-button");
var userAddButton = $(".options-dropdown #add-new-user");
var userEmail;

$.get("http://localhost:3000/uniqueID", function(response) {
  userID = response;
});

$.get("http://localhost:3000/email",function(response) {
  userEmail = response;
});

$.get("http://localhost:3000/board/" + url, function (json) {
    boardName = json.name;
    ajaxLOLInfo = json.lists;
    boardID = json.id;
    originUserID = json.userID;
    boardUsers = json.userList;
    $.get("http://localhost:3000/users/users/" + originUserID, function(response) {
      originEmail = response.email;
    });
    var listOfListsInfo = ajaxLOLInfo;
    $("h1#h1-white").html(boardName);
    $("title").html(boardName);
    $.get("http://localhost:3000/board", function(response) {
      for (var num = 0; num < response.length; num++) {
        if (response[num].userID === userID) {
          listOfBoards.push(response[num]);
        }
        for (var num2 = 0; num2 < response[num].userList.length; num2++) {
          if (response[num].userList[num2].email === userEmail) {
            listOfSharedBoards.push(response[num]);
          }
        }
      }

      for (var num = 0; num < listOfBoards.length; num++) {
        if (listOfBoards[num].name === boardName) {
          var boardID = num;
        }
        menuAddButton.before($("<a/>").attr("id", num + "").attr("href","./" + listOfBoards[num]._id).html(listOfBoards[num].name));
      }
      for (var num = 0; num < listOfSharedBoards.length; num++) {
        $(".dropdown-content").append($("<a/>").attr("href","./" + listOfSharedBoards[num]._id).html(listOfSharedBoards[num].name))
      }
    });
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
  });
/*
$.ajax({
    // The URL for the request
    url: "http://localhost:3000/list",
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
  $.get("http://localhost:3000/username",function(response) {
    username = response;
  });
  $.get("http://localhost:3000/email",function(response) {
    userEmail = response;
  });


  //Selectors
  var body = $("body");
  var listOfLists = board.find(".list-cards"); //last one is a button'
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
  var boardTitle = $("h1#h1-white");
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

  //Open Modal Menu Add Button
  menuAddButton.click(function(e) {
    var createModal = $("<div/>").addClass("modal-menu").append($("<div/>").addClass("add-new-board")
      .append($("<h2/>").html("Title"))
      .append($("<span/>").html("X"))
      .append($("<input/>").attr("type","text").attr("placeholder","title of the new board"))
      .append($("<button/>").attr("type","button").html("Create")));
    body.append(createModal);
    dropdownContent.css("display", "none");
    optionsContent.css("display", "none");
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
    $(this).parent().parent().remove();
    $.ajax({
      type: "POST",
      url: "http://localhost:3000/board",
      data: {name: newBoard.name, id: newBoard.id, userID: newBoard.userID},
      success: function(response) {
        menuAddButton.before($("<a/>").attr("id", listOfBoards.length+ "").attr("href","./" + response._id ).html(titleValue));
        newBoard._id = response._id;
        listOfBoards.push(newBoard);

      },
      dataType: "json"
    });
  });
  //Save New Board Title
  boardTitle.on("keyup ", function (e) {
    var newTitleValue = $(this).html();
    boardName = newTitleValue;
    $(".dropdown-content a:nth-child(" + (parseInt(boardID) + 1) + ")").html(newTitleValue);
    $.ajax({
      url: "http://localhost:3000/board/"+ url,
      data: {
        name: boardName,
        id: boardID,
        user: originUser,
      },
      type: "PATCH",
      dataType: "json"
    });
  });
  //Open Modal Add User Add Button
  userAddButton.click(function(e) {
    var mainModal = $("<div/>").addClass("modal-add-user");
    var createModal = $("<div/>").addClass("add-new-user")
      .append($("<h2/>").html("User Email"))
      .append($("<span/>").html("X"))
      .append($("<input/>").attr("type","text").attr("placeholder","e.g. jdoe@gmail.com"))
      .append($("<button/>").attr("type","button").html("Add"))
      .append($("<h3/>").html("All Users On Board"));
    createModal.append($("<p/>").addClass("main-email").html(originEmail));
    for (var num = 0; num < boardUsers.length; num++) {
      createModal.append($("<p/>").addClass("user-email").html(boardUsers[num].email));
    }
    mainModal.append(createModal);
    body.append(mainModal);
    dropdownContent.css("display", "none");
    optionsContent.css("display", "none");
    //option display none
  });
  //Close Modal If clicked elsewhere
  body.on("click",".modal-add-user", function(e) {
    if ($(this).is(e.target) && $(this).has(e.target).length === 0) {
      $(this).remove();
      $("body").css("overflow", "auto");
  }});
  //Close Modal
  body.on("click", ".modal-add-user span", function(e) {
    $(this).parent().parent().remove();
  });
  //Add the user
  body.on("click", ".modal-add-user button", function(e) {
    var emailValue = $($(this).parent().find("input")).val();
    $(this).parent().parent().remove();

    $.ajax({
      type: "POST",
      url: "http://localhost:3000/board/" + url + "/user/" + emailValue,
      success: function(response) {
        //addButton.before($("<a/>").attr("href","./index/" + response._id).html(titleValue));
        //menuAddButton.before($("<a/>").attr("href","./index/" + response._id ).html(titleValue));
        if (response === "user already in group") {
          alert(response);
        } else if (response === "user does not exsist") {
          alert(response);
        } else {
          listOfBoards[parseInt(boardID)].userList.push(response);
          boardUsers.push(response);
        }
      },
      error: function(jqXHR,textStatus, errorThrown ) {

      },
      dataType: "json",
    });
  });
  //add a new list
  addNewList.click( function () {
    listOfLists = board.find(".list-cards");
    $.post("http://localhost:3000/board/" + url + "/list", function(response) {});
    $.get("http://localhost:3000/board/" + url, function(json) {
      response = json.lists;
      var uListID = response[response.length - 1]._id
      var newObjectList = {
        _id: uListID,
        id: "" + col,
        title: "Title",
        cards: [],
      }
      //console.log(socket.emit("newList", newObjectList));
      //io.getInstance().emit("newList", newObjectList);
      listOfListsInfo.push(newObjectList);
      var newList ="<div class=\"list-cards\" id=\""+ col +"\"><div class=\"list-cards-title\"><h3 contenteditable=\"true\">Title</h3><span class=\"remove-list-cards\">x</span></div><div class=\"cards\"></div><div id=\"card-object\" class=\"card add-card\"><button type=\"button\">Add a new card +</button></div></div>";
      col++;
      board.append(newList);
      $.ajax({
        url: "http://localhost:3000/board/" + url + "/list/" + uListID,
        data : newObjectList,
        type: "PATCH",
        dataType: "json",
        success: function(response) {
          var data = {url: url, data: response.lists[response.lists.length - 1]}
          socket.emit("newList", data);
        }
      });
    });
  });
  socket.on("new list", function(post) {
    listOfLists = board.find(".list-cards");
    listOfListsInfo.push(post);
    var newList ="<div class=\"list-cards\" id=\""+ col +"\"><div class=\"list-cards-title\"><h3 contenteditable=\"true\">Title</h3><span class=\"remove-list-cards\">x</span></div><div class=\"cards\"></div><div id=\"card-object\" class=\"card add-card\"><button type=\"button\">Add a new card +</button></div></div>";
    col++;
    board.append(newList);
  });
  //delete a list
  board.on("click", ".list-cards .remove-list-cards", function() {
    var listToDelete = $(this).parent().parent();
    var listID = listToDelete.attr("id");
    listToDelete.remove();
    var newBoard = $(".board");
    var newLists = $(".list-list .list-cards");
    listOfListsInfo.splice(listID, 1);
    for(var num = 0; num < listOfListsInfo.length; num++) {
        $(newLists[num]).attr("id", "" + num);
        listOfListsInfo[num].id = num;
      for(var num2 = 0; num2 < listOfListsInfo[num].cards.length; num2++) {
        $($(newLists[num]).find(".cards .card")[num2]).attr("id", "" + num + num2 );
        listOfListsInfo[num].cards[num2].id = "" + num + num2;
      }
    }
    col--;
    socket.emit("deleteList", {url: url, data: listID});
    $.get("http://localhost:3000/board/" + url + "/list", function (response) {
      var uDListID = response[listID]._id;
      $.ajax({
        url: "http://localhost:3000/board/" + url + "/list/" + uDListID,
        type: "DELETE",
        dataType: "json",
        success: function(json) {
          var listsInfo = json.lists;
          var curList;
          var curCard;
          var UListID;
          var UCardID;
          for (num = 0; num < listsInfo.length; num++) {
            listsInfo[num].id = num;
            curList = listsInfo[num];
            UListID = curList._id;
            $.ajax({
              url: "http://localhost:3000/board/" + url + "/list/" + UListID,
              type: "PATCH",
              dataType: "json",
              data: {
                title : curList.title,
                _id : UListID,
                id : curList.id,
              },
              success : function(res) {
              }
            });
            var cardListInfo;
            for (var num2 = 0; num2 < listOfListsInfo[num].cards.length; num2++) {
              cardListInfo = json.lists[num].cards;
              listsInfo[num].cards[num2].id = ""+ num + num2;
              curCard = listsInfo[num].cards[num2];
              UCardID = curCard._id;
              var urlInfo = "http://localhost:3000/board/" + url + "/list/" + UListID + "/card/" + UCardID;
              $.ajax({
                url: urlInfo,
                type: "PATCH",
                dataType: "json",
                data: {
                  name: curCard.name,
                  id: curCard.id,
                  _id: curCard._id,
                  description: curCard.description,
                },
                success: function(res) {
                }
              });
            }
          }
        }
      });
      var uListID;
    });
  });
  socket.on("delete list", function(listID) {
    var listToDelete = $(".list-list .list-cards")[listID];
    listToDelete.remove();
    var newBoard = $(".board");
    var newLists = $(".list-list .list-cards");
    listOfListsInfo.splice(listID, 1);
    for(var num = 0; num < listOfListsInfo.length; num++) {
        $(newLists[num]).attr("id", "" + num);
        listOfListsInfo[num].id = num;
      for(var num2 = 0; num2 < listOfListsInfo[num].cards.length; num2++) {
        $($(newLists[num]).find(".cards .card")[num2]).attr("id", "" + num + num2 );
        listOfListsInfo[num].cards[num2].id = "" + num + num2;
      }
    }
    col--;
  });
  //create a card
  board.on("click", ".list-cards button", function () {
    // Create in listOfListsInfo and Map
    var listIndex = $(this).parent().parent().attr("id");
    var cardIndex = listOfListsInfo[listIndex].cards.length;
    var uListID = listOfListsInfo[listIndex]._id;
    $.post("http://localhost:3000/board/" + url + "/list/" + uListID + "/card", function (response) {
    });
    $.get("http://localhost:3000/board/" + url + "/list/", function(response) {
      var uCardID = response[listIndex].cards[cardIndex]._id;
      listOfListsInfo[listIndex].cards[cardIndex]._id = uCardID;
      var cardInfo = newCardInfo;

      var cardToEmit = {
        _id : uCardID,
        description : cardInfo.description,
        id : cardInfo.id,
        name : cardInfo.name,
        comments : cardInfo.comments,
        members : cardInfo.members,
        labels : cardInfo.lables,
      }
      socket.emit("newCard", {url: url, data: {newCardInfo: cardToEmit, listIndex, cardIndex, labels : cardInfo.labels}});
      $.ajax({
        url: "http://localhost:3000/board/" + url + "/list/" + uListID + "/card/" + uCardID,
        data: {
          _id : uCardID,
          description : cardInfo.description,
          id : cardInfo.id,
          name : cardInfo.name,
          comments : cardInfo.comments,
          members : cardInfo.members,
          labels : cardInfo.lables,
          //'labels' : cardInfo.lables,
          //'labels': ['Whats up', "not much"],
          //labels: ["heelo", "What the"]
        },
        type: "PATCH",
        dataType: "json",
        success: function(response) {
        }
      });
      $.ajax({
        url: "http://localhost:3000/board/" + url + "/list/" + uListID + "/card/" + uCardID + "/label",
        data: {label : "example label"},
        type: "POST",
        dataType: "json",
      });
    });

    var newCardInfo = { id: "" + listIndex + cardIndex, name: "Card Name", description: "Placeholder description",
      labels: [{label: "example label"}], comments: [], members: []};
    listOfListsInfo[listIndex].cards.push(newCardInfo);
    map[newCardInfo.id] = { listIndex, cardIndex };
    //create in page
    var newCard = $("<div/>").addClass("card").attr("id", newCardInfo.id);
    newCard.append("<p>"+ newCardInfo.name +"</p><p>edit/info</p>");
    $(this).parent().parent().find(".cards").append(newCard);
  });
  socket.on("new card", function(post) {
    var newCardInfo = post.newCardInfo;
    newCardInfo.labels = post.labels;
    var listIndex = post.listIndex;
    var cardIndex = post.cardIndex;
    listOfListsInfo[listIndex].cards.push(newCardInfo);
    map[newCardInfo.id] = { listIndex, cardIndex };
    //create in page
    var newCard = $("<div/>").addClass("card").attr("id", newCardInfo.id);
    newCard.append("<p>"+ newCardInfo.name +"</p><p>edit/info</p>");
    var listToAddCard = $($($(".list-list .list-cards")[listIndex]).find(".cards"));
    listToAddCard.append(newCard);
    $(this).parent().parent().find(".cards").append(newCard);
  });
  //Delete a Card
  body.on("click", ".modal button.delete", function() {
    var cardToDelete = $(this).parent().parent().parent();
    var cardID = cardToDelete.attr("id");
    socket.emit("deleteCard", {url: url, data: cardID});
    cardToDelete.remove();
    $(".board #" + cardID).remove();
    var newBoard = $(".board");
    var newLists = $(".list-list .list-cards");
    var listIndex = map[cardID].listIndex;
    var cardIndex = map[cardID].cardIndex;
    var uListID = listOfListsInfo[listIndex]._id;
    var uCardID = listOfListsInfo[listIndex].cards[cardIndex]._id;

    $.ajax({
      url: "http://localhost:3000/board/" + url + "/list/" + uListID + "/card/" + uCardID,
      type: "DELETE",
      dataType: "json"
    }).done(function(response) {
      $.ajax({
        url: "http://localhost:3000/board/" + url + "/list",
        type: "GET",
        dataType: "json"
      }).done(function(response) {
        listOfListsInfo[listIndex].cards.splice(cardIndex, 1);
        for(var num = 0; num < listOfListsInfo[listIndex].cards.length; num++) {
          //console.log($(newLists[num]));
            $($(newLists[listIndex]).find(".cards .card")[num]).attr("id", "" + listIndex + num);
            listOfListsInfo[listIndex].cards[num].id = "" + listIndex + num;
            uCardID = listOfListsInfo[listIndex].cards[num]._id;
            $.ajax({
              url: "http://localhost:3000/board/" + url + "/list/" + uListID + "/card/" + uCardID,
              data: listOfListsInfo[listIndex].cards[num],
              type: "PATCH",
              dataType: "json"
            });
        }
      });
    });
  });
  socket.on("delete card", function(cardID) {
    $(".board #" + cardID).remove();
    var newBoard = $(".board");
    var newLists = $(".list-list .list-cards");
    var listIndex = map[cardID].listIndex;
    var cardIndex = map[cardID].cardIndex;
    listOfListsInfo[listIndex].cards.splice(cardIndex, 1);
    for(var num = 0; num < listOfListsInfo[listIndex].cards.length; num++) {
      //console.log($(newLists[num]));
        $($(newLists[listIndex]).find(".cards .card")[num]).attr("id", "" + listIndex + num);
        listOfListsInfo[listIndex].cards[num].id = "" + listIndex + num;
    }
  });
  //list cards title set in data Structure
  board.on("keyup ", ".list-cards h3", function (e) {
    var parentId = $(this).parent().parent().attr("id");
    var newTitleValue = $(this).html();
    listOfListsInfo[parentId].title = newTitleValue;
    var uListID = listOfListsInfo[parentId]._id;
    $.ajax({
      url: "http://localhost:3000/board/"+ url +"/list/" + uListID,
      data: listOfListsInfo[parentId],
      type: "PATCH",
      dataType: "json"
    });
    socket.emit("changeListTitle", {url: url, data: {title: newTitleValue, parentId :parentId}});
  });
  socket.on("change list title", function(titleInfo) {
    var parentId = titleInfo.parentId;
    var newTitleValue = titleInfo.title;
    listOfListsInfo[parentId].title = newTitleValue;
    //$($(".list-list")[parentId]).html(newTitleValue);
  });
  //Show Board dropdown
  boardBtn.click(function () {
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
    $(this).parent().parent().parent().remove();
    $("body").css("overflow", "auto");
  });
  //Open Fullview
  board.on("click", ".list-cards .cards .card", function () {
    var cardID = $(this).attr("id");
    var cardIndex = map[cardID].cardIndex;
    var listIndex = map[cardID].listIndex;
    var cardInfo = listOfListsInfo[listIndex].cards[cardIndex];
    var uListID = listOfListsInfo[listIndex]._id;
    var uCardID = cardInfo._id;
    $.ajax({
      url : "http://localhost:3000/board/" + url,
      type: "GET",
      dataType: "json",
      success: function(response) {
        listOfListsInfo[listIndex].cards[cardIndex] = response.lists[listIndex].cards[cardIndex];
        cardInfo = listOfListsInfo[listIndex].cards[cardIndex];
        var cardName = cardInfo.name;
        var cardDescription = cardInfo.description;
        var cardLabels = cardInfo.labels;
        var cardComments = cardInfo.comments;
        var cardMembers = cardInfo.members;
        $($($("#" + cardID).find("p"))[0]).html(cardName);
        //Build fullview
        var modal = $("<div/>").addClass("modal").attr("id", cardID);
        var fullview = $("<div/>").addClass("card-fullview");
        var title = $("<div/>").addClass("card-fullview-title")
                    .append($("<h2/>").attr("contenteditable", "true").html(cardName))
                    .append($("<span/>").addClass("close-modal").html("X"));
        var members = $("<div/>").addClass("members").append($("<h3/>").html("Members"));
              for (var num = 0; num < cardMembers.length; num++) {
              members.append($("<p/>").attr("id", "" + num).addClass("member").html(cardMembers[num].member).append($("<span/>").html("x")));
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
            labels.append($("<p/>").attr("id", "" + num).addClass("label").html(cardLabels[num].label).append($("<span/>").html("x")));
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
          var commentInfo = cardComments[num];
          comments.find(".comment-section").append(
            $("<div/>").addClass("comment-line").attr("id","" + num)
            .append($("<p/>").addClass("member").html(commentInfo.user))
            .append($("<p/>").addClass("comment-text").html(commentInfo.comment))
            .append($("<span/>").addClass("comment-date").html(commentInfo.date))
            .append($("<span/>").addClass("comment-delete").html("Delete Comment"))
          );
        }
        var addDelete = $("<div/>").addClass("add-delete").append($("<button/>").addClass("delete").attr("type","button").html("Delete"));
        fullview.append(title).append(members).append(description).append(labels).append(comments).append(addDelete);
        modal.append(fullview);
        body.append(modal);
        dropdownContent.css("display", "none");
        optionsContent.css("display", "none");
      },
    });
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
    listOfListsInfo[listIndex].cards[cardIndex].name = newTitleValue;
    $($($("#" + cardID).find("p"))[0]).html(newTitleValue);
    var cardInfo = listOfListsInfo[listIndex].cards[cardIndex];
    $.ajax({
      url: "http://localhost:3000/board/" + url + "/list/" + uListID + "/card/" + uCardID,
      data: {
        name : cardInfo.name,
        description : cardInfo.description,
        labels : cardInfo.labels,
        members : cardInfo.members,
        comments : cardInfo.comments,
        users : cardInfo.users,
        dates: cardInfo.dates,
        id : cardInfo.id,
        _id : cardInfo._id,
      },
      type: "PATCH",
      dataType: "json",
      success: function() {
      },
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
          $.ajax({
            url: "http://localhost:3000/board/" + url + "/list/" + uListID + "/card/" + uCardID + "/member/",
            type: "POST",
            dataType: "json",
            data: {
              member: memberFormValue,
            },
            success: function(response) {
              var membersList = response.lists[listIndex].cards[cardIndex].members;
              var memberObject = membersList[membersList.length - 1];
              listOfListsInfo[listIndex].cards[cardIndex].members.push(memberObject);
            }
          });
          //var memberObject = {member: memberFormValue}
          //listOfListsInfo[listIndex].cards[cardIndex].members.push(memberFormValue);
          //var cardInfo = listOfListsInfo[listIndex].cards[cardIndex];
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
    var uMemberID = listOfListsInfo[listIndex].cards[cardIndex].members[memberID]._id;
    listOfListsInfo[listIndex].cards[cardIndex].members.splice(memberID, 1);
    $.ajax({
      url: "http://localhost:3000/board/" + url + "/list/" + uListID + "/card/" + uCardID + "/member/" + uMemberID,
      type: "DELETE",
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
        if (labelFormValue.length > 0) {
          var cardID = $(this).parent().parent().parent().parent().parent().attr("id");
          var listIndex = map[cardID].listIndex;
          var cardIndex = map[cardID].cardIndex;
          var uListID = listOfListsInfo[listIndex]._id;
          var uCardID = listOfListsInfo[listIndex].cards[cardIndex]._id;
          $(".label-button").before("<p id=" + (listOfListsInfo[listIndex].cards[cardIndex].labels.length) +" class=\"label\">" + labelFormValue + "<span>x</span></p>");
          $(this).find("input").val("");
          $(".input-label-name").css("display", "none");
          $.ajax({
            url: "http://localhost:3000/board/" + url + "/list/" + uListID + "/card/" + uCardID + "/label/",
            type: "POST",
            dataType: "json",
            data: {
              label: labelFormValue,
            },
            success: function(response) {
              var labelsList = response.lists[listIndex].cards[cardIndex].labels;
              var labelObject = labelsList[labelsList.length - 1];
              listOfListsInfo[listIndex].cards[cardIndex].labels.push(labelObject);
            }
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
    var uLabelID = listOfListsInfo[listIndex].cards[cardIndex].labels[labelID]._id;
    listOfListsInfo[listIndex].cards[cardIndex].labels.splice(labelID, 1);
    $.ajax({
      url: "http://localhost:3000/board/" + url + "/list/" + uListID + "/card/" + uCardID + "/label/" + uLabelID,
      type: "DELETE",
      dataType: "json"
    });
  });
  //Fullview Edit Description
  body.on("click", ".modal .description .edit", function() {
    var descriptionText = $(this).parent().find(".description-text");
    if (descriptionText.attr("contenteditable") === "true") {
      var newDescription = descriptionText.html();
      var cardID = $(this).parent().parent().parent().attr("id");
      var listIndex = map[cardID].listIndex;
      var cardIndex = map[cardID].cardIndex;
      var uListID = listOfListsInfo[listIndex]._id;
      var uCardID = listOfListsInfo[listIndex].cards[cardIndex]._id;
      descriptionText.attr("contenteditable", "false");
      //Send to storage
      listOfListsInfo[listIndex].cards[cardIndex].description = newDescription;
      $(this).html("edit");
      $.ajax({
        url: "http://localhost:3000/board/" + url + "/list/" + uListID + "/card/" + uCardID,
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
    curDate = new Date();
    var curUser = username;
    var timeString = formatCurDate(curDate);
    var commentText = $(this).parent().find("textarea").val();
    if (commentText.length > 0) {
      var cardID = $(this).parent().parent().parent().parent().attr("id");
      var listIndex = map[cardID].listIndex;
      var cardIndex = map[cardID].cardIndex;
      var uListID = listOfListsInfo[listIndex]._id;
      var uCardID = listOfListsInfo[listIndex].cards[cardIndex]._id;
      var commentLine = $("<div/>").addClass("comment-line").attr("id", "" + (1 + listOfListsInfo[listIndex].cards[cardIndex].members.length));
      var member = $("<p/>").addClass("member").html(curUser);
      var comment = $("<p/>").addClass("comment-text").html(commentText);
      var commentTime = $("<span/>").addClass("comment-date").html(timeString);
      var commentDelete = $("<span/>").addClass("comment-delete").html("Delete Comment");
      commentLine.append(member).append(comment).append(commentTime).append(commentDelete);
      $(this).parent().parent().find(".comment-section").prepend(commentLine);
      $(this).parent().find("textarea").val("");
      var listOfComments = $(this).parent().parent().find(".comment-section").find(".comment-line");
      for (var num = 0; num < listOfComments.length; num++) {
        $(listOfComments[num]).attr("id", "" + num);
      }
      var cardInfo = listOfListsInfo[listIndex].cards[cardIndex];
      $.ajax({
        url: "http://localhost:3000/board/" + url + "/list/" + uListID + "/card/" + uCardID + "/comment/",
        type: "POST",
        dataType: "json",
        data: {
          comment: commentText,
          date: timeString,
          user: username,
        },
        success: function(response) {
          var commentsList = response.lists[listIndex].cards[cardIndex].comments;
          var commentObject = commentsList[0];
          listOfListsInfo[listIndex].cards[cardIndex].comments.unshift(commentObject);
        }
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
    var uCommentID = listOfListsInfo[listIndex].cards[cardIndex].comments[commentID]._id;
    listOfListsInfo[listIndex].cards[cardIndex].comments.splice(commentID, 1);
    $.ajax({
      url: "http://localhost:3000/board/" + url + "/list/" + uListID + "/card/" + uCardID + "/comment/" + uCommentID,
      type: "DELETE",
      dataType: "json"
    });
  });
});

socket.on('newList', function(msg){
      $('#messages').append($('<li>').text(msg));
    });
