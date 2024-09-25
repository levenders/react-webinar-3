import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app';
import { LanguageProvider } from './context/language-context';
import Store from './store';
import { StoreContext } from './store/context';

const store = new Store();

const root = createRoot(document.getElementById('root'));

// Первый рендер приложения
root.render(
  <StoreContext.Provider value={store}>
    <LanguageProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LanguageProvider>
  </StoreContext.Provider>,
);
