
import { useCallback, useEffect, useState } from "react"; //importando alguns hucks, funcoes especias do react

// components
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

// styles
import "./App.css"; //importando css 

// data
import { wordsList } from "./data/words"; //importando a lista de dados que está na pagina words js 

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

function App() {

  const [gameStage, setGameStage] = useState(stages[0].name); //estagio inicial do jogo
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);
  
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]); //letras erradas
  const [guesses, setGuesses] = useState(3); //numeros de tentativas  do usuario
  const [score, setScore] = useState(0); //pontuacao do usuario 




  const pickWordAndCategory = useCallback(() => {
    // pick a random category
    const categories = Object.keys(words); // pegando as categorias do word js 
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)]; //pegando as categorias e deixando ela aleatoria pro jogo ,  O método Math.random() retorna um número aleatório de 0 (inclusive) até, mas não incluindo, 1 (exclusivo). object.keys(categories) ele está acessando todas palavras que esta na category com esse comando. A função Math. floor(x) retorna o menor número inteiro dentre o número "x".o random retorna um numero aleatorio vezes object.keys(categories) acessando todas as palavras que estão dentro do categories e o length acessa o ultimo nome da category

    // pick a random word
    const word =
      words[category][Math.floor(Math.random() * words[category].length)]; //acessando a category. acessando aleatoriamente com math random vezes a palavra das category 

    console.log(category, word); //imprimindo no console

    return { category, word };
  }, [words]);

  // start the game
  const startGame = useCallback(() => {
    // clear all letters
    clearLettersStates();

    // choose a word
    const { category, word } = pickWordAndCategory();

    console.log(category, word);

    let wordLetters = word.split("");

    wordLetters = wordLetters.map((l) => l.toLowerCase()); //configurando input pra receber letras tanto maiuscula quanto menuscula com o comando to.lowerCase() 

    //O map é um método nativo do JavaScript, utilizado na manipulação de dados dentro de arrays. Seu funcionamento é semelhante a uma estrutura de repetição, como, por exemplo, um loop for, pois executa uma determinada ação em todos os elementos do array.

    // console.log(category, word);

    setPickedCategory(category);
    setPickedWord(word);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  }, [pickWordAndCategory]);

  // process letter input
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase(); //deixando a letra menusculaa com tolowerCase

    // check if letter has already been utilized
    if (
      guessedLetters.includes(normalizedLetter) || // se as letras adivinhadas incluem normalizedLetter ou wrongleterrs que incluem (letras erradas9)
      wrongLetters.includes(normalizedLetter)
    ) {
      return;

    }

    // push guessed letter or remove a chance
    if (letters.includes(normalizedLetter)) { //se as letras das palavras incluir a normalized : se estiver certa alterar as letras advinhadas
      setGuessedLetters((actualGuessedLetters) => [ //pegando o estado atual da pontuação com actualguessedLeterrs
        ...actualGuessedLetters,
        letter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);

      setGuesses((actualGuesses) => actualGuesses - 1); //diminuindo as tentativas 
    }
  };

  console.log(wrongLetters);

  // restart the game
  const retry = () => {
    setScore(0);
    setGuesses(3);
    setGameStage(stages[0].name);
  };

  // clear letters state
  const clearLettersStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  // check if guesses ended
  useEffect(() => { // gancho useEffect permite que você execute efeitos colaterais em seus componentes.

// Alguns exemplos de efeitos colaterais são: buscar dados, atualizar diretamente o DOM e temporizadores.

// useEffect aceita dois argumentos. O segundo argumento 


    if (guesses === 0) { //quando o guesses(tentativas) ficar igual a 0, ele vai usar a função  setgamestage(stage2.name
      // game over and reset all states
      clearLettersStates();

      setGameStage(stages[2].name);
    }
  }, [guesses]);

  // check win conditionK
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)]; // o set deixa itens unicos no array e o letters(pegando as letras) 

    console.log(uniqueLetters);
    console.log(guessedLetters);

    // win condition
    if (guessedLetters.length === uniqueLetters.length) {
      // add score //tendo a palavra advinhada //quando duas letras foram iguais 
      setScore((actualScore) => (actualScore += 10)); //pontuação do jogo

      // restart game with new word
      startGame();
    }
  }, [guessedLetters, letters, startGame]);

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />} 
      {gameStage === "game" && (
        <Game
        // se game stage for igual a startscreen(o usuario clicar em jogar) ele vai partir pra outra pagina 
        // se game stage for igual a game ele vai exibir outro componente 
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses} //tentativas 
          score={score} //pontuação
        />

        //reiniciar o jogo
      )}
      {gameStage === "end" && <GameOver retry={retry} score={score} />} 
      <footer className="Tag">
<p>&copy; Fábio Gabriel Dos Santos</p>
</footer>

    </div>
  );
}



export default App;
