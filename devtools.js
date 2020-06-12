// Here are created all the panels, this particular extension needs just one.

chrome.devtools.panels.create("Moderator", "icon.png", "panel.html", function(panel) {});

chrome.devtools.inspectedWindow.eval(
    "window", { useContentScriptContext: true }, (result, exceptionInfo) => {
        console.log("RESULTADO: ", result);
        console.log("EXCEPTION: ", exceptionInfo);
    }
);

//chrome.tabs.executeScript(integer tabId, object details, function callback)
