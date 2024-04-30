var config = {
    type: Phaser.AUTO,
    width: 800,
    height:600,
    scene: {
        preload: preload,
        create: create
    }
}

var game =  new Phaser.Game(config);

function preload() {
this.load.image("playButton", "assets/playButton.jpg");
this.load.audio('clickSound', 'assets/clock_sound.mp3');

};

function create(){

     var playButton = this.add.image(300, 200, "playButton");

     playButton.setInteractive();
     playButton.on("pointerdown", function(){
        var clickSound = this.sound.add('clickSound');
        clickSound.play();

        // Add your game logic here for when the play button is clicked
        console.log("Play button clicked!");
    }, this);
    
};