import React, { useState } from "react";

const Form = ({
  handleSubmit,
  handleNameChange,
  newName,
  handleNumberChange,
  newNumber,
}) => {
  const [formErrors, setFormErrors] = useState({
    name: "",
    number: "",
  });

  return (
    <form className="input-form" onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input autoFocus id="name" value={newName} onChange={handleNameChange} />

      <label htmlFor="number">Number</label>
      <input
        id="number"
        type="number"
        value={newNumber}
        onChange={handleNumberChange}
      />
      <small className="form-number-placeholder"></small>
      <button>add</button>
    </form>
  );
};

export default Form;
