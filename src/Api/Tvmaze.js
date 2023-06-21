const Base_URL = 'https://api.tvmaze.com';

const apiget = async query => {
  const response = await fetch(`${Base_URL}${query}`);

  // https://api.tvmaze.com/search/shows?q=$(search)

  const body = await response.json();

  return body;
};

export const searchforShows = query => apiget(`/search/shows?q=${query}`);
