import { useState } from 'react';
import { searchforShows, searchforPeople } from '../Api/Tvmaze';

const Home = () => {
  const [search, setsearch] = useState('');
  const [apidata, setapidata] = useState(null);
  const [apidataerror, setapidataerror] = useState(null);
  const [searchoption, setsearchoption] = useState('shows');
  const onsearchChange = ev => {
    setsearch(ev.target.value);
  };

  const onRadioChange = ev => {
    setsearchoption(ev.target.value);
  };

  const onsearch = async ev => {
    ev.preventDefault();

    try {
      setapidataerror(null);

      if (searchoption == 'shows') {
        const result = await searchforShows(search);
        setapidata(result);
      } else {
        const result = await searchforPeople(search);
        setapidata(result);
      }

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
      return apidata[0].show
        ? apidata.map(data => <div key={data.show.id}>{data.show.name}</div>)
        : apidata.map(data => (
            <div key={data.person.id}>{data.person.name}</div>
          ));
    }
    return null;
  };

  return (
    <div>
      <form onSubmit={onsearch}>
        <input type="text" value={search} onChange={onsearchChange} />

        <label>
          Shows
          <input
            type="radio"
            name="search-option"
            value="shows"
            checked={searchoption === 'shows'}
            onChange={onRadioChange}
          />
        </label>

        <label>
          Actors
          <input
            type="radio"
            name="search-option"
            value="actors"
            checked={searchoption === 'actors'}
            onChange={onRadioChange}
          />
        </label>

        <button type="submit">Search</button>
      </form>
      <div>{renderApidata()}</div>
    </div>
  );
};
export default Home;
