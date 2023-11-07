import { FC, useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import next from '../../assets/next.svg';
import prev from '../../assets/prev.svg';
import { CardContext } from '../../contexts/cardContext';
import { MainSearch } from '../../pages/MainPage';
import { getCards } from '../../services/RequestService';
import { ICardMeta } from '../../types/types';
import styles from './Pagination.module.scss';

interface IPaginationProps {
  searchValue: string;
  meta: ICardMeta | null;
  setMeta: React.Dispatch<React.SetStateAction<ICardMeta | null>>;
}

export const Pagination: FC<IPaginationProps> = ({ meta, setMeta, searchValue }) => {
  const { setCardList } = useContext(CardContext);

  const [searchParams, setSearchParams] = useSearchParams();

  if (!meta) {
    throw new Error("Cat't get card data..");
  }

  const [isLoading, setIsLoading] = useState(false);
  const currentPage = meta.total_pages + 1 - meta.pages_remaining;

  const handlePrevPage = () => {
    setIsLoading(true);
    getCards(12, meta?.previous_page_offset, searchValue).then((response) => {
      setCardList(response.data.data);
      setMeta(response.data.meta);
      setIsLoading(false);
    });
  };

  const handleNextPage = () => {
    setIsLoading(true);
    getCards(12, meta?.next_page_offset, searchValue).then((response) => {
      setCardList(response.data.data);
      setMeta(response.data.meta);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    const params: MainSearch = Object.fromEntries(searchParams.entries());
    params.page = String(currentPage);
    if (searchValue) {
      params.search = searchValue;
    }

    setSearchParams(params);
  }, [currentPage]);

  return (
    <div className={styles.wrapper}>
      <button onClick={handlePrevPage} disabled={currentPage <= 1 || isLoading}>
        {isLoading ? <div className={styles.loader}></div> : <img src={prev} />}
      </button>
      <button disabled={true}>{currentPage}</button>
      <button onClick={handleNextPage} disabled={currentPage >= meta.total_pages + 1 || isLoading}>
        {isLoading ? <div className={styles.loader}></div> : <img src={next} />}
      </button>
    </div>
  );
};
