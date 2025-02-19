import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {fetchData, fetchDataDepend, fetchDelete, fetchList} from "../../Libs/Fetch";
import { FaEye, FaTrash } from 'react-icons/fa';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search }  from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import ModalAgregar from "./modalInstituciones";
import ModalActualizar from "./ModalActualizar";

const listar =() =>
{


    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [rows, setRows] = useState([]); //Guarda la lista de instituciones
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [estado, setEstado] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [currentPage, SetcurrentPage] =  useState(1);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [todosPerPage, SettodosPerPage] =  useState(1);
    const { SearchBar, ClearSearchButton } = Search;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [row1,setRow] =useState({});





    // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => fetchList("institucion", setRows), [estado]);




    const deleteIntituciones = (id) => {

        fetchDelete('institucion', setEstado, {}, {id})

    }

    const rowActual =(row) =>{
        setRow(row);


    }

    function iconAcion(cell, row, rowIndex, formatExtraData)
    {


        return (

                <div className='row justify-content-center row-cols-2 row-cols-lg-5 g-2 g-lg-3'>
                    <div className="col ">
                        <ModalActualizar row ={row} setEstado={setEstado} />
                    </div>
                    <div className="col "> <button onClick= {()=>deleteIntituciones(row.id)}  className='btn btn-danger'><FaTrash /></button></div>
                </div>
        );
    }



    const columns = [
       {
        dataField: 'id',
        text: ' #'
    }, {
        dataField: 'nombre',
        text: 'nombre'
    }, {
        dataField: 'Aciones',
        text: 'Aciones',
        formatter: iconAcion

    }];

    const status = parseInt(sessionStorage.getItem('status'))


    if(status === '403' )
    {
        return(
            <div>
                Usted no posee permiso para esta pagina
            </div>
        )
    }
    else {
        return (
            <div className='container'>

                <ToolkitProvider keyField="id" data={ rows } columns={ columns } search >
                    {
                        props => (
                            <div className='container'>
                                <h6>Ingrese la Institucion :</h6>
                                <div className="row ">
                                    <div className="col">
                                        <SearchBar
                                            placeholder = 'Buscar'
                                            srText =''
                                            { ...props.searchProps }
                                        />
                                    </div>
                                    <div className="col ">
                                        <ClearSearchButton { ...props.searchProps  } className='btn btn-secondary  ' />
                                    </div>
                                    <div className="col">

                                        <ModalAgregar setEstado={setEstado}/>
                                    </div>

                                </div>


                                <hr />
                                <BootstrapTable
                                    { ...props.baseProps }
                                    headerWrapperClasses="table-light "
                                    keyField='id'
                                    data={ rows }
                                    columns={ columns }
                                    hover
                                    noDataIndication=" No hay Datos "
                                    insertRow={true}
                                    deleteRow={true}
                                    pagination={ paginationFactory() }

                                />

                            </div>
                        )
                    }
                </ToolkitProvider>



            </div>

        )
    }


}

export default listar;


