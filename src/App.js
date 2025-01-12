import React, { useState, useEffect } from "react";

export default function App(props) {
  const [word, setWord] = useState();
  const [input, setInput] = useState();
  const [error, setError] = useState();
  const [tries, setTries] = useState([]);
  const [triesLeft, setTriesLeft] = useState(5);

  const getWord = () => {
    const words = [
      "facts",
      "truth",
      "loves",
      "ports",
      "deads",
      "earth",
      "omens",
      "vainy",
      "rainy",
      "heart",
      "slide",
      "knife",
    ];
    const randNum = Math.floor(Math.random() * words.length);

    const word = words[randNum];
    setWord(word);
  };

  const handleSubmit = (newTry) => {
    if (newTry.length !== 5) {
      setError(true);
      return;
    }

    const newArr = [...tries].concat(newTry);
    setTriesLeft(triesLeft - 1);
    setTries(newArr);
  };

  const checkLetter = (letter, index) => {
    // check if letter in word and in right spot
    if (word.includes(letter) && word.indexOf(letter) === index) {
      return "green";
    }

    // check is letter in word
    if (word.includes(letter)) {
      return "yellow";
    }

    return "black";
  };

  useEffect(() => {
    if (!word) {
      getWord();
    }
  }, []);

  const checkIfWin = tries.includes(word);
  const checkIfMax = tries.length === 5;

  return (
    <div
      className="App"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <span style={{ textDecoration: "underline", fontWeight: "bold" }}>
        WORDLE
      </span>
      <br />
      {checkIfMax && <span>Word was {word}</span>}
      {checkIfWin && <span>You Win!</span>}
      {error && (
        <span style={{ color: "red" }}>
          Error please enter worth length equal to 5
        </span>
      )}
      <br />
      {tries.map((tries) => {
        let triesLetters = [];
        for (var i = 0; i < tries.length; i++) {
          triesLetters = triesLetters.concat(tries[i]);
        }

        return (
          <div style={{ display: "flex", justifyItems: "center" }}>
            <br />
            {triesLetters.map((letter, index) => {
              const letterColor = checkLetter(letter, index);
              const letterUpperCase = letter.toUpperCase();
              return (
                <>
                  <span
                    key={letter}
                    style={{
                      color: letterColor,
                      paddingLeft: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    {letterUpperCase}
                  </span>
                </>
              );
            })}
          </div>
        );
      })}
      <br />
      <input
        type="text"
        placeholder="enter guess here"
        onChange={(e) => {
          setError(false);
          setInput(e.target.value);
        }}
      />
      <button
        onClick={() => {
          handleSubmit(input);
        }}
      >
        Submit
      </button>
      <br />
      <span>Tries Remaining: {triesLeft}</span>
    </div>
  );
}

// Double letters
// (green if 2 and same spot, black is got one and do another)
