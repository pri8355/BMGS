import './styles/SignInModal.css';
import { useNavigate } from 'react-router-dom';
import { IoClose } from 'react-icons/io5'; 

const SignInModal = ({ onClose }) => {
  const navigate = useNavigate();
  
  const handleSignUpClick = () => {
    navigate('/dashboard');
};
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          <IoClose size={24} />
        </button>

        <h2 className="modal-title">Sign in</h2>

        <div className="form-group">
          <label htmlFor="email">EMAIL</label>
          <input id="email" type="email" />
        </div>

        <div className="form-group">
          <label htmlFor="password">PASSWORD</label>
          <input id="password" type="password" />
        </div>

        <button className="btn-signin" onClick={handleSignUpClick}>Sign in</button>

        <p className="forgot-link">Forgot your password?</p>

        <p className="terms">
          By clicking continue above, you acknowledge that you have read,
          understood and agree to our <span>Terms & Conditions.</span>
        </p>
      </div>
    </div>
  );
};

export default SignInModal;

