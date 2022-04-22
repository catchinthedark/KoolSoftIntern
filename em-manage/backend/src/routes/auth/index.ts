import { Router } from "express";
import { login, logout, register, refreshToken } from "../../controllers/auth";
import { asyncHandler } from "../../middlewares/errorHandling";
import { verifyTokenMiddleware, verifyRefreshTokenMiddleware } from "../../middlewares/jwtHelper";

const router: Router = Router()

router.post('/login', asyncHandler(login))
router.get('/logout', verifyTokenMiddleware, asyncHandler(logout))
router.post('/register', asyncHandler(register))
router.post('/refresh-token', verifyRefreshTokenMiddleware , asyncHandler(refreshToken))

export default router