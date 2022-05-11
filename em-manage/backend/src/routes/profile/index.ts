import { Router } from "express";
import { getProfiles, getProfile, updateProfile, deleteProfile } from "../../controllers/profile";
import { asyncHandler } from "../../middlewares/errorHandling";
import { verifyTokenMiddleware } from "../../middlewares/jwtHelper";

const router: Router = Router()

router.get('/all', verifyTokenMiddleware, asyncHandler(getProfiles))
router.put('/get', verifyTokenMiddleware, asyncHandler(getProfile))
router.put('/update', verifyTokenMiddleware, asyncHandler(updateProfile))
router.delete('/delete/:id', verifyTokenMiddleware, asyncHandler(deleteProfile))

export default router