import { onError } from './weekly-trends-main';
import axios from 'axios';
export async function getGenres() {
  try {
    const genres = await axios.get(
      'https://api.themoviedb.org/3/genre/movie/list?api_key=41b8f9437bf3f899281f8a3f9bdc0891'
    );
    localStorage.setItem('genres', JSON.stringify(genres.data.genres)); // Зберегти масив у localStorage
    return genres;
  } catch (error) {
    onError(error);
  }
}

export async function validateGenres(genresArray, genresData) {
  try {
    const allGenres = Array.from(genresData);
    const genresNames = genresArray.map(genreId => {
      const genre = allGenres.find(genre => genre.id === genreId);
      return genre ? genre.name : '';
    });
    let genresString = '';
    if (genresNames.length > 2) {
      genresString = genresNames.slice(0, 2).join(', ') + ' and other';
    } else {
      genresString = genresNames.join(', ');
    }

    console.log(genresString);
    return genresString;
  } catch (error) {
    onError(error);
    return '';
  }
}
