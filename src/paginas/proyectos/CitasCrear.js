import React, { useState, useEffect } from 'react'
import ContentHeader from '../../componentes/ContentHeader';
import Footer from '../../componentes/Footer';
import Navbar from '../../componentes/Navbar';
import SidebarContainer from '../../componentes/SidebarContainer';
import { useNavigate, useParams } from 'react-router-dom';
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';

const CitasCrear = () => {

    const navigate = useNavigate();


    const [citas, setCitas] = useState({
        fecha: '',
        hora: ''
    });

    const { fecha, hora } = citas;

    const { idpaciente } = useParams(); //capturar el id del paciente
    let arreglo = idpaciente.split('*');
    const nombrePaciente = arreglo[1];
    const tituloPagina = `Creación de  Citas: ${nombrePaciente}`;

    useEffect(() => {
        document.getElementById('fecha').focus();
    }, [])

    const onChange = (e) => {
        setCitas({
            ...citas,
            [e.target.name]: e.target.value
        })
    }

    const crearCita = async () => {
        let arreglo = idpaciente.split('*');
        const idPaciente = arreglo[0];

        const data = {
            paciente: idPaciente,
            fecha: citas.fecha,
            hora: citas.hora
        }

        const response = await APIInvoke.invokePOST(`/api/citas`, data)
        const idCita = response.cita._id;

        if (idCita === '') {
            const msg = "La cita no fue creada correctamente.";
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
            navigate(`/citas-admin/${idpaciente}`);
            const msg = 'La cita fue creada correctamente';
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
        crearCita();
    }


    return (
        <div className="wrapper">
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>
            <div className="content-wrapper">

                <ContentHeader
                    titulo={tituloPagina}
                    breadCrumb1={'Listado de Citas'}
                    breadCrumb2={'Creación'}
                    ruta1={`/citas-admin/${idpaciente}`}
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
                                    <button type="submit" className="btn btn-primary">Ingresar Cita</button>
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

export default CitasCrear;