import { jwtDecode } from "jwt-decode"

const validateToken = () => {
    const token = localStorage.getItem('token')
    if(token){
        const decodedToken = jwtDecode(token)

        const currentDate = new Date()
    
        if(decodedToken.exp * 1000 < currentDate.getTime()){
            return false;
        } else return true
    } else return false
  
}

export default validateToken