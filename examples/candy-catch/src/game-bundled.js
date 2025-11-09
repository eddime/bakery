// 🍬 Candy Catch - Bundled Version (No ES6 Modules)
console.log('🎮 Loading Candy Catch...');

// TitleScene
class TitleScene extends Phaser.Scene {
    constructor() {
        super('TitleScene');
    }

    preload() {
        console.log('🎮 TitleScene: Loading assets...');
        
        // Load assets
        this.load.image('background', 'assets/images/background.jpg');
        this.load.image('basket', 'assets/images/basket.png');
        this.load.atlas('candy', 'assets/spritesheets/candy_spritesheet.png', 'assets/spritesheets/candy_spritesheet.json');
        this.load.audio('pop', 'assets/audio/pop.mp3');
        this.load.audio('bg', 'assets/audio/bg.mp3');
        
        // Debug loading
        this.load.on('filecomplete', (key) => {
            console.log('✅ Loaded:', key);
        });
        
        this.load.on('loaderror', (file) => {
            console.error('❌ Failed to load:', file.src);
        });
    }

    create() {
        console.log('🎮 TitleScene: Creating scene...');
        
        // create background
        this.add.image(0, 0, 'background').setOrigin(0, 0);
        // add in text
        this.add.text(this.scale.width / 2, this.scale.height / 2, 'Candy Catch', {
            fontSize: '80px',
            color: '#B05389',
            stroke: '#ffffff',
            strokeThickness: 10
        }).setOrigin(0.5);

        this.add.text(this.scale.width / 2, this.scale.height / 2 + 180, 'Click to Play', {
            fontSize: '40px',
            color: '#B05389',
            stroke: '#ffffff',
            strokeThickness: 6
        }).setOrigin(0.5);

        this.input.once('pointerdown', () => {
            this.cameras.main.fadeOut(500);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                this.scene.start('GameScene');
            });
        });

        this.cameras.main.fadeIn(500);
        this.sound.play('bg', {
            volume: 0.5,
            loop: true,
        });
    }
}

// GameScene
class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    create() {
        this.score = 0;

        // create background
        this.add.image(0, 0, 'background').setOrigin(0, 0);
        // add player basket
        this.basket = this.physics.add.image(this.scale.width / 2, 630, 'basket');
        this.basket.body.setAllowGravity(false).setCollideWorldBounds(true);
        this.basketGlow = this.basket.postFX.addGlow(0xffffff, 3, 0);

        // input
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        
        // create candy group
        this.candyFrames = this.textures.get('candy').getFrameNames();
        this.candyGroup = this.physics.add.group([]);
        
        // time event to spawn candy
        this.time.addEvent({
            delay: 1000,
            loop: true,
            callback: this.spawnRandomCandy,
            callbackScope: this,
        });

        // collision detection
        this.physics.add.overlap(this.basket, this.candyGroup, this.handleBasketCandyCollision, null, this);

        // ui
        const scorePrefix = this.add.text(10, 10, 'Score: ', {
            fontSize: '40px',
            color: '#043D8C',
            stroke: '#ffffff',
            strokeThickness: 6
        });
        this.scoreText = this.add.text(scorePrefix.x + scorePrefix.width, 10, '0', {
            fontSize: '40px',
            color: '#043D8C',
            stroke: '#ffffff',
            strokeThickness: 6
        });
        this.timerText = this.add.text(this.scale.width - 80, 10, '30', {
            fontSize: '60px',
            color: '#043D8C',
            stroke: '#ffffff',
            strokeThickness: 6
        });

        // trigger game over
        this.gameIsOver = false;
        this.timedEvent = this.time.delayedCall(30 * 1000, this.handleGameOver, [], this);

        // fade in camera
        this.cameras.main.fadeIn(500);
    }

    update() {
        if (this.gameIsOver) {
            this.basket.setVelocityX(0);
            return;
        }
        this.timerText.setText(Math.round(this.timedEvent.getRemainingSeconds()).toString(10));

        if (this.cursorKeys.left.isDown) {
            this.basket.setVelocityX(-350);
        } else if (this.cursorKeys.right.isDown) {
            this.basket.setVelocityX(350);
        } else {
            this.basket.setVelocityX(0);
        }

        this.candyGroup.getChildren().forEach((child) => {
            if (!child.active) {
                return;
            }
            if (child.y > this.scale.height + 10) {
                child.setActive(false).setVisible(false);
            }
        });
    }

    spawnRandomCandy() {
        const candy = this.candyGroup.getFirstDead(true, Phaser.Math.RND.between(50, this.scale.width - 50), -20, 'candy');
        candy
            .setScale(0.5)
            .setActive(true)
            .setVisible(true)
            .setVelocity(0)
            .setFrame(Phaser.Utils.Array.GetRandom(this.candyFrames))
            .enableBody();
        console.log(this.candyGroup.getChildren().length);
    }

    handleBasketCandyCollision(basket, candy) {
        candy.disableBody(true, true);
        if (this.gameIsOver) {
            return;
        }
        this.score += 10;
        this.scoreText.setText(this.score.toString(10));
        console.log(this.score);
        this.sound.play('pop', {
            volume: 0.5,
        });
    }

    handleGameOver() {
        this.gameIsOver = true;
        this.cameras.main.fadeOut(500);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
            this.scene.start('GameOverScene', {
                score: this.score,
            });
        });
    }
}

// GameOverScene
class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOverScene');
    }

    init(data) {
        this.score = data.score;
    }

    create() {
        // create background
        this.add.image(0, 0, 'background').setOrigin(0, 0);
        // add in text
        this.add.text(this.scale.width / 2, this.scale.height / 2 - 100, 'Game Over', {
            fontSize: '80px',
            color: '#B05389',
            stroke: '#ffffff',
            strokeThickness: 10
        }).setOrigin(0.5);
        this.add.text(this.scale.width / 2, this.scale.height / 2 + 60, `Score: ${this.score}`, {
            fontSize: '60px',
            color: '#B05389',
            stroke: '#ffffff',
            strokeThickness: 8
        }).setOrigin(0.5);
        this.add.text(this.scale.width / 2, this.scale.height / 2 + 180, 'Click to Play Again', {
            fontSize: '40px',
            color: '#B05389',
            stroke: '#ffffff',
            strokeThickness: 6
        }).setOrigin(0.5);

        this.input.once('pointerdown', () => {
            this.cameras.main.fadeOut(500);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                this.scene.start('GameScene');
            });
        });

        this.cameras.main.fadeIn(500);
    }
}

// Game Config
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
};

console.log('🎮 Creating Phaser Game...');
new Phaser.Game(config);
console.log('✅ Phaser Game created!');

