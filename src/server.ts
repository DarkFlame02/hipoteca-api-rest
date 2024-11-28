import express, {Express, Request, Response} from 'express';
import Hipoteca from './hipoteca';

const app : Express = express();
const port : number = 3000;

app.get('/', (req : Request, res : Response) => {
    res.send('Hola Node.js!');
});

app.get('/hello', (req : Request, res : Response) => {
    const name = req.query.name ? req.query.name : '';
    const greeting = {
        message: `Hola ${name}! Estamos aprendiendo algo de Node.js y Express`,
        date: new Date()
    }
    /*
    res.status(200);
    res.type('application/json');
    res.send(greeting);
    */
   res.json(greeting);
});

app.get('/add', (req, res) => {
    const num1 : number = Number(req.query.num1);
    const num2 : number = Number(req.query.num2);
    if (!isNaN(num1) && !isNaN(num2)){
        res.json({
            result: num1 + num2
        });
    } else {
        res.status(400).json({
            message: 'Los parametros num1 y num 2 deben ser numericos'
        });
    }
});

app.get('/hipoteca', (req, res) => {
    const capital : number = Number(req.query.capital);
    const intereses : number = Number(req.query.intereses);
    const años : number = Number(req.query.plazos);
    try {
        const hipoteca = new Hipoteca(capital, intereses, años);
        const cuotas = hipoteca.calcularCuotas();
        res.json({
            hipoteca,
            cuotas
        })
    } catch (error) {
        res.status(400).json({
            message: error
        });
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});