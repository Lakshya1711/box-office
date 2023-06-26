import { useState } from 'react';
import { searchforShows, searchforPeople } from '../Api/Tvmaze';
import Form from '../Components/Form';
import ShowGrid from '../Components/Shows/ShowGrid';
import ActorGrid from '../Components/Actors/ActorGrid';
import { useQuery } from '@tanstack/react-query';
const Home = () => {
  const [filter, setfilter] = useState(null);

  const { data: apidata, error: apidataerror } = useQuery({
    queryKey: ['search', filter],
    queryFn: () =>
      filter.searchoption == 'shows'
        ? searchforShows(filter.q)
        : searchforPeople(filter.q),
    enabled: !!filter,
    refetchOnWindowFocus: false,
  });

  const onsearch = async ({ q, searchoption }) => {
    setfilter({ q, searchoption });
  };

  const renderApidata = () => {
    if (apidataerror) {
      return <div>Error Occured: {apidataerror.message}</div>;
    }

    if (apidata?.length === 0) {
      return <div>No result</div>;
    }

    if (apidata) {
      return apidata[0].show ? (
        <ShowGrid shows={apidata} />
      ) : (
        <ActorGrid actors={apidata} />
      );
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
