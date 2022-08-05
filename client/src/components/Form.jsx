import React, { useRef } from "react";

const Form = ({
  handleSubmit,
  handleNameChange,
  newName,
  handleNumberChange,
  newNumber,
}) => {
  // const [formErrors, setFormErrors] = useState({
  //   name: "",
  //   number: "",
  // });

  const formRef = useRef();
  // console.log(formRef.current.childNodes);

  return (
    <form
      className="input-form"
      onSubmit={(evt) => handleSubmit(evt, formRef)}
      ref={formRef}
    >
      <label htmlFor="name">Name</label>
      <input autoFocus id="name" value={newName} onChange={handleNameChange} />

      <label htmlFor="number">Number</label>
      <input
        id="number"
        type="number"
        min={0}
        value={newNumber}
        onChange={handleNumberChange}
      />
      <small className="form-number-placeholder"></small>
      <button>add</button>
    </form>
  );
};

export default Form;
