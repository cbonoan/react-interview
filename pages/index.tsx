import { Container } from '@mui/material';
import Dashboard from './dashboard';

const Home = () => {
  return (
    <Container sx={{
      display: 'grid',
      placeItems: 'center',
      width: '100vw',
      height: '100vh',
    }}>
      <Dashboard/>
    </Container>
  )
}

export default Home;
