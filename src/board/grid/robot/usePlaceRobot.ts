type FacingDirection = 'north' | 'east' | 'south' | 'west';

export function usePlaceRobot (movement: string) {
    const splitPlace = movement.split(' ');
    const [_, newX, newY, newDirection] = splitPlace;
    let placeX = Number.parseInt(newX);
    let placeY = Number.parseInt(newY)
    let placeDirection = newDirection as FacingDirection;
    return {placeX, placeY, placeDirection};
  }
