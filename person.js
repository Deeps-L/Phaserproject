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
    // Load the person image
    this.load.image('fair-man', 'assets/fair-man.png');
}

function create() {
    // Add the fair-man image to the scene
    var person = this.add.sprite(400, 400, 'fair-man');

    // Set custom properties for the person
    person.setData('age', 30);
    person.setData('color', 'fair');
    var ageText = this.add.text(20, 20, "Age: " + person.getData('age'), { font: "16px Arial", fill: "#ffffff" });
    var colorText = this.add.text(10, 40, "Color: " + person.getData('color'), { font: "16px Arial", fill: "#ffffff" });
}
