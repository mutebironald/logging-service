import "reflect-metadata";  // Required for TypeORM decorators
import express from "express";
import { AppDataSource } from './config/data-source';
import router from './routes/auth';


const app = express();

app.use(express.json()); 

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
    app.use('/api', router);
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
});

export default app;
