import {useMoveRobot} from '../src/board/grid/robot/useMoveRobot';
import {describe, it, expect} from 'vitest';

describe('useMoveRobot', () => {
    it('should move the robot north and increment y within table boundaries', () => {
      const direction = 'north';
      const initialX = 2;
      const initialY = 2;
  
      const { y, x } = useMoveRobot(direction, initialX, initialY);
  
      expect(y).toEqual(initialY + 1);
      expect(x).toEqual(initialX);
    });
  
    it('should move the robot south and decrement y within table boundaries', () => {
      const direction = 'south';
      const initialX = 2;
      const initialY = 2;
  
      const { y, x } = useMoveRobot(direction, initialX, initialY);
  
      expect(y).toEqual(initialY - 1);
      expect(x).toEqual(initialX);
    });
  
    it('should move the robot east and increment x within table boundaries', () => {
      const direction = 'east';
      const initialX = 2;
      const initialY = 2;
  
      const { y, x } = useMoveRobot(direction, initialX, initialY);
  
      expect(y).toEqual(initialY);
      expect(x).toEqual(initialX + 1);
    });
  
    it('should move the robot west and decrement x within table boundaries', () => {
      const direction = 'west';
      const initialX = 2;
      const initialY = 2;
  
      const { y, x } = useMoveRobot(direction, initialX, initialY);
  
      expect(y).toEqual(initialY);
      expect(x).toEqual(initialX - 1);
    });
  
  });