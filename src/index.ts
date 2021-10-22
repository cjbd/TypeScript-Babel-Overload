export class Point {

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    [Symbol.for('+')](other: Point) {
        const x = this.x + other.x
        const y = this.y + other.y
        return new Point(x, y)
    }

    x: number;
    y: number;
}

// Check overloads work
const p1 = new Point(5, 5)
const p2 = new Point(2, 3)
// @ts-ignore: operator overloading
const p3 = p1 + p2;
console.log(`p3 = (${p3.x}, ${p3.y})`)