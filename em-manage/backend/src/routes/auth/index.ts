import { Router } from "express";
import { login, logout, getMe } from "../../controllers/auth";
import { asyncHandler } from "../../middlewares/errorHandling";

const router: Router = Router()

router.post('/login', asyncHandler(login))
router.post('/logout', asyncHandler(logout))
router.get('/getMe/:username', asyncHandler(getMe))

export default router