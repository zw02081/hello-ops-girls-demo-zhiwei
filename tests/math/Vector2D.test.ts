import {Vector2D} from "../../src/math/Vector2D";

describe('Test Vector2D', () => {
    it('should scale up when call toScaled', async () => {
        const vector = new Vector2D(10,10);
        const scaleVector = vector.toScaled(20);
        expect(scaleVector).toEqual(new Vector2D(200,200));
    });
});
