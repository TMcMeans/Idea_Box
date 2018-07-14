// Event Listeners

$('.save').on('click', function(e) {
  e.preventDefault();
  console.log('button clicked!');
  console.log($('.title').val(), $('.body').val());
  addIdea();
});

$('.title, .body').on('keyup', disableBtn);

// Functions

 function disableBtn() {
  if ($('.title').val() === "" || $('.body').val() === "") {
    $('.save').prop('disabled', true);
    console.log('if');
  } else if ($('.title').val() !== "" && $('.body').val() !== "") {
    $('.save').prop('disabled', false);
    console.log('else');
  }
};

function addIdea() {
  var ideaTitle = $('.title').val();
  var ideaBody = $('.body').val();
  var idea = $('.idea-card');
  idea.html(`<article class="idea-card">
        <div class="top-wrapper">
          <h2 class="idea-name">${ideaTitle}</h2>
          <img class="delete" src="assets/delete.svg">
        </div>
        <p class="idea">${ideaBody}</p>
        <div class="bottom-wrapper">
          <img class="upvote" src="assets/upvote.svg">
          <img class="downvote" src="assets/downvote.svg">
          <p class="quality"> quality:</p>
        </div>
        <hr>
      </article>`);
  $('.bottom-portion').append(idea);
  conosle.log('calling the addIdea function');
}






