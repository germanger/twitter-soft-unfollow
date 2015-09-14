function refreshUIFromStorage() {

    $("#unfollowed-users").empty();
    
    chrome.storage.local.get('unfollowed', function (data) {
       
        var unfollowed = [];
        
        // Key exists
        if (data.unfollowed != undefined) {
            unfollowed = data.unfollowed;
        }
        
        $.each(unfollowed, function(index, item) {
            $("#unfollowed-users").append('<tr class="unfollowed-user"><td>' + item + '</td><td style="text-align: center"><a href="" class="remove" data-username="' + item + '">remove</a></td></tr>');
        });
    });
}

$(document).ready(function() {

    refreshUIFromStorage();

    $(document).on("click", "#add", function(e) {
        e.preventDefault();
        
        var username = $("#username").val();
        
        if (username == "") {
            return;
        }
        
        $("#username").val("");

        chrome.storage.local.get('unfollowed', function (data) {
           
            var unfollowed = [];
            
            // Key exists
            if (data.unfollowed != undefined) {
                unfollowed = data.unfollowed;
            }
            
            // Add
            unfollowed.push(username);
            
            // Set
            chrome.storage.local.set({'unfollowed': unfollowed}, function (result) {
                refreshUIFromStorage();
                chrome.runtime.sendMessage({action: "refreshTweets"}, function(response) {});
            });
        });
    });
    
    $(document).on("click", ".remove", function(e) {
        e.preventDefault();
        
        var username = $(this).data("username");

        chrome.storage.local.get('unfollowed', function (data) {
           
            var unfollowed = [];
            
            // Key exists
            if (data.unfollowed != undefined) {
                unfollowed = data.unfollowed;
            }
            
            // Remove
            unfollowed.splice($.inArray(username, unfollowed), 1);
            
            // Set
            chrome.storage.local.set({'unfollowed': unfollowed}, function (result) {
                refreshUIFromStorage();
                chrome.runtime.sendMessage({action: "refreshTweets"}, function(response) {});
            });
        });
    });
});