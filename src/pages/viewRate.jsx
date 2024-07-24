import React from "react";
import { useBookContext } from "../context/BookContext";

const ViewRate = () => {
  const { bookData } = useBookContext();
  const { selectedBooks, similarityRating } = bookData;

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="flex flex-wrap justify-center">
        {selectedBooks.map((item) => (
          <div key={item.id} className="p-4 max-w-sm">
            <div className="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <h2 className="text-white dark:text-white text-lg font-medium">
                  title: {item.title}
                </h2>
              </div>
              <div className="flex flex-col justify-between flex-grow">
                <p className="leading-relaxed text-base text-white dark:text-gray-300">
                  Author: {item.author}
                </p>
              </div>
              <div className="flex flex-col justify-between flex-grow">
                <p className="leading-relaxed text-base text-white dark:text-gray-300">
                  Pages: {item.pages}
                </p>
              </div>
              <div className="flex flex-col justify-between flex-grow">
                <p className="leading-relaxed text-base text-white dark:text-gray-300">
                  Downloads: {item.downloads}
                </p>
              </div>
              <div className="flex flex-col justify-between flex-grow">
                <p className="leading-relaxed text-base text-white dark:text-gray-300">
                  Field: {item.field}
                </p>
              </div>
              <div className="flex flex-col justify-between flex-grow">
                <p className="leading-relaxed text-base text-white dark:text-gray-300">
                  Publication Date: {item.publication_date}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <p className="text-black">Similarity Rating: {similarityRating}</p>
      </div>
    </div>
  );
};

export default ViewRate;
