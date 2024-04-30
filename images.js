var config = {
    type: Phaser.AUTO,
    width: 900,
    height: 800,
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);

function preload() {
    // Load 9 images
    this.load.image('image1', 'assets/logo.png');
    this.load.image('image2', 'assets/logo2.jpg');
    this.load.image('image3', 'assets/dove.jpg');
    this.load.image('image4', 'assets/instagram.jpg');
    this.load.image('image5', 'assets/colorful.png');
    this.load.image('image6', 'assets/twitter.jpg');
    this.load.image('image7', 'assets/Gucci.jpg');
    this.load.image('image8', 'assets/infinity.jpg');
    this.load.image('image9', 'assets/lotus.jpg');
    // Load more images as needed
}

function create() {
    // Create a container to hold the images
    var imageContainer = this.add.container(0, 0);

    // Add images to the container
    for (var i = 0; i < 9; i++) {
        var imageKey = 'image' + (i + 1);
        var image = this.add.image(400 * i, 300, imageKey);
        imageContainer.add(image);
    }

    // Set container size to fit all images
    imageContainer.setSize(400 * 9, 600); // Adjust the width based on image width and number of images

    // Variables to store initial pointer coordinates
    var downX, downY;

    // Set up swipe input events
    this.input.on('pointerdown', function(pointer) {
        downX = pointer.x;
        downY = pointer.y;
    }, this);

    this.input.on('pointerup', function(upPointer) {
        var deltaX = upPointer.x - downX;
        var deltaY = upPointer.y - downY;

        // Determine swipe direction
        if (Math.abs(deltaX) > Math.abs(deltaY)) { // Horizontal swipe
            if (deltaX > 0) {
                // Swipe right
                this.tweens.add({
                    targets: imageContainer,
                    x: '-=400', // Move the container left by 400 pixels (adjust based on image width)
                    duration: 500,
                    ease: 'Power2'
                });
            } else {
                // Swipe left
                this.tweens.add({
                    targets: imageContainer,
                    x: '+=400', // Move the container right by 400 pixels (adjust based on image width)
                    duration: 500,
                    ease: 'Power2'
                });
            }
        } else { // Vertical swipe
            if (deltaY > 0) {
                // Swipe down
                this.tweens.add({
                    targets: imageContainer,
                    y: '+=300', // Move the container down by 300 pixels
                    duration: 500,
                    ease: 'Power2'
                });
            } else {
                // Swipe up
                this.tweens.add({
                    targets: imageContainer,
                    y: '-=300', // Move the container up by 300 pixels
                    duration: 500,
                    ease: 'Power2'
                });
            }
        }
    }, this);
}