import { useState, useContext } from 'react'
import { AuthContext } from './context/AuthContext' 
import { Toaster, toast } from 'react-hot-toast'
import { AnimatePresence } from 'framer-motion' 
import LoginForm from './components/LoginForm'
import SuccessView from './components/SuccessView'
import './App.css'

function App() {
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { dispatch, API_URL, user } = useContext(AuthContext);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch({ type: "LOGIN_START" });

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login Failed");
      }

      // 🛡️ Admin Role Validation
      // Hum check kar rahe hain data.role ya data.user.role (Backend structure ke hisaab se)
      const userRole = data.role || data.user?.role;

      if (userRole !== "admin") {
        toast.error("Access Denied: You are not an Admin!");
        dispatch({ type: "LOGIN_FAILURE" });
      } else {
        // Agar role admin hai, tabhi state update hogi
        dispatch({ type: "LOGIN_SUCCESS", payload: data });
        toast.success("Welcome Boss! Access Granted.");
      }

    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
      toast.error(err.message || "Server connection error");
    } finally {
      setLoading(false);
    }
  };

  const itemVariants = { 
    hidden: { opacity: 0, y: 10 }, 
    visible: { opacity: 1, y: 0 } 
  };

  return (
    <div className="admin-container">
      <Toaster position="top-center" reverseOrder={false} />
      
      {/* Background Glows */}
      <div className="glow-1"></div>
      <div className="glow-2"></div>

      <AnimatePresence mode="wait">
        {!user ? (
          <LoginForm 
            key="login-form-comp"
            phone={phone} 
            setPhone={setPhone} 
            password={password} 
            setPassword={setPassword}
            handleAdminLogin={handleAdminLogin}
            loading={loading} 
            API_URL={API_URL}
            itemVariants={itemVariants}
          />
        ) : (
          <SuccessView 
            key="success-view-comp"
            user={user} 
            dispatch={dispatch} 
            itemVariants={itemVariants} 
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App