// When a message is received
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {               
    if (request.action == "showIcon") {
        chrome.pageAction.show(sender.tab.id);
    }
    
    if (request.action == "refreshTweets") {
        // Send message to all tabs
        chrome.tabs.query({}, function(tabs) {
            for (var i=0; i<tabs.length; ++i) {
                chrome.tabs.sendMessage(tabs[i].id, {action: "refreshTweets"});
            }
        });
    }
});

// Twitter has infinite scrolling, this intercepts those requests
chrome.webRequest.onCompleted.addListener(function(data) {
    console.log("detected infinite scrolling");
    
    // Tell that tab to refreshTweets
    chrome.tabs.sendMessage(data.tabId, {action: "refreshTweets"});
},
{
    urls: ["https://twitter.com/i/timeline*"]
}); 