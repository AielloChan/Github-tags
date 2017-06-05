/*=========================================================
Send message
send data to background.js and get feedback
==========================================================*/


export default function SendMsg(type, data, callback) {
    chrome.runtime.sendMessage({
        sender: "github-tags",
        type: type,
        data: data
    }, callback)
}