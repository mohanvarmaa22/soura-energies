# Google Sheet lead logging

1. Create a Google Sheet. In row 1 add headers: receivedAt, name, phone, email, city, customerType, monthlyBill, message, source.
2. Extensions > Apps Script. Paste:

```js
const SECRET = "CHANGE_ME"; // same value as SHEETS_WEBHOOK_SECRET

function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  if (d.secret !== SECRET) return ContentService.createTextOutput("forbidden");
  const sh = SpreadsheetApp.getActiveSheet();
  sh.appendRow([d.receivedAt, d.name, d.phone, d.email || "", d.city, d.customerType, d.monthlyBill || "", d.message || "", d.source]);
  return ContentService.createTextOutput("ok");
}
```

3. Deploy > New deployment > Web app. Execute as: Me. Who has access: Anyone.
4. Copy the web app URL into `SHEETS_WEBHOOK_URL` and the secret into `SHEETS_WEBHOOK_SECRET`.
