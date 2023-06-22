import { useState } from 'react';
import { searchforShows, searchforPeople } from '../Api/Tvmaze';
import Form from '../Components/Form';
const Home = () => {
  const [apidata, setapidata] = useState(null);
  const [apidataerror, setapidataerror] = useState(null);

  const onsearch = async ({ q, searchoption }) => {
    try {
      setapidataerror(null);
      let result;
      if (searchoption == 'shows') {
        result = await searchforShows(q);
      } else {
        result = await searchforPeople(q);
      }
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
      <Form onsearch={onsearch} />

      <div>{renderApidata()}</div>
    </div>
  );
};
export default Home;
