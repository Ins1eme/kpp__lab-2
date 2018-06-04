const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')));

let tasksArray = [
	{
		name: "Task 1",
		complete: false,
		id: 1
	},
	{
		name: "Task 2",
		complete: false,
		id: 2
	},
	{
		name: "Task 3",
		complete: false,
		id: 3
	}
]

let сompleteCounts = () => {
	let count = 0;
	for(item of tasksArray){
		if(item.complete){
			count++;
		}
	}
	return count;
}

app.get('/', function(req, res){
	res.render('index', {
		title: "Home",
		tasks: tasksArray,
		allTasksCount: tasksArray.length,
		сompleteCount: сompleteCounts()
	});
});

app.post('/add', function(req, res) {
	let text = req.body.add;
	if(text === ""){
		res.redirect('/');
		return;
	}
	let task = {
		name: text.slice(0,1).toUpperCase() + text.slice(1).toLowerCase(),
		complete: false,
		id: tasksArray.length + 1
	};
	tasksArray.push(task);

	res.redirect('/');
});

app.delete('/task/:id', function(req, res) {
	let query = req.params.id;
	for(let i = 0; i < tasksArray.length; i++) {
		if(query == tasksArray[i].id){
			tasksArray.splice(i, 1);
		}
	}
	res.send('del');
});

app.post('/edit/:id', function(req, res) {
	let query = req.params.id;
	for(let i = 0; i < tasksArray.length; i++) {
		if(query == tasksArray[i].id){
			tasksArray[i].name = req.body.value;
		}
	}
	res.send('del');
});



app.post('/complete/:id', function(req, res) {
	let query = req.params.id;
	for(let i = 0; i < tasksArray.length; i++) {
		if(query == tasksArray[i].id){
			if(tasksArray[i].complete == true) {
				tasksArray[i].complete = false;
			} else {
				tasksArray[i].complete = true;
			}
		}
	}
	res.redirect('/');
});

app.listen(3000, function(){
	console.log('Server is run on port: 3000');
});
