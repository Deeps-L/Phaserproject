document.addEventListener("DOMContentLoaded", function () {
  var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,

    scene: {
      preload: preload,
      create: create,
      update: update, 
    },
    physics: {
      default: "arcade",
      arcade: {
        // debug: false
      },
    },
  };

  var game = new Phaser.Game(config);

  var clockSound;
  var sessionArray = [];
  var counterValue = 0;
  var counterText;
  var ball;

  function preload() {
    this.load.audio("clockSound", "assets/clock_sound.mp3");
    this.load.image("football", "assets/football.jpg"); 
  }

  function create() {
    var self = this;

    var startButton = document.getElementById("startButton");
    startButton.addEventListener("click", function () {
      startSession(self);
      // Play clock sound
      clockSound.play();
    });

    clockSound = this.sound.add("clockSound");
    counterText = this.add.text(0, 10, "Counter: ", {
      fontFamily: "Arial",
      fontSize: 24,
      color: "#ffffff",
    });

    // Add the ball sprite but do not set velocity yet
    ball = this.physics.add.sprite(400, 300, "football");
  }

  function playClockSound() {
   
    if (clockSound && clockSound.isDecoded) {
      console.log("Clock sound is decoded, playing...");
      clockSound.play();
    }
  }

  function update() {
    if (counterValue >= 0) {
      counterText.setText("Counter: " + counterValue);
    }
  }

  function generateSessionID() {
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var sessionId = "";
    for (var i = 0; i < 10; i++) {
      sessionId += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return sessionId;
  }

  function generateRandomCounter() {
    return Math.floor(Math.random() * (120 - 30 + 1)) + 10;
  }

  function startSession(scene) {
    var sessionId = generateSessionID();
    var startTime; 
    counterValue = generateRandomCounter();
    console.log("Session ID:", sessionId);
    console.log("Counter Value:", counterValue);

    // Set the initial velocity of the ball when the counter starts

    ball.setVelocity(200, -200).setCollideWorldBounds(true, 1, 1, true);

    var timer = scene.time.addEvent({
      delay: 1000,
      callback: function () {
        if (counterValue > 0) {
          console.log("Counter Value:", counterValue);
          playClockSound();
          if (!startTime) {
            startTime = new Date();
          }
          counterValue--;
        }
        if (counterValue <= 0) {
          timer.remove(false);
          console.log("Countdown finished.");

          var endTime = new Date();

          var sessionInfo = {
            sessionId: sessionId,
            startTime: formatTime(startTime),
            endTime: formatTime(endTime),
          };
          console.log("Session Info:", sessionInfo);
          sessionArray.push(sessionInfo);
          updateRightPanel(sessionInfo);
          ball.setVelocity(0, 0);
        }
      },
      callbackScope: this,
      loop: true,
    });

    function formatTime(time) {
      return time.toLocaleString("en-US", { hour12: false });
    }
  }

  function updateRightPanel(sessionInfo) {
    var sessionElement = document.getElementById("session_Id");
    var startTimeElement = document.getElementById("startTime");
    var endTimeElement = document.getElementById("endTime");

    sessionElement.innerText = "Session ID: " + sessionInfo.sessionId;
    startTimeElement.innerText =
      "Start time: " + sessionInfo.startTime.toLocaleString();
    endTimeElement.innerText =
      "End time: " + sessionInfo.endTime.toLocaleString();
  }
});
