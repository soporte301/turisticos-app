import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

function MobileMenu({ isOpen, onClose }) {
    const [activeMenu, setActiveMenu] = useState(null);
    const [activeShopMenu, setActiveShopMenu] = useState(false); // Shop submenu state
    const menuRefs = useRef({});

    // Toggle dropdown menu
    const toggleMenu = (index) => {
        if (index !== 6) {
            setActiveMenu(activeMenu === index ? null : index);
        }
    };

    // Handle Shop menu separately
    const toggleShopMenu = (e) => {
        e.stopPropagation(); // Prevent menu from closing
        setActiveShopMenu(!activeShopMenu);
    };

    // Apply height animation when activeMenu changes
    useEffect(() => {
        Object.keys(menuRefs.current).forEach((key) => {
            const submenu = menuRefs.current[key];
            if (submenu) {
                submenu.style.height = activeMenu == key ? `${submenu.scrollHeight}px` : "0px";
            }
        });
    }, [activeMenu]);

    return (
        <div className={`th-menu-wrapper onepage-nav ${isOpen ? "th-body-visible" : ""}`}
            style={{ visibility: isOpen ? "visible" : "hidden" }}>

            <div className="th-menu-area text-center">
                <button className="th-menu-toggle" onClick={onClose} aria-label="Close">
                    <i className="fal fa-times" />
                </button>

                <div className="mobile-logo">
                    <Link to="/" onClick={onClose}>
                        <img src="/assets/img/logo.png" alt="Turísticos" style={{ maxHeight: '50px' }} />
                    </Link>
                </div>

                <div className="th-mobile-menu">
                    <ul>
                        <li>
                            <Link to="/" onClick={onClose}>Inicio</Link>
                        </li>
                        <li>
                            <a href="#service-sec" onClick={onClose}>Paquetes</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default MobileMenu;
