import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
    const navigate = useNavigate();

    const [authing, setAuthing] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const signUpWithEmail = async () => {
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setAuthing(true);
        setError('');

        try {
            const response = await fetch("http://localhost:5000/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                alert("User registered successfully");
                navigate('/login'); // Redirige al login después del registro
            } else {
                const data = await response.json();
                setError(data.message); // Mostrar el mensaje de error del backend
            }
        } catch (err) {
            console.error("Error al registrar usuario:", err);
            setError("Error al conectar con el servidor");
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