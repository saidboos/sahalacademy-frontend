import { jwtDecode } from "jwt-decode"

const getUserData = () => {
    const token = localStorage.getItem('token')
    if(token){
        const decodedToken = jwtDecode(token)
        return decodedToken.data;
    } else return null
  
}

export default getUserData