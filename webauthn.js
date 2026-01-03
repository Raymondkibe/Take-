
const { generateRegistrationOptions, verifyRegistrationResponse, generateAuthenticationOptions, verifyAuthenticationResponse } = require('@simplewebauthn/server');
const rpName = 'QUICKAPP'; const rpID = process.env.RP_ID || 'localhost'; const origin = process.env.ORIGIN || 'http://localhost:5173';
let userDB = {};
function makeUser(id, name){ if(!userDB[id]) userDB[id] = { id, name, credentials: [] }; return userDB[id]; }
function generateRegisterOptions(userId, userName){ const user = makeUser(userId, userName); const opts = generateRegistrationOptions({ rpName, rpID, userID:userId, userName, attestationType:'none' }); user.currentChallenge = opts.challenge; return opts; }
async function verifyRegister(userId, body){ const user = userDB[userId]; const verification = await verifyRegistrationResponse({ response: body, expectedChallenge: user.currentChallenge, expectedOrigin: origin, expectedRPID: rpID }); if(verification.verified){ user.credentials.push(verification.registrationInfo); } return verification; }
module.exports = { generateRegisterOptions, verifyRegister };
