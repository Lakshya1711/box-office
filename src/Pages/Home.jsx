import { useState } from 'react';

const Home = () => {
  const [search, setsearch] = useState('');

  const onsearchChange = ev => {
    setsearch(ev.target.value);
  };

  const onsearch = async ev => {
    ev.preventDefault();

    const response = await fetch(
      `https://api.tvmaze.com/search/shows?q=$(search)`
    );
    const body = response.json();

    // https://api.tvmaze.com/search/shows?q=girls
  };

  return (
    <div>
      <form action={onsearch}>
        <input type="text" value={search} onChange={onsearchChange} />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};
export default Home;
