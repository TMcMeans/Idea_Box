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

function IdeaCard (title, body, key, quality) {
  return {
    title: title,
    body: body,
    key: Date.now(),
    quality: quality || 'swill'
  }
}

function addIdea() {
  $('.bottom-portion').prepend(`<article class="idea-card">
        <div class="top-wrapper">
          <h2 class="idea-name">${ideaTitle.val()}</h2>
          <button class="delete"></button>
        </div>
        <p class="idea">${ideaBody.val()}</p>
        <div class="bottom-wrapper">
          <button class="upvote"></button>
          <button class="downvote"></button>
          <p class="quality"> quality:</p><p></p>
        </div>
        <hr>
      </article>`);
    var ideaCard = new IdeaCard(ideaTitle.val(), ideaBody.val());
    storeIdea(ideaCard);
};

function deleteIdea(e) {
  if(e.target.className.toLowerCase('.delete')) {
    $('.delete').on('click', function() {
      event.target.parentElement.parentElement.remove();
      // localStorage.removeItem();  >>> how to get localStorage to access ideaCard's key? 
    });
  }
};

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
}

function retrieveIdea() {
  for (var i = 0; i < localStorage.length; i++) {
    var parsedIdea = JSON.parse(localStorage.getItem(localStorage.key(i)));
    console.log(parsedIdea);
    console.log(parsedIdea.title);
    $('.bottom-portion').prepend(`<article class="idea-card">
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

window.onload = retrieveIdea;

// function addIdea() {
//    $('.bottom-portion').prepend(`<article class="idea-card">
//         <div class="top-wrapper">
//           <h2 class="idea-name">${ideaTitle}</h2>
//           <img class="delete" src="assets/delete.svg">
//         </div>
//         <p class="idea">${ideaBody}</p>
//         <div class="bottom-wrapper">
//           <img class="upvote" src="assets/upvote.svg">
//           <img class="downvote" src="assets/downvote.svg">
//           <p class="quality"> quality:</p>
//         </div>
//         <hr>
//       </article>`);
// };




