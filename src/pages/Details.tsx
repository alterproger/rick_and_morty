import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import CharacterImage from '../components/CharacterImage';
import CharacteristicList from '../components/CharacteristicList';
import { ArrowIcon } from '../components/icons';

import { ICharacter } from '../types';

const Details = () => {
  const [character, setCharacter] = useState<ICharacter | null>(null);
  const location = useLocation();

  const params = useParams();

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const res = await fetch(
          `https://rickandmortyapi.com/api/character/${params.id}`,
        );

        if (!res.ok) {
          throw new Error('Failed to fetch characters');
        }

        const data: ICharacter = await res.json();

        if (data) {
          setCharacter(data);
        }
      } catch (error: unknown) {
        toast.error(
          error instanceof Error ? error.message : 'Failed to fetch character',
        );
      }
    };

    fetchCharacters();
  }, []);

  return (
    <div className="pt-[2rem]">
      <Link
        to={`/` + location.state.search}
        className="flex items-center gap-[0.5rem]"
      >
        <div className="w-[2rem]">
          <ArrowIcon />
        </div>
        Back
      </Link>

      <div className="mt-[2rem] flex h-[71vh] flex-col items-center justify-center gap-[4rem] lg:flex-row">
        <CharacterImage {...{ character }} />

        <CharacteristicList {...{ character }} />
      </div>
    </div>
  );
};

export default Details;
