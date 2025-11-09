import { GameScene } from './scenes/GameScene.js';
import { GameOverScene } from './scenes/GameOverScene.js';
import { TitleScene } from './scenes/TitleScene.js';

const config = {
    type: Phaser.AUTO,
    title: 'Candy Catch',
    description: '',
    parent: 'game-container',
    width: 1280,
    height: 720,
    backgroundColor: '#000000',
    pixelArt: false,
    scene: [
        TitleScene,
        GameScene,
        GameOverScene
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                x: 0, y: 200,
            },
            debug: false
        }
    }
}

new Phaser.Game(config);
            