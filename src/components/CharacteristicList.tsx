import Skeleton from 'react-loading-skeleton';

import { CHARACTERISTICS } from '../constants';

import { ICharacter } from '../types';

type Props = {
  character: ICharacter | null;
};

const CharacteristicList = ({ character }: Props) => {
  if (!character) {
    return (
      <ul>
        {CHARACTERISTICS.map(key => (
          <li key={key}>
            <Skeleton width="7rem" height="1.1rem" />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul>
      {CHARACTERISTICS.map(key => (
        <li key={key}>
          <span className="capitalize">{key}: </span>
          {key === 'origin' || key === 'location' ? (
            <span className="text-[1.1rem] font-bold">
              {character[key].name}
            </span>
          ) : (
            <span className="text-[1.1rem] font-bold">
              {character[key] as string}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
};

export default CharacteristicList;
