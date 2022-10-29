import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {

    return (
        <div className="hold-transition login-page">
            <div className="login-box">
                <div className="login-logo">
                    <Link to={'#'}><b>Bienvenido Doctor </b> </Link>
                </div>
                <div className="card">
                    <div className="card-body login-card-body">
                        <p className="login-box-msg">Selecciona para continuar.</p>
                        <Link to={'/login-doctor'} className="btn btn-block btn-info">
                            Ingresar
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;


