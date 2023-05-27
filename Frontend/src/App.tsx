import { FC } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import AllRoutes from './routes/AllRoutes';
import Footer from './components/Footer';

const App: FC = () => {
  return (
    <div className="App">
      <Navbar />
      <AllRoutes />
      <Footer />
    </div>
  );
}

export default App;
