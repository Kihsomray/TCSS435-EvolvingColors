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

    update(rate, tarnoid, i, j) {

        let r1 = 0, r2 = 0;
        while (r1 == 0 && r2 == 0) {
            r1 = randomInt(3) - 1;
            r2 = randomInt(3) - 1;
        }
        r1 += i;
        r2 += j;

        if (r1 > WIDTH - 1) r1 = 0;
        else if (r1 < 0) r1 = WIDTH - 1;
        if (r2 > HEIGHT - 1) r2 = 0;
        else if (r2 < 0) r2 = HEIGHT - 1;

        let cell = tarnoid[r1][r2];
        if (cell && Math.abs(cell.hue - this.hue) < 30) { // If cell color is close to animat's hue
            this.energy += 10; // Gain energy
        } else {
            this.energy -= 10; // Lose energy
        }

        if (this.energy > 200) {
            this.energy = 100;
            tarnoid[r1][r2].push(this.createMutation()); // Create a mutated copy of itself in the same cell
        }

        return this;
    }

    draw(ctx, x, y) {

        ctx.beginPath();
        ctx.arc(1 + x * 8, -3 + y * 8, 4, 0, 2 * Math.PI);
        ctx.fillStyle = hsl(this.hue, 70, 50);
        ctx.fill();
        ctx.stroke();
    }
}