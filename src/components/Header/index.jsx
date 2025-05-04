import './Header.css';
import { useEffect } from 'react';


const Header = () => {
  
  useEffect(() => {
    const menu = document.querySelector('#menu-icon');
    const barraNav = document.querySelector('.Barra__Nav');

    if (menu && barraNav) {
      menu.onclick = () => {
        menu.classList.toggle('bx-x');
        barraNav.classList.toggle('open');
      };
    }
  }, []);

  return (
    <header className="Header">
      <img src="LOGO.png" alt="Logo de la Empresa"className='Barra__Img'/>
      <ul className='Barra__Nav'>
        <li><a href="../Home"><i class="ri-home-4-fill"></i>Home</a></li>
        <li><a href="../Accesorios"><i class="ri-store-3-fill"></i>Accessories</a></li>
        <li><a href="/ProductCRUD"><i class="ri-admin-fill"></i>Admin</a></li>
        <li><a href="../"><i class="ri-service-fill"></i>Service</a></li>
        <li><a href="../Contact"><i class="ri-contacts-fill"></i>Contact</a></li>
      </ul>
      <div className="Login">
        <a href="" className="User"><i class="ri-user-3-fill"></i>Sing in</a>
        <a href="">Register</a>
        <div className="bx bx-menu" id="menu-icon"></div>
      </div>
    </header>
  );
}

export default Header;