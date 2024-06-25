import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
app.use(bodyParser.json());

async function getDataBlob(url) {
  try {
    const response = await axios.get(url, {
      responseType: "arraybuffer", // Define o tipo de resposta como arraybuffer
    });

    const buffer = Buffer.from(response.data);
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

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
