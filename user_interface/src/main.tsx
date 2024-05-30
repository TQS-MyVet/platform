import { createRoot } from 'react-dom/client';

import App from './App';

import './index.css';

import 'react-big-calendar/lib/css/react-big-calendar.css'


const container = document.getElementById('root');

if (!container) {
    throw new Error('No root element found');
}

const root = createRoot(container);
root.render(<App />);