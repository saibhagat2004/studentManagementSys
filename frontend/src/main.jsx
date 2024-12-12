// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { BrowserRouter } from 'react-router-dom'


// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </StrictMode>,
// )

import  { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'; // For React 18
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter from react-router-dom
import App from './App'; // Import your App component

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> 
      <App />  {/* Render the App component */}
    </BrowserRouter>
  </StrictMode>
);
