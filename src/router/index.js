import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

 const routes = [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
       meta: {
      title: "Farid creations - Home",
    }
    },
    
    {
      path: '/about',
      name: 'About',
      component: () => import('../views/AboutView.vue'),
            meta: {
      title: "Farid creations - About",
    }
    },

    {
      path: '/p-login',
      name: 'AdminLogin',
      component: () => import('../views/AdminLoginView.vue'),
      meta: {
        title: "Farid creations - login",
      }
    },
     {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
    meta: {
      title: "Farid creations - Login",
    }
  },
    {
      path: '/p-signin',
      name: 'AdminSignin',
      component: () => import('../views/AdminSigninView.vue'),
      meta: {
        title: "Farid creations - signin",
      }
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('../views/SignupView.vue'),
      meta: {
        title: "Farid creations - signin",
      }
    },
    {
      path: '/reset-password',
      name: 'Reset',
      component: () => import('../views/ResetView.vue'),
      meta: {
        title: "Farid creations - Reset Password",
      }
    },

  
    {
      path: '/support',
      name: 'Support',
      component: () => import('../views/SupportView.vue'),
      meta: {
        title: "Farid creations - Support",
      }
    },
      {
    path: '/panel',
    name: 'Panel',
    component: () => import('../views/PanelView.vue'),

    meta: {
      isAdmin: true,
      title: "Farid creations - Panel",
    }
  },
  {
    path: '/policy',
    name: 'Policy',
    component: () => import('../views/PolicyView.vue'),
    meta: {
      title: "Farid creations - Privacy Policy",
    }
  },

    {
      path: '/contact',
      name: 'Contact',
      component: () => import('../views/ContactView.vue'),
      meta: {
        title: "Farid creations - contact",
      }
    },
    {
      path: '/disclaimer',
      name: 'Disclaimer',
      component: () => import('../views/DisclaimerView.vue'),
      meta: {
        title: "Farid creations - Disclaimer",
      }
    },
    {
      path: '/terms',
      name: 'Terms',
      component: () => import('../views/TermsView.vue'),
      meta: {
        title: "Farid creations - Terms and Conditions",
      }
    },

    {
      path: '/portfolio',
      name: 'Portfolio',
      component: () => import('../views/PortfolioView.vue'),
      meta: {
        title: "Farid creations - portfolio",
      }
    },
    {
      path: '/receipt',
      name: 'Receipt',
      component: () => import('../views/ReceiptView.vue'),
      meta: {
        title: "Farid creations - receipt",
      }
    },
    {
      path: '/graphic',
      name: 'Graphic',
      component: () => import('../views/GraphicView.vue'),
      meta: {
        title: "Farid creations - graphic design",
      }
    },

    {
      path: '/printing',
      name: 'Printing',
      component: () => import('../views/PrintingView.vue'),
      meta: {
        title: "Farid creations - printing",
      }
    },
    {
      path: '/payment',
      name: 'Payment',
      component: () => import('../views/PaymentView.vue'),
      meta: {
        title: "Farid creations - payment",
      }
    },

    {
      path: '/branding',
      name: 'Branding',
      component: () => import('../views/BrandingView.vue'),
      meta: {
        title: "Farid creations - branding",
      }
    },

    {
      path: '/social',
      name: 'Social',
      component: () => import('../views/SocialView.vue'),
      meta: {
        title: "Farid creations - social",
      }
    },

    {
      path: '/shop/:category',
      name: 'Shop',
      component: () => import('../views/ShopView.vue'),
      meta: {
        title: "Farid creations - shop",
      },
      props: true
    },

    {
      path: '/item/:itemID',
      name: 'Item',
      component: () => import('../views/ShopItemView.vue'),
      meta: {
        title: "Farid creations - item",
      },
      props: true
    },
    {
      path: '/cart/',
      name: 'Cart',
      component: () => import('../views/CartView.vue'),
      meta: {
        title: "Farid creations - cart",
      },
      props: true

    },

    {
      path: '/splash',
      name: 'Splash',
      component: () => import('../views/SplashView.vue'),
      meta: {
        title: "Farid creations - splash",
      },
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: () => import('../views/NotFoundView.vue'),
      meta: {
        title: "404 - Page not found",
      }
    },
  ]


  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
  });
  
  const isAdmin = () => {
    const admin = localStorage.getItem('admin');
    return admin === 'true'; 
  };
  
  const dynamicTitleGuard = (to, from, next) => {
    document.title = to.meta.title || 'Farid creations - Creative Agency';
    next();
  };
  
  const adminGuard = (to, from, next) => {
    if (to.matched.some((record) => record.meta.isAdmin)) {
      if (isAdmin()) {
        next();
      } else {
        next('/');
      }
    } else {
      next();
    }
  };
  
  router.beforeEach(dynamicTitleGuard);
  router.beforeEach(adminGuard);
  
  export default router;
  