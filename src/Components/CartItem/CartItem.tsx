import { Button } from "@material-ui/core";
// styles
import { Wrapper } from "./CartItem.styles";
// types
import { CartItemType } from "../../App";

type Props = {
    item: CartItemType;
    onAddToCart: (item: CartItemType) => void;
    onRemoveFromCart: (id: number) => void;
}

const CartItem: React.FC<Props> = ({ item, onAddToCart, onRemoveFromCart }) => {
    return <Wrapper>
        <div>
            <h3>{item.title}</h3>
            <div className="info">
                <p>Price: ${item.price}</p>
                <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
            </div>
            <div className="buttons">
                <Button
                    size="small"
                    disableElevation
                    variant="contained"
                    onClick={() => onRemoveFromCart(item.id)}
                >-</Button>
                <p>{item.amount}</p>
                <Button
                    size="small"
                    disableElevation
                    variant="contained"
                    onClick={() => onAddToCart(item)}
                >+</Button>
            </div>
        </div>
        <img src={item.image} alt={item.title} />
    </Wrapper>
}

export default CartItem;