import { Request, Response, NextFunction } from 'express';
import { CognitoJwtVerifier } from 'aws-jwt-verify';
import configs from '@/src/config';
import { AuthenticationError, AuthorizationError, NotFoundError } from '@sokritha-sabaicode/ms-libs';
import ROUTE_PATHS, { RouteConfig } from '@/src/route-defs';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

declare global {
  namespace Express {
    interface Request {
      currentUser: {
        username: string;
        role: string[] | undefined;
      };
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

      let role: string[] = [];
      const userPayload = await jwtDecode(req.cookies?.["id_token"]);
      console.log('userPayload', userPayload)

      // @ts-ignore
      if (userPayload['cognito:username'].includes('google')) {
        // @ts-ignore
        if (!userPayload['custom:role']) {
          const { data } = await axios.get(`${configs.userServiceUrl}/v1/users/me`, {
            headers: {
              'Cookie': `username=${userPayload.sub}`
            }
          });
          console.log('data', data.data.role)
          role.push(data.data.role);
        } else {
          // @ts-ignore
          role.push(userPayload['custom:role']);
        }
      } else {
        role = payload['cognito:groups'] || []
      }
      console.log('role', role)

      req.currentUser = {
        username: payload.username,
        role
      };
    }

    // Step 4
    next()
  } catch (error) {
    console.log('error', error)
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

  // Check if the route requires specific roles
  if (methodConfig.roles) {
    // If the user is not authenticated or does not have any of the required roles, throw an error
    if (!currentUser || !Array.isArray(currentUser.role) || !currentUser.role.some(role => methodConfig.roles!.includes(role))) {
      return next(new AuthorizationError());
    }
  }

  next();
};


// TODO: implement the findRouteConfig function
// STEP 1: Check if the requested path starts with the current route's path
// Step 2: If there are no nested routes, return the current routeConfig
// Step 3: Calculate the remaining path after the base path
// Step 4: Check if any nested routes match the remaining path
// Step 5: If a nested route matches, recursively call findRouteConfig on the nested route
// Step 6: If no nested route matches, return null
const findRouteConfig = (path: string, routeConfigs: RouteConfig): RouteConfig | null => {
  // STEP 1
  if (!path.startsWith(routeConfigs.path)) {
    return null; // If the path does not start with routeConfig.path, return null (no match)
  }

  // STEP 2
  if (!routeConfigs.nestedRoutes) {
    return routeConfigs;
  }

  // STEP 3
  const remainingPath = path.slice(routeConfigs.path.length);

  // STEP 4
  for (const nestedRouteKey in routeConfigs.nestedRoutes) {
    const nestedRouteConfig = routeConfigs.nestedRoutes[nestedRouteKey];

    // STEP 5
    if (remainingPath.startsWith(nestedRouteConfig.path)) {
      const nestedResult = findRouteConfig(remainingPath, nestedRouteConfig);
      if (nestedResult) {
        return nestedResult;
      }
    }
  }

  // STEP 6
  return null;
};

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
    console.log('routeConfig', routeConfig)
    if (routeConfig) break;
  }

  if (!routeConfig) {
    return next(new NotFoundError('Route not found'));
  }
  // Step 2
  const methodConfig = routeConfig.methods?.[method];
  if (!methodConfig) {
    return next(new NotFoundError('Method not allowed'));
  }

  // Attach the route configuration and method config to the request object
  req.routeConfig = routeConfig;
  req.methodConfig = methodConfig;

  console.log('req.routeConfig', routeConfig);
  console.log('req.methodConfig', methodConfig);

  next();
}

export {
  authenticateToken,
  authorizeRole,
  routeConfigMiddleware
}