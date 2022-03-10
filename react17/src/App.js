import React,{useState,useEffect} from 'react';
import { BrowserRouter,Route,Routes} from "react-router-dom";
import MyRoutes from "./routes/index.js";
import { setUser } from './store/user.js'
import { useDispatch } from 'react-redux'

const App = (props) => {
    const stateDispatch = useDispatch();

    const ToastContainer = window.$ToastContainer;

    useEffect(() => {
        if(props.user){
          stateDispatch(setUser(props.user))
        }
     },[props.user])

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