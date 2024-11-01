# Express TS Starter

This is a starter template for building RESTful APIs using Express and TypeScript.

## Table of Contents

- [Installation](#installation)
- [Setup](#setup)
- [Adding a New Controller](#adding-a-new-controller)
- [License](#license)

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/abolkog/express-ts-starter.git
   cd express-ts-starter
   ```

2. Install dependencies:

   ```sh
   npm i
   ```

3. Create a `.env` file in the root directory and add your environment variables:
   ```sh
   cp .env.example .env
   ```

## Setup

1. Start the development server:

   ```sh
   npm run dev
   ```

> Check the logs or the health-check endpoint to make sure everything is working fine. http://localhost:5000/health-check

2. To run the production build:
   ```sh
   npm run build
   npm start
   ```

## Adding a New Controller

To create a new controller, you will need to extend the [base controller](./src//controllers//controller.ts) class

1. Create a new controller file in the `src/controllers` directory, e.g., `src/controllers/ExampleController.ts`:

   ```typescript
   import { Request, Response } from 'express';
   import Controller from './controller';

   export class ExampleController extends Controller {
     constructor() {}
     public static async getExample(req: Request, res: Response): Promise<void> {
       res.status(200).json({ message: 'This is an example endpoint' });
     }
   }
   ```

2. Register the controller route and HTTP method by calling the super method in the contstrcutr. For example to register a [POST] /todo url :

   ```typescript
   import { Request, Response } from 'express';
   import Controller from './controller';

   export class ExampleController extends Controller {
     constructor() {
       super('/todo', 'post');
     }
     public static async getExample(req: Request, res: Response): Promise<void> {
       res.status(200).json({ message: 'This is an example endpoint' });
     }
   }
   ```

> The second param in the super method is the HTTP method, default is GET request

3. Register the new controller in `src/app.ts`:

   ```typescript
   import ExampleController from './controllers/ExampleController';
   // Other imports...

   const app = express();

   // Other middleware...

   const app = new App(PORT, [
     new HealthCheckController(),
     new ExampleController() // <-- The newly created controller
     // ... other controllers
   ]);
   ```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
