/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

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



$(document).ready(() => {
  renderTweets(data);
  $('#new-tweet-form').submit(function(event) {
    event.preventDefault();
    $.post('/tweets/', $(this).serialize())
      .done(() => {
        console.log('Tweet Posted');
      });
  });
});
