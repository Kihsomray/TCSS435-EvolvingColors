// Plants: Plants have a single gene that determines the hue they are drawn with.
// ○ Plants grow over time and when mature they will grow another plant in a neighboring
// cell.
// ○ There can only be one plant per cell.
// ○ Newly created cells will be mutated versions of the plant that created them, meaning the
// hue might shift in the new plant.
// ○ A plant has a 1% chance of dying each tick.
// ● Animats: Animats have a single gene that determines the hue they are drawn with and the food
// they wish to consume.
// ○ Animats move to an adjacent cell with color closest to their own.
// ○ If the cell has color close enough the animat will eat the plant.
// ○ The plant will give the animat energy if their colors are close, but it will drain energy if
// their colors are far away.
// ○ If the animat’s energy exceeds a threshold it will create a mutated copy of itself in the
// same cell.
// ○ There can be any number of animats in a cell.
// ○ If the animat’s energy drops below zero they die.
// ○ An animat has a 1% chance of dying each tick.

class Automata {

    WIDTH = 240;
    HEIGHT = 135;

    tarnoid;
    plantGrowth; // 0-100
    animatGrowth; // 0-100
    animatFoodSelectivity; // 0-100

    intervalCounter;
    ticks;

    constructor() {

        this.clearTarnoid();
        this.plantGrowth = 9;
        this.animatGrowth = 24;
        this.animatFoodSelectivity = 49;
        this.intervalCounter = 0;
        this.ticks = 0;

        this.init();

    }

    init() {

        document.getElementById('plantGrowth').addEventListener('input', e => this.plantGrowth = e.target.value);
        document.getElementById('animatGrowth').addEventListener('input', e => this.animatGrowth = e.target.value);
        document.getElementById('animatFoodSelectivity').addEventListener('input', e => this.animatFoodSelectivity = e.target.value);
        
        document.getElementById('addPlant').addEventListener('click', e => 
            this.tarnoid[Math.floor(Math.random() * this.WIDTH)][Math.floor(Math.random() * this.HEIGHT)] = new Plant()
        );

        document.getElementById('addAnimat').addEventListener('click', e => 
            this.tarnoid[Math.floor(Math.random() * this.WIDTH)][Math.floor(Math.random() * this.HEIGHT)] = new Animat()
        );
        
        document.getElementById('clearAll').addEventListener('click', e => this.clearTarnoid());

    }
    
    clearTarnoid() {
        this.tarnoid = Array.from({length: this.WIDTH}, () => new Array(this.HEIGHT).fill(null));
    }


    update() {

        for (let i = 0; i < this.WIDTH; i++) {
            for (let j = 0; j < this.HEIGHT; j++) {

                if (this.tarnoid[i][j] != null) {

                    const cell = this.tarnoid[i][j];

                    let rate = 0;
                    if (cell instanceof Plant) {
                        rate = this.plantGrowth;
                    } else if (cell instanceof Animat) {
                        rate = this.animatGrowth;
                    }


                    const val = cell.update(rate);

                    if (val == 0) {
                        this.tarnoid[i][j] = null;

                    } else if (val != null) {
                        
                        let r1 = 0, r2 = 0;
                        while (r1 == 0 && r2 == 0) {
                            r1 = randomInt(3) - 1;
                            r2 = randomInt(3) - 1;
                        }
                        r1 += i;
                        r2 += j;

                        if (r1 > this.WIDTH - 1) r1 = 0;
                        else if (r1 < 0) r1 = this.WIDTH - 1;
                        if (r2 > this.HEIGHT - 1) r2 = 0;
                        else if (r2 < 0) r2 = this.HEIGHT - 1;

                        this.tarnoid[r1][r2] = val;

                    }

                }

            }
        }


    }

    draw(ctx, engine) {

        for (let i = 0; i < this.WIDTH; i++) {
            for (let j = 0; j < this.HEIGHT; j++) {

                if (this.tarnoid[i][j] != null) this.tarnoid[i][j].draw(ctx, i, j);

            }
        }

    }

}