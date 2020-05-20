import { useEffect } from 'react';

const useScript = ({url,text}) => {
  useEffect(() => {
    const script = document.createElement('script');
    if(url)
      script.src = url;
    if(text)
      script.innerHTML=text;
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    }
  }, [url]);
};

export default useScript;