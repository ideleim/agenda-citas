import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './paginas/auth/Login';
import LoginDoctor from './paginas/auth/LoginDoctor';
import CrearCuentaDoctor from './paginas/auth/CrearCuentaDoctor';
import Home from './paginas/Home';
import PacientesAdmin from './paginas/proyectos/PacientesAdmin';
import PacientesCrear from './paginas/proyectos/PacientesCrear';
import PacientesEditar from './paginas/proyectos/PacientesEditar';
import CitasAdmin from './paginas/proyectos/CitasAdmin';
import CitasCrear from './paginas/proyectos/CitasCrear';
import CitasEditar from './paginas/proyectos/CitasEditar';




function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path='/' exact element={<Login />} />
          <Route path='/login-doctor' exact element={<LoginDoctor />} />
          <Route path='/crear-cuenta-doctor' exact element={<CrearCuentaDoctor />} />
          <Route path='/home' exact element={<Home />} />
          <Route path='/pacientes-admin' exact element={<PacientesAdmin />} />
          <Route path='/pacientes-crear' exact element={<PacientesCrear />} />
          <Route path='/pacientes-editar/:idpaciente' exact element={<PacientesEditar />} />
          <Route path='/citas-admin/:idpaciente' exact element={<CitasAdmin />} />
          <Route path='/citas-crear/:idpaciente' exact element={<CitasCrear />} />
          <Route path='/citas-editar/:idpaciente' exact element={<CitasEditar />} />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
