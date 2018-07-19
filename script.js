// Global Variables 

var ideaTitle = $('.title');
var ideaBody = $('.body');

// Event Listeners

$('.save').on('click', function(e) {
  e.preventDefault();
  addIdea();
  $('.title').val("");
  $('.body').val("");
  disableBtn();
});

$('.title, .body').on('keyup', disableBtn);

$('.bottom-portion').on('click', function(e) {
  e.preventDefault();
  deleteIdea(e);
});

// Functions

 function disableBtn() {
  if ($('.title').val() === "" || $('.body').val() === "") {
    $('.save').prop('disabled', true);
  } else if ($('.title').val() !== "" && $('.body').val() !== "") {
    $('.save').prop('disabled', false);
  }
};

function Idea(title, body, key) {
  this.title = title;
  this.body = body;
  this.key = Date.now();
  this.quality = 'swill'
}

function addIdea() {
  var ideaCard = new Idea(ideaTitle.val(), ideaBody.val());
  var savedTitle = ideaCard.title;
  var savedBody = ideaCard.body;
  var savedKey = ideaCard.key; 
  $('.bottom-portion').prepend(`<article class="idea-card" data-id=${savedKey}>
        <div class="top-wrapper">
          <h2 class="idea-name" contenteditable="true" onfocusout="updateTitle()">${savedTitle}</h2>
          <button class="delete"></button>
        </div>
        <p class="idea" contenteditable="true" onfocusout="updateBody()">${savedBody}</p>
        <div class="bottom-wrapper">
          <button class="upvote"></button>
          <button class="downvote"></button>
          <p class="user-quality"> quality: </p><span class="user-quality">swill</span>
        </div>
        <hr>
      </article>`);
    storeIdea(ideaCard);
};

function deleteIdea(e) {
  if (e.target.className === 'delete') {
    var ideaCard = e.target.closest('article');
    localStorage.removeItem(ideaCard.dataset.id);
    ideaCard.remove();
  }
}

function storeIdea(ideaCard) { 
  var stringyIdea = JSON.stringify(ideaCard);
  localStorage.setItem(ideaCard.key, stringyIdea);
};

function retrieveIdea() {
  var parsedIdea;
  for (var i = 0; i < localStorage.length; i++) {
    parsedIdea = JSON.parse(localStorage.getItem(localStorage.key(i)));
    $('.bottom-portion').prepend(
      `<article class="idea-card" data-id=${parsedIdea.key}>
        <div class="top-wrapper">
          <h2 class="idea-name" onfocusout="updateTitle()" contenteditable="true">${parsedIdea.title}</h2>
          <button class="delete"></button>
        </div>
        <p class="idea" onfocusout="updateBody()" contenteditable="true">${parsedIdea.body}</p>
        <div class="bottom-wrapper">
          <button class="upvote"></button>
          <button class="downvote"></button>
          <p class="quality"> quality:</p><span class="user-quality"> swill</span>
        </div>
        <hr>
      </article>`);
  }
}

function updateTitle(e) {
  var searchingId = event.target.parentNode.parentNode.dataset.id; 
  console.log(searchingId);
  for (var i = 0; i < localStorage.length; i++) {
    var gettingItem = localStorage.getItem(searchingId);
    var parsedItem = JSON.parse(gettingItem);
    parsedItem.title = event.target.innerText;
    localStorage.removeItem(gettingItem);
    localStorage.setItem(parsedItem.key, JSON.stringify(parsedItem));
  }
}

function updateBody(e) {
 
}

retrieveIdea();



