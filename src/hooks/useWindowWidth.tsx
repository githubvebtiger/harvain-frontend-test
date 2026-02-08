import { useState, useEffect } from 'react';


export default function useWindowWidth(conditionalWidth?: number) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const isMobile = conditionalWidth && conditionalWidth < windowWidth
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Удаляем обработчик события при размонтировании компонента
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {windowWidth, isMobile};
}
