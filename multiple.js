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
    
    this.load.image('logo', 'assets/logo.png');
}

function create() {
  
    var image = this.add.image(400, 300, 'logo');

  
    this.tweens.add({
        targets: image,
        duration: 2000,
        scaleX: 1.5,  // Increase scale horizontally
        scaleY: 1.5,  // Increase scale vertically
        rotation: Math.PI,  // Rotate 180 degrees (Pi radians)
        ease: 'Linear',
        onComplete: function() {
            // Destroy the image after tween is complete
            image.destroy();
        }
    });

    // Destroy the image after 5 seconds using a timer event
    this.time.delayedCall(5000, function() {
        if (image && !image.destroyed) {
            image.destroy();
        }
    }, [], this);
}
