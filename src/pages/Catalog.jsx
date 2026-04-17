import React from 'react';
import HeaderOne from '../components/Header/HeaderOne';
import BannerOne from '../components/Banner/BannerOne';
import CategoryOne from '../components/Category/CategoryOne';
import AboutOne from '../components/About/AboutOne';
import TourOne from '../components/Tour/TourOne';
import GalleryOne from '../components/Gallery/GalleryOne';
import FooterOne from '../components/Footer/FooterOne';

import { useParams, Navigate } from 'react-router-dom';

export default function Catalog({ legacyCompany }) {
  const { companyName: urlCompany } = useParams();
  const companyName = urlCompany || legacyCompany;
  const isCompany = !!companyName;

  // Check if access is granted for this company
  const hasAccess = isCompany ? sessionStorage.getItem(`access_${companyName}`) === 'true' : true;

  if (isCompany && !hasAccess) {
    return <Navigate to={`/acceso/${companyName}`} />;
  }

  return (
    <div>
      <HeaderOne />
      <BannerOne />
      <CategoryOne />
      <AboutOne />
      <TourOne isCompany={isCompany} companyName={companyName} />
      <GalleryOne />
      <FooterOne />
    </div>
  );
}
