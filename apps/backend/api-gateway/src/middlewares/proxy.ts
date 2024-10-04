import ROUTE_PATHS from "@/src/route-defs"
import { logRequest } from "@/src/utils/logger"
import express, { Response } from "express"
import { ClientRequest, IncomingMessage } from "http"
import { createProxyMiddleware, Options } from "http-proxy-middleware"
import { gatewayLogger } from "@/src/server"

interface ProxyConfig {
  [context: string]: Options<IncomingMessage, Response>
}

const proxyConfigs: ProxyConfig = {
  [ROUTE_PATHS.AUTH_SERVICE.path]: {
    target: ROUTE_PATHS.AUTH_SERVICE.target,
    pathRewrite: (path, _req) => {
      console.log('path', path)
      return `${ROUTE_PATHS.AUTH_SERVICE.path}${path}`
    },
    on: {
      proxyReq: (proxyReq: ClientRequest, _req: IncomingMessage, _res: Response) => {

        // @ts-ignore
        logRequest(gatewayLogger, proxyReq, {
          protocol: proxyReq.protocol,
          host: proxyReq.getHeader('host'),
          path: proxyReq.path
        });
      }
    }
  },
  [ROUTE_PATHS.USER_SERVICE.path]: {
    target: ROUTE_PATHS.USER_SERVICE.target,
    pathRewrite: (path, _req) => `${ROUTE_PATHS.USER_SERVICE.path}${path}`,
    on: {
      proxyReq: (proxyReq: ClientRequest, _req: IncomingMessage, _res: Response) => {

        // @ts-ignore
        logRequest(gatewayLogger, proxyReq, {
          protocol: proxyReq.protocol,
          host: proxyReq.getHeader('host'),
          path: proxyReq.path
        });
      }
    }
  },
  [ROUTE_PATHS.JOB_SERVICE.path]: {
    target: ROUTE_PATHS.JOB_SERVICE.target,
    pathRewrite: (path, _req) => `${ROUTE_PATHS.JOB_SERVICE.path}${path}`,
    on: {
      proxyReq: (proxyReq: ClientRequest, _req: IncomingMessage, _res: Response) => {

        // @ts-ignore
        logRequest(gatewayLogger, proxyReq, {
          protocol: proxyReq.protocol,
          host: proxyReq.getHeader('host'),
          path: proxyReq.path
        });
      }
    }
  },
  [ROUTE_PATHS.NOTIFICATION_SERVICE.path]: {
    target: ROUTE_PATHS.NOTIFICATION_SERVICE.target,
    pathRewrite: (_path, _req) => {
      return `${ROUTE_PATHS.NOTIFICATION_SERVICE.path}${_path}`
    },
    on: {
      proxyReq: (proxyReq: ClientRequest, _req: IncomingMessage, _res: Response) => {
        // @ts-ignore
        logRequest(gatewayLogger, proxyReq, {
          protocol: proxyReq.protocol,
          host: proxyReq.getHeader('host'),
          path: proxyReq.path
        });
      },

    }
  }
}


const applyProxy = (app: express.Application) => {
  Object.keys(proxyConfigs).forEach((context: string) => {
    // Apply the proxy middleware
    app.use(context, createProxyMiddleware(proxyConfigs[context]))
  })
}


export default applyProxy