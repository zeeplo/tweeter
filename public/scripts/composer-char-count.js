const MAX_CHARACTERS = 140;
$(document).ready(() => {
  const $tweetText = $('#tweet-text');
  $tweetText.keyup(function() {
    let difference = MAX_CHARACTERS - this.value.length;
    const $counter = $(this).parent().find('.counter');
    if (difference < 0) $counter.addClass('negative');
    else $counter.removeClass('negative');
    $counter.text(difference);
  });
});
