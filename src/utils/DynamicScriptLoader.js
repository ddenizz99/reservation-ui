import { useEffect } from 'react';

const DynamicScriptLoader = ({ scripts }) => {
  useEffect(() => {
    scripts.forEach(src => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
    });

    return () => {
      scripts.forEach(src => {
        const script = document.querySelector(`script[src="${src}"]`);
        if (script) {
          document.body.removeChild(script);
        }
      });
    };
  }, [scripts]);

  return null;
};
  
export default DynamicScriptLoader;