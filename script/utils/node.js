const isDev = process.env.NODE_ENV === "development";
const isProd = process.env.NODE_ENV === "production";
const isGecko = process.env.PLATFORM === "gecko";
const isChromium = process.env.PLATFORM
  ? process.env.PLATFORM === "chromium"
  : true;

const CHARS = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm0123456789";
const getUniqueId = (len = 10) => {
  const chars = new Array(len - 1).fill("");
  return (
    CHARS[Math.floor(Math.random() * 52)] +
    chars.map(() => CHARS[Math.floor(Math.random() * CHARS.length)]).join("")
  );
};

const promisify = fn => {
  return (...args) =>
    new Promise((resolve, reject) => {
      fn(...args, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
};

exports.isDev = isDev;
exports.isProd = isProd;
exports.isGecko = isGecko;
exports.promisify = promisify;
exports.isChromium = isChromium;
exports.getUniqueId = getUniqueId;
