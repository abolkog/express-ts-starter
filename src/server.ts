import { App } from './app';
import HealthCheckController from './controllers/healthCheck.controller';
import { getEnvAsInt } from './util/env';

const PORT = getEnvAsInt('APP_PORT', 5000);

const app = new App(PORT, [new HealthCheckController()]);

app.listen();
