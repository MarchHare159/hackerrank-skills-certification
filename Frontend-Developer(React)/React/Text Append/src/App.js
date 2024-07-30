import React, { useState } from "react";
import './App.css';
import TextField from "./components/textField";
import 'h8k-components';

const title = "Text Append";

function App() {
  const [firstText, setFirstText] = useState("");
  const [secondText, setSecondText] = useState("");

  const handleFirstTextChange = (e) => {
    setFirstText(e.target.value);
  };

  const handleSecondTextChange = (e) => {
    setSecondText(e.target.value);
  };

  const appendedText = `${firstText} ${secondText}`.trim();

  return (
    <div>
      <h8k-navbar header={title}></h8k-navbar>
      <div className="layout-row align-items-centre justify-content-center mt-50">
        <section className="layout-column">
          <div data-testid="first-text">
            <TextField labelText={'First Text'} onChange={handleFirstTextChange} />
          </div>
          <div data-testid="second-text">
            <TextField labelText={'Second Text'} onChange={handleSecondTextChange} />
          </div>
          <label className="mt-50 text-align-center">
            Appended Text is: 
          </label>
          <label className="mt-10 finalText" data-testid="final-text">
            {appendedText}
          </label>
        </section>
      </div>
    </div>
  );
}

export default App;
