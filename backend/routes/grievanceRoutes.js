import express from 'express';
// Ensure 'updateGrievance' is imported here!
import { createGrievance, getAllGrievances, updateGrievance , deleteGrievance} from '../controllers/grievanceController.js';

const router = express.Router();

router.post('/', createGrievance);
router.get('/', getAllGrievances);

// FIX: This Line was likely missing or broken, causing the "Update Failed" error
router.put('/:id', updateGrievance); 
router.delete('/:id', deleteGrievance);
export default router;