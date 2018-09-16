function main() {
  var target = document.getElementById('actions-modal');
  if (!target) {
    window.setTimeout(main, 500);
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
main();
