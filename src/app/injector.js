/*=========================================================
Inject the base node to dom,
then can do anything with vue XD
==========================================================*/

// just support single wapper tag
function parseDom(domStr) {　　
    var tmpObj = document.createElement("div");　　
    tmpObj.innerHTML = domStr;　　
    return tmpObj.childNodes[0];
};


function getInjectPoint(selectStr) {
    return document.querySelector(selectStr);
}


function prependChild(parent, newChild) {
    if (parent.firstChild) {
        parent.insertBefore(newChild, parent.firstChild);
    } else {
        parent.appendChild(newChild);
    }
    return parent;
}


function injectDom(parentDom, str) {
    var dom = parseDom(str);
    prependChild(parentDom, dom);
}


// Consider the dom render sequence, these script may run before
// html content loaded.
// So we decided use retry solution to hold.
function getDom(selector, callback, retry_time) {
    // unit ms
    var retryTime = retry_time || 10000,
        retryInterval = 200,
        retryTimes = retryTime / retryInterval,
        domObj = null;

    //  Repeat inject
    var sapper = setInterval(function () {
        domObj = getInjectPoint(selector);

        if (domObj !== null) {
            window.clearInterval(sapper);
            callback(domObj);
        }

        if (retryTimes-- <= 0) {
            window.clearInterval(sapper);
            console.log("Github tags: Get dom '" + selector + "' failed.")
        }
    }, retryInterval)
}


// I haven't find out where the hook is which can indicate modal
// close (When we click blank mask, modal will close automatic)
export function AddModalHook(selector, callback) {

    getDom(selector, function (mask) {
        mask.onclick = callback;
    });

}


// Inject base dom node
export function Injector(selector, tpl, callback) {

    getDom(selector, function (injectPoint) {
        injectDom(injectPoint, tpl);
        callback();
    });

}

export default Injector;