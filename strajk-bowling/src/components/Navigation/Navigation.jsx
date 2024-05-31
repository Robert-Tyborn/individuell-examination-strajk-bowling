import './Navigation.scss';
import navicon from '../../assets/navicon.svg';
import { useState } from 'react';

function Navigation({ setConfirmation }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className={`navigation ${showMenu ? 'show-menu' : ''}`}>
      <img data-testid="burger"
        src={navicon}
        className='navigation__icon'
        onClick={() => {
          setShowMenu(!showMenu);
        }}
      />
      <a data-testid="goback"
        href='#'
        className={`navigation__link ${showMenu ? '' : 'hide'}`}
        onClick={() => {
          setShowMenu(!showMenu);
          setConfirmation({});
        }}
      >
        Booking
      </a>
    </nav>
  );
}

export default Navigation;
