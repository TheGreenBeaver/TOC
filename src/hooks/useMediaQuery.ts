import { useEffect, useState } from 'react';

export const useMediaQuery = (mediaQueryString: string): boolean => {
  const [matchesQuery, setMatchesQuery] = useState(window.matchMedia(mediaQueryString).matches);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(mediaQueryString);
    mediaQueryList.onchange = changeEvent => setMatchesQuery(changeEvent.matches);
  }, [mediaQueryString]);

  return matchesQuery;
};