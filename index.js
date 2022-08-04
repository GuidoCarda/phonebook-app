const express = require("express");
const app = express();

const morgan = require("morgan");
const cors = require("cors");

app.use(express.static("dist"));

app.use(cors());

morgan.token("body", (request) => {
  return JSON.stringify(request.body);
});

//Takes the raw data stored in the request object and parses it
//into a javascript object and asigns it to the request objecto
// as a new property body
app.use(express.json());

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const generateId = () => {
  return Math.floor(Math.random() * 1000000000000);
};

app.get("/", (request, response) => {
  response.send("<h1>Hello world</h1>");
});

app.get("/info", (request, response) => {
  const info = {
    entries: persons.lenght || 0,
    date: new Date(),
  };

  response.send(`
  <div>
    <p>Phonebook has info for ${info.entries} people</p>
    <p>${info.date}</p>
  </div>
  `);
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((p) => p.id === id);

  if (person) {
    response.json(person);
  } else {
    response.statusMessage = "The person doesn't exists";
    response.status(400).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((p) => p.id === id);
  if (person) {
    persons = persons.filter((person) => person.id !== id);
    response.status(204).end();
  } else {
    response.statusMessage =
      "The person you're trying to delete doesn't exists";
    response.status(400).end();
  }
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({ error: "Name missing" });
  }

  if (!body.number) {
    return response.status(400).json({ error: "Number missing" });
  }

  const alreadyExists = persons.find((person) => person.name === body.name);

  if (alreadyExists) {
    return response
      .status(400)
      .json({ error: "The name already exists in the phonebook" });
  } else {
    const person = {
      name: body.name,
      number: body.number,
      date: new Date(),
      id: generateId(),
    };

    persons = persons.concat(person);

    response.json(person);
  }
});

app.put("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  console.log(id);
  const body = request.body;
  console.log(body);
  // persons.map(p => p.id === id ? {bod})
  console.log(request);
  response.status(200).json(body);
  // persons.map((p) => (p.id === id ? { ...p, id } : p));
});

const unknownEndpoint = (request, response) => {
  response.status(400).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`App runnning on port ${PORT}`);
});
