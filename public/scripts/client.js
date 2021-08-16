/* eslint-disable no-undef */
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
  $("#tweets-container").empty(); // Need to empty the section everytime it renders, otherwise every refresh the content will just append to old content instead of making new content
  for (let i of tweets) {
    $("#tweets-container").append(createTweetElement(i));
  }
};

/**
 * Change the Tweet object into HTML
 * @param {object} tweet
 * @returns {string}
 */
const createTweetElement = (tweet) => {
  const tweetContainer = `<article>
	  <header>
	    <div class="user-name"><img src="${tweet.user.avatars}"> <span>${
    tweet.user.name
  }</span></div>
	    <div class="handle">${tweet.user.handle}</div>
	  </header>
	  <div class="content">${escape(tweet.content.text)}</div>
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

/**
 * Loads the tweet from the database
 */
const loadtweets = () => {
  $.get("/tweets/").done((data) => {
    renderTweets(data.reverse());
  });
};

/**
 * Post the tweet into the database
 * If there is nothing in the tweet or the tweet is over 140 characters, the tweet will not go through
 */
const postTweet = () => {
  $("#new-tweet-form").submit(function (event) {
    event.preventDefault();

    // input validation
    if ($("#tweet-text").val().length === 0) {
      $("#input-err").html(function () {
        $(this).slideDown("slow");
        return '<p><i class="fas fa-times"></i>    You can\'t tweet nothing</p>';
      });
    } else if ($("#tweet-text").val().length > 140) {
      $("#input-err").html(function () {
        $(this).slideDown("slow");
        return '<p><i class="fas fa-times"></i>    You are over the 140 limit</p>';
      });
    } else {
      //error message will slide up if the tweet is valid
      $("#input-err").slideUp("fast");
      $("#input-err").empty();

      $.post("/tweets/", $(this).serialize()).done(() => {
        loadtweets();
        $('#tweet-text').val('');
      });
    }
  });
};

/**
 * Escapes user input to avoid XSS attacks
 */
const escape = (str) => {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

/**
 * Toggle new-tweets to show and hide
 */
const toggleNewTweets = () => {
  $("#write-new-tweet").click(function () {
    $(".new-tweet").slideToggle("slow");
  });
};

/**
 * go-top hides on default, when the window is scrolled the button appears. It dissapears again after 5 seconds of not scrolling
 */
const goTopScroll = () => {
  $("#go-top").hide();
  $(window).scroll(function () {
    $("#go-top").show().delay(5000).fadeOut();
  });
};

/**
 * When the go-top link is clicked, it will scroll to the top and make sure that .new-tweet shows
 */
const goTop = () => {
  $("#go-top").click(function () {
    $(".new-tweet").show();
  });
};

$(document).ready(function () {
  loadtweets();
  postTweet();
  toggleNewTweets();
  goTopScroll();
  goTop();
});
