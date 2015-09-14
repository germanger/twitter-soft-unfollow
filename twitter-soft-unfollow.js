
$(document).ready(function() {

    $(document).on("click", ".new-tweets-bar", function(e) {
        refreshTweets();
    });

    refreshTweets();
});

function refreshTweets() {
    console.log("refreshTweets()");
    
    // Show all
    //$(".tweet").show();
    $(".tweet-text").css("background-color", "");
    
    // Hide unfollowed
    chrome.storage.local.get('unfollowed', function (data) {
       
        var unfollowed = [];
        
        // Key exists
        if (!chrome.runtime.lastError) {
            unfollowed = data.unfollowed;
        }
        
        $.each(unfollowed, function(index, item) {
            //$(".tweet[data-screen-name='" + item + "']").hide();
            $(".tweet[data-screen-name='" + item + "']").find(".tweet-text").css("background-color", "black");
        });
    });
}

// Tell the background to show the icon (because a content-script can't)
chrome.runtime.sendMessage({action: "showIcon"}, function(response) {});

// Listen for background messages
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action == 'refreshTweets') {
        refreshTweets();
    }
});


