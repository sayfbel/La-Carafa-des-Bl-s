import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop Component:
 * Fixes the React Router SPA issue where navigating from the footer left the user
 * stuck at the bottom of the new page. Smoothly glides the viewport to y = 0.
 */
export function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    // If navigating to an in-page anchor hash (#section), smooth scroll to the target element
    if (hash) {
      const targetElement = document.querySelector(hash);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    // Smoothly scroll window viewport to top (y = 0)
    try {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    } catch {
      window.scrollTo(0, 0);
    }

    // Also reset admin viewport scroll if inside admin area
    const adminViewport = document.querySelector('.admin-main-viewport');
    if (adminViewport) {
      try {
        adminViewport.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      } catch {
        adminViewport.scrollTop = 0;
      }
    }
  }, [pathname, search, hash]);

  return null;
}
