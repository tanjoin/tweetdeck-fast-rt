function autoRT() {
  var isAutoRT = false;
  document.body.addEventListener('click', (event) => {
    if (!isAutoRT && event.target.matches('.icon-retweet-toggle')) {
      console.log('insert auto rt observer.');
      var observer = new MutationObserver((mutations) => {
        mutations.forEach((mutationRecord) => {
          var modal = document.getElementById('actions-modal');
          if (modal.style.display === 'block') {
            document.querySelector('#actions-modal button.js-action-button.js-retweet-button').click();
            modal.style.display = 'none';
          }
        });
      });
      var target = document.getElementById('actions-modal');
      observer.observe(target, { attributes : true, attributeFilter : ['style'] });
      isAutoRT = true;
    }
  });
}

function main() {
  const autoRTScript = document.createElement('script');
  autoRTScript.appendChild(document.createTextNode(`(${autoRT.toString()})()`));
  document.body.appendChild(autoRTScript);
  console.log('insert auto rt script.');
}
main();
