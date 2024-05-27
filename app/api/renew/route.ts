import fetch from "node-fetch";
import { NextResponse } from "next/server";
import * as xlsx from "node-xlsx";
import { Buffer } from 'buffer';

export async function POST(request: Request) {
  try {
    const newFile = await fetch("https://adminclasificados.lavoz.com.ar/administrar/mis-avisos-inmuebles.xls", {
      headers: {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "en,en-US;q=0.9,sl;q=0.8,es;q=0.7",
        "cookie": "_fbp=fb.2.1712960251946.1913156427; clviLoginV1=%7B%22contactoToken%22%3A%226def66162b152fa6bd54d55d29dc7f1a183df20932995148%22%2C%22contactoMail%22%3A%22info%40diegoferreras.com.ar%22%2C%22contactoNombre%22%3A%22DIEGO%20FERRERAS%22%2C%22contactoTelefono%22%3A%223515460000-%203516531350-3515465555%22%2C%22status%22%3A1%2C%22uid%22%3A%22107172%22%2C%22nombre%22%3A%22DIEGO%22%7D; clviContactSeller=%7B%22contactoToken%22%3A%226def66162b152fa6bd54d55d29dc7f1a183df20932995148%22%2C%22contactoMail%22%3A%22info%40diegoferreras.com.ar%22%2C%22contactoNombre%22%3A%22DIEGO%20FERRERAS%22%2C%22contactoTelefono%22%3A%223515460000-%203516531350-3515465555%22%2C%22status%22%3A1%2C%22uid%22%3A%22107172%22%2C%22nombre%22%3A%22DIEGO%22%7D; clviContactV1=%7B%22contactoUid%22%3A%22107172%22%2C%22contactoMail%22%3A%22info%40diegoferreras.com.ar%22%2C%22contactoNombre%22%3A%22DIEGO+FERRERAS%22%2C%22contactoTelefono%22%3A%223515460000-+3516531350-3515465555%22%7D; _ga=GA1.3.amp-A-LoyWY7TL_NSXQ9Z6yDeA; _pctx=%7Bu%7DN4IgrgzgpgThIC4B2YA2qA05owMoBcBDfSREQpAeyRCwgEt8oBJAEzIE4AmHgZgFYA7F0EAODgEZeEiR1GCAbCAC%2BQA; _pcid=%7B%22browserId%22%3A%22lw82itmjn96mzi72%22%7D; cX_P=lw82itmjn96mzi72; cX_G=cx%3A4mljgxz8rx0q1gyjyr36o85bb%3A548bfwyay8ah; _ga_DZLZ4MEB79=GS1.3.1715792447.1.1.1715792489.18.0.0; ultimasVisitas=%5B%224696774%22%5D; SESS18d21ba9bec160cd8dfa6472e80e7cc7=6te0p8u1be4tdrsul37i4pt265; login=107172; has_js=1; _gid=GA1.3.569900460.1716768372; XSRF-TOKEN=eyJpdiI6InptQnI4MVQyWFF2eUo0MFZQM0JrUFE9PSIsInZhbHVlIjoiaXEzOGxZWHU3YUJpMDIvbi9oQnpiUEZZZ3AyRTBDcW1YMTlHZWJqSGxYb3hUbERwYUhocTg3azJ2RlBLRmtWNEkwdlV0ZmgzQTE1eTVYY0MveG1qbUJnRmIxbEl4UTBEWnBCS3U2eUovKzJVTEVTUHRoOG1DZVRkcFpJbHVlTEsiLCJtYWMiOiIzMGVlMjgzM2RhODVhMmU2NjA1Zjc1ZTIyMjZmMDMyZjRiMjA1MjQ2YThlZTVhODFhN2FmMDQyYjdmNWQ5OWI5In0%3D; clasificados_la_voz_session=PF0iIFoEqKsNYjSJxFxRXZg76mGLHtZYj99PkYxu; clviAlertaContactos={%22contactos%22:%224%22%2C%22interesados%22:%22112%22%2C%22ingreso%22:1716838248%2C%22ingresoContactos%22:1716681971%2C%22ingresoInteresados%22:1716681971}",
        "if-modified-since": "Mon, 27 May 2024 00:06:43 GMT",
        "if-none-match": "1716768403",
        "priority": "u=0, i",
        "referer": "https://adminclasificados.lavoz.com.ar/administrar/mis-avisos.html?page=1",
        "sec-ch-ua": '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      },
    });
    
    const buffer = await newFile.arrayBuffer();
    const workbook = xlsx.parse(Buffer.from(buffer));
    const sheets = workbook.map(sheet => sheet.name);

    for (let i = 0; i < sheets.length; i++) {
      const sheet = workbook.find(s => s.name === sheets[i]);
      if (sheet) {
        const rows = sheet.data;
        console.log(rows.length);
        for (let j = 1; j < rows.length; j++) { // assuming first row is header
          const row = rows[j];
          const id = row[0]; // assuming ID is in the first column
          console.log(id);
          const url = `https://adminclasificados.lavoz.com.ar/republicacion-individual-aviso/${id}/107172`;
          const resp = await fetch(url);
          console.log(resp);
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error });
  }
}
