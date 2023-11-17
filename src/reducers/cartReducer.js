let initialState = {
  prd: [],
  total: 0,
}

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      let quantity = 1;
      let data = action.payload;

      data.quantity = quantity;
      data.total = data.price;

      return { ...state, prd: [...state.prd, data], total: state.total + data.total }
    }

    case "REMOVE_TO_CART": {
      let f_rr = state.prd.filter(product => product._id !== action.payload)
      return {
        ...state,
        prd: f_rr,
      }
    }

    case "DECREASE": {
      let update = state.prd.map(item => {
        if (item._id === action.payload && item.quantity > 1) {
          item.quantity--;
          item.total = item.price * item.quantity
        }
        return item;
      });

      let p_total = update.reduce((acc, item) => acc + item.total, 0)

      return { ...state, prd: update, total: p_total };

    }
    
    case "INCREASE": {
      let update = state.prd.map(item => {

        if (item._id === action.payload) {
          item.quantity++;
          item.total = item.price * item.quantity
        }
        return item;
      });

      let p_total = update.reduce((acc, item) => acc + item.total, 0)
      return { ...state, prd: update, total: p_total };
    }

    case "EMPTY": {
      return { ...state, prd: [] };
    }
    default: return state
  }
}
export default cartReducer;

