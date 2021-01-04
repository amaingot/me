import convict from "convict";

// Let's try to keep this list alphabetized for readability
/* eslint sort-keys: "error" */
const configurationSchema = {
  ENVIRONMENT: {
    default: "local",
    doc: "The current environment",
    env: "ENVIRONMENT",
    format: ["prod", "staging", "local"],
  },
  NODE_ENV: {
    // ref: http://expressjs.com/en/advanced/best-practice-performance.html#set-node_env-to-production
    default: "development",
    doc: "Specifies the environment in which an application is running",
    env: "NODE_ENV",
    format: ["development", "production"],
  },
  SHA: {
    default: "no-sha-provided",
    doc: "Specifies the sha of the current version of the application",
    env: "SHA",
    format: String,
  },
} as const;

const configuration = convict(configurationSchema);

type Schema = typeof configuration extends convict.Config<infer T> ? T : never;

// Ensure type safety of keys we `get`.
export default {
  get<K extends keyof Schema>(key: K) {
    return configuration.get(key);
  },
  getSchema: configuration.getSchema.bind(configuration),
  load: configuration.load.bind(configuration),
  set: configuration.set.bind(configuration),
  toString: configuration.toString.bind(configuration),
};
