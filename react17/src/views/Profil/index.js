import { useNavigate,Navigate, useSearchParams} from "react-router-dom";
import DefaultLayout from "../../layouts/default";

const Profil = () => {
    if(!localStorage.getItem("user-token")){
        return <Navigate to="/signin"/>
    }

    return (
        <DefaultLayout>
           Profil
        </DefaultLayout>
       )
}

export default Profil;