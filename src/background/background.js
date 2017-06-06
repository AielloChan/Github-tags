/*=========================================================
Background script
Handle all data process & net work
==========================================================*/
import {
    fetchData,
    saveData
} from './handler.js';


// First install show options page
chrome.runtime.onInstalled.addListener(function () {
    chrome.tabs.create({
        url: chrome.runtime.getURL("options/index.html")
    })
})


// listen messsage
chrome.runtime.onMessage.addListener(function (msg, sender, callback) {
    if (msg.sender != "github-tags") return;

    switch (msg.type) {
        case "fetch":
            fetchData(msg.data, callback);
            break;
        case "save":
            saveData(msg.data, callback);
            break;

    }

    // all request use async mode
    return true;
})