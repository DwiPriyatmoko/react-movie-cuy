/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from 'react';
import './App.css';
import { getMovieList, searchMovie } from './api';

const App = () => {
	const [popularMovies, setPopularMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getMovieList().then((result) => {
			setPopularMovies(result);
			setIsLoading(false);
		});
	}, []);

	const popularMovieList = () => {
		return (
			popularMovies &&
			popularMovies.map((movie, i) => {
				return (
					<div className='movie-wrapper' key={i}>
						<div className='movie-title'>{movie.original_title}</div>
						<img
							src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}
							className='movie-image'
						/>
						<div className='movie-date'>Release: {movie.release_date}</div>
						<div className='movie-rate'>Rating: {movie.vote_average}</div>
					</div>
				);
			})
		);
	};

	const search = async (q) => {
		if (q.length > 3) {
			const query = await searchMovie(q);
			setPopularMovies(query || []);
			console.log(query);
		}
	};

	return (
		<div className='App'>
			<header className='App-header'>
				<h1>Movie tipis-tipis</h1>
				<input
					type='text'
					placeholder='Search movie'
					className='movie-input'
					onChange={({ target }) => search(target.value)}
				/>
				{isLoading ? (
					<p>loading</p>
				) : (
					<div className='movie-container'>{popularMovieList()}</div>
				)}
			</header>
		</div>
	);
};

export default App;
