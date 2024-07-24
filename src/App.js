import logo from "./logo.svg";
import "./App.css";
import Login from "./pages/login";
import { Route, Routes } from "react-router-dom";
import Books from "./pages/books";
import ViewRate from "./pages/viewRate";
import { BookProvider } from "./context/BookContext";

function App() {
  return (
    <div className="App">
      <BookProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard/books" element={<Books />} />
          <Route path="/dashboard/rate" element={<ViewRate />} />
        </Routes>
      </BookProvider>
    </div>
  );
}

export default App;
