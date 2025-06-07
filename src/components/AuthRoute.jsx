import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const AuthRoute = ({ children }) => {
    const auth = getAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoading(false);
            } else {
                console.log('unauthorized');
                setLoading(false);
                navigate('/login');
            }
        });

        // Limpieza de la suscripción al desmontar el componente
        return () => unsubscribe();
    }, [auth, navigate]);

    // Renderizado condicional durante la carga
    if (loading) return <p></p>;

    // Renderizado de los componentes hijos si el usuario está autenticado
    return <div>{children}</div>;
};

export default AuthRoute;
