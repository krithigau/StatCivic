import mongoose from 'mongoose';

const grievanceSchema = new mongoose.Schema({
  // FIX 1: Ensure this is just a String (not ObjectId) so it accepts phone numbers
  citizenContact: { type: String, required: true },
  
  description: { type: String, required: true },
  
  // FIX 2: Remove 'enum' here so it accepts "Electricity Board", "TANGEDCO", etc.
  department: { type: String, default: "General Administration" },
  
  aiCategory: { type: String, default: "Pending Analysis" },
  priority: { type: String, default: "Medium" },
  
  // FIX 3: Ensure 'reopenReason' is included
  reopenReason: { type: String, default: "" }, 

  status: { 
    type: String, 
    // Allowed statuses
    enum: ['Pending', 'In Progress', 'Resolved', 'Closed', 'Reopened'], 
    default: 'Pending' 
  },
  
  createdAt: { type: Date, default: Date.now }
});

const Grievance = mongoose.model('Grievance', grievanceSchema);
export default Grievance;