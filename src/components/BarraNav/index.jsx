import "./BarraNav.css"
import { Link } from 'react-router-dom';

function BarraNav() {
  return (
    <div className="Barra">
        <h1>Virtual Hero</h1>
        <img src="LOGO.png" alt="Logo de la Empresa" className='Barra__Img'/>
        <nav className='Barra__Nav'>
            <ul>
                <li><a href="../Home">Home</a></li>
                <li><a href="../Accesorios">Accessories</a></li>
                <li><a href="/ProductCRUD">Administrador</a></li>
                <li><a href="../Contact">Contact</a></li>
            </ul>
        </nav>
    </div>
  );
}

export default BarraNav;