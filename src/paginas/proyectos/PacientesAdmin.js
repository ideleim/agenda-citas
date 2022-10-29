import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import ContentHeader from '../../componentes/ContentHeader';
import Footer from '../../componentes/Footer';
import Navbar from '../../componentes/Navbar';
import SidebarContainer from '../../componentes/SidebarContainer';
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';


const PacientesAdmin = () => {

    // se va a guardar un arreglo
    const [pacientes, setPacientes] = useState([]); //declarar un estado se declara el estado y se actualiza el estado


    const cargarPacientes = async () => {  //metodo async para llamar un servicio
        const response = await APIInvoke.invokeGET(`/api/pacientes`);  //se coloca lo mismo que en el postman
        console.log(response.pacientes);
        setPacientes(response.pacientes); //modificar el useState, llenar el arreglo
    }

    useEffect(() => {  //usar el metodo
        cargarPacientes();
    }, []);


    const eliminarPacientes = async (e, idPaciente) => { //enviar envento y recibir el id de las citas
        e.preventDefault(); //evite el comportamiento del boton
        const response = await APIInvoke.invokeDELETE(`/api/pacientes/${idPaciente}`);  //se coloca lo mismo que en el postman + idCita

        if (response.msg === 'Paciente borrado') { // respuesta de postman
            const msg = 'El Paciente fue borrado correctamente';
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
            cargarPacientes();
        } else {
            const msg = "El paciente no fue borrado.";
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
                    titulo={'Lista de Pacientes'}
                    breadCrumb1={'inicio'}
                    breadCrumb2={'Pacientes'}
                    ruta1={'/home'}
                />

                <section className="content">
                    <div className='card'>
                        <div className='card-header'>
                            <h3 className='card-title'><Link to={'/pacientes-crear'} className='btn btn-block btn-primary btn-sm'>Ingresar Nuevo Paciente</Link></h3>
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
                                        <th style={{ width: '20%' }}>Nombre</th>
                                        <th style={{ width: '5%' }}>Email</th>
                                        <th style={{ width: '5%' }}>Sexo</th>
                                        <th style={{ width: '5%' }}>Identificacion</th>
                                        <th style={{ width: '5%' }}>Telefono</th>
                                        <th style={{ width: '45%' }}>Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        pacientes.map( //recorrer un arreglo
                                            item => //el arreglo esta en el useState, identificador unico en jsx
                                                <tr key={item._id}>
                                                    <td>{item._id}</td>
                                                    <td>{item.nombre}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.sexo}</td>
                                                    <td>{item.identificacion}</td>
                                                    <td>{item.telefono}</td>
                                                    <td>
                                                        <Link to={`/citas-admin/${item._id}*${item.nombre}`} className='btn btn-sm btn-info'>Citas</Link>&nbsp;&nbsp;
                                                        <Link to={`/pacientes-editar/${item._id}*${item.nombre}*${item.email}*${item.sexo}*${item.identificacion}*${item.telefono}`} className='btn btn-sm btn-primary'>Editar</Link>&nbsp;&nbsp;
                                                        <button onClick={(e) => eliminarPacientes(e, item._id)} className='btn btn-sm btn-danger'>Borrar</button>
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

export default PacientesAdmin;