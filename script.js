function getFrameSize(form) {
    return parseInt(form.frameSizeForm.value);
}

function getPages(form) {
    return form.pageNumbersForm.value.split(' ').map(Number);;
}

function runMRU(form) {
    const inputString = getPages(form);

    const frameSize = getFrameSize(form); // Set the size of the page frames
    const frames = [];
    let pageFaults = 0;

    function displayFrames() {
        const outputDiv = document.getElementById('output');
        outputDiv.innerHTML += 'Frames: ' + frames.join(' ') + '<br>';
    }

    for (let i = 0; i < inputString.length; i++) {
        const page = inputString[i];

        // Check if the page is already in the frame
        if (frames.includes(page)) {
            displayFrames();
        } else {
            pageFaults++;

            // Check if there is space in the frame
            if (frames.length < frameSize) {
                frames.push(page);
            } else {
                // Find the index of the most recently used page in the frame and replace it
                const lastUsedIndex = frames.map((p, index) => ({ page: p, lastIndex: inputString.lastIndexOf(p, i - 1) })).sort((a, b) => b.lastIndex - a.lastIndex)[0];
                const index = frames.indexOf(lastUsedIndex.page);
                frames[index] = page;
            }

            displayFrames();
        }
    }

    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML += '<br>Total Page Faults: ' + pageFaults;
}