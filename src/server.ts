import { App } from './app';
import HealthCheckController from './controllers/healthCheck.controller';

const PORT = 5000;

const app = new App(PORT, [new HealthCheckController()]);

app.listen();
