import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Table from '../components/Table';
import { API_BASE_URL } from '../constants';
import useDebounce from '../hooks/useDebounce';

import { ICharacter, ICharacterResponse, IPageInfo } from '../types';

const Main = () => {
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageInfo, setPageInfo] = useState<IPageInfo | null>(null);

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
        image: character.name,
        name: character.name,
        specie: character.species,
      },
      link: `details/${character.id}`,
    }));
  };

  return (
    <div>
      {pageInfo && (
        <div>
          <button
            disabled={!pageInfo.prev}
            onClick={() => fetchCharacters(Number(page) - 1)}
          >
            Prev
          </button>

          <button
            disabled={!pageInfo.next}
            onClick={() => fetchCharacters(Number(page) + 1)}
          >
            Next
          </button>
        </div>
      )}

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
