import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Table from '../components/Table';
import TableNavigation from '../components/TableNavigation';
import { API_BASE_URL, INITIAL_PAGE_INFO } from '../constants';
import useDebounce from '../hooks/useDebounce';

import { ICharacter, ICharacterResponse, IPageInfo } from '../types';

const Main = () => {
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageInfo, setPageInfo] = useState<IPageInfo>(INITIAL_PAGE_INFO);

  const [serchParams, setSearchParams] = useSearchParams();

  const name = serchParams.get('name') || '';
  const page = serchParams.get('page') || '';

  const debouncedQuery = useDebounce(name, 500);

  useEffect(() => {
    fetchCharacters(Number(page) || 1);
  }, [debouncedQuery]);

  const fetchCharacters = async (page: number) => {
    setIsLoading(true);

    const res = await fetch(
      API_BASE_URL + '/character?page=' + page + '&name=' + debouncedQuery,
    );

    if (res.ok) {
      const data: ICharacterResponse = await res.json();
      setSearchParams(prev => ({
        name: prev.get('name') || '',
        page: page.toString(),
      }));
      setPageInfo(data.info);
      setCharacters(data.results);
    } else {
      console.error('Failed to fetch characters:', res.status);
    }

    setIsLoading(false);
  };

  const normalizeCharacters = (characters: ICharacter[]) => {
    return characters.map(character => ({
      cells: {
        image: (
          <img
            src={character.image}
            alt={character.name}
            className="h-[3rem] w-[3rem] rounded-full"
          />
        ),
        name: character.name,
        status: character.status,
        specie: character.species,
      },
      link: `details/${character.id}`,
    }));
  };

  return (
    <div>
      <div className="mb-[2rem] flex items-center justify-between">
        <TableNavigation
          pageInfo={pageInfo}
          next={() => fetchCharacters(Number(page) + 1)}
          prev={() => fetchCharacters(Number(page) - 1)}
        />

        <input
          type="text"
          placeholder="Search"
          value={name}
          onChange={event =>
            setSearchParams(prev => ({
              ...prev,
              name: event.target.value,
            }))
          }
        />
      </div>

      <Table
        headers={[
          { key: 'image', title: 'Image' },
          { key: 'name', title: 'Name' },
          { key: 'status', title: 'Status' },
          { key: 'specie', title: 'Specie' },
        ]}
        tableClassName="overflow-hidden w-full mb-[2rem] bg-[#262626] rounded-[1.5rem]"
        thClassName="text-start font-bold text-[#DCDCDC] bg-[#262626] py-[1rem] px-[1rem]"
        trClassName="odd:bg-[#2D2D2D] hover:opacity-70 cursor-pointer transition-all"
        tdClassName="min-w-[150px] px-[1rem] max-w-[150px] overflow-hidden truncate text-start h-[4rem] font-medium"
        rows={normalizeCharacters(characters)}
        noItemsText="There are no sponsors"
        isLoading={isLoading}
        skeletons={{}}
        limit={50}
      />

      <TableNavigation
        pageInfo={pageInfo}
        next={() => fetchCharacters(Number(page) + 1)}
        prev={() => fetchCharacters(Number(page) - 1)}
      />
    </div>
  );
};

export default Main;
