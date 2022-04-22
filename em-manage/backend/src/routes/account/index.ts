import { Router } from "express";
import { getAccounts, updateAccount, deleteAccount, getMe } from "../../controllers/account";
import { asyncHandler } from "../../middlewares/errorHandling";
import { verifyTokenMiddleware } from '../../middlewares/jwtHelper'

const router: Router = Router()

router.get('/all', asyncHandler(getAccounts))
router.put('/update/:id', asyncHandler(updateAccount))
router.delete('/delete/:id', asyncHandler(deleteAccount))
router.get('/me', verifyTokenMiddleware, asyncHandler(getMe))

export default router