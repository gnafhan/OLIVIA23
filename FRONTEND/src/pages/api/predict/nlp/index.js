import { instance } from "pages/api/instance/instance_nlp";

export default async function Home(req, res) {
    const id = req.body.id;
    const model = req.body.model;
    const history = req.body.history;

    if (history) {
        try {
            const response = await instance.get(`/api/model/nlp/detail`);
            return res.status(200).json(response.data.data);
        } catch (err) {
            res.status(500).json({ error: 'An error occurred while fetching data' });
        }
    }


    if (id) {
        if(model){
            try {
                const response = await instance.get(`/api/model/nlp/detail/${id}?model=${model}`);
                res.status(200).json(response.data.data);
            } catch (err) {
                res.status(500).json({ error: 'An error occurred while fetching data' });
            }
        }
        else{
            try {
                const response = await instance.get(`/api/model/nlp/detail/${id}`);
                res.status(200).json(response.data.data);
            } catch (err) {
                res.status(500).json({ error: 'An error occurred while fetching data' });
            }
        }
    }
    else{
        try {
            const response = await instance.post('/api/model/nlp/', {
                "keyword": req.body.keyword
            });
            res.status(201).json(response.data.data);
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'An error occurred while fetching data' });
        }
    }


}