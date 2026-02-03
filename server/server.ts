import express, {Request, Response} from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/api/sunlight', async (req: Request, res: Response) => {

    const { lat, lng, date } = req.query;

    if(!lat || !lng || !date){
        return res.status(400).json({error: "Parametri mancanti (lat, lng, date)"});
    }

    try {
        const externalUrl= `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=${date}`
        console.log("Sto contattando sunrise-sunset.org dal server locale");
        const apiResponse = await axios.get(externalUrl);
        res.json(apiResponse.data)
    } catch (error) {
        console.error("Errore chiamata API esterna:", error);
        res.status(500).json({ error: "Errore nel recupero dei dati solari" });
    }
});

app.listen(PORT, () => {
    console.log(`Backend Sunlight Service attivo sulla porta: ${PORT}`);
})