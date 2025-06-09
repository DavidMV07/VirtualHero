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
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');

    const signUpWithEmail = async () => {
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        if (!firstName.trim() || !lastName.trim()) {
            setError('Por favor completa todos los campos');
            return;
        }

        setAuthing(true);
        setError('');

        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            await updateUserRole(result.user.uid, result.user.email, 'user', firstName, lastName);
            
            // Verificar si hay un producto pendiente
            const pendingProduct = localStorage.getItem('lastProductDetail');
            if (pendingProduct) {
                const { productId } = JSON.parse(pendingProduct);
                navigate(`/Product/${productId}`);
            } else {
                navigate('/');
            }
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
                        <label className='Signup-label' htmlFor='firstName'>Nombre</label>
                        <input
                            type="text"
                            id="firstName"
                            placeholder="Tu nombre"
                            className="signup-input"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="Signup-input-group">
                        <label className='Signup-label' htmlFor='lastName'>Apellido</label>
                        <input
                            type="text"
                            id="lastName"
                            placeholder="Tu apellido"
                            className="signup-input"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className="Signup-input-group">
                        <label className='Signup-label' htmlFor='email'>Email</label>
                        <input
                            type="email"
                            id="email"
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
                            id="password"
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
                            id="confirmPassword"
                            placeholder="Re-Enter Password"
                            className="signup-input"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                </div>

                {error && <div className="error-message">{error}</div>}
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