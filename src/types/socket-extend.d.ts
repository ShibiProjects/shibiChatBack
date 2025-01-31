import "socket.io";

declare module "socket.io" {
    interface Socket {
        userId?: string;
        request: import("http").IncomingMessage;
    }
}

import "http";

declare module "http" {
    interface IncomingMessage {
        session?: {
            userId?: string;
        };
    }
}