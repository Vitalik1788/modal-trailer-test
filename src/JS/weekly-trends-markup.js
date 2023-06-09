import { validateGenres } from './weekly-trends-genres';
import starsRating from './stars-rating';
import { openModalAboutFilm } from './movieModal';

export function createMarkup(films) {
  const markup = films.map(
    async ({
      id,
      poster_path,
      release_date,
      title,
      genre_ids,
      vote_average,
    }) => {
      const genresPromise = validateGenres(
        genre_ids,
        JSON.parse(localStorage.getItem('genres'))
      );
      const posterPath = `https://image.tmdb.org/t/p/original/${poster_path}`;

      let releaseDate = '';
      if (release_date === 'undefind') {
        releaseDate = 'Date unknown';
      } else {
        releaseDate = release_date.split('-')[0];
      }

      const genres = await genresPromise;

      return `<li class="card-item item" data-id="${id}">
            <img class="film-poster" src="https://image.tmdb.org/t/p/original/${posterPath}" alt="${title} poster" />
            <div class="overlay">
              <div class="film-info">
                <p class="film-title">${title}</p>
                <div class="film-details">
                  <span class="film-description">${genres} | ${releaseDate}</span>
                  <div class="stars-container">${starsRating({
                    voteAverage: vote_average,
                    isHero: false,
                  })}</div>
									<span class="film-rating">${vote_average}</span>;
                </div>
              </div>
            </div>
          </li>`;
    }
  );

  return Promise.all(markup).then(results => {
    const finalMarkup = results.join('');
    document
      .querySelector('.cards-list')
      .insertAdjacentHTML('beforeend', finalMarkup);

    const filmCards = document.querySelectorAll('.card-item');
    filmCards.forEach(card => {
      card.addEventListener('click', async () => {
        const movieId = card.getAttribute('data-id');
        await openModalAboutFilm(movieId);
        console.log(movieId);
      });
    });
  });
}
