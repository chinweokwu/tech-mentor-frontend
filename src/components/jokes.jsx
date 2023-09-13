import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJokes } from "../features/jokes/jokesSlice";
import Loading from "./loading";

function Jokes() {
  const dispatch = useDispatch();
  const jokes = useSelector((state) => state.jokes.jokes);
  const loading = useSelector((state) => state.jokes.loading);
  const error = useSelector((state) => state.jokes.error);
  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleCards = 3;
  const cardWidthPercentage = 100 / visibleCards;
  const cardInterval = 5000; // Adjust this value to control the interval between card transitions (in milliseconds)

  // Function to move to the next card
  const nextSlide = () => {
    if (currentIndex < jokes.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  // Function to move to the previous card
  const prevSlide = () => {
    if (currentIndex === 0) {
      setCurrentIndex(jokes.length - 1);
    } else {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  useEffect(() => {
    // Fetch jokes when the component mounts
    dispatch(fetchJokes());

    // Automatically move to the next card at the specified interval
    const intervalId = setInterval(() => {
      nextSlide();
    }, cardInterval);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [dispatch, cardInterval]);

  return (
    <div>
      {loading && (<Loading />)}

      {error && <p>Error: {error}</p>}

      <div className="relative">
        <div className="absolute top-[8rem] left-0 right-0 flex justify-between">
          <button
            onClick={prevSlide}
            className="z-10 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600"
          >
            Previous
          </button>
          <button
            onClick={nextSlide}
            className={`z-10 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600 ${
              currentIndex === jokes.length - 1 ? "pointer-events-none" : ""
            }`}
          >
            Next
          </button>
        </div>
        <div
          className="overflow-hidden relative w-full"
          style={{ height: "202px" }}
        >
          <div
            className="flex transition-transform ease-in-out duration-300"
            style={{
              transform: `translateX(-${
                currentIndex * (cardWidthPercentage / visibleCards)
              }%)`,
            }}
          >
            {jokes.map((joke, index) => (
              <div
                key={index}
                className={`w-full flex-shrink-0 h-60 sm:w-1/2 lg:w-1/3 xl:w-${cardWidthPercentage}/12`}
              >
                <div className="bg-gray-200 p-4 m-2 rounded-lg shadow-lg">
                  <h3 className="text-lg font-semibold">{joke.setup}</h3>
                  <p className="mt-2">{joke.punchline}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Jokes;