class Animat {

    hue;
    energy;

    constructor(hue = Math.random() * 360, energy = 100) {
        this.hue = hue;
        this.energy = energy;
        this.ticks = 0;
    }

    createMutation() {
        return new Animat(this.hue + Math.random() * 16 - 8, 100);
    }

    update(rate, selectivity, plantTarnoid, tarnoid, i, j) {
        let best = Infinity;
        let x = i;
        let y = j;

        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                let newX = (i + dx + WIDTH) % WIDTH;
                let newY = (j + dy + HEIGHT) % HEIGHT;
                let cell = plantTarnoid[newX][newY];
                if (cell) {
                    let diff = Math.abs(this.hue - cell.hue);

                    if (diff < best) {
                        best = diff;
                        x = newX;
                        y = newY;
                    }
                }
            }
        }

        let cell = plantTarnoid[x][y];
        if (cell) {
            let hueDiff = Math.min(Math.abs(cell.hue - this.hue), Math.abs(360 + cell.hue - this.hue));
            if (hueDiff < selectivity) { 
                this.energy += rate;
                plantTarnoid[x][y] = null;
            } else {
                this.energy -= rate; 
            }
        }

        if (this.energy > 200) {
            this.energy -= 100;
            tarnoid[x][y].push(this.createMutation());
        }

        if (this.energy < 0) {

            let index = tarnoid[i][j].indexOf(this);
            if (index > -1) {
                tarnoid[i][j].splice(index, 1);
            }
            
        }
    }

    draw(ctx, x, y) {

        ctx.beginPath();
        ctx.arc(5 + x * 8, 4 + y * 8, 4, 0, 2 * Math.PI);
        ctx.fillStyle = hsl(this.hue, 70, 50);
        ctx.fill();
        ctx.stroke();
    }
}