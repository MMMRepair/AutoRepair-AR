const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// In-memory storage (replace with database later)
let repairs = [];

// POST - Customer submits repair request
app.post('/api/request-repair', (req, res) => {
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
  
  // TODO: Send SMS to mechanic (Twilio integration)
  console.log('📱 NEW REPAIR REQUEST:', repairRequest);
  
  res.json({ success: true, message: 'Request sent!', id: repairRequest.id });
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
