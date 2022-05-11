import { Router } from "express";
import { getAccounts, updateAccount, deleteAccount, getAccount } from "../../controllers/account";
import { asyncHandler } from "../../middlewares/errorHandling";
import { verifyTokenMiddleware } from '../../middlewares/jwtHelper'

const router: Router = Router()

router.get('/all', verifyTokenMiddleware, asyncHandler(getAccounts))
router.put('/update/', verifyTokenMiddleware, asyncHandler(updateAccount))
router.delete('/delete/:id', verifyTokenMiddleware, asyncHandler(deleteAccount))
router.get('/:id', verifyTokenMiddleware, asyncHandler(getAccount))

export default router