import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getListCar } from "../../actions/carAction"
import Navbar from "../navbar"

const ListCar = () =>{
    const {getListCarResult,getListCarLoading,getListCarError} = useSelector((state) => state.CarReducer)

    const dispatch = useDispatch()

 
    useEffect(() =>{
        //panggil action getListCar
        console.log("1. use effect component did mount");
        dispatch(getListCar())

    },[dispatch])

    return(
        <>
        <Navbar/>
            <div style={{ padding:'50px' }}>
                <h2>List Cars</h2>
                <hr/>
                {getListCarResult ? (
                    getListCarResult.map((data)=>{
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
                ) : getListCarLoading ? (
                    <p>Loading</p>
                ) : (
                    <p>{getListCarError ? getListCarError : "Data Kosong"}</p>
                )}
            
            </div>
        </>
    )
}

export default ListCar