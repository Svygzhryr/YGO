import { Routes, Route } from 'react-router-dom';
import { Controlled } from '../components/Controlled';
import { Uncontrolled } from '../components/Uncontrolled';
import { Main } from '../components/Main';
import { Navbar } from '../components/Navbar';
import styles from './App.module.scss';

function App() {
  return (
    // <div className={styles.mask}>
    <div className={styles.wrapper}>
      <Navbar />
      <div className={styles.content}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/controlled" element={<Controlled />} />
          <Route path="/uncontrolled" element={<Uncontrolled />} />
        </Routes>
      </div>
    </div>
    // </div>
  );
}

export default App;
