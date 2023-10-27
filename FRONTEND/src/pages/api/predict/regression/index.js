import { instance } from "pages/api/instance/instance_nlp";

export default async function Home(req, res) {
    const luas_panen = req.body.luas_panen;
    const luas_sawah = req.body.luas_sawah;
    const suhu = req.body.suhu;
    const curah_hujan = req.body.curah_hujan;

    if (luas_panen, luas_sawah, suhu, curah_hujan){
        try {
            const response = await instance.post('/api/model/regression/', {
                "luas_panen": luas_panen,
                "luas_sawah": luas_sawah,
                "suhu": suhu,
                "curah_hujan": curah_hujan
            });
            res.status(201).json(response.data.data);
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'An error occurred while fetching data' });
        }
    }
}