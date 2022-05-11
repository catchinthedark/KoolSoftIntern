import { Router } from "express";
import { getAccounts, updateAccount, deleteAccount, getAccount } from "../../controllers/account";
import { asyncHandler } from "../../middlewares/errorHandling";
import { verifyTokenMiddleware } from '../../middlewares/jwtHelper'

const router: Router = Router()

router.get('/all', verifyTokenMiddleware, asyncHandler(getAccounts))
router.put('/update/', verifyTokenMiddleware, asyncHandler(updateAccount))
router.delete('/delete', verifyTokenMiddleware, asyncHandler(deleteAccount))
router.put('/get', verifyTokenMiddleware, asyncHandler(getAccount))

export default router