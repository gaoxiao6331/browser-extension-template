export const LOG_LEVEL = {
  INFO: 0,
  WARNING: 1,
  ERROR: 2,
  DISABLE: 3,
};

class Logger {
  constructor(private level: number) {}

  setLevel(level: (typeof LOG_LEVEL)[keyof typeof LOG_LEVEL]) {
    this.level = level;
  }

  info(...args: unknown[]) {
    if (this.level <= LOG_LEVEL.INFO) {
      console.log("Custom Log: ", ...args);
    }
  }

  trace(...args: unknown[]) {
    if (this.level <= LOG_LEVEL.INFO) {
      console.trace("Custom Trace: ", ...args);
    }
  }

  warning(...args: unknown[]) {
    if (this.level <= LOG_LEVEL.WARNING) {
      console.warn("Custom Warning: ", ...args);
    }
  }

  error(...args: unknown[]) {
    if (this.level <= LOG_LEVEL.ERROR) {
      console.error("Custom Error: ", ...args);
    }
  }
}

export const logger = new Logger(LOG_LEVEL.DISABLE);
