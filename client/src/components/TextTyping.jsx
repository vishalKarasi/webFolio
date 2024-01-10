import { useState, useEffect, useCallback } from "react";

function useTyping(words) {
  const [typedText, setTypedText] = useState("");
  const [fullText, setFullText] = useState(words[0]);
  const [index, setIndex] = useState(0);

  let typingInterval = null;

  const type = useCallback(() => {
    const currentText = fullText.slice(0, index + 1);
    setTypedText(currentText);

    if (index === fullText.length) {
      clearInterval(typingInterval);
      setTimeout(() => {
        setIndex(0);
        setFullText(words[(words.indexOf(fullText) + 1) % words.length]);
        setTypedText("");
        typingInterval = setInterval(type, 150);
      }, 1500);
    } else {
      setIndex(index + 1);
    }
  }, [fullText, index, words]);

  useEffect(() => {
    typingInterval = setInterval(type, 150);

    return () => {
      clearInterval(typingInterval);
    };
  }, [type]);

  return typedText;
}

export default useTyping;
