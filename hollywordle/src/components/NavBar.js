const NavBar = ({ togglePopup }) => {
  
    return (
        <div className='container'>
        <div className='inner-container'>
          <h1>HollyWordle</h1>
        </div>
        <div className='inner-container'>
          <button className='question' onClick={togglePopup}>
            ?
          </button>
        </div>
      </div>
      
    );
}
    export default NavBar;