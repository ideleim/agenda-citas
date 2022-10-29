import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';

const CrearCuentaDoctor = () => {

    const [doctor, setDoctor] = useState({
        nombre: '',
        email: '',
        identificacion: '',
        especialidad: '',
        telefono: '',
        password: '',
        confirmar: ''
    });

    const { nombre, email, identificacion, especialidad, telefono, password, confirmar } = doctor;

    const onChange = (e) => {
        setDoctor({
            ...doctor,
            [e.target.name]: e.target.value
        })
    };

    useEffect(() => {
        document.getElementById('nombre').focus();
    }, [])


    const CrearCuentaDoctor = async () => {
        if (password !== confirmar) {
            const msg = 'Las contraseñas son diferentes';
            swal({
                title: 'Error',
                text: msg,
                icon: 'error',
                buttons: {
                    confirm: {
                        text: 'OK',
                        value: true,
                        visible: true,
                        className: 'btn btn-danger',
                        closeModal: true
                    }
                }
            });
        } else if (password.length < 6) {
            const msg = 'La contraseña debe ser al menos de 6 caracteres.';
            swal({
                title: 'Error',
                text: msg,
                icon: 'error',
                buttons: {
                    confirm: {
                        text: 'OK',
                        value: true,
                        visible: true,
                        className: 'btn btn-danger',
                        closeModal: true
                    }
                }
            });
        } else {
            const data = {
                nombre: doctor.nombre,
                email: doctor.email,
                identificacion: doctor.identificacion,
                especialidad: doctor.especialidad,
                telefono: doctor.telefono,
                password: doctor.password
            }
            const response = await APIInvoke.invokePOST(`/api/doctores`, data);
            const mensaje = response.msg;

            if (mensaje === 'El doctor ya existe') {
                const msg = 'El doctor ya existe';
                swal({
                    title: 'Error',
                    text: msg,
                    icon: 'error',
                    buttons: {
                        confirm: {
                            text: 'OK',
                            value: true,
                            visible: true,
                            className: 'btn btn-danger',
                            closeModal: true
                        }
                    }
                });
            } else {
                const msg = "El doctor fue creado correctamente.";
                swal({
                    title: 'Información',
                    text: msg,
                    icon: 'success',
                    buttons: {
                        confirm: {
                            text: 'Ok',
                            value: true,
                            visible: true,
                            className: 'btn btn-primary',
                            closeModal: true
                        }
                    }
                });

                setDoctor({
                    nombre: '',
                    email: '',
                    identificacion: '',
                    especialidad: '',
                    telefono: '',
                    password: '',
                    confirmar: ''
                })

            }
        }
    }


    const onSubmit = (e) => {
        e.preventDefault();
        CrearCuentaDoctor();
    };


    return (
        <div className="hold-transition login-page">
            <div className="login-box">
                <div className="login-logo">
                    <Link to={'#'}><b>Crear</b> Cuenta de Doctor</Link>
                </div>
                <div className="card">
                    <div className="card-body login-card-body">
                        <p className="login-box-msg">Ingrese los datos del doctor.</p>

                        <form onSubmit={onSubmit}>

                            <div className="input-group mb-3">
                                <input type="text"
                                    className="form-control"
                                    placeholder="Nombre"
                                    id='nombre'
                                    name='nombre'
                                    value={nombre}
                                    onChange={onChange}
                                    required
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-user" />
                                    </div>
                                </div>
                            </div>

                            <div className="input-group mb-3">
                                <input type="email"
                                    className="form-control"
                                    placeholder="Correo"
                                    id='email'
                                    name='email'
                                    value={email}
                                    onChange={onChange}
                                    required
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope" />
                                    </div>
                                </div>
                            </div>

                            <div className="input-group mb-3">
                                <input type="text"
                                    className="form-control"
                                    placeholder="Identificacion"
                                    id='identificacion'
                                    name='identificacion'
                                    value={identificacion}
                                    onChange={onChange}
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-id-card" />
                                    </div>
                                </div>
                            </div>

                            <div className="input-group mb-3">
                                <input type="text"
                                    className="form-control"
                                    placeholder="Especialidad"
                                    id='especialidad'
                                    name='especialidad'
                                    value={especialidad}
                                    onChange={onChange}
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-landmark" />
                                    </div>
                                </div>
                            </div>

                            <div className="input-group mb-3">
                                <input type="text"
                                    className="form-control"
                                    placeholder="Telefono"
                                    id='telefono'
                                    name='telefono'
                                    value={telefono}
                                    onChange={onChange}
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-phone" />
                                    </div>
                                </div>
                            </div>


                            <div className="input-group mb-3">
                                <input type="password"
                                    className="form-control"
                                    placeholder="Contraseña"
                                    id='password'
                                    name='password'
                                    value={password}
                                    onChange={onChange}
                                    required
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>

                            <div className="input-group mb-3">
                                <input type="password"
                                    className="form-control"
                                    placeholder="Confirmar Contraseña"
                                    id='confirmar'
                                    name='confirmar'
                                    value={confirmar}
                                    onChange={onChange}
                                    required
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>

                            <div className="social-auth-links text-center mb-3">
                                <button type='submit' className="btn btn-block btn-primary">
                                    Crear Cuenta Doctor
                                </button>
                                <Link to={'/login-doctor'} className="btn btn-block btn-danger">
                                    Regresar al Login
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CrearCuentaDoctor;