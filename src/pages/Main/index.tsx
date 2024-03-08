import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import Table from '../../components/Table';
import TableNavigation from '../../components/TableNavigation';
import {
  API_BASE_URL,
  CHARACTERS_LIMIT,
  INITIAL_PAGE_INFO,
} from '../../constants';
import useDebounce from '../../hooks/useDebounce';
import { cellSkeletons } from './skeletons';

import { ICharacter, ICharacterResponse, IPageInfo } from '../../types';

const Main = () => {
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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
      toast.error('Failed to fetch characters');
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
    <div className='pb-[2rem]'>
      <div className="mb-[2rem] pt-[2rem] pb-[1rem] bg-[#1e1e1e] left-0 fixed w-full flex items-center justify-between px-[1rem] md:px-[4rem]">
        <TableNavigation
          pageInfo={pageInfo}
          next={() => fetchCharacters(Number(page) + 1)}
          prev={() => fetchCharacters(Number(page) - 1)}
        />

        <input
          type="text"
          placeholder="Search"
          value={name}
          className="gradient min-h-[3rem] min-w-[10rem] rounded-[1rem] px-[1rem] font-semibold outline-none placeholder:font-semibold placeholder:text-white"
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
        tableClassName="overflow-hidden w-full mt-[6rem] bg-[#262626] rounded-[1.5rem]"
        thClassName="text-start font-bold text-[#DCDCDC] bg-[#262626] py-[1rem] px-[1rem]"
        trClassName="odd:bg-[#2D2D2D] cursor-pointer transition-all"
        tdClassName="w-[20rem] px-[1rem] overflow-hidden truncate text-start h-[4rem] font-medium"
        rows={normalizeCharacters(characters)}
        noItemsText="There are no characters"
        isLoading={isLoading}
        skeletons={cellSkeletons}
        limit={CHARACTERS_LIMIT}
      />
    </div>
  );
};

export default Main;
