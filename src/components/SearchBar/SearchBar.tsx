import {useState} from 'react';
import toast from 'react-hot-toast';
import styles from './SearchBar.module.css';

interface SearchBarProps {
    onSubmit: (query: string) => void;
}

export default function SearchBar ({onSubmit}: 
    SearchBarProps){ 
const [query, setQuery] = useState('');

      const handleAction = async (formData: FormData) => {
        const queryTrimmed = (formData.get('query') as string).trim();
      
        

          if (!queryTrimmed) { toast.error('Please enter your search query.');
              return;
            }

            onSubmit(queryTrimmed);

            setQuery('');
            
     };
    return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <form className={styles.form} action={handleAction}>
          <input
            className={styles.input}
            type="text"
            name="query"
            placeholder="Search movies..."
            autoComplete="off"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
    );
    }
    