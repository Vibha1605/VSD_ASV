function analyzeVoice() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert("Please upload a voice file.");
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    fetch('/analyze', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        const resultElement = document.getElementById('result');
        const statusElement = document.getElementById('status');
        const confidenceElement = document.getElementById('confidence');

        resultElement.style.display = 'block';
        
        if (data.status === 'Genuine') {
            resultElement.classList.add('success');
            resultElement.classList.remove('error');
            statusElement.innerText = "Voice is Genuine!";
        } else {
            resultElement.classList.add('error');
            resultElement.classList.remove('success');
            statusElement.innerText = "Voice is Spoofed!";
        }

        confidenceElement.innerText = `Confidence: ${data.confidence}%`;
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while processing the file.');
    });
}
