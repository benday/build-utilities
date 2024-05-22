import {beforeEach, describe, expect, it, test} from '@jest/globals';
import { HelloWorld } from './hello-world';

describe('calculator', () => {
    let sut: HelloWorld = new HelloWorld();

    test('adds 1 + 2 to equal 3', () => {
        expect(sut.add(1, 2)).toBe(3);
    });

    test('should return 0 when both numbers are 0', () => {
        const result = sut.add(0, 0);
        expect(result).toBe(0);
    });

    test('should return a negative number when one of the numbers is negative', () => {
        const result = sut.add(-5, 3);
        expect(result).toBe(-2);
    });
});
