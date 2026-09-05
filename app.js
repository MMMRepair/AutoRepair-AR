require('dotenv').config();
const express = require('express');
const cors = require('cors');
const twilio = require('twilio');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Twilio configuration
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const mechaicPhoneNumber = '619-348-8950'; // Magic Mat's phone number

const client = twilio(accountSid, authToken);

// In-memory storage (replace with database later)
let repairs = [];

// POST - Customer submits repair request
app.post('/api/request-repair', async (req, res) => {
  const { name, location, year, make, model, problem, phone } = req.body;
  
  const repairRequest = {
    id: Date.now(),
    name,
    location,
    vehicle: `${year} ${make} ${model}`,
    problem,
    phone,
    timestamp: new Date().toLocaleString(),
    status: 'pending'
  };
  
  repairs.push(repairRequest);
  
  // Create Google Maps link from location
  const mapsLink = `https://www.google.com/maps/search/${encodeURIComponent(location)}`;
  
  // Send SMS to Magic Mat
  const smsMessage = `🔧 NEW REPAIR REQUEST
Name: ${name}
Phone: ${phone}
Location: ${location}
Maps: ${mapsLink}
Vehicle: ${year} ${make} ${model}
Problem: ${problem}`;
  
  try {
    await client.messages.create({
      body: smsMessage,
      from: twilioPhoneNumber,
      to: '+1' + mechaicPhoneNumber.replace(/-/g, '')
    });
    
    console.log('📱 SMS sent to Magic Mat:', mechaicPhoneNumber);
  } catch (error) {
    console.error('Error sending SMS:', error);
  }
  
  res.json({ success: true, message: 'Request sent! Magic Mat will contact you soon.', id: repairRequest.id });
});

// GET - Mechanic dashboard (all requests)
app.get('/api/repairs', (req, res) => {
  res.json(repairs);
});

// PUT - Update repair status
app.put('/api/repairs/:id', (req, res) => {
  const { status } = req.body;
  const repair = repairs.find(r => r.id == req.params.id);
  if (repair) {
    repair.status = status;
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Not found' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🔧 MMMRepairSD Server running on port ${PORT}`);
});
