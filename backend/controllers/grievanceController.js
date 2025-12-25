import Grievance from '../models/Grievance.js';

export const createGrievance = async (req, res) => {
  try {
    const { citizenContact, description, department } = req.body;
    
    // LOGGING: This will show up in your VS Code Terminal when you click Submit
    console.log("📨 Received Ticket:", { citizenContact, department });

    // Calculate Priority locally
    let priorityLevel = "Medium";
    const text = (description || "").toLowerCase();
    
    if (text.includes("fire") || text.includes("accident") || text.includes("crime")) {
      priorityLevel = "Critical";
    } else if (text.includes("water") || text.includes("current") || text.includes("light")) {
      priorityLevel = "High";
    }

    const newGrievance = new Grievance({
      citizenContact,
      description,
      // Save the department exactly as the form sent it
      department: department || "General Administration", 
      priority: priorityLevel,  
      status: "Pending"
    });

    await newGrievance.save();
    console.log("✅ Ticket Saved Successfully!");
    
    res.status(201).json({ message: "Success", grievance: newGrievance });
  } catch (error) {
    // ERROR LOGGING: This prints the real reason for the failure
    console.error("❌ SAVE FAILED:", error.message);
    res.status(500).json({ message: "Save failed", error: error.message });
  }
};

// ... keep getAllGrievances and updateGrievance exactly the same ...
export const getAllGrievances = async (req, res) => {
    // ... (keep existing code)
    try {
        const { mobileNumber } = req.query; 
        let query = {};
        if (mobileNumber) {
          query = { citizenContact: { $regex: mobileNumber.trim(), $options: 'i' } };
        }
        const grievances = await Grievance.find(query).sort({ createdAt: -1 });
        res.status(200).json(grievances);
    } catch (error) {
        res.status(500).json({ message: "Fetch failed", error: error.message });
    }
};

export const updateGrievance = async (req, res) => {
    // ... (keep existing code)
    try {
        const { id } = req.params;
        const updatedGrievance = await Grievance.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedGrievance);
    } catch (error) {
        res.status(500).json({ message: "Update failed", error: error.message });
    }
};

export const deleteGrievance = async (req, res) => {
  try {
    const { id } = req.params;
    await Grievance.findByIdAndDelete(id);
    res.status(200).json({ message: "Grievance deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
};