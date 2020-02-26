function autoRT() {
  var target = document.getElementById('actions-modal');
  if (!target) {
    console.log(`actions-modal is not found.`);
    return;
  }
  var observer = new MutationObserver((mutations) => {
    mutations.forEach((mutationRecord) => {
      var modal = document.getElementById('actions-modal');
      if (modal.style.display === 'block') {
        document.querySelector("#actions-modal > div > div.cf.padding-b--20.padding-r--20.padding-t--5 > div > button.js-action-button.js-retweet-button.Button--primary").click();
        modal.style.display = 'none';
      }
    });
  });
  observer.observe(target, { attributes : true, attributeFilter : ['style'] });
}

// ref: https://github.com/eramdam/BetterTweetDeck/pull/324
function keepHashTags() {
  const tweetTextArea = document.querySelector('textarea.js-compose-text');
  if (!tweetTextArea) {
    console.log(`textarea.js-compose-text is not found.`);
    return;
  }
  let hashTags = [];
  const tweetObserver = new MutationObserver(() => {
    if (tweetTextArea.disabled) {
      const tweetText = tweetTextArea.value;
      const tweetedHashtags = window.twttrTxt.extractHashtags(tweetText);
      hashtags = tweetedHashtags;
    } else {
      if (hashtags.length !== 0) {
        tweetTextArea.value = ` ${hashtags.map(t => `#${t}`).join(' ')}`;
      }
      tweetTextArea.focus();
      tweetTextArea.selectionStart = 0;
      tweetTextArea.selectionEnd = 0;
      tweetTextArea.dispatchEvent(new Event('change'));
    }
  });
  tweetObserver.observe(tweetTextArea, {
    attributes: true,
    attributeFilter: ['disabled']
  });
}

function main() {
  const keepHashtagsScript = document.createElement('script');
  keepHashtagsScript.appendChild(document.createTextNode(`(${keepHashTags.toString()})()`));
  document.body.appendChild(keepHashtagsScript);

  const autoRTScript = document.createElement('script');
  autoRTScript.appendChild(document.createTextNode(`(${autoRT.toString()})()`));
  document.body.appendChild(autoRTScript);
}
main();
