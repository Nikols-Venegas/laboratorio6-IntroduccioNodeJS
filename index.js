//const {response} = require('express');
//const express = require('express');
import express from 'express';
const app = express();
app.use(express.json());

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

app.get('/info', (req, res) => {
	let time = new Date();
	let message = `<p>Phonebook has info for ${persons.length} people<br>${time}</p>`;
	res.send(message);
});

app.get('/api/persons/:id', (req, res) => {
	let id = req.params.id;
	let person = persons.find(person => person.id == id);

	if (person) {
		res.json(person);
	} else {
		res.status(404).end();
	}
});

app.delete('/api/persons/:id', (req, res) => {
	let id = Number(req.params.id);
	persons = persons.filter(person => person.id !== id);
	res.status(204).end();
});

app.post('/api/persons', (req, res) => {
	const body = req.body;
	let revisarDupli = persons.filter(persona => {
		return persona.name === body.name;
	});
	if (!body.name || !body.number) {
		return res.status(400).json({
			error: 'Falta el nombre o número'
		});
	} else if (revisarDupli.length > 0) {
		return res.status(400).json({
			error: 'El nombre ya existe en la agenda'
		});
	}
	let person = {
		id: Math.floor(Math.random() * 100000) + 5,
		name: body.name,
		number: body.number
	};

	persons = persons.concat(person);
	res.json(person);
});

app.listen(3001, () => {
	console.log(`El servidor esta corriendo en el puerto 3001`);
});
