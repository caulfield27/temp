// import { StrictMode } from 'react'
import './index.css';

import { createRoot } from 'react-dom/client';

import { AppProvider } from './app/providers/router/Provider.tsx';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  //   <AppProvider/>
  // </StrictMode>,
  <AppProvider />
);
