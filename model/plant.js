class Plant {

    hue;
    growth;
    ticks;

    constructor(hue = Math.random() * 360) {
        this.hue = hue;
        this.growth = 0;
        this.ticks = 0;
    }

    createMutation() {
        return new Plant(this.hue + Math.random() * 10 - 5);
    }

    update(rate) {
        if (++this.ticks % (rate / 50 + (5 - Math.round(Math.random(2)))) != 0) return null;
        this.growth += rate;
        if (Math.random() < 0.01) {
            return 0;
        }
        if (this.growth > 100) {
            this.growth = 0;
            return this.createMutation();
        }
        return null;
    }

    draw(ctx, x, y) {
        ctx.restore();
		ctx.strokeRect(x * 6 - 1, y * 6 - 1, 7, 7);
        ctx.save();

        ctx.fillStyle = hsl(this.hue, this.growth * 40 / 100 + 40, 50);
		ctx.strokeStyle = "light gray";
		ctx.fillRect(x * 6, y * 6, 5, 5);
    }

}