import DashBoard from '../components/Dashboard';
import Tasklist from '../components/Tasklist';
import { createRoot } from 'react-dom/client';



const root = createRoot(document.getElementById('root'));
root.render(
  <div>
    <DashBoard />
    <Tasklist />
  </div>
);

