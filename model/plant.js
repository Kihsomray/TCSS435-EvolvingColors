class Plant {

    hue;
    growth;

    constructor(hue = Math.random() * 360) {
        this.hue = hue;
        this.growth = 0;
        this.ticks = 0;
    }

    createMutation() {
        return new Plant(this.hue + Math.random() * 16 - 8);
    }

    update(rate, tarnoid, i, j) {

        this.growth += rate / 10;
        if (this.growth > 100) {

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

            if (!tarnoid[r1][r2]) {
                this.growth = 0;
                tarnoid[r1][r2] = this.createMutation();
            }
        }
        return null;
    
    }

    draw(ctx, x, y) {
        ctx.restore();
		ctx.strokeRect(3 + x * 8 - 1, 1 + y * 8 - 1, 9, 9);
        ctx.save();

        ctx.fillStyle = hsl(this.hue, this.growth * 40 / 200 + 40, 50);
		ctx.strokeStyle = "gray";
		ctx.fillRect(3 + x * 8, 1 + y * 8, 7, 7);
    }

}