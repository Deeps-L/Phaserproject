import React, { useEffect, useRef } from "react";
import Phaser from "phaser";

const PhaserGame = () => {
  const phaserRef = useRef(null);
  let ball;

  // Define handleButtonClick outside of useEffect
  function handleButtonClick(direction) {
    switch (direction) {
      case "topLeft":
        ball.setVelocityX(-200);
        ball.setVelocityY(-200);
        break;
      case "topRight":
        ball.setVelocityX(200);
        ball.setVelocityY(-200);
        break;
      case "rightUp":
        ball.setVelocityX(200);
        ball.setVelocityY(-200);
        break;
      case "rightDown":
        ball.setVelocityX(200);
        ball.setVelocityY(200);
        break;
      case "bottomLeft":
        ball.setVelocityX(-200);
        ball.setVelocityY(200);
        break;
      case "bottomRight":
        ball.setVelocityX(200);
        ball.setVelocityY(200);
        break;
      case "leftUp":
        ball.setVelocityX(-200);
        ball.setVelocityY(-200);
        break;
      case "leftDown":
        ball.setVelocityX(-200);
        ball.setVelocityY(200);
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      backgroundColor: "#c82525",
      scene: {
        preload: preload,
        create: create,
        update: update,
      },
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false
        }
      }
    };

    const game = new Phaser.Game(config);

    function preload() {
      this.load.image("Tennis", "./assets/tennisBall.jpg");
    }
    
    function create() {
      ball = this.physics.add.image(400, 300, "Tennis"); 
      ball.setCollideWorldBounds(true);
      ball.setBounce(1);
      ball.setVelocity(250, 250);
    }
    

    function update() {
      // Update logic here
    }
    

    return () => {
      game.destroy(true);
    };
  }, []);

  return (
    <div className="container">
      <div className="canvas-container" ref={phaserRef}></div>
      <div className="btnGroup">
        <button className="button" id="btn1" onClick={() => handleButtonClick("topLeft")}>
          Button 1
        </button>
        <button className="button" id="btn2" onClick={() => handleButtonClick("topRight")}>
          Button 2
        </button>

        <button className="button" id="btn3" onClick={() => handleButtonClick("rightUp")}>
          Button 3
        </button>
        <button className="button" id="btn4" onClick={() => handleButtonClick("rightDown")}>
          Button 4
        </button>

        <button className="button" id="btn5" onClick={() => handleButtonClick("bottomLeft")}>
          Button 5
        </button>
        <button className="button" id="btn6" onClick={() => handleButtonClick("bottomRight")}>
          Button 6
        </button>

        <button className="button" id="btn7" onClick={() => handleButtonClick("leftUp")}>
          Button 7
        </button>
        <button className="button" id="btn8" onClick={() => handleButtonClick("leftDown")}>
          Button 8
        </button>
      </div>
    </div>
  );
};

export default PhaserGame;
