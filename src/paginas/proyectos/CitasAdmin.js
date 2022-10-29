import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import ContentHeader from '../../componentes/ContentHeader';
import Footer from '../../componentes/Footer';
import Navbar from '../../componentes/Navbar';
import SidebarContainer from '../../componentes/SidebarContainer';
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';

const CitasAdmin = () => {

    const [citas, setCitas] = useState([]); //declarar un estado se declara el estado y se actualiza el estado

    const { idpaciente } = useParams(); //capturar el id del paciente

    let arreglo = idpaciente.split('*');
    const idPaciente = arreglo[0];
    const nombrePaciente = arreglo[1];
    const tituloPagina = `Listado de Citas: ${nombrePaciente}`;



    const cargarCitas = async () => {  //metodo async para llamar un servicio
        const response = await APIInvoke.invokeGET(`/api/citas?paciente=${idPaciente}`);  //se coloca lo mismo que en el postman
        // console.log(response.citas);
        setCitas(response.citas); //modificar el useState, llenar el arreglo
    }

    useEffect(() => {  //usar el metodo
        cargarCitas();
    }, []);


    const eliminarCita = async (e, idCita, idPaciente) => {
        e.preventDefault(); //evite el comportamiento del boton
        const response = await APIInvoke.invokeDELETE(`/api/citas/${idCita}?paciente=${idPaciente}`);


        if (response.msg === 'Cita eliminada') { // respuesta de postman
            const msg = 'La cita fue borrada correctamente';
            swal({
                title: 'Información',
                text: msg,
                icon: 'success',
                buttons: {
                    confirm: {
                        text: 'OK',
                        value: true,
                        visible: true,
                        className: 'btn btn-primary',
                        closeModal: true
                    }
                }
            });
            cargarCitas();
        } else {
            const msg = "La cita no fue borrada correctamente.";
            swal({
                title: 'Error',
                text: msg,
                icon: 'error',
                buttons: {
                    confirm: {
                        text: 'Ok',
                        value: true,
                        visible: true,
                        className: 'btn btn-danger',
                        closeModal: true
                    }
                }
            });
        }
    }

    return (
        <div className="wrapper">
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>
            <div className="content-wrapper">

                <ContentHeader
                    titulo={tituloPagina}
                    breadCrumb1={'Listado de Pacientes'}
                    breadCrumb2={'Citas'}
                    ruta1={'/pacientes-admin'}
                />

                <section className="content">
                    <div className='card'>
                        <div className='card-header'>
                            <h3 className='card-title'><Link to={`/citas-crear/${idpaciente}`} className='btn btn-block btn-primary btn-sm'>Crear Cita</Link></h3>
                            <div className='card-tools'>
                                <button type='button' className='btn btn-tool' data-card-widget='collapse' title='Collapse'>
                                    <i className='fas fa-minus' />
                                </button>
                                <button type='button' className='btn btn-tool' data-card-widget='remove' title='Remove'>
                                    <i className='fas fa-times' />
                                </button>
                            </div>
                        </div>
                        <div className='card-body'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th style={{ width: '5%' }}>Id</th>
                                        <th style={{ width: '35%' }}>Fecha</th>
                                        <th style={{ width: '30%' }}>Hora</th>
                                        <th style={{ width: '30%' }}>Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        citas.map( //recorrer un arreglo
                                            item => //el arreglo esta en el useState, identificador unico en jsx
                                                <tr key={item._id}>
                                                    <td>{item._id}</td>
                                                    <td>{item.fecha}</td>
                                                    <td>{item.hora}</td>
                                                    <td>
                                                        <Link to={`/citas-editar/${item._id}*${item.fecha}*${item.hora}*${item.paciente}*${nombrePaciente}`} className='btn btn-sm btn-primary'>Editar</Link>&nbsp;&nbsp;
                                                        <button onClick={(e) => eliminarCita(e, item._id, item.paciente)} className='btn btn-sm btn-danger'>Borrar</button>
                                                    </td>
                                                </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default CitasAdmin;