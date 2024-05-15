// Code for popup.js
document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const stopButton = document.getElementById('stopButton');

    startButton.addEventListener('click', () => {
        const clickIntervalMs = parseInt(document.getElementById('clickInterval').value, 10);
        const scrollIntervalMs = parseInt(document.getElementById('scrollInterval').value, 10);

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.scripting.executeScript({
                target: {tabId: tabs[0].id},
                files: ['content.js']
            }, () => {
                chrome.tabs.sendMessage(tabs[0].id, {
                    command: "start",
                    clickIntervalMs: clickIntervalMs,
                    scrollIntervalMs: scrollIntervalMs
                }, response => {
                    console.log(response ? response.result : "No response from content script.");
                });
            });
        });
    });

    stopButton.addEventListener('click', () => {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {command: "stop"}, response => {
                console.log(response ? response.result : "No response from content script.");
            });
        });
    });
});
