import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getListKontak } from "../../actions/kontakAction"
import kontak from "../../reducers/kontak"
import Dashboard from "../Dashboard"

const ListKontak = () =>{
    const {getListKontakResult,getListKontakLoading,getListKontakError} = useSelector((state) => state.KontakReducer)

    const dispatch = useDispatch()

 
    useEffect(() =>{
        //panggil action getListKontak
        console.log("1. use effect component did mount");
        dispatch(getListKontak())

    },[dispatch])

    return(
        <>
        <Dashboard/>
            <div style={{ padding:'50px' }}>
                <h2>List Cars</h2>
                <hr/>
                {getListKontakResult ? (
                    getListKontakResult.map((data)=>{
                        return(
                            <div className="container">
                                <table className="table table-hover">
                                <tbody>
                                    
                                    <tr key={data.id}>
                                        <td>Plat Nomor : {data.plate}</td>
                                        <td>Merek : {data.manufacture}</td>
                                        <td>Rental Perhari : {data.rentPerDay}</td>
                                        <td>Kapasitas : {data.capacity}</td>
                                    </tr>
                                </tbody>
                                    {/* <p key={data.id}>Plat Nomor = {data.plate} {data.manufacture} || Rental Per Hari = {data.rentPerDay}</p> */}
                                </table>

                            </div>
                        )
                    })
                ) : getListKontakLoading ? (
                    <p>Loading</p>
                ) : (
                    <p>{getListKontakError ? getListKontakError : "Data Kosong"}</p>
                )}
            
            </div>
        </>
    )
}

export default ListKontak