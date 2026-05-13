import { useRef, useState } from "react";

const TypewriterEffect = () => {
  const [sentenceToShow, setSentenceToShow] = useState("")
  const intervalId = useRef(null)
  const contador = useRef(0)

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const sentence = data.get("sentence")?.split("") ?? [];
    console.log(`The sentence to display is ${sentence}`);

    clearInterval(intervalId.current);
    setSentenceToShow("");
    contador.current = 0;

    if (sentence.length === 0) {
      return;
    }

    intervalId.current = setInterval(() => {
      setSentenceToShow((prev) => prev + sentence[contador.current]);

      if (contador.current >= sentence.length - 1) {
        clearInterval(intervalId.current);
        contador.current = 0;
        return;
      }

      contador.current++;
    }, 1000);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        <input
          type="text"
          name="sentence"
          placeholder="Type a sentence"
          style={{ width: "300px" }}
        />
        <button type="submit">Display with typewriter effect</button>
      </form>

      <p>
        {sentenceToShow}
      </p>
    </div>
  );
};

export default TypewriterEffect;
