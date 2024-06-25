import express from "express";
import fetch from "node-fetch";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

async function getDataBlob(url) {
  try {
    const res = await fetch(url);
    const buffer = await res.buffer();
    const base64Data = buffer.toString("base64");
    return base64Data;
  } catch (err) {
    console.error("Erro ao obter dados:", err);
    throw err;
  }
}

app.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const { url } = req.body;

    const base64Data = await getDataBlob(url);

    return res.status(200).send(base64Data);
  } catch (err) {
    console.error("Erro na requisição:", err);
    return res.status(500).send({ error: "Erro ao processar a requisição" });
  }
});

app.listen(3000);
