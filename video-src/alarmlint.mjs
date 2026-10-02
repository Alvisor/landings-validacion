import { grabar } from "/Users/manuelrodriguez/.claude/skills/demo-video/scripts/harness.mjs";
import { cta } from "./cta.mjs";

const here = new URL(".", import.meta.url).pathname;

await grabar(async (page, a) => {
  await page.goto(`file://${here}alarmlint.html`);
  await page.waitForLoadState("networkidle");
  await a.pausa(700);
  await a.rotulo("Connect AWS with a read-only role. Nothing to install.");
  await a.pausa(900);
  await a.clic("#connect");
  await page.locator("#connState .ok").waitFor();
  await a.pausa(1200);
  await a.rotulo("AlarmLint checks every alarm against the data actually arriving");
  await a.clic("#scan");
  await page.locator(".row.on >> nth=2").waitFor();
  await a.pausa(1600);
  await a.rotulo("Alarms that can never fire show up first");
  await a.pausa(1600);
  await a.clic("#f1");
  await a.pausa(500);
  await a.rotulo("Each finding comes with the exact fix");
  await a.zoom("#detail", 1.35);
  await a.pausa(2600);
  await a.sinZoom();
  await a.sinRotulo();
  await a.mover({ x: 1700, y: 980 });
  await cta(a, {
    fondo: "#0c0e11", texto: "#e7eaee", acento: "#ffb020", tinta: "#15120a", fuente: "Geist, sans-serif",
    titulo: "Find your dead alarms before your customers do.",
    boton: "Get a free scan",
    nota: "Founding price: $29/month per AWS account. Your first scan is free.",
  });
}, { salida: `${here}out/alarmlint.webm`, telon: null, colorScheme: "dark", locale: "en-US" });
