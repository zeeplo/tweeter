/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1628449812239
};

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

const $tweet = createTweetElement(tweetData);

$(document).ready(() => {
  console.log($tweet);
  $('#tweets-container').append($tweet);
});
