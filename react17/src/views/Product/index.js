import { useNavigate,Navigate, useSearchParams} from "react-router-dom";
import DefaultLayout from "../../layouts/default";

const Product = () => {
    if(!localStorage.getItem("user-token")){
        return <Navigate to="/signin"/>
    }
    
    return (
     <DefaultLayout>
        Product
     </DefaultLayout>
    )
}

export default Product;