/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/**
 * Loops throug the array of tweet objects, appending HTML string into #tweets-container
 * @param {Array} tweets
 */
const renderTweets = (tweets) => {
  for (let i of tweets) {
    $('#tweets-container').append(createTweetElement(i));
  }
};

/**
 * Change the Tweet object into HTML
 * @param {object} tweet
 * @returns {string}
 */
const createTweetElement = (tweet) => {
  const tweetContainer =
	`<article>
	  <header>
	    <div class="user-name"><img src="${tweet.user.avatars}"> <span>${tweet.user.name}</span></div>
	    <div class="handle">${tweet.user.handle}</div>
	  </header>
	  <div class="content">${tweet.content.text}</div>
	  <footer>
	    <div>${timeago.format(tweet.created_at)}</div>
	    <div class="icons">
	      <i class="fas fa-flag"></i>
	      <i class="fas fa-retweet"></i>
	      <i class="fas fa-heart"></i>
	    </div>
	  </footer>
	</article>`;
  return tweetContainer;
};

const loadtweets = () => {
  $.get('/tweets', function(data) {
    renderTweets(data.reverse());
  });
};


/**
 * Post the tweet into the database
 * If there is nothing in the tweet or the tweet is over 140 characters, the tweet will not go through
 */
const postTweet = () => {
  $('#new-tweet-form').submit(function(event) {
    event.preventDefault();

    if ($('#tweet-text').val().length === 0) {
      alert("Can't post nothing");
    } else if ($('#tweet-text').val().length > 140) {
      alert('You are over the 140 limit');
    } else {
      $.post('/tweets/', $(this).serialize())
        .done(() => {
          console.log('Tweet Posted');
        });
    }
  });
};

$(document).ready(function() {
  loadtweets();
  postTweet();
});
