import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../contexts/cart.context';
import Button from '../button/button.component';
import { 
  CartDropdownContainer, 
  CartItems, 
  EmptyMessage } from './cart-dropdown.styles';
import CartItem from '../cart-item/cart-item.component';

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);

  const navigate = useNavigate();

  const toCheckoutPageHandler = () => navigate('/checkout');

  return (
    <CartDropdownContainer>
      <CartItems>
        {
          cartItems.length ? (
            cartItems.map(cartItem => {
              return (
                <CartItem key={cartItem.id} cartItem={cartItem} />
              )
            })
          ) : (
            <EmptyMessage>Your cart is empty.</EmptyMessage>
          )
          
        }
      </CartItems>
      <Button onClick={toCheckoutPageHandler}>Go to Checkout</Button>
    </CartDropdownContainer>
  )
}

export default CartDropdown;