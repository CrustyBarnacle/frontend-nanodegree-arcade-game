// Enemies our player must avoid - Now a 'real Class'
class Enemy {
    constructor(x, y, speed) {
        // Variables applied to each of our instances
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y + 55;
        this.step = 101;
        this.speed = speed;
        this.boundary = this.step * 5; // places bug just off screen
        this.resetPosition = -this.step;
    }

    update(dt) {
        // If not past boundary, keep moving
        if(this.x < this.boundary) {
            // Move forward, increment x by speed * dt
            this.x += this.speed * dt;
        }
        else { // Reset position to start
            this.x = this.resetPosition;
        }
    }

    checkCollisions() {
        if (this.y === player.y) {
            if (this.x + this.step / 2 > player.x && this.x < player.x + player.step / 2) {
                player.resetHero();
                }
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Player class. This class requires an update(), render() and
// a handleInput() method.
// Added resetHero().

class Hero {
    constructor() {
        this.sprite = 'images/char-pink-girl.png';
        this.step = 101;
        this.jump = 83;
        this.startX = this.step * 2; // Center column
        this.startY = (this.jump * 4) + 55; // Bottom row
        this.x = this.startX;
        this.y = this.startY;
        this.playerWin = false;
    }

    update() {
        if (this.y === 55) {
            this.playerWin = true;
        }
    }
    
    checkCollisions() {
        for(let enemy of allEnemies) {        
            if (this.y === enemy.y) {
                if (this.x + this.step / 2 > enemy.x && this.x < enemy.x + enemy.step / 2) {
                    player.resetHero();
                    }
            }
        }
    }

    // Draw player sprite at current x,y
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    /** Update player x,y based on input
    *
    * @param {string} input - Direction of travel
    */
    handleInput(input) {
        switch(input) {
            case 'left':
                if (this.x > 0) {
                    this.x -= this.step;
                }
                break;
            case 'up':
                if (this.y > this.jump) {
                    this.y -= this.jump;
                }
                break;
            case 'right':
                if (this.x < this.step * 4) {
                    this.x += this.step;
                }
                break;
            case 'down':
                if (this.y < this.jump * 4) {
                    this.y += this.jump;
                }
                break;
        }
    }

    resetHero() {
        // Back to starting position
        this.y = this.startY;
        this.x = this.startX;
    }
}


// New Hero and Enemy objects
const player = new Hero();
const enemy_bug1 = new Enemy(-101, 0, 200);
const enemy_bug2 = new Enemy(-101, 83, 300);
const enemy_bug3 = new Enemy((-101 * 2.5), 83, 350);
const enemy_bug4 = new Enemy(-101, 166, 235);

// Init allEnemies array
// For each enemy create and push new Enemy object into array
const allEnemies = [];
allEnemies.push(enemy_bug1, enemy_bug2, enemy_bug3, enemy_bug4);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
