//PENULISAN REDUCER
import { GET_LIST_CAR } from "../../actions/carAction";


const initialState = {
    getListCarResult : false,
    getListCarLoading : false,
    getListCarError : false,
}

const car = (state = initialState, action) =>{
    switch (action.type) {
        case GET_LIST_CAR:
            return{
                ...state,
                getListCarResult: action.payload.data,
                getListCarLoading: action.payload.loading,
                getListCarError: action.payload.errorMessage
            }
        default:
            return state;
    }
}

export default car