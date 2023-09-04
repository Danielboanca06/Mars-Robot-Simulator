export function useIsPlaceInput(input: string): boolean {
    const regex = /^place\s+(\d)\s+(\d)\s+(north|south|east|west)$/i;
    const match = input.match(regex);
  
    if (match) {
      const x = parseInt(match[1]);
      const y = parseInt(match[2]);
      const direction = match[3].toLowerCase();
  
      if (
        ['north', 'south', 'east', 'west'].includes(direction) &&
        x >= 0 && x < 6 &&
        y >= 0 && y < 6
      ) {
        return true;
      }
    }
  
    return false;
  }