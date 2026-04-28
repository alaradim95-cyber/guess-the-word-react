import "./App.css";
import { useState } from "react";

function App() {
  const [currWord] = useState("react");
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [input, setInput] = useState("");
  const [guessesLeft, setGuessesLeft] = useState(10);
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);

  const generateWordDisplay = () => {
    return currWord
      .split("")
      .map((letter) =>
        guessedLetters.includes(letter) ? letter : "_"
      )
      .join(" ");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const letter = input.toLowerCase();

    if (!letter || letter.length !== 1) {
      setMessage("Enter ONE letter only");
      return;
    }

    if (guessedLetters.includes(letter)) {
      setMessage("Already guessed");
      return;
    }

    const newGuesses = [...guessedLetters, letter];
    setGuessedLetters(newGuesses);
    setInput("");
    setMessage("");

    if (!currWord.includes(letter)) {
      setGuessesLeft(guessesLeft - 1);
    }

    const isWin = currWord
      .split("")
      .every((l) => newGuesses.includes(l));

    if (isWin) {
      setMessage("🎉 You WON!");
      setScore(score + 1);
    }

    if (guessesLeft - (currWord.includes(letter) ? 0 : 1) === 0) {
      setMessage(`❌ You LOST! Word was: ${currWord}`);
    }
  };

  const restartGame = () => {
    setGuessedLetters([]);
    setGuessesLeft(10);
    setMessage("");
  };

  return (
    <div className="card" style={{ textAlign: "center" }}>
      <h1>Guess The Word 🎯</h1>

      <p>Score: {score}</p>

      <h3>{generateWordDisplay()}</h3>

      <p>Guessed: {guessedLetters.join(", ") || "-"}</p>
      <p>Guesses Left: {guessesLeft}</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a letter"
        />
        <button type="submit">Guess</button>
      </form>

      {message && <p>{message}</p>}

      <br />
      <button onClick={restartGame}>Restart</button>
    </div>
  );
}

export default App;