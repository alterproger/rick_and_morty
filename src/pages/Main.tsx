import { useEffect, useState } from 'react';

import Table from '../components/Table';

import { ICharacter, ICharacterResponse } from '../types';

const Main = () => {
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    setIsLoading(true);

    const res = await fetch('https://rickandmortyapi.com/api/character');

    if (res.ok) {
      const data: ICharacterResponse = await res.json();
      setCharacters(data.results);
      console.log(data.results);
    } else {
      console.error('Failed to fetch characters:', res.status);
    }

    setIsLoading(false);
  };

  const normalizeCharacters = (characters: ICharacter[]) => {
    return characters.map(character => ({
      cells: {
        image: character.name,
        name: character.name,
        specie: character.species,
      },
      link: `details/${character.id}`,
    }));
  };

  return (
    <div>
      <Table
        headers={[
          { key: 'image', title: 'Image' },
          { key: 'name', title: 'Name' },
          { key: 'specie', title: 'Specie' },
        ]}
        tableClassName="overflow-hidden w-full"
        thClassName="text-start text-[1.0625rem] font-montserrat font-medium opacity-50 pb-[1.39rem] first:text-center last:text-center"
        tdClassName="min-w-[150px] max-w-[150px] border-t border-solid border-[#707070] overflow-hidden truncate text-start h-[5.985rem] font-montserrat text-[1.125rem] font-medium"
        rows={normalizeCharacters(characters)}
        noItemsText="There are no sponsors"
        isLoading={isLoading}
        skeletons={{}}
        limit={50}
      />
    </div>
  );
};

export default Main;
