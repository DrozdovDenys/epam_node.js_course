import express from "express";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import healthCheckRouter from "./routes/health-check.js";

const app = express();
const PORT = 3000;
const { serve, setup } = swaggerUI;

const swaggerOptions = {
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
  apis: ["./src/routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.listen(PORT, (error) => {
  error
    ? console.error(error)
    : console.log(`Server listening on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/health-check", healthCheckRouter);

app.use("/docs", serve, setup(swaggerDocs));

app.use((req, res, next) => res.status(404).send("404 Not Found"));

app.use((err, req, res, next) => res.status(500).send("Internal Server Error"));
