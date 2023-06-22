import { useState } from 'react';

const Form = ({ onsearch }) => {
  const [search, setsearch] = useState('');
  const [searchoption, setsearchoption] = useState('shows');

  const onsearchChange = ev => {
    setsearch(ev.target.value);
  };

  const onRadioChange = ev => {
    setsearchoption(ev.target.value);
  };

  const onSubmit = ev => {
    ev.preventDefault();

    const options = {
      q: search,
      searchoption,
    };
    onsearch(options);
  };

  return (
    <form onSubmit={onSubmit}>
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
  );
};

export default Form;
