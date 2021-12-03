import { Box } from '@chakra-ui/layout';
import { Outlet } from 'react-router-dom';
import './App.css';


function App() {
  return (
    <Box paddingY="20px">
      <Outlet />
    </Box>
  );
}

export default App;
