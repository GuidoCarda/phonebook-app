import { useContext, useEffect, useState } from "react";
import "./App.css";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Notification from "./components/Notification";
import PersonsList from "./components/PersonsList";
import personsService from "./services/persons";
import { AnimatePresence } from "framer-motion";
import DarkmodeToggle from "./components/DarkmodeToggle";
import ThemeProvider, { ThemeContext } from "./context/ThemeContext";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterQuery, setFilterQuery] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [notification, setNotification] = useState(null);

  const context = useContext(ThemeContext);

  // console.log(context);
  useEffect(() => {
    personsService
      .getAll()
      .then((initialPersons) => setPersons(initialPersons.reverse()));
  }, []);

  const handleNumberChange = (evt) => {
    setNewNumber(evt.target.value);
    if (evt.target.value.length > 9) {
      evt.target.classList.add("alert");
      evt.target.nextSibling.textContent = "Maximo 9 caracteres";
      evt.target.nextSibling.style.color = "red";
      return;
    }
    evt.target.nextSibling.textContent = "Por ejemplo 152919451";
    evt.target.nextSibling.style.color = "grey";
    evt.target.classList.remove("alert");
  };

  const handleNameChange = (evt) => {
    setNewName(evt.target.value);
  };

  const handleNotification = (state, message) => {
    setNotification({
      state,
      message,
    });
    setTimeout(() => {
      setNotification(null);
    }, 2000);
  };

  const handleSubmit = (evt, formRef) => {
    evt.preventDefault();
    if (newName.trim() === "") {
      formRef.current.childNodes[1].focus();
      return alert(`You must add a name to continue`);
    }

    if (newNumber.trim() === "") {
      formRef.current.childNodes[3].focus();
      return alert(`You must add a phone number to continue`);
    }

    if (newNumber.length > 9) {
      formRef.current.childNodes[3].focus();
      return alert(`The number must be less or equal than 9 characters`);
    }
    const alreadyExist = persons.some((person) => {
      return person.name === newName;
    });

    if (!alreadyExist) {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      personsService.createPerson(newPerson).then((person) => {
        // setPersons(persons.concat(person));
        setPersons([person, ...persons]);
        handleNotification("success", "contact added");
      });
      formRef.current.childNodes[1].focus();
    } else {
      const confirmUpdate = confirm(
        `${newName} already exists in the phonebook, replace the old number with the new one?`
      );
      if (!confirmUpdate) return;
      handleUpdate(newNumber);
    }
    setNewName("");
    setNewNumber("");
  };

  const handleUpdate = (newNumber) => {
    const person = persons.find((p) => p.name === newName);
    console.log(person);
    const updatedPerson = { ...person, number: newNumber };

    return personsService
      .updatePerson(updatedPerson)
      .then((changedPerson) => {
        setPersons(
          persons.map((p) =>
            p.name === changedPerson.name ? changedPerson : p
          )
        );
        handleNotification("success", "The user number was succesfuly updated");
      })
      .catch((error) => {
        console.log(error);
        handleNotification(
          "error",
          "The user was already deleted from the database"
        );
      });
  };

  const handleDelete = (personToDelete) => {
    if (confirm(`Delete ${personToDelete.name}`)) {
      personsService
        .deletePerson(personToDelete.id)
        .then((response) => {
          setPersons(persons.filter((p) => p.id !== personToDelete.id));
          handleNotification(
            "success",
            `${personToDelete.name} was succesfully deleted`
          );
        })
        .catch((error) => handleNotification("error", "something went wrong"));
    }
  };

  const handleFilter = (evt) => {
    setFilterQuery(evt.target.value);

    const filtered = persons.filter((p) =>
      p.name.toLowerCase().includes(evt.target.value.toLowerCase())
    );
    setFilteredPersons(filtered);
  };

  return (
    <ThemeProvider>
      <div className="container">
        {/* <Notification message={"Esto es un test"} state={"error"} /> */}
        <AnimatePresence>
          {notification ? (
            <Notification
              key="notification"
              message={notification.message}
              state={notification.state}
            />
          ) : null}
        </AnimatePresence>
        <div className="left-col">
          <h1>Add a contact to your phonebook</h1>
          <Form
            handleSubmit={handleSubmit}
            handleNameChange={handleNameChange}
            newName={newName}
            handleNumberChange={handleNumberChange}
            newNumber={newNumber}
          />
        </div>
        <div className="right-col">
          <DarkmodeToggle />
          {persons.length !== 0 ? (
            <Filter handleFilter={handleFilter} filterQuery={filterQuery} />
          ) : null}
          <PersonsList
            persons={persons}
            filteredPersons={filteredPersons}
            filterQuery={filterQuery}
            handleDelete={handleDelete}
          />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
