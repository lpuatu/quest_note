// Editor initialization
document.addEventListener('DOMContentLoaded', () => {
    const editor = document.getElementById('editor');
    const wordCount = document.getElementById('word-count');
    const healthBarFill = document.getElementById('health-bar-fill');
    const healthValue = document.getElementById('health-value');
    const decayRateInput = document.getElementById('decay-rate');
    const decayRateValue = document.getElementById('decay-rate-value');
    let decayTimer;
    let lastWordCount = 0;
    let healthPercentage = 100;

    // Update decay rate value display
    decayRateInput.addEventListener('input', (e) => {
        const value = parseFloat(e.target.value).toFixed(1);
        decayRateValue.textContent = value;
        updateDecayRate(value);
    });

    // Start with decay rate of 2.0 words/sec
    updateDecayRate(2.0);

    // Update word count and health bar on input
    editor.addEventListener('input', updateWordCount);

    // Update word count
    function updateWordCount() {
        const words = editor.value.trim().split(/\s+/).filter(Boolean);
        wordCount.textContent = `${words.length} words`;
    }

    // Update decay rate
    function updateDecayRate(rate) {
        // Clear existing timer
        if (decayTimer) {
            clearInterval(decayTimer);
        }

        // Create new timer
        decayTimer = setInterval(() => {
            // Calculate health loss based on decay rate
            const words = editor.value.trim().split(/\s+/).filter(Boolean).length;
            const healthLoss = rate * 0.1; // 100ms interval
            healthPercentage = Math.max(0, healthPercentage - healthLoss);

            // Update health bar and value display
            healthBarFill.style.width = `${healthPercentage}%`;
            healthValue.textContent = `${Math.round(healthPercentage)}%`;
            
            // Change color based on health
            if (healthPercentage >= 75) {
                healthBarFill.style.backgroundColor = '#4CAF50';
            } else if (healthPercentage >= 50) {
                healthBarFill.style.backgroundColor = '#FFA500';
            } else {
                healthBarFill.style.backgroundColor = '#FF4444';
            }

            // Reset health if words increase
            if (words > lastWordCount) {
                healthPercentage = 100;
                healthBarFill.style.width = '100%';
                healthBarFill.style.backgroundColor = '#4CAF50';
                healthValue.textContent = '100%';
            }
            lastWordCount = words;
        }, 100); // 100ms interval
    }

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
