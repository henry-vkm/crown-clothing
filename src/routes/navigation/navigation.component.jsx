import { Fragment, useContext } from 'react';
// import { UserContext } from '../../contexts/user.context';
import { useSelector } from 'react-redux';
import { userSelector } from '../../store/user/user.selector';
import { Link, Outlet } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'; 
import { signOutUser } from '../../utils/firebase/firebase.utils';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import './navigation.styles.scss';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { CartContext } from '../../contexts/cart.context';

const Navigation = () => {
  const currentUser = useSelector(userSelector);
  const { isCartOpen } = useContext(CartContext);

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to='/'>
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className='nav-link' to='/'>
            HOME
          </Link>
          <Link className='nav-link' to='/shop'>
            SHOP
          </Link>
          {
            currentUser ?
            (
              <span className='nav-link' onClick={signOutUser}>SIGN OUT</span>
            ) :
            (
              <Link className='nav-link' to='/auth'>SIGN IN</Link>
            )
          }
          <CartIcon />
        </div>
        {
          isCartOpen && <CartDropdown />
        }
      </div>
      <Outlet />
    </Fragment>
  )
}

export default Navigation;