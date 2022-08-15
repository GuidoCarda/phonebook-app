const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://Guido:${password}@cluster0.adn5cdb.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
});

const Person = mongoose.model("contact", personSchema);

const name = process.argv[3];
const number = process.argv[4];

console.log(process.argv.length);

if (process.argv.length === 3) {
  return mongoose.connect(url).then((result) => {
    console.log("phonebook");

    Person.find({}).then((result) => {
      result.forEach((person) => {
        console.log(`${person.name} ${person.number}`);
      });
      mongoose.connection.close();
    });
  });
}

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected");

    const person = new Person({
      name,
      number,
    });

    return person.save();
  })
  .then((person) => {
    console.log(`Added ${person.name} ${person.number} to the phonebook`);
    mongoose.connection.close();
  })
  .catch((err) => console.log(err));

// const noteSchema = new mongoose.Schema({
//   content: String,
//   date: Date,
//   important: Boolean,
// });

// const Note = mongoose.model("Note", noteSchema);

// mongoose
//   .connect(url)
//   .then((result) => {
//     console.log("connected");

//     const note = new Note({
//       content: "Nota num 4",
//       date: new Date(),
//       important: true,
//     });

//     return note.save();
//   })
//   .then(() => {
//     console.log("note saved!");
//     return mongoose.connection.close();
//   })
//   .catch((err) => console.log(err));

// mongoose.connect(url).then((result) => {
//   console.log("connected");

//   Note.find({}).then((result) => {
//     result.forEach((note) => {
//       console.log(note);
//     });
//     mongoose.connection.close();
//   });
// });
