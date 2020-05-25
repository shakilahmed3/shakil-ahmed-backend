const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/info', (req, res) => {
   console.log("This is Shakil Ahmed");
});



app.post('/patient', (req, res) => {
    const product = req.body;
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("doctorsPortal").collection("patient");
        collection.insertOne(product, (err, result) => {
            if (err) {
                console.log(err)
                res.status(500).send({ message: err });
            }
            else {
                res.send(result.ops[0]);
            }
        });
        client.close();
    });
});



const port = process.env.PORT || 4200;
app.listen(port, () => console.log('Listenting to port ', port));