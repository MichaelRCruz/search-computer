const makeTwoPartCallback = () => {

  let saveForRenderCallback;

  const readyCallback = (name, q, promos, results, resultsDiv) => {
    saveForRenderCallback = [];
    for (const result of results) {
      const { richSnippet: {
          answer = []
        } = {},
      } = result;
      const firstAnswer = answer[0];
      if (firstAnswer) {
        const upVotes = firstAnswer['upvotecount'];
        if (upVotes) {
          saveForRenderCallback.push(
            { upvotes: parseInt(upVotes, 10) }
          );
          continue;
        }
      }
      saveForRenderCallback.push({});
    }
  };

  const renderedCallback = (name, q, promos, results) => {
    for (let i = 0; i < results.length; ++i) {
      const div = results[i];
      const votes = saveForRenderCallback[i]['upvotes'];
      if (votes) {
        const innerDiv = document.createElement('div');
        innerDiv.innerHTML = '<b>Upvotes: ' + votes + '</b>';
         div.insertAdjacentElement('afterbegin', innerDiv);
      }
    }
  };
  return {readyCallback, renderedCallback};
};

const {
    readyCallback: webResultsReadyCallback,
    renderedCallback: webResultsRenderedCallback
  } = makeTwoPartCallback();
  window.__gcse || (window.__gcse = {});
  window.__gcse.searchCallbacks = {
  web: {
    ready: webResultsReadyCallback,
    rendered: webResultsRenderedCallback
  },
};

(function() {
  const cx = '014257893608803835974:0vnpj1cfn9b';
  var gcse = document.createElement('script');
  gcse.type = 'text/javascript';
  gcse.async = true;
  gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(gcse, s);
})();
