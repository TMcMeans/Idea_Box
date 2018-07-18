// Global Variables 

var ideaTitle = $('.title');
var ideaBody = $('.body');
var ideasArray = [];

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
  moveUp(e);
  moveDown(e);
});

// Functions

 function disableBtn() {
  if ($('.title').val() === "" || $('.body').val() === "") {
    $('.save').prop('disabled', true);
  } else if ($('.title').val() !== "" && $('.body').val() !== "") {
    $('.save').prop('disabled', false);
  }
};

function IdeaCard (title, body, key) {
  return {
    title: title,
    body: body,
    key: Date.now(),
    quality: 'swill'
  }
}

function addIdea() {
  var ideaCard = new IdeaCard(ideaTitle.val(), ideaBody.val());
  var savedTitle = ideaCard.title;
  var savedBody = ideaCard.body;
  var savedKey = ideaCard.key; 
  $('.bottom-portion').prepend(`<article class="idea-card" data-id=${savedKey}>
        <div class="top-wrapper">
          <h2 class="idea-name">${savedTitle}</h2>
          <button class="delete"></button>
        </div>
        <p class="idea">${savedBody}</p>
        <div class="bottom-wrapper">
          <button class="upvote"></button>
          <button class="downvote"></button>
          <p class="quality"> quality:</p><p></p>
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

function moveUp(e) {
  if(e.target.className.toLowerCase('.upvote')) {
    $('.upvote').on('click', function() {
      console.log('upvote click');
      //when this button is clicked it changes quality
      //figure out how to use jquery- tree traversal to move up one sibling
    });
  } 
};

function moveDown(e) {
  if(e.target.className.toLowerCase('.downvote')) {
    $('.downvote').on('click', function() {
      console.log('downvote click');
      //figure out how to use jquery- tree traversal to move down one sibling
    });
  } 
};

function storeIdea(ideaCard) { 
  var stringyIdea = JSON.stringify(ideaCard);
  localStorage.setItem(ideaCard.key, stringyIdea);
  ideasArray.push(ideaCard);
};

function grabStoredIdeas() {
  for (var i = 0; i < localStorage.length; i++) {
    var grabber = localStorage.getItem(localStorage.key(i));
    var parsedIdea = JSON.parse(grabber);
    ideasArray.push(parsedIdea);
  }
}

function retrieveIdea() {
  var parsedIdea;
  for (var i = 0; i < localStorage.length; i++) {
    parsedIdea = JSON.parse(localStorage.getItem(localStorage.key(i)));
    $('.bottom-portion').prepend(
      `<article class="idea-card" data-id=${parsedIdea.key}>
        <div class="top-wrapper">
          <h2 class="idea-name">${parsedIdea.title}</h2>
          <button class="delete"></button>
        </div>
        <p class="idea">${parsedIdea.body}</p>
        <div class="bottom-wrapper">
          <button class="upvote"></button>
          <button class="downvote"></button>
          <p class="quality"> quality:</p><p></p>
        </div>
        <hr>
      </article>`);
  }
}

retrieveIdea();
grabStoredIdeas();


