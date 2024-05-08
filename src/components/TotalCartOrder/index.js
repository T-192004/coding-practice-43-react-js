import CartContext from '../../context/CartContext'
import './index.css'

const TotalCartOrder = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let total = 0
      cartList.forEach(item => (total += item.price * item.quantity))
      return (
        <div className="cart-summary-container">
          <h1 className="cart-summary-heading">
            Order Total: <span className="cart-summary-total">{total}</span>
          </h1>
          <p className="cart-summary-desc">{cartList.length} items in cart</p>
          <button className="checkout-btn">Checkout</button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default TotalCartOrder
