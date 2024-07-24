import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useBookContext } from "../context/BookContext";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [similarityRating, setSimilarityRating] = useState(1);
  const navigate = useNavigate();
  const { setBookData } = useBookContext();

  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.get("http://127.0.0.1:8000/api/books/view", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBooks(response.data.data.items);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Authentication Failed",
          text: "Please log in again.",
        }).then(() => {
          navigate("/login"); // Redirect to login page
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred while fetching books.",
        });
      }
    }
  };

  const handleBookSelect = (book) => {
    setSelectedBooks((prev) => {
      if (prev.includes(book)) {
        // Remove the book if it's already selected
        return prev.filter((b) => b !== book);
      } else if (prev.length < 2) {
        // Add the book if less than 2 books are selected
        return [...prev, book];
      } else {
        // Show alert if trying to select more than 2 books
        Swal.fire({
          icon: "warning",
          title: "Selection Limit",
          text: "You can only select up to 2 books.",
        });
        return prev;
      }
    });
  };

  const handleRatingChange = (newRating) => {
    setSimilarityRating(newRating);
  };

  const handleSubmit = async () => {
    if (selectedBooks.length !== 2) {
      Swal.fire({
        icon: "warning",
        title: "Select Books",
        text: "You need to select exactly 2 books.",
      });
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/");
        return;
      }

      const response = await axios.post(
        "http://127.0.0.1:8000/api/books/compare",
        {
          books: selectedBooks.map((book) => book.id),
          similarity_rating: similarityRating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setSimilarityRating(response.data.data.similarity_rating);
        setBookData({ selectedBooks, similarityRating });

        navigate("/dashboard/rate"); // Redirect to the desired page
      } else {
        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text: "An error occurred while submitting your selection.",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Submission Error",
        text: "An error occurred while submitting your selection.",
      });
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="flex flex-col items-center mt-20">
      <div className="flex justify-center items-center">
        <h1 className="text-black dark:text-#c8c0c0 text-2xl font-medium mb-8 mt-8">
          Please choose 2 books to rate
        </h1>
      </div>
      <div className="flex flex-wrap justify-center">
        {books.map((item) => (
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
                  Title: {item.title}
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
              <div className="mt-3">
                <input
                  type="checkbox"
                  checked={selectedBooks.includes(item)}
                  onChange={() => handleBookSelect(item)}
                />
                <label className="ml-2 text-white">Select</label>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <label className="text-white">Similarity Rating:</label>

        <div className="flex items-center mt-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              className={`w-6 h-6 cursor-pointer ${
                star <= similarityRating ? "text-yellow-300" : "text-gray-300"
              }`}
              onClick={() => handleRatingChange(star)}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          ))}
        </div>
      </div>
      {selectedBooks.length === 2 && (
        <button
          onClick={handleSubmit}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
        >
          Submit
        </button>
      )}
    </div>
  );
};

export default Books;
