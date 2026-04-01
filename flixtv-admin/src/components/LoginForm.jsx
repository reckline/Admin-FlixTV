import { useState } from 'react';
import { motion } from 'framer-motion';

const LoginForm = ({ phone, setPhone, password, setPassword, handleAdminLogin, loading, API_URL, itemVariants }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <motion.main 
      key="login"
      initial="hidden"
      animate="visible"
      exit="exit"
      className="login-card"
    >
      <motion.div variants={itemVariants} className="brand-section">
        <h1 className="cyber-text">FLIXTV</h1>
        <span className="badge">ADMIN CORE</span>
      </motion.div>

      <form onSubmit={handleAdminLogin} className="login-form">
        <motion.div variants={itemVariants} className="input-group">
          <label className="input-label">Terminal ID</label>
          <input 
            type="tel" 
            className="input-field" 
            placeholder="+91..." 
            required 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)}
          />
        </motion.div>

        <motion.div variants={itemVariants} className="input-group">
          <label className="input-label">Authorization Key</label>
          <div className="password-wrapper" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <input 
              type={showPassword ? "text" : "password"} 
              className="input-field" 
              placeholder="••••••••" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              style={{ paddingRight: '50px' }} 
            />
            <button 
              type="button"
              className="eye-btn"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              style={{
                position: 'absolute',
                right: '15px',
                background: 'none',
                border: 'none',
                color: 'inherit',
                cursor: 'pointer',
                padding: '5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10
              }}
            >
              {/* Font Awesome Icons */}
              <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
            </button>
          </div>
        </motion.div>

        <motion.button 
          variants={itemVariants} 
          whileHover={{ scale: 1.02 }} 
          whileTap={{ scale: 0.98 }}
          type="submit" 
          disabled={loading} 
          className="login-btn"
        >
          {loading ? <div className="loader"></div> : "AUTHORIZE ACCESS"}
        </motion.button>
      </form>

      <motion.div variants={itemVariants} className="server-status">
        <span className="pulse-dot"></span>
        <code>Gateway: {API_URL?.split('//')[1] || "moviesmode.org"}</code>
      </motion.div>
    </motion.main>
  );
};

export default LoginForm;