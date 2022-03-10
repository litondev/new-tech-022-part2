import { useNavigate,Navigate, useSearchParams} from "react-router-dom";
import DefaultLayout from "../../layouts/default";
import { useSelector } from 'react-redux'

const Profil = () => {
    const user = useSelector((state) => state.user.value)

    if(!localStorage.getItem("user-token")){
        return <Navigate to="/signin"/>
    }

    return (
        <DefaultLayout>
           Profil
           <br/>
           {user ? user.name : "-"}
        </DefaultLayout>
    )
}

export default Profil;