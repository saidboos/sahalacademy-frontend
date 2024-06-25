
import Swal from "sweetalert2";

const LogoutButton = ({ className, setLoggedIn }) => {
  const handleLogout = () => {
    // clear the token from local storage and set the user as logged out
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to logout!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff0000',
      cancelButtonColor: '#228b22',
      confirmButtonText: 'Yes!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        setLoggedIn(false);
      }
    })
  }
  return (
    <button className={className} onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton
