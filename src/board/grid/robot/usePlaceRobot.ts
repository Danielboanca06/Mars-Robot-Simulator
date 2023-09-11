type FacingDirection = 'north' | 'east' | 'south' | 'west';

export function usePlaceRobot (movement: string) {
    const splitPlace = movement.split(' ');
    const [_, newX, newY, newDirection] = splitPlace;
    let x = Number.parseInt(newX);
    let y = Number.parseInt(newY)
    let direction = newDirection as FacingDirection;
    return {x, y, direction};
  }
