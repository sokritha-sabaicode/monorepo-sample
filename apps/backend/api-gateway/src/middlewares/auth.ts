import { Request, Response, NextFunction } from 'express';
import { CognitoJwtVerifier } from 'aws-jwt-verify';
import configs from '@/src/config';
import { AuthenticationError, AuthorizationError, NotFoundError } from '@sokritha-sabaicode/ms-libs';
import ROUTE_PATHS, { RouteConfig } from '@/src/route-defs';

declare global {
  namespace Express {
    interface Request {
      currentUser: any;
      routeConfig: RouteConfig;
      methodConfig: {
        authRequired: boolean;
        roles?: string[];
      };
    }
  }
}

// Initialize the Cognito JWT Verifier
const verifier = CognitoJwtVerifier.create({
  userPoolId: configs.awsCognitoUserPoolId,
  tokenUse: 'access',
  clientId: configs.awsCognitoClientId
});

// TODO: implement the authenticateToken function
// Step 1: Check if the method config requires authentication
// Step 2: If authentication is required, check if the user is authenticated
// Step 3: If authentication is required and the user is authenticated, attach the user to the request object
// Step 4: If authentication is not required, call next()

const authenticateToken = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const { methodConfig } = req;

    // Step 1
    if (methodConfig.authRequired) {
      // Step 2
      const token = req.cookies?.["access_token"];
      if (!token) {
        throw new AuthenticationError('Please login to continue');
      }

      // Step 3
      const payload = await verifier.verify(token);
      if (!payload) {
        throw new AuthenticationError();
      }

      req.currentUser = payload;
    }

    // Step 4
    next()
  } catch (error) {
    next(error);
  }
}


// TODO: implement the authorizeRole function
// Step 1: Check if the user is authenticated
// Step 2: Check if the user has the required role
// Step 3: If the user is authenticated and has the required role, call next()
// Step 4: If the user is not authenticated, return a 401 Unauthorized status

const authorizeRole = (req: Request, _res: Response, next: NextFunction) => {
  const { methodConfig, currentUser } = req;

  if (methodConfig.roles && (!currentUser || !methodConfig.roles.includes(currentUser.role))) {
    next(new AuthorizationError());
  }

  next();
};

const findRouteConfig = (path: string, routeConfigs: RouteConfig): RouteConfig | null => {
  // Check if the requested path starts with the current route's path
  if (path.startsWith(routeConfigs.path)) {
    // If there are nested routes, check if any match the remaining path
    if (routeConfigs.nestedRoutes) {
      for (const nestedRouteKey in routeConfigs.nestedRoutes) {
        // Example: If routeConfig.path is "/v1/users" and path is "/v1/users/profile"
        // The remaining path after "/v1/users" would be "/profile"
        const remainingPath = path.slice(routeConfigs.path.length);

        // Recursively call findRouteConfig on the nested route
        const nestedResult = findRouteConfig(remainingPath, routeConfigs.nestedRoutes[nestedRouteKey]);
        if (nestedResult) {
          return nestedResult;
        }
      }
    }
    return routeConfigs;
  }

  // If the path does not start with routeConfig.path, return null (no match)
  return null;
}


// TODO: implement the routeConfigMiddleware function
// Step 1: Find the route config for the requested path
// Step 2: Check if the route config has a method for the requested method
// Step 3: Attach the route configuration and method config to the request object
const routeConfigMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  const { path, method } = req;
  // Step 1
  let routeConfig = null;
  for (const key in ROUTE_PATHS) {
    routeConfig = findRouteConfig(path, ROUTE_PATHS[key]);
    if (routeConfig) break;
  }

  if (!routeConfig) {
    return next(new NotFoundError('Route not found'));
  }
  // Step 2
  const methodConfig = routeConfig.methods?.[method as keyof typeof routeConfig.methods];
  if (!methodConfig) {
    return next(new NotFoundError('Method not allowed'));
  }

  console.log('routeConfig', routeConfig)
  console.log('methodConfig', methodConfig)

  // Attach the route configuration and method config to the request object
  req.routeConfig = routeConfig;
  req.methodConfig = methodConfig;

  next();
}

export {
  authenticateToken,
  authorizeRole,
  routeConfigMiddleware
}