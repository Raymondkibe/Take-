
/**
 * Payments service template. Use real credentials in env.
 * MPESA STK: initiateStkPush({phone, amount, accountRef, callbackUrl})
 * Flutterwave & PayPal: integrate official SDKs
 */
const fetch = require('node-fetch');
const Tx = require('../models/Transaction');
const User = require('../models/User');
const config = {
  mpesa: { consumerKey: process.env.MPESA_CONSUMER_KEY || '', consumerSecret: process.env.MPESA_CONSUMER_SECRET || '', shortcode: process.env.PAYBILL_NUMBER || '222111', passkey: process.env.MPESA_PASSKEY || '' },
  giftAdminPct: Number(process.env.GIFT_ADMIN_PERCENT || 10)
};
async function mpesaGetToken(){
  const url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';
  const auth = Buffer.from(`${config.mpesa.consumerKey}:${config.mpesa.consumerSecret}`).toString('base64');
  const res = await fetch(url, { headers:{ Authorization: `Basic ${auth}` } });
  return res.json();
}
async function initiateStkPush({ phone, amount, accountRef, callbackUrl }){
  const tokenResp = await mpesaGetToken();
  const token = tokenResp.access_token;
  const timestamp = new Date().toISOString().replace(/[-:T.Z]/g,'').slice(0,14);
  const password = Buffer.from(`${config.mpesa.shortcode}${config.mpesa.passkey}${timestamp}`).toString('base64');
  const body = { BusinessShortCode: config.mpesa.shortcode, Password: password, Timestamp: timestamp, TransactionType:'CustomerPayBillOnline', Amount: amount, PartyA: phone, PartyB: config.mpesa.shortcode, PhoneNumber: phone, CallBackURL: callbackUrl, AccountReference: accountRef || 'QUICKAPP', TransactionDesc: 'Payment' };
  const resp = await fetch('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', { method:'POST', headers:{ Authorization:`Bearer ${token}`, 'Content-Type':'application/json'}, body: JSON.stringify(body) });
  return resp.json();
}
module.exports = { initiateStkPush };
