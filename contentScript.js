
/**
 *  Sets the visibility of replies on the page.
 */
function setCommentVisibility(hideComments) {
    const isOnCommentsPage = window.location.pathname.includes('/status/')
    if(isOnCommentsPage) {
        const commentsText = document.querySelectorAll('[data-testid="tweetText"]');
        const tweetDiv = getParentMatchingSelector(commentsText[0], '[data-testid="cellInnerDiv"]', 9);
    
        tweetDiv.parentElement.childNodes.forEach(comment => {
            if(comment !== tweetDiv) { // Ignore the main tweet div, this is the only way of filtering the replies.
                comment.style.display = hideComments ? 'none' : 'flex';
            }
        })
    }
}

/**
 *  Returns an element parent matching a selector,
 *  up to a certain depth.
 */
function getParentMatchingSelector(element, selector, depth) {
    let parent = element;
    for (let i = 0; i < depth; i++) {
        parent = parent?.parentElement;
        if (!parent) {
            return null;
        }

        if (parent.matches(selector)) {
            return parent;
        }
    }

    return null;
}

const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        /**
         *  Calls function with every mutation using the
         *  toogle replies visibility value.
         */
        chrome.storage.sync.get('hideReplies', function(data) {
            if (data.hideReplies !== undefined) {
                setCommentVisibility(data.hideReplies)
            }
        });

        /**
         *  Calls function with every mutation using the
         *  toogle following visibility value.
         */
        chrome.storage.sync.get('hideFollow', function(data) {
            if (data.hideFollow !== undefined) {
                document.querySelector('[href$="/following"]').parentElement.parentElement.style.display = data.hideFollow ? 'none' : 'flex';
            }
        });

        /**
         *  Hide the analytics from trend cards.
         */
        document.querySelectorAll('div[data-testid="trend"]').forEach(parent => {
            if (parent.childNodes[0].children.length > 3) {
                parent.childNodes[0].childNodes[2].style.display = 'none';
            }
        });
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.hideReplies !== undefined) {
        setCommentVisibility(request.hideReplies);
    }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.hideFollow !== undefined) {
        document.querySelector('[href$="/following"]').parentElement.parentElement.style.display = request.hideFollow ? 'none' : 'flex';
    }
});