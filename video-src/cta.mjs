// Closing call-to-action card built on the harness cierre() so the cursor stays hidden and the card holds to the last frame
export async function cta(a, { fondo, texto, acento, tinta, fuente, radio = "6px", titulo, boton, nota }) {
  const principal = `<div style="font-family:${fuente};font-size:64px;font-weight:800;letter-spacing:-2px;line-height:1.1;max-width:1300px">${titulo}</div>`
    + `<div style="margin-top:44px"><span style="display:inline-block;font-family:${fuente};background:${acento};color:${tinta};font-size:34px;font-weight:700;letter-spacing:0;padding:22px 48px;border-radius:${radio}">${boton}</span></div>`;
  const secundario = `<div style="font-family:${fuente};margin-top:18px">${nota}</div>`;
  await a.cierre(principal, secundario, 3800, { fondo, texto });
}
