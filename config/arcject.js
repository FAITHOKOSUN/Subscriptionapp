import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import { ARCJET_KEY } from "./env.js";

const aj = arcjet({
  key: ARCJET_KEY,
  characteristics: ["ip.src"],
  rules: [
    shield({ mode: "DRY_RUN" }),
    // Simplify bot detection - just set to DRY_RUN with no custom categories
    detectBot({
      mode: "DRY_RUN",
      allow: [
        "CATEGORY:SEARCH_ENGINE"
      ],
    }),
    tokenBucket({
      mode: "DRY_RUN",
      refillRate: 5,
      interval: 10,
      capacity: 5,
    }),
  ],
});


export default aj;