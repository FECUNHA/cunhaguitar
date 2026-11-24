/**
 * Cunha Guitar Play — endpoint de inscrição por e-mail.
 * Publicar como Web App: "Executar como: eu" / "Quem tem acesso: qualquer pessoa".
 * Veja README.md nesta pasta.
 */

var SHEET_NAME = 'Inscritos';
var HEADERS = ['data', 'email', 'nome', 'origem'];
var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function doPost(e) {
  var data;
  try {
    data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
  } catch (err) {
    return reply_('invalid');
  }

  // Honeypot: bots preenchem o campo oculto. Responde "ok" sem gravar.
  if (data.website) return reply_('ok');

  var email = String(data.email || '').trim().toLowerCase();
  var name = String(data.name || '').trim().slice(0, 80);
  var origem = String(data.origem || '').slice(0, 200);

  if (!email || email.length > 254 || !EMAIL_RE.test(email)) return reply_('invalid');

  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var sheet = getSheet_();
    var last = sheet.getLastRow();
    if (last > 1) {
      var emails = sheet.getRange(2, 2, last - 1, 1).getValues();
      for (var i = 0; i < emails.length; i++) {
        if (String(emails[i][0]).trim().toLowerCase() === email) return reply_('duplicate');
      }
    }
    sheet.appendRow([new Date(), email, sanitize_(name), sanitize_(origem)]);
  } finally {
    lock.releaseLock();
  }
  return reply_('ok');
}

function doGet() {
  return reply_('ok');
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
  return sheet;
}

// Evita injeção de fórmula na planilha (=, +, -, @).
function sanitize_(value) {
  return /^[=+\-@]/.test(value) ? "'" + value : value;
}

function reply_(status) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: status }))
    .setMimeType(ContentService.MimeType.JSON);
}
