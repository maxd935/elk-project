import logo from './logo.svg';
import './App.css';
import MoviesList from "./Components/MoviesList";
import GenresList from "./Components/GenresList";

function App() {
  return (
    <div className="App">
        <MoviesList/>
        <GenresList/>
    </div>
  );
}

export default App;
