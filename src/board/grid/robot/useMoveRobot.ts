export function useMoveRobot(direction: string, initalX: number, initialY:number){
    let moveY = initialY;
    let moveX = initalX;

          if (direction === 'north' && initialY <= 4) {
            moveY++;
          } else if (direction === 'south' && initialY >= 1) {
            moveY--;
          } else if (direction === 'east' && initalX <= 4) {
            moveX++;
          } else if (direction === 'west' && initalX >= 1) {
            moveX--;
          }

          return {moveY, moveX};
}