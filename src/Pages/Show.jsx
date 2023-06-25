import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getShowId } from '../Api/Tvmaze';

const Show = () => {
  const { showId } = useParams();

  const [showData, setshowData] = useState(null);
  const [showError, setshowError] = useState(null);

  useEffect(() => {
    async function fetch() {
      try {
        const data = await getShowId(showId);
        setshowData(data);
      } catch (err) {
        setshowData(null);
      }
    }
    fetch();
  }, [showId]);

  if (showError) {
    return <div>We have error: {showError.message}</div>;
  }

  if (showData) {
    return <div>Got Show data: {showData.name}</div>;
  }

  return <div>Data is loading</div>;
};

export default Show;
