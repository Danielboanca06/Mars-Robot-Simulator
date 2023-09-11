type FacingDirection = 'north' | 'east' | 'south' | 'west';

export async function useUpdateDirection(turnDirection: string, allwaysUpdatedDirection: string) {
    let newDirection;

    switch (allwaysUpdatedDirection) {
      case 'north':
        newDirection = turnDirection === 'left' ? 'west' : 'east';
        break;
      case 'east':
        newDirection = turnDirection === 'left' ? 'north' : 'south';
        break;
      case 'south':
        newDirection = turnDirection === 'left' ? 'east' : 'west';
        break;
      case 'west':
        newDirection = turnDirection === 'left' ? 'south' : 'north';
        break;
    }
    let direction = newDirection as FacingDirection;

    return {direction}
  }