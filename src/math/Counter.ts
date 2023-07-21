
/**
 * Class to represent a number value that can
 * be later on passed as reference and updated
 * on different instance.
 */
export class Counter {
	
	private _value: number;
	
	constructor(_value = 0) {
		this._value = _value;
	}
	
	public get value(): number {
		return this._value;
	}
	
	public set value(val: number) {
		this._value = val;
	}
	
	/**
	 * Increment the counter by the specified amount (which by
	 * default would be 1).
	 * 
	 * @param amount the amount to increment by (1 by default).
	 */
	public inc(amount = 1): void {
		this._value += amount;
	}
	
	/**
	 * Decrement the counter by the specified amount (which by
	 * default would be 1).
	 * 
	 * @param amount the amount to decrement by (1 by default).
	 */
	public dec(amount = 1): void {
		this._value -= amount;
	}
	
}
