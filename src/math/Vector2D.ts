
/**
 * A class to represent a 2 dimensional vector.
 * This vector can be used to determine position,
 * direction, and what not. This class offer some
 * basic vector operations as well.
 */
export class Vector2D {
	
	public static readonly ZERO = new Vector2D();
	
	public x: number;
	public y: number;
	
	constructor(x: number = 0, y: number = 0) {
		this.x = x;
		this.y = y;
	}
	
	public add(v: Vector2D): void {
		this.x += v.x;
		this.y += v.y;
	}
	
	public toAdded(v: Vector2D): Vector2D {
		return new Vector2D(this.x + v.x, this.y + v.y);
	}
	
	public flip(): void {
		this.x = -this.x;
		this.y = -this.y;
	}
	
	public toFlipped(): Vector2D {
		return new Vector2D(-this.x, -this.y);
	}
	
	public set(v: Vector2D): void {
		this.x = v.x;
		this.y = v.y;
	}
	
	public scale(scalar: number): void {
		this.x *= scalar;
		this.y *= scalar;
	}
	
	public toScaled(scalar: number): Vector2D {
		return new Vector2D(this.x * scalar, this.y * scalar);
	}
	
}
