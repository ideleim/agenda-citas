import React, { useState, useEffect } from 'react'
import ContentHeader from '../../componentes/ContentHeader';
import Footer from '../../componentes/Footer';
import Navbar from '../../componentes/Navbar';
import SidebarContainer from '../../componentes/SidebarContainer';
import { useNavigate, useParams } from 'react-router-dom';
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';

const CitasEditar = () => {

    const navigate = useNavigate();

    const { idpaciente } = useParams(); //capturar el id del paciente
    let arreglo = idpaciente.split('*');
    // const idCita = arreglo[0];
    const fechaCita = arreglo[1];
    const horaCita = arreglo[2];
    // const idPaciente = arreglo[3];
    const nombrePaciente = arreglo[4];
    const tituloPagina = `Edición de  Citas: ${nombrePaciente}`;

    const [citas, setCitas] = useState({
        fecha: fechaCita,
        hora: horaCita
    });

    const { fecha, hora } = citas;



    useEffect(() => {
        document.getElementById('fecha').focus();
    }, [])

    const onChange = (e) => {
        setCitas({
            ...citas,
            [e.target.name]: e.target.value
        })
    }

    const editarCita = async () => {
        let arreglo = idpaciente.split('*');
        const idCita = arreglo[0];
        // const fechaCita = arreglo[1];
        // const horaCita = arreglo[2];
        const idPaciente = arreglo[3];
        const nombrePaciente = arreglo[4];

        const data = {
            paciente: idPaciente,
            fecha: citas.fecha,
            hora: citas.hora
        }

        const response = await APIInvoke.invokePUT(`/api/citas/${idCita}`, data)
        const idCitaEditada = response.cita._id;

        if (idCitaEditada !== idCita) {
            const msg = "La cita no fue editada correctamente.";
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
        } else {
            navigate(`/citas-admin/${idPaciente}*${nombrePaciente}`);
            const msg = 'La cita fue editada correctamente';
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
        editarCita();
    }



    return (
        <div className="wrapper">
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>
            <div className="content-wrapper">

                <ContentHeader
                    titulo={tituloPagina}
                    breadCrumb1={'Listado de Citas'}
                    breadCrumb2={'Edición'}
                    ruta1={`/citas-admin/${idpaciente}*${nombrePaciente}`}
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
                                        <label htmlFor="fecha">Fecha</label>
                                        <input type="text"
                                            className="form-control"
                                            id="fecha"
                                            name='fecha'
                                            placeholder="Ingrese la fecha de la cita"
                                            value={fecha}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="hora">Hora</label>
                                        <input type="text"
                                            className="form-control"
                                            id="hora"
                                            name='hora'
                                            placeholder="Ingrese la hora de  la cita"
                                            value={hora}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>

                                </div>
                                <div className="card-footer">
                                    <button type="submit" className="btn btn-primary">Editar Cita</button>
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

export default CitasEditar;