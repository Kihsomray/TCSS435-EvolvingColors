const WIDTH = 179;
const HEIGHT = 101;

class Automata {

    tarnoid;
    plantGrowth; // 0-100
    animatGrowth; // 0-100
    animatFoodSelectivity; // 0-100

    intervalCounter;
    ticks;

    constructor() {

        this.clear();
        this.plantGrowth = 9;
        this.animatGrowth = 24;
        this.animatFoodSelectivity = 49;
        this.intervalCounter = 0;

        this.init();

    }

    init() {

        document.getElementById('plantGrowth').addEventListener('input', e => this.plantGrowth = e.target.value);
        document.getElementById('animatGrowth').addEventListener('input', e => this.animatGrowth = e.target.value);
        document.getElementById('animatFoodSelectivity').addEventListener('input', e => this.animatFoodSelectivity = e.target.value);
        
        document.getElementById('addPlant').addEventListener('click', e => 
            this.tarnoid[Math.floor(Math.random() * WIDTH)][Math.floor(Math.random() * HEIGHT)] = new Plant()
        );

        document.getElementById('addAnimat').addEventListener('click', e => 
            this.tarnoid[Math.floor(Math.random() * WIDTH)][Math.floor(Math.random() * HEIGHT)] = new Animat()
        );
        
        document.getElementById('clearAll').addEventListener('click', e => this.clear());

    }
    
    clear() {
        this.ticks = 0;
        this.tarnoid = Array.from({length: WIDTH}, () => new Array(HEIGHT).fill(null));
    }


    update() {

        document.getElementById('ticks').innerHTML = `Ticks: ${this.ticks++}`;
        for (let i = 0; i < WIDTH; i++) {
            for (let j = 0; j < HEIGHT; j++) {

                if (this.tarnoid[i][j] != null) {

                    if (Math.random() < (document.getElementById('lowerDyingRate').checked ? 0.001 : 0.01)) {
                        this.tarnoid[i][j] = null;
                        continue;
                    }

                    const cell = this.tarnoid[i][j];
                    const isPlant = cell instanceof Plant;

                    const rate = isPlant ? this.plantGrowth : this.animatGrowth;
                    cell.update(rate, this.tarnoid, i, j);

                }

            }
        }


    }

    draw(ctx, engine) {

        for (let i = 0; i < WIDTH; i++) {
            for (let j = 0; j < HEIGHT; j++) {

                if (this.tarnoid[i][j] != null) this.tarnoid[i][j].draw(ctx, i, j);

            }
        }

    }

}