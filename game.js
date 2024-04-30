var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);

function preload() {
    // Preload assets if needed
}

function create() {
    // Add event listener for keyboard input
    this.input.keyboard.on('keydown', function(event) {
        if (event.key === ' ') { // 'SPACE' key is represented by a single space character
            // Change the text of the paragraph element with id 'message'
            document.getElementById('message').innerText = 'Space key pressed!';
        }
    });
}
