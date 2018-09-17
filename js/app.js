// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y + 55;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
    this.step = 101;
    this.boundary = this.step * 5;
    this.resetPosition = -this.step;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // If enemy is not past boundary, then keep moving
    if(this.x < this.boundary) { // places bug just off screen
        // Move forward
        // Increment x by speed * dt
        this.x += this.speed * dt;
    }
    else {
        // Reset position to start
        this.x = this.resetPosition;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

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

    updatePosition() {
        // check Collision
        let playerRight = this.x + this.step / 2;
        for(let enemy of allEnemies) {
            // Did player collide with any enemy?
            let enemyRight = enemy.x + enemy.step / 2;
            if (this.y === enemy.y && (enemyRight > this.x && enemy.x < playerRight)) {
                this.resetHero();
            }
        }
        // check Win
        if (this.y === 55) {
            this.playerWin = true;
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
