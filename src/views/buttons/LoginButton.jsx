
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom'

const LoginButton = ({ className}) => {

const navigate = useNavigate();

  return (
    <button className={className} onClick={() => navigate('login-account')}>Login</button>
  );
};

export default LoginButton
