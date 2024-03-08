import Skeleton from 'react-loading-skeleton';

import { ICharacter } from '../types';

type Props = {
  character: ICharacter | null;
};

const CharacterImage = ({ character }: Props) => {
  if (!character) {
    return (
      <Skeleton width="20rem" height="20rem" className="!rounded-[2rem]" />
    );
  }

  return (
    <img
      src={character.image}
      alt={character.name}
      className="h-[20rem] w-[20rem] rounded-[2rem]"
    />
  );
};

export default CharacterImage;
