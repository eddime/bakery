// "Every great game begins with a single scene. Let's make this one unforgettable!"
export class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOverScene');
    }

    init(data) {
        // Initialize scene
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
