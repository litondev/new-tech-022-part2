import React,{useState,useEffect} from 'react';
import { BrowserRouter,Route,Routes} from "react-router-dom";
import MyRoutes from "./routes/index.js";

const App = () => {
    const ToastContainer = window.$ToastContainer;
    return (        
        <BrowserRouter>   
          <React.Suspense fallback={ <span>. . .</span> }>    
            <Routes>
            {
              MyRoutes.map((route,indexRoute) => {
                return <Route
                  path={ route.path }
                  key={ indexRoute }
                  element={
                    <route.component />                  
                  } />
              })
            }           
            </Routes>
          </React.Suspense>
          <ToastContainer/>
        </BrowserRouter>
    )
}

export default App;