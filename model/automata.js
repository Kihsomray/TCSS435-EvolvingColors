const WIDTH = 179;
const HEIGHT = 96;

class Automata {

    plantTarnoid;
    animatTarnoid;
    plantGrowth; // 0 - 100
    animatGrowth; // 0 - 100
    animatFoodSelectivity; // 0 - 180

    intervalCounter;
    ticks;
    lowerDyingRate;

    constructor() {

        this.clear();
        this.plantGrowth = 45;
        this.animatGrowth = 65;
        this.animatFoodSelectivity = 60;
        this.intervalCounter = 0;
        this.lowerDyingRate = true;

        this.init();

    }

    init() {

        document.getElementById('testPreset').addEventListener('click', _ => {
            for (let i = 0; i < 30; i++) {
                if (i % 3 == 0) this.addPlant();
                this.addAnimat();
            }
        });
        document.getElementById('lowerDyingRate').addEventListener('click', e => this.lowerDyingRate = e.target.checked);

        document.getElementById('plantGrowth').addEventListener('input', e => this.plantGrowth = e.target.value);
        document.getElementById('animatGrowth').addEventListener('input', e => this.animatGrowth = e.target.value);
        document.getElementById('animatFoodSelectivity').addEventListener('input', e => this.animatFoodSelectivity = e.target.value);
        
        document.getElementById('addPlant').addEventListener('click', _ => this.addPlant());
        document.getElementById('addAnimat').addEventListener('click', _ => this.addAnimat());
        document.getElementById('clearAll').addEventListener('click', _ => this.clear());
        
        

    }

    addPlant() {
        this.plantTarnoid[Math.floor(Math.random() * WIDTH)][Math.floor(Math.random() * HEIGHT)] = new Plant();
    }

    addAnimat() {
        this.animatTarnoid[Math.floor(Math.random() * WIDTH)][Math.floor(Math.random() * HEIGHT)].push(new Animat());
    }
    
    clear() {
        this.ticks = 0;
        this.plantTarnoid = Array.from({length: WIDTH}, () => new Array(HEIGHT).fill(null));
        this.animatTarnoid = [];
        for (let i = 0; i < WIDTH; i++) {
            this.animatTarnoid[i] = [];
            for (let j = 0; j < HEIGHT; j++) {
                this.animatTarnoid[i][j] = [];
            }
        }
    }


    update() {

        document.getElementById('ticks').innerHTML = `Ticks: ${this.ticks++}`;
        for (let i = 0; i < WIDTH; i++) {
            for (let j = 0; j < HEIGHT; j++) {

                if (this.plantTarnoid[i][j] != null) {

                    if (Math.random() < (this.lowerDyingRate ? 0.001 : 0.01)) {
                        this.plantTarnoid[i][j] = null;
                        continue;
                    }

                    const cell = this.plantTarnoid[i][j];
                    cell.update(this.plantGrowth, this.plantTarnoid, i, j);

                } 
                
                if (this.animatTarnoid[i][j] != null) {

                    if (Math.random() < (this.lowerDyingRate ? 0.001 : 0.01)) {
                        this.animatTarnoid[i][j].pop();
                        continue;
                    }

                    const cell = this.animatTarnoid[i][j];

                    for (let k = 0; k < cell.length; k++) 
                        cell[k].update(
                            this.animatGrowth,
                            this.animatFoodSelectivity,
                            this.plantTarnoid,
                            this.animatTarnoid,
                            i,
                            j
                        );
                    

                }

            }
        }


    }

    draw(ctx, engine) {

        for (let i = 0; i < WIDTH; i++) {
            for (let j = 0; j < HEIGHT; j++) {

                if (this.plantTarnoid[i][j] != null) this.plantTarnoid[i][j].draw(ctx, i, j);
                if (this.animatTarnoid[i][j] != null)
                    for (let k = 0; k < this.animatTarnoid[i][j].length; k++) 
                        this.animatTarnoid[i][j][k].draw(ctx, i, j);
    
            }
        }

    }

}