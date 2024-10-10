# Hide Twitter Statistics

As a content creator, looking at twitter analytics when browsing YouTube to chill can quickly become a stressful activity, as you're always exposed to other people's view numbers, like numbers, reply numbers and more. This is great when looking for inspiration, but not so nice when all you want to do is interact and have a good time!

To solve such woes, I created this extension with one goal in mind: **allowing you, a content creator, to enjoy Twitter like a common person do.**

## What does it do?

- Hide view numbers on posts and replies.
- Hide like numbers on posts and replies.
- Hide retweet numbers on posts and replies.
- Hide reply numbers on posts and replies.
- Added an option to toggle replies on posts.
- Added an option to toggle the Following and Followers on profiles pages and modals.

## How does it do that?

This extension works in two ways:

- For simple rules, such as removing views, likes and other easy tasks, CSS is used, which can be found in `content.css`.
- For complex rules, such as changing removing replies and follow, JavaScript is used, which can be found in `contentScript.css`.

Customization is available through the popup, defined in `popup.html`, `popup.js` and `popup.css`.

## How do I keep this up to date?

If I, the original author, ever am to stop updating this, all you have to do is inspect the Twitter pages you are interested in and locate areas of concern.

This is documented in the code and stylesheets, so updating the extension should not be difficult. However, beware that even Chromium browsers can behave differently when dealing with `MutationObserver`, something I learned the hard way.