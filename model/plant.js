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

        this.growth += rate / 10;
        if (this.growth > 100) {
            this.growth = 0;
            return this.createMutation();
        }
        return null;
    
    }

    draw(ctx, x, y) {
        ctx.restore();
		ctx.strokeRect(5 + x * 8 - 1, 1 + y * 8 - 1, 9, 9);
        ctx.save();

        ctx.fillStyle = hsl(this.hue, this.growth * 40 / 200 + 40, 50);
		ctx.strokeStyle = "gray";
		ctx.fillRect(5 + x * 8, 1 + y * 8, 7, 7);
    }

}