import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getShowId } from '../Api/Tvmaze';

const Show = () => {
  const { showId } = useParams();
  // const { showData, showError } = useShowId(showId);
  const { data: showData, error: showError } = useQuery({
    queryKey: ['show', showId],
    queryFn: () => getShowId(showId),
  });
  if (showError) {
    return <div>We have error: {showError.message}</div>;
  }

  if (showData) {
    return <div>Got Show data: {showData.name}</div>;
  }

  return <div>Data is loading....</div>;
};

export default Show;
