const API_DOMAIN = import.meta.env.VITE_API_DOMAIN;
const TIMERS_API = import.meta.env.VITE_TIMERS_API;
const SHOP_DOMAIN = import.meta.env.VITE_SHOP_DOMAIN;

fetch(`${API_DOMAIN}${TIMERS_API}?shop=${SHOP_DOMAIN}`)
  .then(res => res.json())
  .then(timers => {
    const now = new Date();
    const activeTimer = timers.find(t => new Date(t.startTime) <= now && new Date(t.endTime) >= now);
    if (activeTimer) {
      const el = document.createElement("div");
      el.style.position = "fixed";
      el.style.bottom = "10px";
      el.style.background = activeTimer.displayOptions.color;
      el.innerText = activeTimer.promotionText + " | Time Left: ⏳...";
      document.body.appendChild(el);
    }
  });
