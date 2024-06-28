import express, { Request, Response, NextFunction } from "express";
import bodyParser from 'body-parser';
import tasksRouter from "./routes/tasks";

const PORT = 3001;

const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

app.use(bodyParser.json())

app.use('/tasks', tasksRouter);

app.listen(PORT, () => { 
  console.log("Server running at PORT: ", PORT); 
}).on("error", (error) => {
  throw new Error(error.message);
});