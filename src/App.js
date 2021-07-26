import './App.css';
import { useEffect, useState} from 'react';
import firebase from './firebase';

function App() {

  const [ bookList, setBookList ] = useState([]);
  const [ userInput, setUserInput ] = useState("");

  // This is the useeffect
  useEffect( () => {
    // We go get an object that represents our configure database:
    const dbRef = firebase.database().ref();

    // We set up a listener for data in our firebase, which will fire whem ON an instance where those VALUES appear (ie. the page loads) or those Values change

    dbRef.on('value', (snapshot) => {
      const myData = snapshot.val();


      const newArray = [];

      for (let propertyName in myData) {
        // We create a new object with our key and book title, and then push that whole object into the newArray we just made

        const bookObject = {
          key: propertyName,
          title: myData[propertyName]
        }

        newArray.push(bookObject);
      }
      setBookList(newArray);
    })

  }, [] );

  // This is the end of useEffect

    // To handle the change in the text input area when user put in text 
  const handleChange = (event) => {
    setUserInput(event.target.value);
  }

  // To handle the button when it is clicked on the button
  const handleSubmit = (event) => {
    event.preventDefault();

    // We create a reference to our Firebase database:
    const dbRef = firebase.database().ref();

    dbRef.push(userInput);

    setUserInput("");
  }

    // To Handle the delete when the delete button clicked on the button
  const handleDelete = (keyOfBookToDelete) => {
    const dbRef = firebase.database().ref();
    // Go get the specific node (ie.the property) which we want to delete in Firebase and REMOVE IT
    dbRef.child(keyOfBookToDelete).remove();
  }

  return (
    <div className="App">
      <h1>FireBase</h1>

      <form action="submit" onSubmit={handleSubmit}>
        <label htmlFor="userBookChoice">Write a book to add to the shelf </label>
        <input 
        type="text"
        id="userBookChoice" 
        onChange={handleChange}
        value={userInput} />
        
        <button> Add it!</button>
      </form>
      <ul>
      {
        bookList.map( (bookObject) => {

          const defferedFunction = () => handleDelete(bookObject.key);
            
          
          return (
              <li key={bookObject.key}>
                  <p>{bookObject.title}</p>
                  <button onClick={defferedFunction}>Delete this book</button>
              </li>
          )
        })
      }
      </ul>
    </div>
  );
}

export default App;


// Display our Firebase books on the page
  // - To go get our books from the Firebase!
      //  - Setting up a connection to Firebase needs to happen only ONCE (once component mounts ) because a firebase listener is like an event listener 
      //  - We need to put those books in state once we get them
  // - Set up our JSX to print whatver is in state to the page!


// Let the user add books to the database
  // - Need a form for user to type it in, with text input and a submit button
  // - We need some way to get the user input from that text input
    // - Maybe we can capture the lieteral user INTERACTION with our page. That is to say, maybe we can capture the actual KEYSTROKE EVENT that changes the value of our text input, and get the user's shit from there. This will happen *LIVE* as the user types.
    // Since we will be taking in data and updating it live as the app runs (that is to say, we will be updating some local value storage as our app is running), we need to put this value...IN STATE
  // - On submit, we want to take that user inputs that we have captured and push it into Firebase

// Add a button that lets the user DELETE books from the database
  // -add a button next to each book in our JSX
  // -Have the button call a function that will find that book in the database and remove it
    // -to do this, we will need the unique Key of the book question. That is to say, we will need to pass the function the key of the book to delete from firebase, so we can find that key (ie. that property name) in our Firebase structure