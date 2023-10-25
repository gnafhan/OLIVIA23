import { instance } from "pages/api/instance/instance";

export default async function Home(req, res) {
  let id = req.query.id
  const apiKey = req.headers['api-key']

  if (apiKey !== process.env.API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  if (req.method === 'GET') {
    if (id){
      id = req.query.id.split("/").pop();
      try {
        const response = await instance.get(`/api/predict/rating/${id}`);
        res.status(200).json(response.data.data);
      } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'An error occurred while fetching data' });
      }
    }else{
      try {
        const response = await instance.get('/api/predict/rating/');
        res.status(200).json(response.data.data);
      } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'An error occurred while fetching data' });
      }
    }

  }

    if (req.method === 'POST') {
        try {
        const response = await instance.post('/api/predict/rating/', req.body);
        res.status(201).json(response.data.data);
        } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching data' });
        }
    }
}
