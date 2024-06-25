
import { useNavigate } from 'react-router-dom'

const JoinButton = ({ className }) => {

  const navigate = useNavigate();

  const handleLogout = () => {
    // clear the token from local storage and set the user as logged out

  }
  return (
    <button className={className} onClick={()=> navigate('create-account')}>Join</button>
  );
};

export default JoinButton
