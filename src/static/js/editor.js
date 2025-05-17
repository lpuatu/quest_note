// Editor initialization
document.addEventListener('DOMContentLoaded', () => {
    const editor = document.getElementById('editor');
    const wordCount = document.getElementById('word-count');
    const healthBarFill = document.getElementById('health-bar-fill');
    const healthValue = document.getElementById('health-value');
    const decayRateInput = document.getElementById('decay-rate');
    const decayRateValue = document.getElementById('decay-rate-value');
    let decayTimer;

    // Update decay rate value display
    decayRateInput.addEventListener('input', (e) => {
        const value = parseFloat(e.target.value).toFixed(1);
        decayRateValue.textContent = value;
        updateDecayRate(value);
    });

    // Start with decay rate of 2.0 words/sec
    updateDecayRate(2.0);

    // Update word count and health bar on input
    editor.addEventListener('input', async (e) => {
        const response = await fetch('/api/update-text', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: editor.value
            })
        });
        const data = await response.json();
        wordCount.textContent = `${data.word_count} words`;
        healthBarFill.style.width = `${data.health_percentage}%`;
        healthValue.textContent = `${Math.round(data.health_percentage)}%`;
    });

    // Update decay rate
    async function updateDecayRate(rate) {
        const response = await fetch('/api/update-decay', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                rate: rate
            })
        });
        const data = await response.json();
        decayRateValue.textContent = data.decay_rate;
    }

    // Get initial state
    async function getInitialState() {
        const response = await fetch('/api/get-state');
        const data = await response.json();
        editor.value = data.text;
        wordCount.textContent = `${data.word_count} words`;
        healthBarFill.style.width = `${data.health_percentage}%`;
        healthValue.textContent = `${Math.round(data.health_percentage)}%`;
        decayRateInput.value = data.decay_rate;
        decayRateValue.textContent = data.decay_rate;
    }

    getInitialState();

    // Clear editor
    function clearEditor() {
        if (confirm('Are you sure you want to clear the editor?')) {
            editor.value = '';
            updateWordCount();
            healthPercentage = 100;
            healthBarFill.style.width = '100%';
            healthBarFill.style.backgroundColor = '#4CAF50';
            healthValue.textContent = '100%';
        }
    }

    // Save paragraph
    function saveParagraph() {
        const text = editor.value.trim();
        if (!text) {
            alert('Please type something before saving');
            return;
        }

        // Here you can add code to save the paragraph to a database or file
        alert('Paragraph saved successfully!');
    }

    // Export functions for use in HTML
    window.clearEditor = clearEditor;
    window.saveParagraph = saveParagraph;
});
