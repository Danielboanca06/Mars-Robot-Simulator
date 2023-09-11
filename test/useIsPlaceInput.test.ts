import { useIsPlaceInput } from '../src/CustomHooks/useIsPlaceInput';
import {describe, it, expect} from 'vitest'

describe('useIsPlaceInput', () => {
  it('should return true for valid "place" input', () => {
    const validInputs = [
      'place 0 0 north',
      'place 5 5 south',
      'place 2 3 east',
      'place 4 1 west',
    ];

    for (const input of validInputs) {
      expect(useIsPlaceInput(input)).toBe(true);
    }
  });

  it('should return false for invalid "place" input', () => {
    const invalidInputs = [
      'place 6 0 north', 
      'place 0 6 south', 
      'place 2 3 invalid', 
      'move 1', 
      'place 2 3',
    ];

    for (const input of invalidInputs) {
      expect(useIsPlaceInput(input)).toBe(false);
    }
  });
});
