// 🎮 Phaser 3 Game with Steamworks Integration
// Simple game without external assets

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    backgroundColor: '#1a1a2e',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let player;
let cursors;
let score = 0;
let scoreText;
let platforms;
let stars;

function preload() {
    // No external assets - we'll use graphics instead
    console.log('🎮 Phaser preload complete (using graphics)');
}

function create() {
    // Title
    this.add.text(400, 50, '🥐 Bakery + Phaser Demo', {
        fontSize: '32px',
        fill: '#fff',
        fontFamily: 'Arial',
        align: 'center'
    }).setOrigin(0.5);
    
    // Platforms (using graphics)
    platforms = this.physics.add.staticGroup();
    
    // Ground
    const ground = this.add.rectangle(400, 568, 800, 64, 0x16213e);
    this.physics.add.existing(ground, true);
    platforms.add(ground);
    
    // Ledges
    const ledge1 = this.add.rectangle(600, 400, 200, 32, 0x16213e);
    this.physics.add.existing(ledge1, true);
    platforms.add(ledge1);
    
    const ledge2 = this.add.rectangle(50, 250, 200, 32, 0x16213e);
    this.physics.add.existing(ledge2, true);
    platforms.add(ledge2);
    
    const ledge3 = this.add.rectangle(750, 220, 200, 32, 0x16213e);
    this.physics.add.existing(ledge3, true);
    platforms.add(ledge3);
    
    // Player (simple circle)
    player = this.add.circle(100, 450, 16, 0x00ff41);
    this.physics.add.existing(player);
    player.body.setBounce(0.2);
    player.body.setCollideWorldBounds(true);
    
    // Collider
    this.physics.add.collider(player, platforms);
    
    // Input
    cursors = this.input.keyboard.createCursorKeys();
    
    // Stars
    stars = this.physics.add.group();
    
    for (let i = 0; i < 12; i++) {
        const x = Phaser.Math.Between(50, 750);
        const star = this.add.star(x, 0, 5, 8, 16, 0xffff00);
        stars.add(star);
        this.physics.add.existing(star);
        star.body.setBounce(0.7);
        star.body.setCollideWorldBounds(true);
    }
    
    this.physics.add.collider(stars, platforms);
    this.physics.add.overlap(player, stars, collectStar, null, this);
    
    // Score
    scoreText = this.add.text(16, 16, 'Score: 0', { 
        fontSize: '24px', 
        fill: '#fff',
        fontFamily: 'Arial',
        backgroundColor: '#000',
        padding: { x: 10, y: 5 }
    });
    
    // Steamworks info
    if (steamUser) {
        this.add.text(16, 560, `👤 ${steamUser.name} (Level ${steamUser.level})`, {
            fontSize: '16px',
            fill: '#66c0f4',
            fontFamily: 'Arial',
            backgroundColor: '#000',
            padding: { x: 10, y: 5 }
        });
    }
    
    // Instructions
    this.add.text(400, 100, 'Use Arrow Keys to Move', {
        fontSize: '16px',
        fill: '#aaa',
        fontFamily: 'Arial'
    }).setOrigin(0.5);
    
    console.log('🎮 Phaser game created!');
}

function update() {
    if (cursors.left.isDown) {
        player.body.setVelocityX(-160);
    }
    else if (cursors.right.isDown) {
        player.body.setVelocityX(160);
    }
    else {
        player.body.setVelocityX(0);
    }
    
    if (cursors.up.isDown && player.body.touching.down) {
        player.body.setVelocityY(-330);
    }
}

function collectStar(player, star) {
    star.disableBody(true, true);
    
    score += 10;
    scoreText.setText('Score: ' + score);
    
    // Unlock Steamworks achievement at score 100
    if (score === 100 && steamClient) {
        try {
            console.log('🏆 Achievement unlocked at score 100!');
            // In production: steamClient.achievement.activate('FIRST_100_POINTS');
        } catch (error) {
            console.warn('Achievement error:', error);
        }
    }
    
    // Respawn stars when all collected
    if (stars.countActive(true) === 0) {
        stars.children.iterate(function (child) {
            const x = Phaser.Math.Between(50, 750);
            child.enableBody(true, x, 0, true, true);
        });
    }
}

console.log('🎮 Phaser game initialized!');
