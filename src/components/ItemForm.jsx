// import SearchBar from "./SearchBar/SearchBar";
import { useState } from "react";
import { Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";


//This is a functional component named ItemForm which accepts props as its argument.
function ItemForm(props) {

  const [value, setValue] = useState(props.items);


   
  function handleChange(e) {
    const newValue = e.target.value.split("\n");
    setValue(newValue);
  }


  //This function implements the Fisher–Yates Shuffle algorithm to shuffle the items in the localStorage
  // and updates the state variable value accordingly.
  // use Fisher–Yates Shuffle algorithm: https://bost.ocks.org/mike/shuffle/
  function Shuffle() {
    var array = JSON.parse(localStorage.getItem("itemsList"));
    let currentIndex = JSON.parse(localStorage.getItem("itemsList")).length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    setValue(array);
  }

  //This function removes duplicate items from the value array and updates the state variable value.
  function RemoveDuplicate() {
    let uniqueItems = [...new Set(value.map((s) => s.trim()))];
    setValue(Array.from(uniqueItems));
  }

  return (
    <div style={{ marginTop: "10px" }}>
      <div
        className="
      d-flex 
      flex-column 
      flex-sm-column 
      flex-md-column 
      flex-lg-row 
      justify-content-lg-start 
     "
      >
        <Button
          id="shuffleButton"
          className="
          flex-lg-grow-1 
          me-lg-2
          mb-md-2 
          mb-sm-2 
          mb-lg-0
          mb-2
          "
          variant="light"
          onClick={Shuffle}
        >
          <i className="bi bi-shuffle me-3"></i>Shuffle
        </Button>
        <Button
          id="removeButton"
          className="flex-lg-grow-1"
          variant="light"
          onClick={RemoveDuplicate}
        >
          <i class="bi bi-trash me-3"></i>
          Remove duplicate
        </Button>
      </div>
      {/* <SearchBar placeholder="Search..." data={value} /> */}
      <textarea
        id="inputTextArea"
        style={{
          width: "100%",
          resize: "none",
          row: "10",
          marginTop: "10px",
          padding: "10px",
        }}
        value={value?.join("\n")}
        onChange={handleChange}
        rows={15}
        cols={15}
      />
      <button
        id="updateButton"
        style={{ width: "100%", marginTop: "10px" }}
        className="btn btn-outline-secondary disableElement"
        onClick={() => {
          props.onClick(value.filter((e) => e));
        }}
      >
        Update
      </button>
    </div>
  );
}

export default ItemForm;

//The "Update" button triggers the props.onClick function passed from the parent component,
// filtering out empty strings from the value array.