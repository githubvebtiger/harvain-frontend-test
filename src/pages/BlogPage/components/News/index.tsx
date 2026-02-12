import React, { useEffect, useState } from 'react';
import './styles.scss'
import NewsCard from '../NewsCard';
import { BlackArrowLeftIcon, BlackArrowRightIcon, whiteArrowRightIcon, WhiteArrowLeftIcon } from '../../../../assets';
import { fetchNews } from '../../../../api/news';
import { useTheme } from '../../../../provider/ThemeProvider';

type Props = {}

export default function News(props: Props) {
  const [newsData, setNewsData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    fetchNews().then(data => {
      setNewsData(data);
    });
  }, []);

  const { theme } = useTheme();
  const totalPages = Math.ceil(newsData.length / itemsPerPage);


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;


  const currentItems = newsData.slice(indexOfFirstItem, indexOfLastItem);


  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };


  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="news">
      <div className="news-items">
        {currentItems.map((item, index) => (
          <NewsCard
            key={index}
            title={item.header}
            img={item.image}
            text={item.content}
            link={item.link}
          />
        ))}
      </div>

      <div className="slide-items">
        <p>Showing <span>{currentPage}</span> of <span>{totalPages}</span> Entries</p>
        <div className="slide-btn">
          <div className="left" onClick={handlePrev} style={{ opacity: currentPage === 1 ? 0.5 : 1 }}>
            <img src={theme === 'dark' ? WhiteArrowLeftIcon  :BlackArrowLeftIcon} alt="arrow" />
            <p>Prev</p>
          </div>
          <div className="right" onClick={handleNext} style={{ opacity: currentPage === totalPages ? 0.5 : 1 }}>
            <p>Next</p>
            <img  src={theme === 'dark' ? whiteArrowRightIcon : BlackArrowRightIcon}
             alt="arrow" />
          </div>
        </div>
      </div>
    </div>
  )
}
