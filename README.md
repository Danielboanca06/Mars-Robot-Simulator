# Robot Simulator Project

This project is a small robot simulator built using Vite, TypeScript, React, Tailwind CSS, Jest, and Vitest. The purpose of this project is to demonstrate an excellent understanding of promises and the use of context values within multiple components. It's intended for self-learning and practice, and it simulates a robot that can navigate on a 5 by 5 grid.

## Project Overview

The robot simulator operates on a 5 by 5 grid, and it understands the following commands:

- `PLACE X Y DIRECTION`: Place the robot on the grid at the specified coordinates (`X` and `Y`) with one of four valid directions (`NORTH`, `SOUTH`, `EAST`, or `WEST`).
- `MOVE`: Move the robot one step in the direction it's currently facing.
- `LEFT`: Rotate the robot 90 degrees to the left.
- `RIGHT`: Rotate the robot 90 degrees to the right.
- `REPORT`: Display the current position and direction of the robot.

The robot only responds to commands after it has been successfully placed on the grid. If a command leads the robot to fall off the grid, it will be ignored to ensure the robot never falls off.

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/Danielboanca06/Mars-Robot-Simulator.git
   ```

2. Install dependencies:

   ```bash
   cd Mars-Robot-Simulator
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

   This will start the development server, and you can access the application in your browser at `http://localhost:3000`.

4. Explore the application and interact with the robot simulator.

## Project Structure

The project's source code is organized as follows:

- `src/` - Contains the main source code of the application.
-  `src/board/` - Contains the Grid and Robot components.
- `src/controls/` - Contains command inputs for the robot and context providers for managing state.
- `test/` - Contains unit tests for various components and utilities using Jest and Vitest.

## Testing

Unit tests have been implemented to ensure the reliability and correctness of the robot simulator. You can run the tests using the following command:

```bash
npm test
```


## Acknowledgments

This project was created for self-learning and practice to improve skills in React, TypeScript, testing, and context management. Feel free to use it as a learning resource or as a starting point for your own projects.

Happy coding! If you have any questions or need further assistance, feel free to reach out.
