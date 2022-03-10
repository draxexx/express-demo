// load the joi module
// for classes use upper case when naming
const Joi = require("joi");

// load the express module
const express = require("express");

// call express, it returns express
const app = express();

// enable parsing of JSON object in the body of the requst
app.use(express.json());

const courses = [
    {
        id:1,
        name: "Course 1",
    },
    {
        id:2,
        name: "Course 2",
    },
    {
        id:3,
        name: "Course 3",
    },
];

// get function has two parameters
// one is the endpoint
// second parameter has request and response
app.get("/", (req, res) => {
    res.send("Hello World");
});
 
app.get("/api/courses", (req, res) => {
    res.send(courses);
});

// add parameter to the endpoint
app.get("/api/courses/:id", (req, res) => {
    // find the given ID course in the courses array
    const course = courses.find(c => c.id === parseInt(req.params.id));
    // if given ID not found, then give message as a result
    if(!course) return res.status(404).send("The course with the given ID not found.");
    // if given ID found, then return a course
    res.send(course);
});

app.post("/api/courses", (req, res) => {
    // validation with Joi package
    // const schema = {
    //     name: Joi.string().min(3).required(),
    // };

    // const result = Joi.validate(req.body, schema);
    
    // if(result.error){
    //     res.status(400).send(result.error);
    //     return;
    // }

    // validation
    if(!req.body.name || req.body.name.length < 3){
        // 400 bad request
        res.status(400).send("Name is required and should be minimum 3 characters");
        return
    }

    // define a course variable
    // name will be come from the body
    const course = {
        id: courses.length + 1,
        name: req.body.name,
    };
    // add course variable to the list
    courses.push(course);
    res.send(course);
});

// to update
app.put("/api/courses/:id", (req, res) => {
    // find the given ID course in the courses array
    const course = courses.find(c => c.id === parseInt(req.params.id));
    // if given ID not found, then give message as a result
    if(!course) return res.status(404).send("The course with the given ID not found.");

    // update course
    course.name = req.body.name;

    // return the updated course
    res.send(course);
});

// to delete
app.delete("/api/courses/:id", (req, res) => {
    // find the given ID course in the courses array
    const course = courses.find(c => c.id === parseInt(req.params.id));
    // if given ID not found, then give message as a result
    if(!course) return res.status(404).send("The course with the given ID not found.");

    // find index of the course
    const index = courses.indexOf(course);

    // remove from the list
    courses.splice(index,1);

    // return the deleted course
    res.send(course);
});

// add multiple parameter to the endpoint
app.get("/api/posts/:year/:month", (req, res) => {
    res.send(req.params);
});

// add query parameter to the endpoint
app.get("/api/search/:year/:month", (req, res) => {
    res.send(req.query);
});

// if we are running on the host, we will get the PORT number of the host
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}....`);
});