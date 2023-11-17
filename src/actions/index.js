export const AddToCart = (payload) => {
    return {
        type: "ADD_TO_CART",
        payload: payload
    }
}
export const removerToCart = (payload) => {
    return {
        type: "REMOVE_TO_CART",
        payload: payload
    }
}
export const decrease = (payload) => {
    return {
        type: "DECREASE",
        payload: payload
    }
}
export const increase = (payload) => {
    return {
        type: "INCREASE",
        payload: payload
    }
}
export const empty = (payload) => {
    return {
        type: "EMPTY",
        payload: payload
    }
}