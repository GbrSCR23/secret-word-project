import { useState, useRef } from "react"; //hucks usestate e useref  useRef é um gancho que permite criar diretamente uma referência ao elemento DOM no componente funcional. O useRef retorna um objeto ref mutável. Esse objeto tem uma propriedade chamada 
// styles
import "./Game.css";

const Game = ({
  verifyLetter,
  pickedCategory,
  pickedWord,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score,
}) => {
  const [letter, setLetter] = useState("");
  const letterInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    verifyLetter(letter);

    setLetter("");

    letterInputRef.current.focus();
  };


  // se a letra estiver sido adivinhada eu vou imprmir ela  se nao eu vou imprimir blanksquare 
  return (
    <div className="game">
      <p className="points">
        <span>Pontuação</span>: {score}
      </p>
      <h1>Advinhe a palavra:</h1>
      <h3 className="tip">
        Dica sobre a palavra: <span>{pickedCategory}</span>
      </h3>
      <p>Você ainda tem {guesses} tentativa(s).</p>
      <div className="wordContainer">

        
        {letters.map((letter, i) =>
          guessedLetters.includes(letter) ? (
            <span className="letter" key={i}>
              {letter}
            </span>
          ) : (
            <span key={i} className="blankSquare"></span>
          )
        )}
      </div>

      
      <div className="letterContainer">
        <p>Tente adivnhar uma letra da palavra:</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="letter"
            maxLength="1"
            onChange={(e) => setLetter(e.target.value)}
            required
            value={letter}
            ref={letterInputRef}
          />
          <button>Jogar!</button>
        </form>
      </div>
      <div className="wrongLettersContainer"> 
        <p>Letras já utilizadas:</p>
        {wrongLetters.map((letter, i) => ( // aqui está quais letras foram advinhadas, pegando a key da letra errada 
          <span key={i}>{letter}, </span> //jogaando as letras já advinhasd na pagina
        ))}
      </div>
    </div>
  );
};

export default Game;
