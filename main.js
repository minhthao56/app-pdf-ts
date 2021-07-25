const { app, BrowserWindow } = require("electron");
const path = require("path");
const fs = require("fs");
const pdf = require("pdf-parse");

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: "white",
    webPreferences: {
      nodeIntegration: false,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
    },
  });
  win.loadFile("index.html");
  win.webContents.openDevTools();
}

app
  .whenReady()
  .then(createWindow)
  .then(() => {
    const dataBuffer = fs.readFileSync(path.join(__dirname, "sample.pdf"));
    pdf(dataBuffer).then(function (data) {
      // number of pages
      console.log(data.numpages);
      // number of rendered pages
      console.log(data.numrender);
      // PDF info
      console.log(data.info);
      // PDF metadata
      console.log(data.metadata);
      // PDF.js version
      // check https://mozilla.github.io/pdf.js/getting_started/
      console.log(data.version);
      // PDF text
      console.log(data.text);
    });
  });
