const Reducer=(cart=[], action)=>{
    switch(action.type){
    case'ADD':
        let addToCart=cart.filter((element)=>(element.foodId===action.payload.foodId || element.restaurant.restId!==action.payload.restaurant.restId))
        if(addToCart<1){
            return [...cart,action.payload]
        }else{
            return cart;
        }
    break;

    case 'REMOVE':
        return cart.filter((element)=>element.foodId!==action.payload.foodId);
    break;

    case 'INCREASE':
        let increaseCart=cart.map((element)=>{
            if(element.foodId===action.payload.foodId){
                return {...element,quantity:element.quantity+1}
            }
            return element;
        })
        return increaseCart;
    break;

    case 'DECREASE':
        let decreaseCart=cart.map((element)=>{
            if(element.foodId===action.payload.foodId){
                return {...element,quantity:element.quantity-1}
            }
            return element;
        })
        return decreaseCart;
    break;

    case 'EMPTY':
        return cart=[];
    break;
    default:
        return cart;
}
    
}

  
export default Reducer;