const NavBar = ({ togglePopup }) => {
  
    return (
      <div className='flex justify-between items-center w-full h-20 px-4 text-green-400 bg-black fixed'>
        <h1>HollyWordle</h1>
        <button
          onClick={togglePopup}
          className='cursor-pointer pr-5 z-10 md:hidden'
        >
          Show Popup
        </button>
      </div>
    );
}
    export default NavBar;