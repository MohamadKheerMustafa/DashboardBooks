import React, { createContext, useContext, useState } from "react";

const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [bookData, setBookData] = useState({
    selectedBooks: [],
    similarityRating: 1,
  });

  return (
    <BookContext.Provider value={{ bookData, setBookData }}>
      {children}
    </BookContext.Provider>
  );
};

export const useBookContext = () => useContext(BookContext);
