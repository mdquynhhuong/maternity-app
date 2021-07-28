import './App.css';
import { useEffect, useState} from 'react';
import firebase from './firebase';
import { FaTrash } from "react-icons/fa";
import { BiCheckCircle } from "react-icons/bi";

function App() {

  const [ bagList, setBagList ] = useState([]);
  const [ userInput, setUserInput ] = useState("");

  // This is the useeffect
  useEffect( () => {
    // We go get an object that represents our configure database:
    const dbRef = firebase.database().ref();

    // We set up a listener for data in our firebase, which will fire when ON an instance where those VALUES appear (ie. the page loads) or those Values change

    dbRef.on('value', (snapshot) => {
      const myData = snapshot.val();


      const newArray = [];

      for (let propertyName in myData) {
        // We create a new object with our key and bag item, and then push that whole object into the newArray we just made

        const bagObject = {
          key: propertyName,
          title: myData[propertyName]
        }

        newArray.push(bagObject);
      }
      setBagList(newArray);
    })

  }, [] );

  // This is the end of useEffect

    // To handle the change in the text input area when user put in text 
  const handleChange = (event) => {
    // To add User input into a function
    setUserInput(event.target.value);
  }

  // To handle the button when it is clicked on the button
  const handleSubmit = (event) => {
    // Prevent Default
    event.preventDefault();

    // We create a reference to our Firebase database:
    const dbRef = firebase.database().ref();
    // Push the user input into the firebase data
    dbRef.push(userInput);
    // To set the input text "___"
    setUserInput("");
  }

    // To Handle the delete when the delete button clicked on the button
  const handleDelete = (keyOfItemDelete) => {
    const dbRef = firebase.database().ref();
    // Go get the specific node (ie.the property) which we want to delete in Firebase and REMOVE IT
    dbRef.child(keyOfItemDelete).remove();
  }

  // To handle the complete when the complete button is clicked
  // Once is clicked, the active state is true and will strike through item with css 

const [ isActive , setActive ] = useState(false);
const toggleClass = () => {
  setActive(!isActive);
}
  

  return (
    <div className="App">
      <h1>Maternity Bag </h1>
      <h2>For Mommy To Be</h2>
      <form className="todo-form" action="submit" onSubmit={handleSubmit}>
        <label htmlFor="userItemChoice">Write item to add to the list </label>
        <input 
        type="text"
        id="userItemChoice" 
        onChange={handleChange}
        value={userInput} />
        
        <button class="addItemBtn"> Add Item </button>
      </form>
      <ul>
      {
        bagList.map( (bagObject) => {

          const defferedFunction = () => handleDelete(bagObject.key);
          
          return (
              <li className="todo-row" key={bagObject.key}> 
                <div className="todo-container">
                  <p className={isActive ? 'strikethrough' : null}>{bagObject.title}</p>
                  <BiCheckCircle onClick={toggleClass} className="completeBtn"></BiCheckCircle>
                  <FaTrash onClick={defferedFunction} className="deleteBtn"></FaTrash>
                </div>
              </li>
          )
        })
      }
      </ul>
    </div>
  );
}

export default App;