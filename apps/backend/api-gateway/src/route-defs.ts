import configs from "@/src/config"

export interface RouteConfig {
  path: string;
  target?: string;
  methods?: {
    [method: string]: {
      authRequired: boolean;
      roles?: string[]; // Optional: Roles that are allowed
    };
  };
  nestedRoutes?: RouteConfig[];
}

export interface RoutesConfig {
  [route: string]: RouteConfig;
}

const ROUTE_PATHS: RoutesConfig = {
  AUTH_SERVICE: {
    path: "/v1/auth",
    target: configs.authServiceUrl,
    nestedRoutes: [
      {
        path: "/signup",
        methods: {
          POST: {
            authRequired: false,
          }
        },
      },
      {
        path: "/signin",
        methods: {
          POST: {
            authRequired: false,
          }
        }
      },
      {
        path: "/verify",
        methods: {
          POST: {
            authRequired: false,
          }
        }
      },
      {
        path: '/login',
        methods: {
          POST: {
            authRequired: false,
          }
        }
      },
      {
        path: '/google',
        methods: {
          GET: {
            authRequired: false,
          }
        }
      },
      {
        path: '/facebook',
        methods: {
          GET: {
            authRequired: false,
          }
        }
      },
      {
        path: '/refresh-token',
        methods: {
          POST: {
            authRequired: true,
          }
        }
      },
      {
        path: '/oauth/callback',
        methods: {
          GET: {
            authRequired: false,
          }
        }
      },
    ]
  },
  USER_SERVICE: {
    path: "/v1/users",
    target: configs.userServiceUrl,
    methods: {
      GET: {
        authRequired: true, roles: ["admin", "user"]
      },
      POST: {
        authRequired: true, roles: ["admin"]
      }
    }
  },
  PRODUCT_SERVICE: {
    path: "/v1/products",
    target: configs.productServiceUrl,
    methods: {
      GET: {
        authRequired: true,
        roles: ["admin"]
      }
    }
  }
}

export default ROUTE_PATHS