let enterClickInterval;
let scrollInterval;
let currentIndex = 0;  // To keep track of the current button index

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.command === "start") {
        startIntervals(request.clickIntervalMs, request.scrollIntervalMs);
        sendResponse({result: "Intervals started"});
    } else if (request.command === "stop") {
        stopIntervals();
        sendResponse({result: "Intervals stopped"});
    }
});

function startIntervals(clickIntervalMs, scrollIntervalMs) {
    stopIntervals(); // Clear previous intervals if any

    const buttons = Array.from(document.querySelectorAll('button, a')).filter(button => button.innerText.trim().toUpperCase() === 'ENTER');
    currentIndex = 0;  // Reset index to 0 at start

    const clickEnterButton = () => {
        if (currentIndex < buttons.length) {
            const button = buttons[currentIndex];
            if (!button.disabled) {
                console.log('Clicking button:', button);
                button.click();
                currentIndex++;  // Move to the next button
            } else {
                console.log('Skipping disabled button:', button);
                currentIndex++;  // Skip if disabled and move to next
            }
        } else {
            console.log('All buttons clicked, resetting.');
            currentIndex = 0;  // Reset index to loop or stop based on your need
        }
    };

    enterClickInterval = setInterval(clickEnterButton, clickIntervalMs);
    scrollInterval = setInterval(() => {
        window.scrollTo(0, document.body.scrollHeight);
    }, scrollIntervalMs);
}

function stopIntervals() {
    if (enterClickInterval) clearInterval(enterClickInterval);
    if (scrollInterval) clearInterval(scrollInterval);
    console.log('Intervals stopped');
}
