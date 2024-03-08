import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

import { ICharacter } from '../types';

const Details = () => {
  const [character, setCharacter] = useState<ICharacter | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const params = useParams();

  useEffect(() => {
    fetchCharacters();
    console.log(location)
  }, []);

  const fetchCharacters = async () => {
    setIsLoading(true);

    const res = await fetch(
      `https://rickandmortyapi.com/api/character/${params.id}`,
    );

    if (res.ok) {
      const data: ICharacter = await res.json();
      setCharacter(data);
    } else {
      console.error('Failed to fetch characters:', res.status);
    }

    setIsLoading(false);
  };
  return (
    <div>
      <Link to={`/` + location.state.search}>Back</Link>

      {character && !isLoading && (
        <div>
          {character.id}
          {character.name}
          {character.species}
        </div>
      )}
    </div>
  );
};

export default Details;
