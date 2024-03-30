import { useEffect } from 'react';
import { useRoutes } from "react-router-dom";
import routes from "./routes";
import { useSelector } from 'react-redux';

function App() {
  const theme = useSelector(state => state.theme.theme);

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return useRoutes(routes);
}

export default App;
