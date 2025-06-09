import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase/config';

const Login = () => {
    const navigate = useNavigate();

    const [authing, setAuthing] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const signInWithEmail = async () => {
        setAuthing(true);
        setError('');

        try {
            await signInWithEmailAndPassword(auth, email, password);
            
            // Verificar si hay un producto pendiente
            const pendingProduct = localStorage.getItem('lastProductDetail');
            if (pendingProduct) {
                const { productId } = JSON.parse(pendingProduct);
                navigate(`/Product/${productId}`);
            } else {
                navigate('/');
            }
        } catch (err) {
            if (err.code === "auth/invalid-email" || err.code === "auth/wrong-password" || err.code === "auth/user-not-found") {
                setError("Correo o contraseña incorrectos");
            } else {
                setError("Error al iniciar sesión");
            }
        } finally {
            setAuthing(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-left"></div>
                <div className="login-right">
                    <div className="login-form">
                        <div className="login-header">
                            <h3>Login</h3>
                            <p></p>
                        </div>
                        <div className="login-inputs">
                            <div className="login-input-group">
                                <label className="login-label" htmlFor="email">Correo electrónico</label>
                                <input
                                    className="login-input"
                                    id="email"
                                    type="email"
                                    placeholder="Correo electrónico"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete="username"
                                />
                            </div>
                            <div className="login-input-group">
                                <label className="login-label" htmlFor="password">Contraseña</label>
                                <input
                                    className="login-input"
                                    id="password"
                                    type="password"
                                    placeholder="Contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="current-password"
                                />
                            </div>
                        </div>
                        <button
                            className="login-button"
                            onClick={signInWithEmail}
                            disabled={authing}
                        >
                            Iniciar sesión
                        </button>
                        {error && <div className="login-error">{error}</div>}
                        <div className="signup-link">
                            <p>
                                ¿No tienes una cuenta? <a href="/signup">CREAR </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;