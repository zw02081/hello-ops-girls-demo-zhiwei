import { Color } from "../graphics/Color.js";
import { Graphics } from "../graphics/Graphics.js";
import { Dimension } from "../math/Dimension.js";
import { Rectangle } from "../math/Rectangle.js";
import { Entity, EntityID } from "./Entity.js";

/**
 * Represents the ground of the game. The base from where nothing
 * can be below. This will help us indicate when the user hits the
 * ground to stop him from falling through. Also helps in centering
 * the player to the center of the screen.
 */
export class Ground extends Entity {

	private upperBounds: Rectangle;

	private upperColor: Color;
	private lowerColor: Color;

	/**
	 * @param height the height the ground should be.
	 * @param screenSize the size of the screen.
	 */
	constructor(height: number, screenSize: Dimension) {
		super(0, screenSize.height - height, screenSize.width, height, EntityID.Ground);

		// Set the upper portion of the ground relative to the height.
		this.upperBounds = new Rectangle(
			0, screenSize.height - height, screenSize.width, height * 0.125
		);

		this.upperColor = Color.Green;
		this.lowerColor = Color.Brown;
	}

	public update(): void {}

	public render(gfx: Graphics): void {
		gfx.draw(this.bounds, Color.Black, 3);
		gfx.fill(this.bounds, this.lowerColor);
		gfx.draw(this.upperBounds, Color.Black, 3);
		gfx.fill(this.upperBounds, this.upperColor);
	}

	public hit(e: Entity): void { } // eslint-disable-line @typescript-eslint/no-unused-vars

}
