import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import QuizList from "./pages/QuizList";
import QuizForm from "./pages/QuizForm";
import QuizPage from "./pages/QuizPage";

export default function App() {
  return (
    <main className="flex justify-center w-full h-full py-9 font-sans">
      <Router>
        <Routes>
          <Route path="/" element={<QuizList />} />
          <Route path="/create" element={<QuizForm />} />
          <Route path="/quiz/:id" element={<QuizPage />} />
          <Route path="/edit/:id" element={<QuizForm />} />
        </Routes>
      </Router>
    </main>
  )
}
