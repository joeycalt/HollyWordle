import React, { useState, useEffect } from 'react';

const PopUp = ({ closePopup }) => {
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    // You can use local storage to persist the state across page reloads
    const hasVisitedBefore = localStorage.getItem('visitedBefore');
    
    if (hasVisitedBefore) {
      setShowPopup(false);
    } else {
      localStorage.setItem('visitedBefore', 'true');
    }
  }, []);


  return (
    <div className={`popup ${showPopup ? 'active' : ''}`}>
      <div className="popup-content">
        <p>To win this game you must guess a celbrity last  name that consists of 6 letters in 6 guesses or less.
            <p>Green = correct letter and spot</p>
            <p>Blue = correct letter, wrong spot</p>
            <p>Black = Wrong letter</p>
        </p>
        <button onClick={closePopup}>Close</button>
      </div>
    </div>
  );
};

export default PopUp;
