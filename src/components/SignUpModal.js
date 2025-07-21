
import './styles/SignUpModal.css';
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const SignUpModal = ({ onClose, onSwitchToSignIn }) => {
const navigate = useNavigate();

const handleSignUpClick = () => {
    navigate('/question');
};
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          <IoClose size={24} />
        </button>

        <h2 className="modal-title">Sign up</h2>

        <div className="form-group">
          <label htmlFor="name">NAME</label>
          <input id="name" type="text" />
        </div>

        <div className="form-group">
          <label htmlFor="email">EMAIL</label>
          <input id="email" type="email" />
        </div>

        <div className="form-group">
          <label htmlFor="password">PASSWORD</label>
          <input id="password" type="password" />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">CONFIRM PASSWORD</label>
          <input id="confirmPassword" type="password" />
        </div>

        <button className="btn-signup" onClick={handleSignUpClick}>Sign up</button>

     <p className="switch-link" onClick={onSwitchToSignIn}>Sign in</p>
        

        <p className="terms">
          By clicking continue above, you acknowledge that you have read, understood and agree to our <span>Terms & Conditions.</span>
        </p>
      </div>
    </div>
  );
};

export default SignUpModal;