import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './app.tsx';
import { Provider } from 'react-redux';
import { store } from './store.ts';
import { DialogProvider } from '@context/dialog-provider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <DialogProvider>
        <App />
      </DialogProvider>
    </Provider>
  </StrictMode>,
);
