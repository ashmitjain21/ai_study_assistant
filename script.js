const summarizeButton = document.getElementById('summarizeButton');
const textInput = document.getElementById('textInput');
const resultDiv = document.getElementById('result');

summarizeButton.addEventListener('click', async () => {
    const textToSummarize = textInput.value;

    if (textToSummarize.trim() === '') {
        resultDiv.textContent = 'Please enter some text to summarize.';
        return;
    }
    resultDiv.textContent = 'Summarizing...';

    const requestData = {
        text: textToSummarize
    };

    try {
        // Send the data to your friend's backend API
        // NOTE: Make sure the URL is correct for your friend's server
        const response = await fetch('http://localhost:5000/api/summarize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        // Check if the response was successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the JSON response from the backend
        const data = await response.json();
        
        // Display the summary returned by the AI
        resultDiv.textContent = data.summary;

    } catch (error) {
        console.error('Error:', error);
        resultDiv.textContent = 'An error occurred. Please check the console.';
    }
});