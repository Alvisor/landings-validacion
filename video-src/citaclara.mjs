import { grabar } from "/Users/manuelrodriguez/.claude/skills/demo-video/scripts/harness.mjs";
import { cta } from "./cta.mjs";

const here = new URL(".", import.meta.url).pathname;

await grabar(async (page, a) => {
  await page.goto(`file://${here}citaclara.html`);
  await page.waitForLoadState("networkidle");
  await a.pausa(600);
  await a.rotulo("Un día antes, CitaClara recuerda cada cita por WhatsApp");
  await a.mover("#r1");
  await page.evaluate(() => window.sendAll());
  await a.pausa(2200);
  await a.rotulo("Cuando el paciente confirma, tu agenda se actualiza sola");
  await a.clic("#r3");
  await page.evaluate(() => window.confirmMariela());
  await a.pausa(3600);
  await a.rotulo("Si no puede ir, le ofrece tus horarios libres y mueve la cita");
  await a.clic("#r2");
  await page.evaluate(() => window.moveAndres());
  await a.pausa(5600);
  await a.rotulo("Y avisa a tu lista de espera para que la hora no se pierda");
  await page.evaluate(() => window.fillGap());
  await a.mover(".thread");
  await a.pausa(3600);
  await a.sinRotulo();
  await cta(a, {
    fondo: "#17603f", texto: "#ffffff", acento: "#ffffff", tinta: "#17603f", fuente: "'Plus Jakarta Sans', sans-serif", radio: "12px",
    titulo: "Menos sillas vacías, sin llamar a nadie.",
    boton: "Probar 30 días gratis",
    nota: "$19 USD al mes por agenda. Sin tarjeta. Te ayudo a configurarlo.",
  });
}, { salida: `${here}out/citaclara.webm`, telon: null, locale: "es-DO" });
