export interface MovieModel {
  poster_path: string | null,
  adult: boolean,
  overview: string,
  release_date: string,
  genre_ids: number[],
  genres: Genres[],
  id: number,
  original_title: string,
  original_language: string,
  title: string,
  backdrop_path: string | null,
  popularity: number,
  vote_count: number,
  video: boolean,
  vote_average: number,
  original_name: string,
  isMovie: boolean,
  runtime: number | null,
  tagline: string
  first_air_date: string,
  last_air_date: string,
  number_of_episodes: number,
  number_of_seasons: string,
  episode_run_time: number,
  status: string,
  media_type: string
}

export interface Genres {
  id: number,
  name: string
}


/*
export const mockMovie: MovieModel ={
  adult: false,
  backdrop_path: "/bQXAqRx2Fgc46uCVWgoPz5L5Dtr.jpg",
  genre_ids: [
    28,
    14,
    878
  ],
  id: 436270,
  original_language: "en",
  original_title: "Black Adam",
  overview: "Nearly 5,000 years after he was bestowed with the almighty powers of the Egyptian gods—and imprisoned just as quickly—Black Adam is freed from his earthly tomb, ready to unleash his unique form of justice on the modern world.",
  popularity: 4328.431,
  poster_path: "/3zXceNTtyj5FLjwQXuPvLYK5YYL.jpg",
  release_date: "2022-10-19",
  title: "Black Adam",
  video: false,
  vote_average: 6.9,
  vote_count: 1058,
  original_name: '',
  isMovie: true,
  runtime: 0,
  genres: []
}
*/
