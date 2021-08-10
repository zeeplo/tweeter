const MAX_CHARACTERS = 140;
$(document).ready(() => {
  const $tweetText = $('#tweet-text');
  $tweetText.keyup(function() {
    let difference = MAX_CHARACTERS - this.value.length;
    // traverse up the DOM tree by one parent and finding .counter
    const $counter = $(this).parent().find('.counter');
    // add CSS negative class when the user exceed 140 limit
    if (difference < 0) $counter.addClass('negative');
    else $counter.removeClass('negative');
    $counter.text(difference);
  });
});
