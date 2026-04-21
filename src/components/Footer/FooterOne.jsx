import React from 'react'
import { Link } from 'react-router-dom'

function FooterOne() {
    return (
        <footer className="footer-wrapper footer-layout1">
            <div className="widget-area">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-md-6 col-xl-4">
                            <div className="widget footer-widget">
                                <div className="th-widget-about">
                                    <div className="about-logo">
                                        <Link to="/">
                                            <img src="/assets/img/logo.png" alt="Turísticos de la Ribera" style={{ maxHeight: '60px' }} />
                                        </Link>
                                    </div>
                                    <p className="about-text">
                                        Explora los mejores destinos turísticos con el confort y la calidad que mereces. Encuentra promociones exclusivas.
                                    </p>
                                    <div className="th-social">
                                        <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
                                            <i className="fab fa-facebook-f" />
                                        </a>
                                        <a href="https://instagram.com/" target="_blank" rel="noreferrer">
                                            <i className="fab fa-instagram" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-xl-auto">
                            <div className="widget widget_nav_menu footer-widget">
                                <h3 className="widget_title">Enlaces Rápidos</h3>
                                <div className="menu-all-pages-container">
                                    <ul className="menu">
                                        <li>
                                            <Link to="/">Inicio</Link>
                                        </li>
                                        <li>
                                            <Link to="/#service-sec">Paquetes</Link>
                                        </li>
                                        <li>
                                            <Link to="/admin">Acceso Administrativo</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-xl-auto">
                            <div className="widget footer-widget">
                                <h3 className="widget_title">Contacto</h3>
                                <div className="th-widget-contact">
                                    <div className="info-box_text">
                                        <div className="icon">
                                            <img src="/assets/img/icon/envelope.svg" alt="img" />
                                        </div>
                                        <div className="details">
                                            <p>
                                                <a href="mailto:gerenciaventas@turisticosdelaribera.com" className="info-box_link">
                                                    gerenciaventas@turisticosdelaribera.com
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="info-box_text">
                                        <div className="icon">
                                            <img src="/assets/img/icon/location-dot.svg" alt="img" />
                                        </div>
                                        <div className="details">
                                            <p>C. Maquinistas 251, La Paz, 44860 Guadalajara, Jal.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="copyright-wrap background-image"
                style={{ backgroundImage: "url('/assets/img/bg/sintitulo-3.jpg')" }}
            >
                <div className="container">
                    <div className="row justify-content-between align-items-center">
                        <div className="col-md-6">
                            <p className="copyright-text">
                                Copyright © 2026 Turísticos de la Ribera.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default FooterOne
