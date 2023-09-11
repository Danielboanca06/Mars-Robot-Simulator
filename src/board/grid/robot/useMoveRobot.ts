export function useMoveRobot(direction: string, initalX: number, initialY:number){
    let y = initialY;
    let x = initalX;

          if (direction === 'north' && initialY <= 4) {
            y++;
          } else if (direction === 'south' && initialY >= 1) {
            y--;
          } else if (direction === 'east' && initalX <= 4) {
            x++;
          } else if (direction === 'west' && initalX >= 1) {
            x--;
          }

          return {y, x};
}