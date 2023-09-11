import { useUpdateDirection } from '../src/board/grid/robot/useUpdateDirection';
import { expect, describe, it } from 'vitest'; 


describe('useUpdateDirection', () => {
 it('should update direction when turning left', async () => {
    const initialDirection = 'north';
    const turnDirection = 'left';

    const { direction } = await useUpdateDirection(turnDirection, initialDirection);

    expect(direction).toEqual('west');
  });

  it('should update direction when turning right', async () => {
    const initialDirection = 'north';
    const turnDirection = 'right';

    const { direction } = await useUpdateDirection(turnDirection, initialDirection);

    expect(direction).toEqual('east');
  });

  it('should handle different initial directions', async () => {
    const directions = ['north', 'east', 'south', 'west'];

    for (const initialDirection of directions) {
      const { direction } = await useUpdateDirection('left', initialDirection);

      const expectedDirectionIndex = (directions.indexOf(initialDirection) + 3) % 4; 
      const expectedDirection = directions[expectedDirectionIndex];

      expect(direction).toEqual(expectedDirection);
    }
  });
});

