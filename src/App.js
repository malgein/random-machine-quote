import './App.scss';
import React, {useState, useEffect} from 'react'
import COLORS_ARRAY from './colorsArrays'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faTwitter } from "@fortawesome/free-brands-svg-icons"

// enlace tipo json que contiene todas las frases aleatorias
let quotesDBUrl= "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"

function App() {

//frase inicial de la app
const [quote, setQuote] = useState("Life isn’t about getting and having, it’s about giving and being.")

//autor inicial de la app con su correspondiente frase
const [author, setAuthor] = useState("Kevin Kruse")

//numero random para enlazarlo al indice de las frases en el json
const [randomNumber, setRandomNumber] = useState(0)

//constante que extrae mediante la funcion que hace el fecth todas las frases con sus autores
const [quotesArray, setQuotesArray] = useState(null)

/*constante que contiene un codigo de color el cual mediante la funcion de un numero aleatorio 
escoge un color aleatorio tambien de la constante COLOR_ARRAY */
const [accentColor, setAccentColor] = useState("#282c34")

//funcion mediante la cual se hara fetch al url de las frases
const fetchQuotes = async (url) => {
  const response = await fetch(url)
  const parsedJSON = await response.json()
  setQuotesArray(parsedJSON.quotes)
}

useEffect(() => {
  fetchQuotes(quotesDBUrl)
}, [quotesDBUrl])

/*funcion que cumple el papel mas importante genera un numero aleatorio entre cero y el length del array con todas las frases
al mismo tiempo que fija un numero aleatoria entre ese rango ya mencionado y ahi cambia el background haciendo lo mismo pero con
un array de colores
*/
  const generateRandomNumber = () => {
    let randomInteger= (Math.floor(Math.random() * quotesArray.length))
    setRandomNumber(randomInteger)
    setAccentColor(COLORS_ARRAY[randomInteger])
    setQuote(quotesArray[randomInteger].quote)
    setAuthor(quotesArray[randomInteger].author)
  } 

  return (
    <div className="App">
      <header className="App-header"  
      style={{backgroundColor: accentColor, color:accentColor}}>
        <div id="quote-box" style={{color:accentColor}}>
          <p id="text">"{quote}"</p>
          <p id="author">- {author}</p>
          <div className="button">
            <a href={encodeURI(`http://www.twitter.com/intent/tweet?text=${quote} -${author}`)} 
            id="tweet-quote" style={{backgroundColor: accentColor}}><FontAwesomeIcon icon={faTwitter} /></a>
            <button id="new-quote"  style={{backgroundColor: accentColor}} onClick={() => generateRandomNumber()}
          >Change quote</button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
