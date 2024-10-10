const toggleReplies = document.getElementById('toggleReplies');
if (toggleReplies) {
    toggleReplies.addEventListener('change', function () {
        let isChecked = this.checked;
        chrome.storage.sync.set({hideReplies: isChecked});

        chrome.tabs.query(
            {active: true, currentWindow: true},
            function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {hideReplies: isChecked});
            }
        );
    });
}

document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.sync.get(
        'hideReplies',
        function (data) {
            toggleReplies.checked = !!data.hideReplies;
        }
    );
});

const toggleFollow = document.getElementById('toggleFollow');
if (toggleFollow) {
    toggleFollow.addEventListener('change', function () {
        let isChecked = this.checked;
        chrome.storage.sync.set({hideFollow: isChecked});

        chrome.tabs.query(
            {active: true, currentWindow: true},
            function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {hideFollow: isChecked});
            }
        );
    });
}

document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.sync.get(
        'hideFollow',
        function (data) {
            toggleFollow.checked = !!data.hideFollow;
        }
    );
});