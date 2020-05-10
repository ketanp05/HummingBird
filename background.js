var ip_var;
var new_ip_var;

fetch('https://api.ipify.org/?format=json').then(results => results.json()).then(data => ip_var = data.ip).then(ip_var => new_ip_var = ip_var.split('.').join(''));


chrome.tabs.onActivated.addListener(function (activeInfo, new_ip_var) {
    var id = new_ip_var;
    //var urlsend = "http://hummingbirdskncoe.pythonanywhere.com/send_url/id=" + new_ip_var;
    //var urlsend = "http://hummingbirdskncoe.pythonanywhere.com/send_url/" + new_ip_var;
    chrome.tabs.get(activeInfo.tabId, function (tab) {
        y = tab.url;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
            }
        };
        //var urlsend = "http://hummingbirdskncoe.pythonanywhere.com/send_url/id=" + new_ip_var;
        xhttp.open("POST", "http://hummingbirdskncoe.pythonanywhere.com/send_url/" + id, true);
        //xhttp.open("POST", "http://hummingbirdskncoe.pythonanywhere.com/send_url/global_url");
        //xhttp.open("POST", "http://127.0.0.1:5000/send_url");
        xhttp.send("url=" + y);


    });
});

chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
    //var urlsend2 = "http://hummingbirdskncoe.pythonanywhere.com/send_url/id=" + new_ip_var;
    //var urlsend2 = "http://hummingbirdskncoe.pythonanywhere.com/send_url/" + new_ip_var;

    var id = new_ip_var;
    if (tab.active && change.url) {

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
            }
        };
        //var urlsend2 = "http://hummingbirdskncoe.pythonanywhere.com/send_url/id=" + new_ip_var;
        xhttp.open("POST", "http://hummingbirdskncoe.pythonanywhere.com/send_url/" + id, true);
        //send_url/id
        //xhttp.open("POST", "http://127.0.0.1:5000/send_url");
        xhttp.send("url=" + change.url);

    }

});

// define a mapping between tabId and url:
var tabToUrl = {};

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    //store tabId and tab url as key value pair:
    tabToUrl[tabId] = tab.url;
});

chrome.tabs.onRemoved.addListener(function (tabId, removeInfo, new_ip_var) {
    //var urlquit = "http://hummingbirdskncoe.pythonanywhere.com/quit_url/" + new_ip_var;
    //since tab is not available inside onRemoved,
    //we have to use the mapping we created above to get the removed tab url:
    var id = new_ip_var;
    console.log(tabToUrl[tabId]);

    var xhttp2 = new XMLHttpRequest();
    xhttp2.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    };
    //var urlquit = "http://hummingbirdskncoe.pythonanywhere.com/quit_url/id=" + new_ip_var;
    xhttp2.open("POST", "http://hummingbirdskncoe.pythonanywhere.com/quit_url/" + id, true);
    //xhttp2.open("POST", "http://127.0.0.1:5000/quit_url");
    xhttp2.send("url=" + tabToUrl[tabId]);

    // Remove information for non-existent tab
    delete tabToUrl[tabId];

});


chrome.browserAction.onClicked.addListener(function(){
  chrome.tabs.create({'url' : chrome.extension.getURL('newpage.html')}, function(){
    //tab opened

  })
})
