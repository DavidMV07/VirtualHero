import "./BarraNav.css"

function BarraNav() {
  return (
    <div className="Barra">
        <h1>Virtual Hero</h1>
        <img src="LOGO.png" alt="Logo de la Empresa" className='Barra__Img'/>
        <nav className='Barra__Nav'>
            <ul>
                <li><a href="../Home">Home</a></li>
                <li><a href="#accessories">Accessories</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </div>
  );
}

export default BarraNav;