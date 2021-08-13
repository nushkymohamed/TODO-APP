const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

//Connect the MongoDB Atlas database
mongoose.connect('mongodb+srv://todo:todo@todoapp.e2uoj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
	useNewUrlParser: true, 
	useUnifiedTopology: true 
}).then(() => console.log("Connected to MongoDB")).catch(console.error);

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