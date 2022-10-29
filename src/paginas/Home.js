import React from 'react'
import ContentHeader from '../componentes/ContentHeader';
import Footer from '../componentes/Footer';
import Navbar from '../componentes/Navbar';
import SidebarContainer from '../componentes/SidebarContainer';
import {Link} from 'react-router-dom';

const Home = () => {
    return (
        <div className="wrapper">
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>
            <div className="content-wrapper">

                <ContentHeader
                    titulo={'Agenda de Citas Medicas'}
                    breadCrumb1={'inicio'}
                    breadCrumb2={'Pacientes'}
                    ruta1={'/home'}
                />

                <section className="content">
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className='col-lg-3 col-6'>
                                <div className='small-box bg-info'>
                                    <div className='inner'>
                                        <h3>Pacientes</h3>
                                        <p>&nbsp;</p>
                                    </div>
                                    <div className='icon'>
                                        <i className='fa fa-edit' />
                                    </div>
                                    <Link to={'/pacientes-admin'} className='small-box-footer'>Ver Pacientes <i className='fas fa-arrow-circle-right' /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default Home;