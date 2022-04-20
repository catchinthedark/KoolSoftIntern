import { Router } from "express";
import { getAccounts, addAccount, updateAccount, deleteAccount } from "../../controllers/account";
import { asyncHandler } from "../../middlewares/errorHandling";

const router: Router = Router()

router.get('/all', asyncHandler(getAccounts))
router.post('/add', asyncHandler(addAccount))
router.put('/update/:id', asyncHandler(updateAccount))
router.delete('/delete/:id', asyncHandler(deleteAccount))

export default router