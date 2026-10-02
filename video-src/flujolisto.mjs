import { grabar } from "/Users/manuelrodriguez/.claude/skills/demo-video/scripts/harness.mjs";
import { cta } from "./cta.mjs";

const here = new URL(".", import.meta.url).pathname;

await grabar(async (page, a) => {
  await page.goto(`file://${here}flujolisto.html`);
  await page.waitForLoadState("networkidle");
  await a.pausa(600);
  await a.rotulo("Un cliente te escribe a las 11 de la noche");
  await a.escribir("#name", "Laura Gómez", 45);
  await a.escribir("#phone", "+1 809 555 0123", 40);
  await a.escribir("#msg", "Hola, quiero una cita para vacunar a Toby", 32);
  await a.clic("#send");
  await a.pausa(1200);
  await a.rotulo("La consulta queda guardada en tu hoja, sola");
  await a.mover("#p1");
  await a.pausa(2000);
  await page.evaluate(() => window.step2());
  await a.rotulo("Te llega el aviso por WhatsApp");
  await a.mover("#p2");
  await a.pausa(2200);
  await page.evaluate(() => window.step3());
  await a.rotulo("Y el cliente recibe respuesta en segundos");
  await a.mover("#p3");
  await a.pausa(2200);
  await a.rotulo("Es un flujo de n8n que instalas una vez y trabaja todos los días");
  await a.zoom(".flow", 1.3);
  await a.pausa(2400);
  await a.sinZoom();
  await a.sinRotulo();
  await cta(a, {
    fondo: "#2447d6", texto: "#ffffff", acento: "#ffffff", tinta: "#2447d6", fuente: "Outfit, sans-serif", radio: "999px",
    titulo: "Deja de responder a mano.",
    boton: "Reservar mi lugar",
    nota: "Precio de fundador: $39 un paquete o $99 los cuatro. Pago único.",
  });
}, { salida: `${here}out/flujolisto.webm`, telon: null, locale: "es-DO" });
