import React, { useEffect, useRef, useState } from "react";
import io from 'socket.io-client';
import Phaser from "phaser";
import "./App.css";

const PhaserGame = () => {
  const phaserRef = useRef(null);
  const [userType, setUserType] = useState('admin'); // Initially, assume user is admin
  const [welcomeMessage, setWelcomeMessage] = useState('Welcome! User');
  const socket = io('http://localhost:3001');
  let ball; // Define ball variable outside useEffect

  useEffect(() => {
    socket.on('userType', (type) => {
      setUserType(type);
      setWelcomeMessage(`Welcome ${type === 'admin' ? 'Admin' : 'User'}`);
    });

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
      ball = this.physics.add.image(400, 300, "Tennis"); // Assign ball here
      ball.setCollideWorldBounds(true);
      ball.setBounce(1);
      ball.setVelocity(250, 250);
    }
    
    function update() {
      // Update logic here
    }

    phaserRef.current = game;

    return () => {
      game.destroy(true);
      socket.disconnect();
    };
  }, []);

  function handleClick(buttonNumber, targetX, targetY) {
    if (userType === 'user') return; // If user, prevent button click
    const distanceX = targetX - ball.x;
    const distanceY = targetY - ball.y;
    
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    const speed = 500;
    const duration = distance / speed * 1000;
    
    ball.setVelocity(distanceX / distance * speed, distanceY / distance * speed);

    socket.emit('buttonClick', buttonNumber);
  }



  return (
    <div className="container">
      <h1>{welcomeMessage}</h1>
      {/* <p>hy mom</p> */}
      <div className="canvas-container" ref={phaserRef}></div>
      <div className="btnGroup">
        <button
          id="btn1"
          onClick={() => handleClick(200, 0, 1)}
          className="button"
        >
          Button 1
        </button>
        <button
          id="btn2"
          onClick={() => handleClick(500, 0, 1.5)}
          className="button"
        >
          Button 2
        </button>
        <button
          id="btn3"
          onClick={() => handleClick(800, 160, 1.5)}
          className="button"
        >
          Button 3
        </button>
        <button
          id="btn4"
          onClick={() => handleClick(800, 450, 1)}
          className="button"
        >
          Button 4
        </button>

        <button
          id="btn5"
          onClick={() => handleClick(200, 600, 1)}
          className="button"
        >
          Button 5
        </button>
        <button
          id="btn6"
          onClick={() => handleClick(500, 600, 1)}
          className="button"
        >
          Button 6
        </button>

        <button
          id="btn7"
          onClick={() => handleClick(0, 200, 1)}
          className="button"
        >
          Button 7
        </button>
        <button
          id="btn8"
          onClick={() => handleClick(0, 400, 1)}
          className="button"
        >
          Button 8
        </button>
      </div>
    </div>
  );
};

export default PhaserGame;
