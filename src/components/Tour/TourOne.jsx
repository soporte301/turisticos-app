import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useLocalStorage } from '../../hooks/useLocalStorage';

function TourOne({ isCompany, companyName }) {
  const [packages] = useLocalStorage('packages', [
    { id: 1, empresa: "FRIENDLY FUN", descripcion: "PUERTO VALLARTA Habitacion doble.", costoPublico: "$7,999 mxn", companyPrices: { "Super Colchones": "$7,199 mxn" }, categoria: "Nacional", image: "/assets/img/packages/FRIENDLY FUN.jpg" },
    { id: 2, empresa: "SUNSCAPE", descripcion: "Todo incluido, Puerto Vallarta.", costoPublico: "$7,999 mxn", companyPrices: { "Super Colchones": "$7,199 mxn" }, categoria: "Nacional", image: "/assets/img/packages/SUNSCAPE.avif" },
    { id: 3, empresa: "GRAND PALLADIUM", descripcion: "PUERTO VALLARTA", costoPublico: "$9,999 mxn", companyPrices: { "Super Colchones": "$8,999 mxn" }, categoria: "Nacional", image: "/assets/img/packages/grand-palladium-vallarta-piscina-quiet-pool-10.jpg" }
  ]);
  const [waNumber] = useLocalStorage('waNumber', '523312345678');

  const getPrice = (pkg) => {
    if (isCompany && companyName && pkg.companyPrices) {
      // Find matching company ignoring case and spaces (e.g. 'SuperColchones' matches 'Super Colchones')
      const targetName = companyName.toLowerCase().replace(/\s+/g, '');
      const validCompanyKey = Object.keys(pkg.companyPrices).find(
        key => key.toLowerCase().replace(/\s+/g, '') === targetName
      );
      
      if (validCompanyKey && pkg.companyPrices[validCompanyKey]) {
        return pkg.companyPrices[validCompanyKey];
      }
    }
    return pkg.costoPublico || pkg.costo || 'N/A';
  };

  const createWaLink = (pkg) => {
    const price = getPrice(pkg);
    const text = `Hola, me interesa el paquete turístico ofrecido para *${pkg.empresa}*.
    
*Detalles del paquete:*
- ${pkg.descripcion}
- *Costo:* ${price}
${pkg.codigo ? `- *Código Promo:* ${pkg.codigo}` : ''}
${isCompany ? `*(Precio especial para convenio con ${companyName})*` : ''}

Por favor necesito más información.`;
    const encodedText = encodeURIComponent(text);
    return `https://wa.me/${waNumber.replace(/[^0-9]/g, '')}?text=${encodedText}`;
  };

  const categories = [
    'Nacional', 
    'Internacional', 
    'Vuelos', 
    'Ofertas flash', 
    'Boda', 
    'Viajes empresarial', 
    'Circuitos nacionales'
  ];

  return (
    <section
      className="tour-area position-relative bg-top-center overflow-hidden space bg-no-repeat"
      id="service-sec"
      style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #E9F6F9 100%)' }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div className="title-area text-center p-4" style={{ backgroundColor: "rgba(255, 255, 255, 0.85)", borderRadius: "16px", display: "inline-block", width: "100%" }}>
              <span className="sub-title" style={{color: "var(--theme-color2)", fontWeight:"bold"}}>Experiencias únicas</span>
              <h2 className="sec-title">{isCompany ? `Beneficios para ${companyName}` : 'Paquetes más solicitados'}</h2>
              <p className="sec-text mb-0" style={{color:"#444", fontWeight: "500"}}>
                {isCompany 
                  ? `Disfruta de tarifas preferenciales exclusivas para colaboradores de ${companyName}.` 
                  : 'Encuentra increíbles promociones corporativas y precios especiales diseñados para ti.'}
              </p>
            </div>
          </div>
        </div>
        
        {packages.length === 0 ? (
           <div className="text-center py-5">
             <h3 className="fs-4 text-muted">Aún no hay paquetes disponibles.</h3>
           </div>
        ) : (
          <div className="space-y-12">
            {categories.map(cat => {
              const catPackages = packages.filter(p => (p.categoria || 'Nacional') === cat);
              if (catPackages.length === 0) return null;

              return (
                <div key={cat} className="category-section mb-50">
                  <div className="flex items-center gap-4 mb-30 px-4 py-3" style={{ backgroundColor: "rgba(255, 255, 255, 0.7)", borderRadius: "16px", boxShadow: "0 4px 15px rgba(0,0,0,0.05)", backdropFilter: "blur(8px)" }}>
                    <h3 className="text-2xl font-bold text-heading m-0 flex items-center gap-2">
                       <span style={{ width: '8px', height: '24px', backgroundColor: cat === 'Internacional' ? '#8b5cf6' : '#3b82f6', borderRadius: '4px' }}></span>
                       Paquetes {cat}
                    </h3>
                    <div className="flex-1 h-[1px] bg-gray-200"></div>
                  </div>

                  <div className="slider-area tour-slider">
                    <Swiper
                      breakpoints={{
                        0: { slidesPerView: 1 },
                        576: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        992: { slidesPerView: 2 },
                        1200: { slidesPerView: 3 },
                        1300: { slidesPerView: 4 },
                      }}
                      spaceBetween={24}
                      grabCursor={true}
                      className="swiper th-slider has-shadow slider-drag-wrap"
                    >
                      {catPackages.map(pkg => (
                        <SwiperSlide key={pkg.id}>
                          <div className="tour-box th-ani gsap-cursor h-100">
                            <div className="tour-box_img global-img" style={{ height: "240px", position: "relative" }}>
                              {pkg.image ? (
                                <img src={pkg.image} alt={pkg.empresa} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                              ) : (
                                <img src="/assets/img/tour/tour_box_1.jpg" alt="Default" />
                              )}
                              
                              {pkg.codigo && (
                                 <span className="badge bg-primary" style={{ position: 'absolute', top: '15px', left: '15px', padding: "6px 12px", borderRadius: "8px", fontWeight: 'bold', zIndex: 2, boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                                    {pkg.codigo}
                                 </span>
                              )}
                            </div>
                            <div className="tour-content">
                              <h3 className="box-title mb-2">
                                <a href={createWaLink(pkg)} target="_blank" rel="noreferrer">{pkg.empresa}</a>
                              </h3>

                              <div className="tour-rating mb-2" style={{ height: "40px", overflow: "hidden" }}>
                                <p className="text-muted m-0" style={{ fontSize: "14px", lineHeight: "1.4" }}>
                                   {pkg.descripcion}
                                </p>
                              </div>

                              {(pkg.incAlimentos || pkg.incBebidas || pkg.incHospedaje) && (
                                 <div style={{ display: 'flex', gap: '12px', marginBottom: '15px' }}>
                                   {pkg.incAlimentos && (
                                     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                                       <div style={{ backgroundColor: '#f8f9fa', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #eee' }}>
                                         <img src="/assets/img/icon/alimentos.png" alt="Alimentos" style={{ width: '18px', height: '18px', objectFit: 'contain' }} />
                                       </div>
                                       <span style={{ fontSize: '9px', color: '#666', fontWeight: '600', textTransform: 'uppercase' }}>Comidas</span>
                                     </div>
                                   )}
                                   {pkg.incBebidas && (
                                     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                                       <div style={{ backgroundColor: '#f8f9fa', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #eee' }}>
                                         <img src="/assets/img/icon/bebidas.png" alt="Bebidas" style={{ width: '18px', height: '18px', objectFit: 'contain' }} />
                                       </div>
                                       <span style={{ fontSize: '9px', color: '#666', fontWeight: '600', textTransform: 'uppercase' }}>Bebidas</span>
                                     </div>
                                   )}
                                   {pkg.incHospedaje && (
                                     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                                       <div style={{ backgroundColor: '#f8f9fa', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #eee' }}>
                                         <img src="/assets/img/icon/hospedaje.png" alt="Hospedaje" style={{ width: '18px', height: '18px', objectFit: 'contain' }} />
                                       </div>
                                       <span style={{ fontSize: '9px', color: '#666', fontWeight: '600', textTransform: 'uppercase' }}>Hospedaje</span>
                                     </div>
                                   )}
                                 </div>
                              )}

                              <h4 className="tour-box_price">
                                <span className="currency">{getPrice(pkg)}</span>
                              </h4>
                              <div className="tour-action">
                                <span>
                                  <i className="fa-light fa-clock" /> ¡Cotiza YA!
                                </span>
                                <a href={createWaLink(pkg)} target="_blank" rel="noreferrer" className="th-btn style4 th-icon">
                                  Me Interesa
                                </a>
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default TourOne;
