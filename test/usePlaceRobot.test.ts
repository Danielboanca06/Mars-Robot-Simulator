import {usePlaceRobot} from '../src/board/grid/robot/usePlaceRobot';
import {describe, it, expect} from 'vitest';

describe('usePlaceRobot', () => {
    it('should correctly parse and return the robot position and direction', () => {
      const movement = 'PLACE 2 3 north';
  
      const result = usePlaceRobot(movement);
  
      expect(result.x).toEqual(2);
      expect(result.y).toEqual(3);
      expect(result.direction).toEqual('north');
    });
  
    it('should handle different directions', () => {
      const movement = 'PLACE 1 1 south';
  
      const result = usePlaceRobot(movement);
  
      expect(result.x).toEqual(1);
      expect(result.y).toEqual(1);
      expect(result.direction).toEqual('south');
    });

    it('should handle random "place" inputs', () => {
        const numberOfTests = 10;
    
        for (let i = 0; i < numberOfTests; i++) {
          const randomX = Math.floor(Math.random() * 6);
          const randomY = Math.floor(Math.random() * 6);
          const directions = ['north', 'west', 'east', 'south'];
          const randomDirection = directions[Math.floor(Math.random() * directions.length)];
    
          const randomInput = `place ${randomX} ${randomY} ${randomDirection}`;
    
          const result = usePlaceRobot(randomInput);
    
          
          expect(result).toHaveProperty('x');
          expect(result).toHaveProperty('y');
          expect(result).toHaveProperty('direction');
    
          
          expect(result.x).toBeGreaterThanOrEqual(0);
          expect(result.x).toBeLessThan(6);
          expect(result.y).toBeGreaterThanOrEqual(0);
          expect(result.y).toBeLessThan(6);
    
          
          expect(directions).toContain(result.direction);
        }
      });
  
  });