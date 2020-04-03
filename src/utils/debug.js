const debug = {};
const debugKey = "NEUQ_ORDER_DEBUG";

debug.isDebug = function() {
  return (
    process.env.NODE_ENV === "development" ||
    (process.env.NODE_ENV === "production" &&
      localStorage.getItem(debugKey) &&
      localStorage.getItem(debugKey) === "true")
  );
};

debug.setDebug = function(flag) {
  localStorage.setItem(debugKey, flag);
};

debug.init = function() {
  if (this.isDebug()) {
    // eslint-disable-next-line no-useless-escape
    document.write(`<script>new VConsole()<\/script>`);
  }
};

debug.log = function(...msg) {
  if (this.isDebug()) {
    // eslint-disable-next-line no-console
    console.log(...msg);
  }
};

debug.error = function(...msg) {
  if (this.isDebug()) {
    // eslint-disable-next-line no-console
    console.error(...msg);
  }
};

export default debug;
