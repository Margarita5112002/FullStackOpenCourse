import { useState } from "react";

const Contact = ({ contact }) => (
  <div>
    {contact.name} {contact.number}
  </div>
);

const ContactList = ({ contacts }) => {
  return contacts.map((contact) => (
    <Contact key={contact.id} contact={contact} />
  ));
};

const FilterForm = ({ query, setQuery }) => {
  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <form>
      <div>
        filter shown with <input value={query} onChange={handleQueryChange} />
      </div>
    </form>
  );
};

const NewContactForm = ({
  newName,
  handleNoteChange,
  newNumber,
  handleNumberChange,
  handleAddClick,
}) => {
  return (
    <form>
      <div>
        name: <input value={newName} onChange={handleNoteChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit" onClick={handleAddClick}>
          add
        </button>
      </div>
    </form>
  );
};

const App = () => {
  const initialId = 1;
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [filterQuery, setFilterQuery] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const filterContacts = () =>
    persons.filter((contact) => {
      return contact.name.toLowerCase().includes(filterQuery.toLowerCase());
    });

  const contactExists = (contact) =>
    persons.find((element) => element.name == contact.name);

  const getNextId = () => {
    const maxId = persons.reduce((max, nextPerson) => {
      if (nextPerson.id > max) {
        return nextPerson.id;
      }
      return max;
    }, initialId);
    return maxId + 1;
  };

  const handleAddClick = (event) => {
    event.preventDefault();
    const newContact = {
      id: getNextId(),
      name: newName,
      number: newNumber,
    };
    if (contactExists(newContact)) {
      alert(`${newContact.name} is already added to phonebook`);
    } else {
      setPersons(persons.concat(newContact));
      setNewName("");
      setNewNumber("");
    }
  };

  const handleNoteChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterForm query={filterQuery} setQuery={setFilterQuery} />
      <h2>Add New Note</h2>
      <NewContactForm
        handleAddClick={handleAddClick}
        handleNoteChange={handleNoteChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <ContactList contacts={filterContacts()} />
    </div>
  );
};

export default App;
