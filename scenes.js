// Define Scene1 before using it
var Scene1 = new Phaser.Scene('Scene1');

// Preload and create methods for Scene1
Scene1.preload = function() {
    this.load.image('infinity', 'assets/infinity.jpg');
};

Scene1.create = function() {
    // Capture scene reference
    var self = this;
    
    // Define a custom flag to track whether the scene is paused
    this.isScenePaused = false;

    // Create objects and logic for Scene1
    this.add.image(300, 300, 'infinity');

    // Add a pause button
    var pauseButton = this.add.text(20, 20, 'Pause', { fill: '#ffffff' });
    pauseButton.setInteractive();
    pauseButton.on('pointerdown', function() {
        // Set the custom flag to true
        self.isScenePaused = true;
        console.log("Scene1 paused");
    });

    // Add a resume button
    var resumeButton = this.add.text(100, 20, 'Resume', { fill: '#ffffff' });
    resumeButton.setInteractive();
    resumeButton.on('pointerdown', function() {
        // Check if the scene is paused
        if (self.isScenePaused) {
            self.isScenePaused = false;
            console.log("Scene1 resumed");
        }
    });

    // Add a change scene button
    var changeSceneButton = this.add.text(180, 20, 'Change Scene', { fill: '#ffffff' });
    changeSceneButton.setInteractive();
    changeSceneButton.on('pointerdown', function() {
        // Check if the scene is not paused
        if (!self.isScenePaused) {
            self.scene.start('Scene2');
        }
    });
};

// Define Scene2 before using it
var Scene2 = new Phaser.Scene('Scene2');

// Preload and create methods for Scene2
Scene2.preload = function() {
    this.load.image('logo2', 'assets/logo2.jpg');
};

Scene2.create = function() {
    // Capture scene reference
    var self = this;
    
    // Define a custom flag to track whether the scene is paused
    this.isScenePaused = false;

    // Create objects and logic for Scene2
    this.add.image(400, 300, 'logo2');

    // Add a pause button
    var pauseButton = this.add.text(20, 20, 'Pause', { fill: '#ffffff' });
    pauseButton.setInteractive();
    pauseButton.on('pointerdown', function() {
        // Set the custom flag to true
        self.isScenePaused = true;
        console.log("Scene2 paused");
    });

    // Add a resume button
    var resumeButton = this.add.text(100, 20, 'Resume', { fill: '#ffffff' });
    resumeButton.setInteractive();
    resumeButton.on('pointerdown', function() {
        // Check if the scene is paused
        if (self.isScenePaused) {
            self.isScenePaused = false;
            console.log("Scene2 resumed");
        }
    });

    // Add a change scene button
    var changeSceneButton = this.add.text(180, 20, 'Change Scene', { fill: '#ffffff' });
    changeSceneButton.setInteractive();
    changeSceneButton.on('pointerdown', function() {
        // Check if the scene is not paused
        if (!self.isScenePaused) {
            self.scene.start('Scene1');
        }
    });
};

// Define the configuration for your Phaser game
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [Scene1, Scene2]
};

// Create a new Phaser game instance with the provided configuration
var game = new Phaser.Game(config);
