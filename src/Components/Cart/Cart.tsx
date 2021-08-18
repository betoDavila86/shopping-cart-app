import { StyledAside } from "./Cart.styles";
import { CartItem } from "..";
// types
import { CartItemType } from "../../App";

type Props = {
    cartItems: CartItemType[];
    onAddToCart: (item: CartItemType) => void;
    onRemoveFromCart: (id: number) => void;
}

const Cart: React.FC<Props> = ({ cartItems, onAddToCart, onRemoveFromCart }) => {
    const calculateTotal = (items: CartItemType[]) => {
        return items.reduce((acc, item) => acc + item.amount * item.price, 0);
    }

    return <StyledAside>
        <h2>Your shopping cart</h2>
        {cartItems.length === 0 ? <p>No items in the cart</p> : null}
        {cartItems.map(item =>
            <CartItem
                key={item.id}
                item={item}
                onAddToCart={onAddToCart}
                onRemoveFromCart={onRemoveFromCart}
            />)}
        <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
    </StyledAside>
}

export default Cart;