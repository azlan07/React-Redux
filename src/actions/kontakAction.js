import axios from 'axios';

export const GET_LIST_KONTAK = "GET_LIST_KONTAK";

export const getListKontak = () =>{
    console.log("2.Masuk Actions");
    return(dispatch) => {
        //laoding
        dispatch({
            type: GET_LIST_KONTAK,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })

        //get API
        axios({
            method:'GET',
            url :'https://raw.githubusercontent.com/fnurhidayat/probable-garbanzo/main/data/cars.min.json',
            timeout : 120000
        }).then((response) =>{
            //Berhasil get APi
            console.log("3.Berhasil", response);
            dispatch({
                type: GET_LIST_KONTAK,
                payload: {
                    loading: false,
                    data: response.data,
                    errorMessage: false
                }
            })
        }).catch((error)=>{
            //gagal get APi
            console.log("3.Gagal : ", error);
            dispatch({
                type: GET_LIST_KONTAK,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: error.message
                }
            })
        })
    }
}