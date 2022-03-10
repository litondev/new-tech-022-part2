import {useState} from 'react';
import { Link ,useNavigate} from "react-router-dom";

const DefaultLayout = (props) => {
    const [isLodingLogout,setIsLoadingLogout] = useState(false);
    const navigate = useNavigate();

    function onLogut(){
        setIsLoadingLogout(true)

        window.$axios.post("/logout")
        .then(() => {
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