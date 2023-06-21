import { useState } from 'react';
import { searchforShows } from '../Api/Tvmaze';

const Home = () => {
  const [search, setsearch] = useState('');
  const [apidata, setapidata] = useState(null);
  const [apidataerror, setapidataerror] = useState(null);
  const onsearchChange = ev => {
    setsearch(ev.target.value);
  };

  const onsearch = async ev => {
    ev.preventDefault();

    try {
      setapidataerror(null);

      const result = await searchforShows(search);
      setapidata(result);
    } catch (error) {
      setapidataerror(error);
    }
  };

  const renderApidata = () => {
    if (apidataerror) {
      return <div>Error Occured: {apidataerror.message}</div>;
    }

    if (apidata) {
      return apidata.map(data => (
        <div key={data.show.id}>{data.show.name}</div>
      ));
    }
    return null;
  };

  return (
    <div>
      <form onSubmit={onsearch}>
        <input type="text" value={search} onChange={onsearchChange} />
        <button type="submit">Search</button>
      </form>
      <div>{renderApidata()}</div>
    </div>
  );
};
export default Home;
