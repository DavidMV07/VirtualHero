import { useState } from 'react';
import ProductCRUD from '../ProductCRUD';
import ContactMessages from './ContactMessages';
import "./Admin.css";

const Admin = () => {
    const [activeTab, setActiveTab] = useState('products');

    return (
        <div className="admin-container">
            <div className="admin-tabs">
                <button 
                    className={`admin-tab ${activeTab === 'products' ? 'active' : ''}`}
                    onClick={() => setActiveTab('products')}
                >
                    Gestión de Productos
                </button>
                <button 
                    className={`admin-tab ${activeTab === 'messages' ? 'active' : ''}`}
                    onClick={() => setActiveTab('messages')}
                >
                    Mensajes de Contacto
                </button>
            </div>

            {activeTab === 'products' ? (
                <ProductCRUD />
            ) : (
                <ContactMessages />
            )}
        </div>
    );
};

export default Admin; 