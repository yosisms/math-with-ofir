import * as dotenv from 'dotenv';
import express from 'express';
import path from 'path';
dotenv.config({path: __dirname + '../.env'});

const app = express();
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'projects', 'math-with-ofir', 'index.html'));
});

app.get('/style.css', (req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'projects', 'math-with-ofir', 'style.css'));
})

app.get('/script.js', (req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'projects', 'math-with-ofir', 'script.js'));
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('app listening on port ' + PORT));