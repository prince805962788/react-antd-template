import React, { useEffect, useState } from 'react';
// 获取屏幕滚动位置
const useScroll = (scrollRef: React.MutableRefObject<any>) => {
  const [pos, setPos] = useState([0, 0]);
  useEffect(() => {
    const handleScroll = () => {
      setPos([scrollRef.current.scrollLeft, scrollRef.current.scrollTop]);
    };
    scrollRef.current.addEventListener('scroll', handleScroll, false);
    return () => {
      scrollRef.current.removeEventListener('scroll', handleScroll, false);
    };
  }, []);

  return pos;
};

export default useScroll;
