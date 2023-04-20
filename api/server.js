const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');


dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

// const PORT = process.env.PORT || 8087;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
}, (error) => {
	if (error) {
		console.log('Database Error: ', error.message);
	}
});

mongoose.connection.once('open', () => {
	console.log('Database Synced');
});


// Models
const Todo = require('./models/Todo');

// view all todos
app.get('/todos', async (req, res) => {
	const todos = await Todo.find();

	res.json(todos);
});
// add a new_todo
app.post('/todo/new', (req, res) => {
	const todo = new Todo({
		text: req.body.text
	})

	todo.save();

	res.json(todo);
});
// remove a_todo
app.delete('/todo/delete/:id', async (req, res) => {
	const result = await Todo.findByIdAndDelete(req.params.id);

	res.json({result});
});

//mark a_todo as done
app.get('/todo/complete/:id', async (req, res) => {
	const todo = await Todo.findById(req.params.id);

	todo.complete = !todo.complete;

	todo.save();

	res.json(todo);
})
//Update a_todo
app.put('/todo/update/:id', async (req, res) => {
	const todo = await Todo.findById(req.params.id);

	todo.text = req.body.text;

	todo.save();

	res.json(todo);
});

app.listen(3001);
