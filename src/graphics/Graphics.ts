import { Rectangle } from "../math/Rectangle.js";
import { Color } from "./Color.js";

export type Image = CanvasImageSource;

/**
 * Class to wrap the graphics handling in the game in a more
 * compact and self contained way.
 */
export class Graphics {
	
	// The canvas element to draw on.
	private _canvas: HTMLCanvasElement;
	// The rendering context to use when drawing.
	private _ctx: CanvasRenderingContext2D;
	// The width of the available screen we have.
	private _width: number;
	// The height of the available screen we have.
	private _height: number
	
	/**
	 * @param canvasID the HTML canvas element ID as stated in the html file.
	 */
	constructor(canvasID: string) {
		this._canvas = document.getElementById(canvasID) as HTMLCanvasElement;
		this._ctx = this.canvas.getContext("2d");
		
		this._width = this.canvas.width;
		this._height = this.canvas.height;
		
		this._ctx.imageSmoothingEnabled = true;
		this._ctx.imageSmoothingQuality = "low";
	}
	
	/**
	 * Draws a rectangle and fills it with a specified color.
	 * 
	 * @param x top left x coordinate.
	 * @param y top left y coordinate.
	 * @param w width of the rectangle.
	 * @param h height of the rectangle.
	 * @param color the color to fill the rectangle with.
	 */
	public fillRect(x: number, y: number, w: number, h: number, color: Color): void {
		this.ctx.beginPath();
		this.ctx.rect(x, y, w, h);
		this.ctx.fillStyle = color;
		this.ctx.fill();
	}
	
	/**
	 * @param r the rectangle to fill
	 * @param c the color to fill the rectangle with.
	 */
	public fill(r: Rectangle, c: Color): void {
		this.ctx.beginPath();
		this.ctx.rect(r.pos.x, r.pos.y, r.size.width, r.size.height);
		this.ctx.fillStyle = c;
		this.ctx.fill();
	}
	
	/**
	 * Draws a rectangle with a specified color and stroke width.
	 * 
	 * @param x top left x coordinate.
	 * @param y top left y coordinate.
	 * @param w width of the rectangle.
	 * @param h height of the rectangle.
	 * @param color the color to draw the rectangle with.
	 * @param stroke the stroke width (in pixels) where -1 is the default value
	 * that states to use the default value.
	 */
	public drawRect(x: number, y: number, w: number, h: number, color: Color, stroke = -1): void {
		this.ctx.beginPath();
		this.ctx.rect(x, y, w, h);
		this.ctx.strokeStyle = color;
		if (stroke > -1)
			this.ctx.lineWidth = stroke;
		this.ctx.stroke();
	}
	
	/**
	 * @param r the rectangle to draw the outline of.
	 * @param c the color to draw the outline.
	 * @param stroke the width of the outline.
	 */
	public draw(r: Rectangle, c: Color, stroke = -1): void {
		this.ctx.beginPath();
		this.ctx.rect(r.pos.x, r.pos.y, r.size.width, r.size.height);
		this.ctx.strokeStyle = c;
		if (stroke > -1)
			this.ctx.lineWidth = stroke;
		this.ctx.stroke();
	}
	
	/**
	 * Draws an image to the screen at the given coordinates.
	 * 
	 * @param img the image to draw.
	 * @param x top left x coordinate.
	 * @param y top left y coordinate.
	 */
	public drawImage(img: Image, x: number, y: number): void {
		this.ctx.drawImage(img, x, y);
	}
	
	/**
	 * Draws an image to the screen at the given coordinates and with
	 * the given dimensions.
	 * 
	 * @param img the image to draw.
	 * @param x top left x coordinate.
	 * @param y top left y coordinate.
	 * @param w width of the image where.
	 * @param h height of the image.
	 */
	public drawImageScaled(img: Image, x: number, y: number, w: number, h: number): void {
		this.ctx.drawImage(img, x, y, w, h);
	}
	
	public drawImageInBounds(img: Image, bounds: Rectangle): void {
		this.ctx.drawImage(img, bounds.pos.x, bounds.pos.y, bounds.size.width, bounds.size.height);
	}
	
	/**
	 * Fills the entire background of the canvas with a specific color.
	 * 
	 * @param color the color to fill the background with.
	 */
	public fillBackground(color: Color): void {
		this.fillRect(0, 0, this.width, this.height, color);
	}
	
	/**
	 * Fills the entire background of the canvas with an image.
	 * 
	 * @param img the image to fill the background with.
	 */
	public imgBackground(img: Image): void {
		this.drawImageScaled(img, 0, 0, this.width, this.height);
	}
	
	/**
	 * Checks if a rectangle of given dimensions and position is
	 * visible on the canvas or not.
	 * 
	 * @param x the top left x coordinate.
	 * @param y the top left y coordinate.
	 * @param w the width of the rectangle.
	 * @param h the height of the rectangle.
	 * @returns whether the rectangle is visible.
	 */
	public isVisible(x: number, y: number, w: number, h: number): boolean {
		return ((0 <= x     && x     <= this.width)
			||  (0 <= x + w && x + w <= this.width))
			&& ((0 <= y     && y     <= this.height)
			||  (0 <= y + h && y + h <= this.height));
	}
	
	public areBoundsIn(bounds: Rectangle): boolean {
		return this.isVisible(bounds.pos.x, bounds.pos.y, bounds.size.width, bounds.size.height);
	}
	
	public get canvas(): HTMLCanvasElement {
		return this._canvas;
	}
	
	public get ctx(): CanvasRenderingContext2D {
		return this._ctx;
	}
	
	public get width(): number {
		return this._width;
	}
	
	public get height(): number {
		return this._height;
	}
	
}
