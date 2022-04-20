import { Router } from "express";
import { getProfiles, getProfileByUsername, addProfile, updateProfile, deleteProfile } from "../../controllers/profile";
import { asyncHandler } from "../../middlewares/errorHandling";

const router: Router = Router()

router.get('/all', asyncHandler(getProfiles))
router.get('/:username', asyncHandler(getProfileByUsername))
router.post('/add', asyncHandler(addProfile))
router.put('/update/:id', asyncHandler(updateProfile))
router.delete('/delete/:id', asyncHandler(deleteProfile))

export default router