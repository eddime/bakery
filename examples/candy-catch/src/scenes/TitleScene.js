// "Every great game begins with a single scene. Let's make this one unforgettable!"
export class TitleScene extends Phaser.Scene {
    constructor() {
        super('TitleScene');
    }

    preload() {
        // Load assets
        this.load.image('background', 'assets/images/background.jpg');
        this.load.image('basket', 'assets/images/basket.png');
        this.load.atlas('candy', 'assets/spritesheets/candy_spritesheet.png', 'assets/spritesheets/candy_spritesheet.json');
        this.load.audio('pop', 'assets/audio/pop.mp3');
        this.load.audio('bg', 'assets/audio/bg.mp3');
    }

    create() {
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
