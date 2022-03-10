import {useState} from 'react';
import { Link ,useNavigate} from "react-router-dom";
import { setUser } from '../store/user.js'
import { useDispatch,useSelector } from 'react-redux'

const DefaultLayout = (props) => {
    const user = useSelector((state) => state.user.value)
    const storeDispatch = useDispatch();
    const [isLodingLogout,setIsLoadingLogout] = useState(false);
    const navigate = useNavigate();

    function onLogut(){
        setIsLoadingLogout(true)

        window.$axios.post("/logout")
        .then(() => {
            storeDispatch(setUser(null))
            setIsLoadingLogout(false)
            window.$toastr("Success","Berhasil Keluar")            
            localStorage.removeItem('user-token');            
            navigate('/signin')
        })
        .catch(err => {            
            console.log(err)
            setIsLoadingLogout(false)
            window.$globalErrorToaster(window.$toastr,err)        
        })     
    }

    return (
        <>
            <div>                
                <ul>
                    <li>
                        {user ? user.name : "-"}
                    </li>
                    <li>
                      <Link to="/profil">
                         Profil
                      </Link>
                   </li>                
                   <li>
                     <Link to="/product">
                        Product
                     </Link>
                   </li>
                   <li>
                     <Link to="#" onClick={onLogut}>
                        { isLodingLogout ? '...' : 'Keluar' }
                     </Link>
                   </li>
                </ul>
            </div>

            <div className="conatiner">
                {props.children}
            </div>
        </>
    )
}

export default DefaultLayout;