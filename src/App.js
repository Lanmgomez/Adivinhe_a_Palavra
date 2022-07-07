// CSS
import './App.css';

// components
import StartScreen from './components/StartScreen';

// React
import {useCallback, useEffect, useState} from 'react'

// data
import { wordsList } from './data/words'
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  { id: 1, name: "start"},
  { id: 2, name: "game"},
  { id: 3, name: "end"}
]

function App() {

  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)

  const [pickedword, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState([])

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(3) //tentativas
  const [score, setScore] = useState(0)

  const pickWordAndCategory = () => {
    //Escolhendo uma categoria aleatória
    const categories = Object.keys(words) //buscando a chave de todas as categorias da wordlist, ou seja, a lista toda!
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)] // n° aleatório vezes a quantidade de chaves da lista
    console.log(category)

    //Escolhendo uma palavra aleatória
    const word = words[category][Math.floor(Math.random() * words[category].length)] //n° aleatória entre o tamanho da quantidade de palavras dentro da words category
    console.log(word)
    return {word, category}
  }

//Função para começar o jogo:
const startGame = () => {
  const {word, category} = pickWordAndCategory()

  //Criando um array de letras
  let wordLetters = word.split("") //.split separa cada letra da palavra

  wordLetters = wordLetters.map((l) => l.toLowerCase()) // transformando a primeira letra em minúscula, ja que o JS padrão tem como comportamento a primeira letra ser maíscula

  console.log(word, category)
  console.log(wordLetters)

  //setando os estados
  setPickedWord(word)
  setPickedCategory(category)
  setLetters(wordLetters)

  // escolher a palavra e a categoria
  setGameStage(stages[1].name)
}

//Função para processar a letra
const verifyLetter = (letter) => {
  
    const normalizedLetter = letter.toLowerCase()

    // checando se as letras já foram utilizadas
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }
    // removendo as chances
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        letter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);

    }
  };
  console.log(guessedLetters)
  console.log(wrongLetters)

// reiniciar o jogo
const retry = () => {
  setGameStage(stages[0].name)
}

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame}/>}
      {gameStage === "game" && 
        <Game 
            verifyLetter={verifyLetter} 
            pickedCategory={pickedCategory} 
            pickedword={pickedword}   
            letters={letters}
            guessedLetters={guessedLetters}
            wrongLetters={wrongLetters}
            guesses={guesses}
            score={score}
        />}
      {gameStage === "end" && <GameOver retry={retry}/>}
    </div>
  );
}

export default App;
