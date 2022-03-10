# Getting Started with Node.js

### To create Node.js project:

```js
npm init --yes
```

### To install Express:


```js
npm i express
```

### To load Express Module:

```js
const express = require("express");
```

### Express Documentation:

1. Go to [link](https://expressjs.com/en/4x/api.html).

### Using `get` function of the Express:

```js
app.get("/", (req, res) => {
    res.send("Hello World");
});
```

### Listening the port:

```js
app.listen(3000, () => {
    console.log("Listening on port 3000....");
});
```

### Running the `index.js` file:

>Type it in the terminal

`node index.js`

### Installing `nodemon`:

>Nodemon allows us to see changes on the server without restarting it again. It is watching all the changes while running.

`npm i -g nodemon`

>On Mac you need to get permission:

`sudo npm i -g nodemon`

>To run server:

`nodemon index.js`

### To get host port number:

```js
const port = process.env.PORT || 3000;
```

### To assign a PORT to the Node app:

>In terminal

`export PORT=5000`

### To add parameter to the endpoint:

```js
app.get("/api/courses/:id", (req, res) => {
    res.send(req.params.id);
});
```

>We can also add multiple parameters:

```js
app.get("/api/posts/:year/:month", (req, res) => {
    res.send(req.params);
});
```

>We can add `queryParam`

```js
// add query parameter to the endpoint
app.get("/api/search/:year/:month", (req, res) => {
    res.send(req.query);
});
```

Url should be:

`http://localhost:3000/api/search/1994/30?sortBy=name`

### Showing courses list:

1. Define a list:

```js
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
```

2. Get a list of the courses:

```js
app.get("/api/courses", (req, res) => {
    res.send(courses);
});
```

3. Find a course with given ID:

```js
app.get("/api/courses/:id", (req, res) => {
    // find the given ID course in the courses array
    const course = courses.find(c => c.id === parseInt(req.params.id));
    // if given ID not found, then give message as a result
    if(!course) res.status(404).send("The course with the given ID not found.");
    // if given ID found, then return a course
    res.send(course);
});
```

### Posting data:

1. Enable parsing of JSON object in the body of the request

```js
app.use(express.json());
```

2. Post function

```js
app.post("/api/courses", (req, res) => {
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
```

3. You can validate the data that posting

```js
if(!req.body.name || req.body.name.length < 3){
        // 400 bad request
        res.status(400).send("Name is required and should be minimum 3 characters");
        return
    }
```

4. You can validate the data that posting with `Joi package`:

To install:

`npm i joi`

Define the Joi class:

```js
const Joi = require("joi");
```

Validation:

```js
const schema = {
        name: Joi.string().min(3).required(),
    };

    const result = Joi.validate(req.body, schema);
    
    if(result.error){
        res.status(400).send(result.error);
        return;
    }
```

### Updating data with `put`:

```js
app.put("/api/courses/:id", (req, res) => {
    // find the given ID course in the courses array
    const course = courses.find(c => c.id === parseInt(req.params.id));
    // if given ID not found, then give message as a result
    if(!course) res.status(404).send("The course with the given ID not found.");

    // update course
    course.name = req.body.name;

    // return the updated course
    res.send(course);
});
```

### Deleting the data:

```js
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
```