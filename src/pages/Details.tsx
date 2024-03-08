import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { ICharacter } from '../types';

const Details = () => {
  const [character, setCharacter] = useState<ICharacter | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();

  console.log(params);

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    setIsLoading(true);

    const res = await fetch(
      `https://rickandmortyapi.com/api/character/${params.id}`,
    );

    if (res.ok) {
      const data: ICharacter = await res.json();
      setCharacter(data);
      console.log(data);
    } else {
      console.error('Failed to fetch characters:', res.status);
    }

    setIsLoading(false);
  };
  return (
    <div>
      <Link to="/">Back</Link>

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
