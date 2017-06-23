
function Board(listOfList) {
  this.board = listOfLists //.board
  this.listOfLists = listOfLists.querySelectorAll("#list-cards"); //list of lists
  this.listOfListOfCards = []; //A list of lists of ListOfCards
  this.addNewList = this.board.querySelector("div.list-cards.add-list");
  self = this;
  this.init = function() {
    var cardObjects;
    var listOfCards;
    var listTitle;
    var listCards;
    var listAddBtn;
    console.log(111, this.listOfLists);
    for (var num = 0; num < this.listOfLists.length; num++) {
      cardObjects = this.listOfLists[num].querySelectorAll("#card-object");
      listTitle = cardObjects[0];
      listCards = [];
      listAddBtn = cardObjects[cardObjects.length - 1];
      for (var num2 = 1; num2 < cardObjects.length - 1; num2++) {
        listCards.push(cardObjects[num2]);
      }
      listOfCards = new ListOfCards(listTitle, listCards, listAddBtn, this.listOfLists[num]);

      this.listOfListOfCards.push(listOfCards);
    }
  };
  this.init();
  this.board.querySelector("#add-new-list").addEventListener("click", function(e) {
    var listOfCards = "<div id=\"list-cards\" class=\"list-cards\"><h3 id=\"card-object\" contenteditable=\"true\">" + "Click me To change title!" + "</h3><div id=\"card-object\" class=\"card add-card\"><button type=\"button\">" + "Add a new card +" + "</button></div></div>";
    //console.log(board.board.querySelector("div.list-cards.add-list"));
    self.board.innerHTML += listOfCards;
    console.log(board.addNewList);
    self.board.appendChild(board.addNewList);
    self.board.removeChild(board.board.querySelector("div.list-cards.add-list"));

    /*
    var cardObjects;
    var listOfCards;
    var listTitle;
    var listCards;
    var listAddBtn;
    var listOfLists;
    self.listOfLists = document.querySelector("#board");
    self.listOfListOfCards = [];
    self.listOfLists = self.listOfLists.querySelectorAll("#list-cards");
    console.log(333, self.listOfLists);
    for (var num = 0; num < self.listOfLists.length; num++) {
      cardObjects = self.listOfLists[num].querySelectorAll("#card-object");
      listTitle = cardObjects[0];
      listCards = [];
      listAddBtn = cardObjects[cardObjects.length - 1];
      for (var num2 = 1; num2 < cardObjects.length - 1; num2++) {
        listCards.push(cardObjects[num2]);
      }
      listOfCards = new ListOfCards(listTitle, listCards, listAddBtn, self.listOfLists[num]);
      self.listOfListOfCards.push(listOfCards);
      console.log("loloc", self.listOfListOfCards);
    }
    self.board = document.querySelector("#board"); */
  });

  this.board.addEventListener("click", function(e) {
    console.log(e.target.nodeName);
    console.log(e.target);
    if (e.target.nodeName === "DIV") {
      for (var num = 0; num < self.listOfListOfCards.length; num++) {
        for (var num2 = 0; num2 < self.listOfListOfCards[num].listOfCards.length; num2++) {
          if (self.listOfListOfCards[num].listOfCards[num2] === e.target) {
            console.log(0,self.listOfListOfCards[num].listOfCards[num2], e.target);
            console.log(1,self.listOfListOfCards);
            console.log(2,self.listOfListOfCards[num]);
            console.log(3,self.listOfListOfCards[num].fullviewCard());
          }
        }
      }
    }
  });

  this.debug = function() {
    console.log("Board",this.board);
    console.log("listOfLists",this.listOfLists);
    console.log("listOfListOfCards",this.listOfListOfCards);
  };
}

function ListOfCards(title, listOfCards, addButton, parent) {
  this.parent = parent;
  this.title = title;
  this.listOfCards = listOfCards;
  this.addButton = addButton;
  this.newParent;
  var self = this;
  this.init = function () {
  };
  this.init();


  this.fullviewCard = function () {
    listOfLists.innerHTML += "<div class=\"card-fullview\"><div class=\"card-fullview-title\"><h2>Name of Card</h2><span>X</span></div><div id=\"members\" class=\"members\"><h3>Members</h3><p id=\"member\" class=\"member\">User1 <span>x</span></p><p id=\"member\" class=\"member\">User2 <span>x</span></p><p id=\"member\" class=\"member\">User3 <span>x</span></p><div class=\"member-button\"><button type=\"button\" class=\"member\">+</button><div class=\"input-member-name\"><form onsubmit=\"false\" id=\"member-form\"><input type=\"text\" placeholder=\"type member's name\"></input></form></div></div></div><div class=\"description\"><h3>Desription</h3><p id=\"description-text\">Placeholder text for an actual description of the card. </p><p id=\"edit\" class=\"edit\">Edit</p></div><div class=\"labels\"><h3>Labels</h3><p>Label 1</p><p>Label 2</p><p>Label 3</p><p>Label 4</p><p>Label 5</p><button type=\"button\">+</button></div><div id=\"comments\" class=\"comments\"><h3>Add a comment</h3><form id=\"comment-form\"><textarea id=\"comment-box\" type=\"text\" placeholder=\"Write a comment...\"></textarea></form><br><form><button id=\"comment-button\" type=\"button\">Send</button></form><br><p class=\"member\">User1</p><span>Placeholder comment</span><br><p class=\"member\">User2</p><span>Placeholder comment</span><br><p class=\"member\">User3</p><span>Placeholder comment</span></div><div class=\"add-delete\"><button id=\"add\" type=\"button\">Add</button><button id=\"delete\" type=\"button\">Delete</button></div></div>";
    listOfLists = document.querySelector("#board");
  }


  this.addButton.querySelector("button").addEventListener("click", function () {
    self.parent.id = "found-card-list";
    var card = "<div id=\"card-object\" class=\"card\"><p>Name of Card</p><p>edit</p></div>";

    self.parent.innerHTML += card;
    self.listOfCards.push(self.parent.querySelector("#card-object:last-child"));
    self.parent.removeChild(self.parent.querySelector("div#card-object.card.add-card"));
    self.parent.appendChild(self.addButton);
    self.parent = document.querySelector("#board").querySelector("#found-card-list");
    console.log("100000", self.parent);
    var cardObjects = self.parent.querySelectorAll("#card-object");
    for (var num = 1; num < cardObjects.length - 1; num++) {
      console.log(cardObjects[num]);
      listOfCards[num - 1] = cardObjects[num];
    };
    self.title = cardObjects[0];
    self.parent.id = "#list-cards";
    console.log(self.listOfCards);
    //console.log(self.HTMLtext());
    //console.log(listOfCards.HTMLtext());
    //HTMLtext() + card;
    //listOfCards.push(card);
    console.log(self.parent);//.querySelector("#card-object"));
  });
}

var boardsBtn = document.querySelector("#boards-btn");
var dropdownContent = document.querySelector(".dropdown-content");
var menuBtn = document.querySelector("#menu-btn");
var menuBtnExit = document.querySelector("#menu-btn-exit")
var optionsContent = document.querySelector(".options-content");
var descriptionEdit = document.querySelector(".description #edit");
var descriptionText = document.querySelector(".description #description-text");
var comments = document.querySelector("#comments");
var commentBox = document.querySelector("#comment-box");
var commentButton = document.querySelector("#comment-button");
var membersList = document.querySelector("#members").querySelectorAll("#member");
var memberButton = document.querySelector(".member-button button");
var inputMemberName = document.querySelector(".input-member-name");
var membersHTMLList = document.querySelector("#members.members");
var memberForm = document.querySelector("#member-form");
var commentForm = document.querySelector("#comment-form");
var background = document.querySelector("body");

var listOfLists = document.querySelector("#board");


var board = new Board(listOfLists);
var modal = document.querySelector(".modal");
var closeModal = document.querySelector("#close-modal");

closeModal.addEventListener("click", function() {
  modal.style.display = "none";
  background.style.overflow = "auto";

});

console.log(board);
boardsBtn.addEventListener("click",function (e) {
  if (dropdownContent.style.display === "block") {
    dropdownContent.style.display = "none";
  } else {
    dropdownContent.style.display = "block";
  }
});

menuBtn.addEventListener("click",function (e) {
  optionsContent.style.display = "block";
});

menuBtnExit.addEventListener("click", function (e) {
  optionsContent.style.display = "none";
});

descriptionEdit.addEventListener("click", function (e) {
  if (descriptionText.contentEditable === "true") {
    descriptionText.contentEditable = "false";
    descriptionText.style.border = "none";
    descriptionEdit.innerHTML = "Edit";
    console.log(descriptionEdit);
  } else {
    descriptionText.contentEditable = "true";
    descriptionText.style.border = "2px solid #0079bf";
    descriptionEdit.innerHTML = "Save";
    console.log(descriptionEdit);

  }
});

commentButton.addEventListener("click", function (e) {

  console.log(commentBox.value);
  comments.innerHTML = comments.innerHTML + "<br><p class=\"member\">You</p><span>" + commentBox.value + "</span>";
  e.preventDefault();
  console.log(comments);
  console.log(commentButton);
});

commentForm.addEventListener("submit", function (e) {
  e.preventDefault();
})

/* Add and Delete Members*/
for (var num = 0; num < membersList.length; num++) {
  membersList[num].addEventListener("click", deleteMember);
}

function deleteMember() {
  this.remove();
  membersList = document.querySelector("#members").querySelectorAll("#member");
  console.log(membersList);
}

memberButton.addEventListener("click", function(e) {
  if (inputMemberName.style.display === "block") {
    inputMemberName.style.display = "none";
  } else {
    inputMemberName.style.display = "block";
  }
});

/*
inputMemberName.addEventListener("keyup", function(e) {

});
*/
memberForm.addEventListener("submit",function(e) {
  e.preventDefault();
  console.log(memberForm.value);
  membersHTMLList.innerHTML += "<p id=\"member\" class=\"member\">" + inputMemberName.value + "<span>x</span></p>";
  memberButton.click();
  console.log(membersList);
  membersList = document.querySelector("#members").querySelectorAll("#member");
  membersHTMLList = document.querySelector("#members.members");
  e.preventDefault;
});
