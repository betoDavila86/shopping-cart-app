import { Button } from "@material-ui/core";

//styles
import { Wrapper } from "./Item.styles";

//types
import { CartItemType } from "../../App";

type Props = {
    item: CartItemType;
    onAddToCart: (item: CartItemType) => void;
}

const Item: React.FC<Props> = ({ item, onAddToCart }) => {
    return <Wrapper>
        <img src={item.image} alt={item.title} />
        <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <h3>${item.price}</h3>
        </div>
        <Button onClick={() => onAddToCart(item)}>Add to cart</Button>
    </Wrapper>
}

export default Item;