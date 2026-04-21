import React from 'react'
import { Link } from 'react-router-dom'

function AboutOne() {
    return (
        <div
            className="about-area position-relative overflow-hidden space"
            id="about-sec"
        >
            <div className="container shape-mockup-wrap">
                <div className="row align-items-center">
                    <div className="col-xl-6">
                        <div className="img-box1">
                            <div className="img1">
                                <img src="/assets/img/normal/foto.png" alt="About" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                            </div>
                            <div className="img2" style={{ display: 'none' }}>
                                <img src="/assets/img/normal/foto2.png" alt="About" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                            </div>
                            <div className="img3" style={{ display: 'none' }}>
                                <img src="/assets/img/normal/foto3.png" alt="About" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <div className="ps-xl-4 ms-xl-2">
                            <div className="title-area mb-20 pe-xl-5 me-xl-5">
                                <span className="sub-title style1 " style={{color: "var(--theme-color2)", fontWeight:"bold"}}>Viaja sin límites</span>
                                <h2 className="sec-title mb-20 pe-xl-5 me-xl-5 heading">
                                    Por qué viajar con nosotros?
                                </h2>
                                <p className="sec-text mb-30" style={{color:"#444"}}>
                                    Diseñamos experiencias de viajes nacionales e internacionales para que descubras nuevos destinos sin complicaciones. Nos encargamos de cada detalle para que tú solo disfrutes el camino.
                                </p>
                            </div>
                            <div className="about-item-wrap">
                                <div className="about-item">
                                    <div className="about-item_img" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                                        <img src="/assets/img/icon/map3.svg" alt="" style={{ width: '50%', height: '50%', objectFit: 'contain' }} />
                                    </div>
                                    <div className="about-item_centent">
                                        <h5 className="box-title" style={{color: "var(--theme-color2)"}}>Viajes a tu medida</h5>
                                        <p className="about-item_text">
                                            Itinerarios personalizados adaptados a tu estilo, presupuesto y destino final.
                                        </p>
                                    </div>
                                </div>
                                <div className="about-item">
                                    <div className="about-item_img" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                                        <img src="/assets/img/icon/guide.svg" alt="" style={{ width: '50%', height: '50%', objectFit: 'contain' }} />
                                    </div>
                                    <div className="about-item_centent">
                                        <h5 className="box-title" style={{color: "var(--theme-color2)"}}>Asesoría profesional</h5>
                                        <p className="about-item_text">
                                            Te acompañamos en todo el proceso con recomendaciones expertas y atención personalizada.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-35">
                                <a href="#service-sec" className="th-btn style3 th-icon" style={{backgroundColor:"var(--theme-color2)", color:"white"}}>
                                    Explorar destinos
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="shape-mockup shape1 d-none d-xl-block"
                    style={{
                        top: "12%",
                        left: "-16%",
                    }}
                >
                    <img src="/assets/img/shape/shape_1.png" alt="shape" />
                </div>
                <div
                    className="shape-mockup shape2 d-none d-xl-block"
                    style={{
                        top: "20%",
                        left: "-16%",
                    }}
                >
                    <img src="/assets/img/shape/shape_2.png" alt="shape" />
                </div>
                <div
                    className="shape-mockup shape3 d-none d-xl-block"
                    style={{
                        top: "14%",
                        left: "-10%",
                    }}
                >
                    <img src="/assets/img/shape/shape_3.png" alt="shape" />
                </div>

                <div
                    className="shape-mockup about-rating d-none d-xxl-block"
                    style={{
                        bottom: "50%",
                        right: "-20%",
                    }}
                >
                    <i className="fa-sharp fa-solid fa-star" />
                    <span>4.9k</span>
                </div>
                <div
                    className="shape-mockup about-emoji d-none d-xxl-block"
                    style={{
                        bottom: "25%",
                        right: "5%",
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center'
                    }}
                >
                    <img src="/assets/img/icon/emoji.png" alt="" style={{ maxWidth: '60%', maxHeight: '60%', objectFit: 'contain', margin: 'auto' }} />
                </div>
            </div>
        </div>

    )
}

export default AboutOne
