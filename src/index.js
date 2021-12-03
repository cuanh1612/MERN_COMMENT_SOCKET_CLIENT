import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { DataProvider } from './GlobalState'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Products from './components/body/products/Products'
import DetailProduct from './components/body/detailProduct/DetailProduct'
import { ChakraProvider } from '@chakra-ui/react'
import Theme from './theme'
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={Theme}>
      <DataProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Products />}></Route>
              <Route exact path="/product/:id" element={<DetailProduct />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
