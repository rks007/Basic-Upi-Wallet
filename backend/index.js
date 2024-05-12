const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 3000;


app.use(express.json());

const rootRouter = require('./routes/index')


app.use('/api/v1', rootRouter);





app.listen(port, () => {
    console.log(`your app is listening at port ${port}`);
})