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
    </StyledAside>
}

export default Cart;