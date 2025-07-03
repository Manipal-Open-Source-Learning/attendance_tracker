import { useSeoMeta } from '@unhead/react';
import { useLocation } from 'react-router-dom';

type SEOParams = {
  title?: string;
  description?: string;
  image?: string;
  isPrivate?: boolean;
};

const useAppSeo = ({ title, description, image, isPrivate = false }: SEOParams) => {
  const location = useLocation();

  const {
    VITE_WEBSITE_NAME,
    VITE_FRONTEND_URL,
    VITE_DEFAULT_DESCRIPTION,
    VITE_DEFAULT_OG_IMAGE,
    VITE_TWITTER_HANDLE,
    VITE_THEME_COLOR
  } = import.meta.env;

  const defaultTitle = `${VITE_WEBSITE_NAME} - Attendance Tracker`; // change later if needed
  const fullTitle = title || defaultTitle;

  useSeoMeta({
    title: fullTitle,
    description: description || VITE_DEFAULT_DESCRIPTION,
    ...(isPrivate
      ? {}
      : {
        ogTitle: fullTitle,
        ogDescription: description || VITE_DEFAULT_DESCRIPTION,
        ogUrl: `${VITE_FRONTEND_URL.replace(/\/$/, '')}${location.pathname}`,
        ogImage: image || VITE_DEFAULT_OG_IMAGE,
        ogSiteName: VITE_WEBSITE_NAME,
        ogLocale: 'en_IN',
        ogType: 'website',

        twitterCard: 'summary_large_image',
        twitterTitle: fullTitle,
        twitterDescription: description || VITE_DEFAULT_DESCRIPTION,
        twitterImage: image || VITE_DEFAULT_OG_IMAGE,
        twitterSite: VITE_TWITTER_HANDLE,

        themeColor: VITE_THEME_COLOR
      }),
  });
};

export default useAppSeo;