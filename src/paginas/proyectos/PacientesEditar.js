import React, { useState, useEffect } from 'react'
import ContentHeader from '../../componentes/ContentHeader';
import Footer from '../../componentes/Footer';
import Navbar from '../../componentes/Navbar';
import SidebarContainer from '../../componentes/SidebarContainer';
import { useNavigate, useParams } from 'react-router-dom';
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';



const PacientesEditar = () => {

    const navigate = useNavigate();

    const { idpaciente } = useParams(); //capturar el id del paciente

    let arreglo = idpaciente.split('*');
    const nombrePaciente = arreglo[1];
    const emailPaciente = arreglo[2];
    const sexoPaciente = arreglo[3];
    const identificacionPaciente = arreglo[4];
    const telefonoPaciente = arreglo[5];

    const [paciente, setPaciente] = useState({
        nombre: nombrePaciente,
        email: emailPaciente,
        sexo: sexoPaciente,
        identificacion: identificacionPaciente,
        telefono: telefonoPaciente
    });

    const { nombre, email, sexo, identificacion, telefono } = paciente;

    useEffect(() => {
        document.getElementById('nombre').focus();
    }, [])

    const onChange = (e) => {
        setPaciente({
            ...paciente,
            [e.target.name]: e.target.value
        })
    }


    const editarPaciente = async () => {
        let arreglo = idpaciente.split('*');
        const idPaciente = arreglo[0];

        const data = {
            nombre: paciente.nombre,
            email: paciente.email,
            sexo: paciente.sexo,
            identificacion: paciente.identificacion,
            telefono: paciente.telefono
        }

        const response = await APIInvoke.invokePUT(`/api/pacientes/${idPaciente}`, data);

        const idPacienteEditado = response.paciente._id;

        if(idPacienteEditado !== idPaciente){
            const msg = "El paciente no fue editado correctamente.";
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
        }else{
            navigate('/pacientes-admin');
            const msg = 'El Paciente fue editado correctamente';
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
        }


    }


    const onSubmit = (e) => {
        e.preventDefault();
        editarPaciente();
    }

    return (
        <div className="wrapper">
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>
            <div className="content-wrapper">

                <ContentHeader
                    titulo={'Editar un Nuevo Paciente'}
                    breadCrumb1={'Listado de Pacientes'}
                    breadCrumb2={'Edición'}
                    ruta1={'/pacientes-admin'}
                />

                <section className="content">
                    <div className='card'>
                        <div className='card-header'>
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
                            <form onSubmit={onSubmit}>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="nombre">Nombre</label>
                                        <input type="text"
                                            className="form-control"
                                            id="nombre"
                                            name='nombre'
                                            placeholder="Ingrese el nombre del paciente"
                                            value={nombre}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="email"
                                            className="form-control"
                                            id="email"
                                            name='email'
                                            placeholder="Ingrese el correo del paciente"
                                            value={email}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="sexo">Sexo</label>
                                        <input type="text"
                                            className="form-control"
                                            id="sexo"
                                            name='sexo'
                                            placeholder="Ingrese el sexo del paciente"
                                            value={sexo}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="identificacion">Identificacion</label>
                                        <input type="text"
                                            className="form-control"
                                            id="identificacion"
                                            name='identificacion'
                                            placeholder="Ingrese el numero de identificacion del paciente"
                                            value={identificacion}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="telefono">Telefono</label>
                                        <input type="text"
                                            className="form-control"
                                            id="telefono"
                                            name='telefono'
                                            placeholder="Ingrese el numero de telefono del paciente"
                                            value={telefono}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>


                                </div>
                                <div className="card-footer">
                                    <button type="submit" className="btn btn-primary">Editar Paciente</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </section>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default PacientesEditar;