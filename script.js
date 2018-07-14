// Event Listeners

$('.save').on('click', function(e) {
  e.preventDefault();
  console.log('button clicked!');
  console.log($('.title').val(), $('.body').val());
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
}

