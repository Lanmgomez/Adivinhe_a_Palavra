import './Game.css'
import { useState, useRef } from 'react'
/**Ref cria uma referencia, como se estivesse acessando o dom */

const Game = ({verifyLetter, 
              pickedCategory, 
              pickedword, 
              letters, 
              guessedLetters, 
              wrongLetters, 
              guesses, 
              score}
  ) => {

    const [letter, setLetter] = useState("")
    const letterInputRef = useRef(null)

    const handleSubmit = (e) => {
      e.preventDefault()
      verifyLetter(letter)
      setLetter("")
      letterInputRef.current.focus() /**irá focar nesse elemento ao fim do submit */
    }
  return (
    <div className="game">
        <p className="points">
          <span>Pontuação: {score}</span>
        </p>
        <h1>Adivinhe a palavra:</h1>
        <h3 className="tip">
          Dica sobre a palavra: <span>{pickedCategory}</span>
        </h3>
        <p>Você ainda tem {guesses} tentativas</p>
        <div className="wordContainer">
          {/**Vamos usar o método map com condicional para verificar se a letra foi adivinhada ou não */}
          {letters.map((letter, i) =>
            guessedLetters.includes(letter) ? 
            (<span key={i} className="letter"> {letter} </span>) : 
            (<span key={i} className="blankSquare"></span>)
          )}
        </div>
        <div className="letterContainer">
          <p>Tente adivinhar uma letra</p>
          <form onSubmit={handleSubmit}>
            <input 
                  type="text" 
                  name='letter' 
                  maxLength="1" 
                  required 
                  onChange={(e) => setLetter(e.target.value)} 
                  value={letter}  
                  ref={letterInputRef}   
            />
            <button>Jogar!</button>
          </form>
        </div>
        <div className="wrongLettersContainer">
          <p>Letras já utilizadas:</p>
          {/**Vamos usar o map e condicional para letras já ditas e erradas */}
          {wrongLetters.map((letter, i) => (
          <span key={i}>{letter}, </span>
        ))}
        </div>
    </div>
  )
}

export default Game