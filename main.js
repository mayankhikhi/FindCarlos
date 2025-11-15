        const gameCard = document.getElementById('game-card');
        const thankYouPage = document.getElementById('thank-you-page');
        const gameImage = document.getElementById('game-image');
        const messageBox = document.getElementById('message-box');
        const imageContainer = document.getElementById('image-container');
        const clickMarker = document.getElementById('click-marker');
        const triesCounter = document.getElementById('tries-counter');
        const resetButton = document.getElementById('reset-button');
        const levelDisplay = document.getElementById('level-display');
        const finalTimeDisplay = document.getElementById('final-time');
        
        const levelCompletePopup = document.getElementById('level-complete-popup');
        const levelTimeDisplay = document.getElementById('level-time');
        const nextLevelButton = document.getElementById('next-level-button');

        const API_URL_BASE = "http://127.0.0.1:5000";


        let totalTries = 0;
        let currentLevel = 1;
        let totalLevels = 3; 
        let gameWon = false;
        let levelStartTime; 
        let totalTime = 0;  

        //Listen for Clicks ---
        gameImage.addEventListener('click', function(event) {
            if (gameWon) return; // Stop if level is already won
            const clickX = event.offsetX;
            const clickY = event.offsetY;
            
            totalTries++;
            triesCounter.textContent = totalTries;

            moveMarker(clickX, clickY);
            messageBox.textContent = `Checking coordinates... (x: ${clickX}, y: ${clickY})`;
            messageBox.className = "p-4 rounded-lg my-4 text-lg font-medium text-gray-700 bg-gray-100 shadow";
            
            sendClickToAPI(clickX, clickY);
        });

        resetButton.addEventListener('click', () => window.location.reload());

        //
        nextLevelButton.addEventListener('click', () => {
            // Hide popup, show game
            levelCompletePopup.classList.add('hidden');
            gameCard.classList.remove('hidden');
            
            // Load the next level (currentLevel was already incremented)
            loadLevel(currentLevel);
        });

        // Timer Functions

        // Level Loading Function
        async function loadLevel(levelNum) {
            gameWon = true; // Temporarily disable clicking
            messageBox.textContent = `Loading level ${levelNum}...`;
            clickMarker.style.opacity = '0'; // Hide marker
            
            try {
                const response = await fetch(`${API_URL_BASE}/api/get_level_data/${levelNum}`);
                if (!response.ok) throw new Error("Could not load level.");
                
                const data = await response.json();
                
                totalLevels = data.total_levels;
                levelDisplay.textContent = `${levelNum} / ${totalLevels}`;
                gameImage.src = data.image_url;
                
                // Once image is loaded, allow clicking again
                gameImage.onload = () => {
                    gameWon = false;
                    messageBox.textContent = "Click where you think he's hiding!";
                    levelStartTime = Date.now(); 
                }
                
            } catch (error) {
                console.error('Error loading level:', error);
                messageBox.textContent = "Error loading level. Is the server running?";
            }
        }

        // Win Screen Function ---
        function showWinScreen() {
            // REMOVED stopTimer()
            gameCard.classList.add('hidden');
            thankYouPage.classList.remove('hidden');
        }

        // Function to show the level complete popup
        function showLevelCompletePopup() {
            gameCard.classList.add('hidden');
            levelCompletePopup.classList.remove('hidden');
        }

        // Move Marker Function
        function moveMarker(x, y) {
            clickMarker.style.left = `${x}px`;
            clickMarker.style.top = `${y}px`;
            clickMarker.classList.remove('hit');
            clickMarker.classList.add('ping');
            clickMarker.style.opacity = '1';

            setTimeout(() => {
                if (!gameWon) {
                    clickMarker.classList.remove('ping');
                    clickMarker.style.opacity = '0';
                }
            }, 1000);
        }

        // API Click Function
        async function sendClickToAPI(x, y) {
            try {
                const response = await fetch(`${API_URL_BASE}/api/check`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 'x': x, 'y': y, 'level': currentLevel }),
                });

                if (!response.ok) throw new Error(`API error: ${response.status}`);
                const data = await response.json();

                if (data.result === 'hit') {
                    gameWon = true; // Stop clicks
                    
                    // Calculate level time
                    const levelTime = Math.floor((Date.now() - levelStartTime) / 1000);
                    totalTime += levelTime; // Add to overall time

                    messageBox.textContent = `You found Carlos! 🐢 Well done!`;
                    messageBox.className = "p-4 rounded-lg my-4 text-lg font-medium hit shadow";
                    clickMarker.classList.remove('ping');
                    clickMarker.classList.add('hit');
                    clickMarker.style.opacity = '1';

                    // Level Progression Logic
                    currentLevel++;
                    if (currentLevel > totalLevels) {
                        // This was the FINAL level 
                        finalTimeDisplay.textContent = `${totalTime} seconds`;
                        // Show final win screen after a delay
                        setTimeout(showWinScreen, 2500);
                    } else {
                        // This was a MID-level
                        levelTimeDisplay.textContent = `${levelTime} seconds`;
                        // Show level complete popup after a delay
                        setTimeout(showLevelCompletePopup, 2500); 
                    }

                } else {
                    messageBox.textContent = "Nope, that's just some coral. Keep looking!";
                    messageBox.className = "p-4 rounded-lg my-4 text-lg font-medium miss shadow";
                }

            } catch (error) {
                console.error('Error fetching from API:', error);
                messageBox.textContent = "Could not connect to the server. Is it running?";
                messageBox.className = "p-4 rounded-lg my-4 text-lg font-medium miss shadow";
            }
        }

        // Initial Game Start
        function initGame() {
            loadLevel(currentLevel); // Load level 1
        }

        // Start the game!
        initGame();
