import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase/config';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
    const navigate = useNavigate();
    const { updateUserRole } = useAuth();

    const [authing, setAuthing] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const signUpWithEmail = async () => {
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        setAuthing(true);
        setError('');

        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            await updateUserRole(result.user.uid, result.user.email, 'user');
            navigate('/');
        } catch (err) {
            if (err.code === "auth/email-already-in-use") {
                setError("El correo electrónico ya está registrado");
            } else if (err.code === "auth/weak-password") {
                setError("La contraseña debe tener al menos 6 caracteres");
            } else {
                setError("Error al crear la cuenta");
            }
        } finally {
            setAuthing(false);
        }
    };

    return (
        <div className="signup-page">
            <div className="signup-form-container">
                <div className="signup-header">
                    <h3>Sign Up</h3>
                    <p>Welcome! Please enter your information below to begin.</p>
                </div>
                <div className="Signup-inputs">
                    <div className="Signup-input-group">
                        <label className='Signup-label' htmlFor='email'>Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            className="signup-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='Signup-input-group'>
                        <label className='Signup-label' htmlFor='password'>Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            className="signup-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className='Signup-input-group'>
                        <label className='Signup-label' htmlFor='confirmPassword'>Confirm Password</label>
                        <input
                            type="password"
                            placeholder="Re-Enter Password"
                            className="signup-input"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                </div>

                {error && <div className="text-red-500 mb-4">{error}</div>}
                <button
                    onClick={signUpWithEmail}
                    disabled={authing}
                    className="signup-button"
                >
                    Sign Up With Email and Password
                </button>
                <div className="signup-link">
                    <p>
                        Already have an account? <a href="/login">Log In</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;