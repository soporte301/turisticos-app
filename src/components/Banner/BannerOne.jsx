import React, { useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; 
import { Pagination, EffectFade, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

function BannerOne() {
    const swiperRef = useRef(null);

    useEffect(() => {
        const animationProperties = () => {
            document.querySelectorAll('[data-ani]').forEach((element) => {
                const animationName = element.getAttribute('data-ani');
                element.classList.add(animationName);
            });

            document.querySelectorAll('[data-ani-delay]').forEach((element) => {
                const delayTime = element.getAttribute('data-ani-delay');
                element.style.animationDelay = delayTime;
            });
        };

        animationProperties();
    }, []);

    const handleSliderNavigation = (direction) => {
        if (swiperRef.current && swiperRef.current.swiper) {
            const swiper = swiperRef.current.swiper;
            if (direction === "prev") {
                swiper.slidePrev();
            } else {
                swiper.slideNext();
            }
        }
    };

    return (
        <div className="th-hero-wrapper hero-1" id="hero">
            <Swiper
                modules={[Navigation, Pagination, EffectFade]}
                effect="fade"
                loop={true}
                speed={1000}
                pagination={{
                    el: ".swiper-pagination",
                    clickable: true,
                }}
                navigation={{
                    nextEl: ".slider-next",
                    prevEl: ".slider-prev",
                }}
                className="th-slider hero-slider-1"
                id="heroSlide1"
            >
                <div className="swiper-wrapper">
                    <SwiperSlide>
                        <div className="hero-inner">
                            <div
                                className="th-hero-bg"
                                style={{
                                    backgroundImage: "url(/assets/img/hero/mejores-hoteles-malvidas-kuda-68deddff7797e.avif)",
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover",
                                }}
                            >
                            </div>
                            <div className="container">
                                <div className="hero-style1">
                                    <span className="sub-title style1" data-ani="slideinup" data-ani-delay="0.2s">
                                        Explora el mundo con nosotros
                                    </span>
                                    <h1 className="hero-title" data-ani="slideinup" data-ani-delay="0.4s">
                                        Turísticos de la Ribera
                                    </h1>
                                    <div className="btn-group" data-ani="slideinup" data-ani-delay="0.6s">
                                        <a href="#service-sec" className="th-btn th-icon">
                                            Ver Promociones
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    
                    <SwiperSlide>
                        <div className="hero-inner">
                            <div
                                className="th-hero-bg"
                                style={{
                                    backgroundImage: "url(/assets/img/hero/muhammadh-saamy-6e-SszlWIU8-unsplash.jpg)",
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover",
                                }}
                            >
                            </div>
                            <div className="container">
                                <div className="hero-style1">
                                    <span className="sub-title style1" data-ani="slideinup" data-ani-delay="0.2s">
                                        Viaja al mejor precio
                                    </span>
                                    <h1 className="hero-title" data-ani="slideinup" data-ani-delay="0.4s">
                                        Beneficios Corporativos
                                    </h1>
                                    <div className="btn-group" data-ani="slideinup" data-ani-delay="0.6s">
                                        <a href="#service-sec" className="th-btn th-icon">
                                            Explorar Paquetes
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                </div>
            </Swiper>
        </div>
    )
}

export default BannerOne
