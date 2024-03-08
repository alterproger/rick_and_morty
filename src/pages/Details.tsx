/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link, useLocation, useParams } from 'react-router-dom';

import { ArrowIcon } from '../components/icons';

import { ICharacter } from '../types';

const POINTS = [
  { key: 'name', title: 'Name' },
  { key: 'species', title: 'Species' },
  { key: 'status', title: 'Status' },
  { key: 'gender', title: 'Gender' },
  { key: 'origin', title: 'Origin' },
  { key: 'location', title: 'Location' },
];

const Details = () => {
  const [character, setCharacter] = useState<ICharacter | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const params = useParams();

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
    } else {
      console.error('Failed to fetch characters:', res.status);
    }

    setIsLoading(false);
  };
  return (
    <div>
      <Link
        to={`/` + location.state.search}
        className="flex items-center gap-[0.5rem]"
      >
        <div className="w-[2rem]">
          <ArrowIcon />
        </div>
        Back
      </Link>

      <div className="mt-[2rem] flex items-center gap-[4rem]">
        {character ? (
          <img
            src={character.image}
            alt={character.name}
            className="h-[20rem] w-[20rem] rounded-[2rem]"
          />
        ) : (
          <Skeleton width="20rem" height="20rem" className="!rounded-[2rem]" />
        )}

        {character ? (
          <ul>
            {POINTS.map(point => (
              <li key={point.key}>
                <span>{point.title}: </span>
                {['origin', 'location'].includes(point.key) ? (
                  <span className="text-[1.1rem] font-bold">
                    {(character as any)[point.key].name}
                  </span>
                ) : (
                  <span className="text-[1.1rem] font-bold">
                    {(character as any)[point.key]}
                  </span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <ul>
            {POINTS.map(point => (
              <li key={point.key}>
                <Skeleton width="7rem" height="1.1rem" />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Details;
