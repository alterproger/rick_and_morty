import { useEffect, useMemo, useState } from 'react';
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

  const [searchParams, setSearchParams] = useSearchParams();

  const name = searchParams.get('name') || '';
  const page = searchParams.get('page') || '';

  const debouncedQuery = useDebounce(name);

  useEffect(() => {
    fetchCharacters(Number(page) || 1);
  }, [debouncedQuery]);

  const fetchCharacters = async (page: number) => {
    setIsLoading(true);

    try {
      const res = await fetch(
        `${API_BASE_URL}/character?page=${page}&name=${debouncedQuery}`,
      );

      if (!res.ok) {
        throw new Error('Failed to fetch characters');
      }

      const data: ICharacterResponse = await res.json();

      setSearchParams(prev => ({
        name: prev.get('name') || '',
        page: page.toString(),
      }));

      setPageInfo(data.info);
      setCharacters(data.results);
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to fetch characters',
      );
    }

    setIsLoading(false);
  };

  const normalizeCharacters = useMemo(
    () => (characters: ICharacter[]) =>
      characters.map(character => ({
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
      })),
    [],
  );

  return (
    <div className="pb-[2rem]">
      <div className="fixed left-0 mb-[2rem] flex w-full items-center justify-between bg-[#1e1e1e] px-[1rem] pb-[1rem] pt-[2rem] md:px-[4rem]">
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
        thClassName="text-start max-w-[20rem] first:max-w-[10rem] first:min-w-[10rem] min-w-[20rem] font-bold text-[#DCDCDC] bg-[#262626] py-[1rem] px-[1rem]"
        trClassName="odd:bg-[#2D2D2D] cursor-pointer transition-all hover:bg-gray-500/20"
        tdClassName="max-w-[20rem] min-w-[20rem] first:max-w-[10rem] first:min-w-[10rem] px-[1rem] overflow-hidden truncate text-start h-[4rem] font-medium"
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
