document.addEventListener("DOMContentLoaded", function() {
    var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        scene: {
            preload: preload,
            create: create,
            update: update // Add update function
        },
        physics: {
            default: 'arcade',
            arcade: {
                // Optionally, configure arcade physics settings here
            }
        }
    };

    var game = new Phaser.Game(config);

    var clockSound;
    var sessionArray = [];
    var counterValue = 0;
    var counterText;
    

    function preload() {
        this.load.audio('clockSound', 'assets/clock_sound.mp3');
        this.load.image('football', 'assets/football.jpg'); // Load the ball image
    }

    function create() {
        var self = this; // Store a reference to 'this'

        var startButton = document.getElementById('startButton');
        startButton.addEventListener('click', function () {
            startSession(self); // Pass 'self' as a parameter
        });

        this.load.on('complete', function () {
            clockSound = this.sound.add('clockSound');
        }, this);

        counterText = this.add.text(0, 10, 'Counter: ', { fontFamily: 'Arial', fontSize: 24, color: '#ffffff' });
        

        this.ball = this.physics.add.sprite(400, 300, 'football');

        // Enable world bounds collision for the ball sprite
        if (this.ball) {
            this.ball.setCollideWorldBounds(true);
        } else {
            console.error("Failed to create the ball sprite.");
        }
    
    } 

    function update() {
        if (counterValue > 0) {
            counterText.setText('Counter: ' + counterValue);
            // Move the ball in the current direction
            this.ball.setVelocity(ballVelocityX, ballVelocityY);
    
            // Check if the ball is very close to a canvas boundary and adjust direction
            if (isCloseToBoundary(this.ball.x, this.ball.y)) {
                changeDirection.call(this); // Use call() to ensure the correct context
            }
        } else {
            this.ball.setVelocity(0, 0); // Stop the ball when the counter reaches 0
        }
    }
    
    const isCloseToBoundary = (x, y) => {
        // Check if the ball is very close to a canvas boundary
        const boundaryDistanceThreshold = 10; // Adjust as needed
        return (
            x <= boundaryDistanceThreshold ||
            x >= config.width - boundaryDistanceThreshold ||
            y <= boundaryDistanceThreshold ||
            y >= config.height - boundaryDistanceThreshold
        );
    };
    
    const changeDirection = function() {
        // Calculate the direction towards the next corner
        const nextCornerX = this.ball.x < config.width / 2 ? config.width : 0;
        const nextCornerY = this.ball.y < config.height / 2 ? config.height : 0;
    
        // Calculate the angle towards the next corner
        const angle = Phaser.Math.Angle.Between(this.ball.x, this.ball.y, nextCornerX, nextCornerY);
    
        // Set the velocity based on the angle
        ballVelocityX = Math.cos(angle) * ballSpeed;
        ballVelocityY = Math.sin(angle) * ballSpeed;
    
        // Update the velocity of the ball sprite
        this.ball.setVelocity(ballVelocityX, ballVelocityY);
    };

    

    function generateSessionID() {
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var sessionId = '';
        for (var i = 0; i < 10; i++) {
            sessionId += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return sessionId;
    }

    function generateRandomCounter() {
        return Math.floor(Math.random() * (120 - 30 + 1)) + 10; // Random number between 30 and 120
    }

    var ballVelocityX = Phaser.Math.Between(-200, 200); // Random initial velocity in X direction
    var ballVelocityY = Phaser.Math.Between(-400, 400); 

    function startSession(scene) {
        var sessionId = generateSessionID();
        var startTime; // Declare startTime variable
        counterValue = generateRandomCounter();
        console.log("Session ID:", sessionId);
        console.log("Counter Value:", counterValue);
    
        var timer = scene.time.addEvent({
            delay: 1000,
            callback: function () {
                if (counterValue > 0) {
                    console.log("Counter Value:", counterValue);
                    playClockSound();
                    if (!startTime) {
                        startTime = new Date(); // Capture the start time when the session starts
                    }
                    counterValue--;
                }
                if (counterValue <= 0) {
                    timer.remove(false);
                    console.log("Countdown finished.");
    
                    var endTime = new Date(); // Capture the end time when the session ends
    
                    var sessionInfo = {
                        sessionId: sessionId,
                        startTime: formatTime(startTime), // Convert and format start time
                        endTime: formatTime(endTime) // Convert and format end time
                    };
                    console.log("Session Info:", sessionInfo);
                    sessionArray.push(sessionInfo);
                    updateRightPanel(sessionInfo);
                    ballVelocityX = 0; // Stop the ball when countdown finishes
                    ballVelocityY = 0;
                }
            },
            callbackScope: this,
            loop: true
        });
    
        // Function to format time with seconds included
        function formatTime(time) {
            return time.toLocaleString('en-US', { hour12: false });
        }
        
    }
    
    function playClockSound() {
        if(clockSound && clockSound.isDecoded){ // Check if clockSound is decoded before playing
            clockSound.play();
        }
    }

    function updateRightPanel(sessionInfo) {
        var sessionElement = document.getElementById('session_Id');
        var startTimeElement = document.getElementById('startTime');
        var endTimeElement = document.getElementById('endTime');
    
        sessionElement.innerText = "Session ID: " + sessionInfo.sessionId;
        startTimeElement.innerText = "Start time: " + sessionInfo.startTime.toLocaleString();
        endTimeElement.innerText = "End time: " + sessionInfo.endTime.toLocaleString();
    }
    
});
