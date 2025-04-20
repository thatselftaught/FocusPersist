document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const modeButtons = document.querySelectorAll('.mode-btn');
    const startButton = document.querySelector('.start-btn');
    const timerDisplay = document.querySelector('.timer-display');
    const fullscreenButton = document.querySelector('.fullscreen-btn');
    const mainContent = document.querySelector('.main-content');

    // Timer state
    let isRunning = false;
    let timeLeft = 25 * 60; // 25 minutes in seconds
    let timerInterval;

    // Mode durations (in seconds)
    const MODES = {
        'Deep Work': 25 * 60,
        'Break Time': 5 * 60
    };

    // Update timer display
    function updateDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    // Start/Pause timer
    function toggleTimer() {
        if (isRunning) {
            clearInterval(timerInterval);
            startButton.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            timerInterval = setInterval(() => {
                if (timeLeft > 0) {
                    timeLeft--;
                    updateDisplay();
                } else {
                    clearInterval(timerInterval);
                    isRunning = false;
                    startButton.innerHTML = '<i class="fas fa-play"></i>';
                    // Play notification sound or show notification here
                }
            }, 1000);
            startButton.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isRunning = !isRunning;
    }

    // Switch timer mode
    function switchMode(event) {
        const selectedMode = event.target.textContent;
        
        // Update active state
        modeButtons.forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');

        // Reset timer
        clearInterval(timerInterval);
        isRunning = false;
        timeLeft = MODES[selectedMode];
        updateDisplay();
        startButton.innerHTML = '<i class="fas fa-play"></i>';
    }

    // Toggle fullscreen
    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            mainContent.requestFullscreen().catch(err => {
                console.log(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    }

    // Event listeners
    startButton.addEventListener('click', toggleTimer);
    modeButtons.forEach(btn => btn.addEventListener('click', switchMode));
    fullscreenButton.addEventListener('click', toggleFullscreen);

    // Initialize display
    updateDisplay();
}); 