import { StrictMode } from "react";
import ReactDOM from 'react-dom/client';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import "modern-normalize";
import App from "./components/App/App";


const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client = {queryClient}>
    <StrictMode>
    <App/>
    </StrictMode>
  </QueryClientProvider>);

