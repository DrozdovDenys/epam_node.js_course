import express from "express";

const app = express();
const PORT = 3000;

app.listen(PORT, (error) => {
  error
    ? console.error(error)
    : console.log(`Server listening on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
