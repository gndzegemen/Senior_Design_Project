import cors from "cors";
import {allowedUrls} from "./allowedUrls.js";

export const corsMiddleware = cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (
        allowedUrls.indexOf(origin) !== -1 || 
        origin.endsWith('.vercel.app')
    ) {
      return callback(null, true);
    }
    var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
    return callback(new Error(msg), false);
  },
  credentials: true,
  optionsSuccessStatus: 200,
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
  ],
});
