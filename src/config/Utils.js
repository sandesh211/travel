export const loadScript = (src, id) => {
  return new Promise((resolve, reject) => {
    if (document.getElementById(id)) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.id = id;
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
};
