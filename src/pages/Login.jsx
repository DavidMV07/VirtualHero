import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

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
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Inicio de sesión exitoso:", data);
                localStorage.setItem("userEmail", data.email); // Guardar el correo en localStorage
                navigate('/'); // Redirige a la página principal
            } else {
                const data = await response.json();
                setError(data.message); // Mostrar el mensaje de error del backend
            }
        } catch (err) {
            console.error("Error al iniciar sesión:", err);
            setError("Error al conectar con el servidor");
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
                            <p>Welcome Back! Please enter your details.</p>
                        </div>
                        <div className="login-inputs">
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button
                            className="login-button"
                            onClick={signInWithEmail}
                            disabled={authing}
                        >
                            Log In With Email and Password
                        </button>
                        {error && <div className="login-error">{error}</div>}
                        <div className="signup-link">
                            <p>
                                Don't have an account? <a href="/signup">Sign Up</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;