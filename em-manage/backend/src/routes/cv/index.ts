import { Router } from "express";
import { getCVs, getCVByUsername, addCV, updateCV, deleteCV } from "../../controllers/cv";
import { asyncHandler } from "../../middlewares/errorHandling";

const router: Router = Router()

router.get('/all', asyncHandler(getCVs))
router.get('/:username', asyncHandler(getCVByUsername))
router.post('/add', asyncHandler(addCV))
router.put('/update/:id', asyncHandler(updateCV))
router.delete('/delete/:id', asyncHandler(deleteCV))

export default router