import { useState } from 'react'; 
import {useQuery} from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';
import type {SelectedType} from '../../types/movie'
import toast, {Toaster} from 'react-hot-toast';
import type {Movie} from '../../types/movie';
import {getMovies} from '../../services/movieService';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal';
import SearchBar from '../SearchBar/SearchBar';
import styles from './App.module.css';


const App = () => {
const [query, setQuery] = useState('');
const [page, setPage] = useState(1);
const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

const {
  data,
  isLoading,
  isError,
} = useQuery({
  queryKey: ['movies', query, page],
  queryFn: () => getMovies(query, page),
  enabled: Boolean(query),
});

const handleSearch = (newQuery: string) => {
 if (!newQuery.trim()) return;

 setQuery(newQuery);
 setPage(1);
};

 const handleSelectMovie = (movie: Movie) => setSelectedMovie(movie);
 const handleCloseModal = () => setSelectedMovie(null);
 
 if (data && data.results.length === 0) {
  toast('No movies found for your request.');
 }
 return (
    <div className={styles.app}>
      <Toaster/>
      <SearchBar onSubmit={handleSearch} />

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}


      {!isLoading && !isError && data && (
    <>
         {data.total_pages > 1 && (
           <ReactPaginate
             pageCount={data.total_pages}
             pageRangeDisplayed={5}
             marginPagesDisplayed={1}
             onPageChange={(event: SelectedType) => setPage(event.selected + 1)}
             forcePage={page - 1}
             containerClassName={styles.pagination}
             activeClassName={styles.active}
             nextLabel="→"
             previousLabel="←"
           />
)}
    <MovieGrid movies={data.results} onSelect={handleSelectMovie} />
    
</>
      )};

{selectedMovie && (
      <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
    )}


</div>
 );
};

export default App;