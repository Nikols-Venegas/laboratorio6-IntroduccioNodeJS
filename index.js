const express = require('express');
const app = express();

let persons = [
	{
		id: 1,
		name: 'Arto Hellas',
		number: '040-123456'
	},
	{
		id: 2,
		name: 'Ada Lovelace',
		number: '39-44-5323523'
	},
	{
		id: 3,
		name: 'Dan Abramov',
		number: '12-43-234345'
	},
	{
		id: 4,
		name: 'Mary Poppendick',
		number: '39-23-6423122'
	}
];

app.get('/', (req, res) => {
	res.send('<h1>Agregue al link /api/persons</h1>');
});

app.get('/api/persons', (req, res) => {
	res.json(persons);
});

app.listen(3001, () => {
	console.log(`El servidor esta corriendo en el puerto 3001`);
});