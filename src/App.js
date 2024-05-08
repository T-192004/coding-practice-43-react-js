import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {cartList} = this.state
    const cartItemPresent = cartList.filter(
      cartItem => cartItem.id === product.id,
    )
    console.log(cartItemPresent)
    console.log('PRODUCT')
    console.log(product)
    if (cartItemPresent.length > 0) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (cartItemPresent[0].id === eachCartItem.id) {
            const updatedQuantity = eachCartItem.quantity + product.quantity
            return {...eachCartItem, quantity: updatedQuantity}
          }
          return eachCartItem
        }),
      }))
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
      //   TODO: Update the code here to implement addCartItem
    }
  }

  incrementCartItemQuantity = product => {
    const {cartList} = this.state
    const filteredCartList = cartList.filter(each => product.id !== each.id)
    const productItem = {...product, quantity: product.quantity + 1}
    this.setState({
      cartList: [...filteredCartList, productItem],
    })
  }

  decrementCartItemQuantity = product => {
    const {cartList} = this.state
    const filteredCartList = cartList.filter(each => product.id !== each.id)
    if (product.quantity === 1) {
      this.setState({cartList: filteredCartList})
    } else {
      const productItem = {...product, quantity: product.quantity - 1}
      this.setState({
        cartList: [...filteredCartList, productItem],
      })
    }
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filteredCartList = cartList.filter(each => each.id !== id)
    this.setState({cartList: filteredCartList})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          removeCartItem: this.removeCartItem,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
