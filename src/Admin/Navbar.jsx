import Swal from "sweetalert2"; // تأكد إنك مستورد SweetAlert2
import { useAuth } from "../context/AuthContext";
import { assets } from "../assets/assets_frontend/assets";

const Navbar = () => {
  const { logoutAdmin } = useAuth();

  const handleLogout = () => {
    Swal.fire({
      title: "Do you want to log out?",
      showDenyButton: true,
      confirmButtonText: "Yes, log out",
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        logoutAdmin();
        Swal.fire("You have been logged out", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Logout cancelled", "", "info");
      }
    });
  };

  return (
    <div className="py-4 px-4 sm:px-8 lg:px-20">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img src={assets.logo} alt="" className="h-8 w-auto" />
          <h1 className="border border-black rounded-full px-4 py-1 text-xs">
            Admin
          </h1>
        </div>
        <div className="w-full sm:w-auto">
          <button
            onClick={() => handleLogout()}
            className="w-full sm:w-auto bg-primary text-white font-semibold px-6 py-2 rounded-full"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
