import express, { Response } from "express";
import swaggerJsDoc, { Options } from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import healthCheckRouter from "./routes/health-check.js";

const app = express();
const PORT = 3000;
const { serve, setup } = swaggerUI;

const swaggerOptions: Options = {
  definition: {
    info: {
      title: "NodeJS project API",
      version: "1.0.0",
      description: "Documentation for API",
    },
    servers: [
      {
        url: "http://localhost:3000/",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.get("/", (_req, res: Response) => {
  res.send("Hello World!");
});

app.use("/health-check", healthCheckRouter);

app.use("/docs", serve, setup(swaggerDocs));

app.use((_req, res: Response) => res.status(404).send("404 Not Found"));

app.use((_req, res: Response) => res.status(500).send("Internal Server Error"));
