import { useState, useEffect } from 'react';

const text = [
  {
    id: 0,
    texts: "Yesterday's history, tomorrow's mystery, but today's a gift. That's Why it's called the present."
  },
  {
    id: 1,
    texts: "The best time to plant a tree was 20 years ago. The second best time is now."
  },
]

const Home = () => {
  const [randomText, setRandomText] = useState('');

  // Set random text on the client side to prevent the mismatch
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * text.length);
    setRandomText(text[randomIndex].texts);
  }, []);

  return (
    <>
      <div className="mx-auto max-w-2xl space-y-8 my-10">
        <h1 className="text-4xl font-bold">Hi<span className="wave">👋🏻</span>,</h1>
      </div>
      <div className="space-y-4">
        <p>
          I&#39;m Jia Le. A Chess enthusiast.
        </p>
        <p>
          {randomText}
        </p>
      </div>
    </>
  )
}

export default Home;
