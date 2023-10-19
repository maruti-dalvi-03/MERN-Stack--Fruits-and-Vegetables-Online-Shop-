import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { forgotPasswordController, getAllOrdersController, getAllUsersController, getOrdersController, loginController, registerController, testController, updateProfileController } from "../controllers/authController.js";
import { orderStatusController } from "../controllers/productController.js";


//router object
const router = express.Router();

//router
//REGISTER || POST
router.post('/register', registerController);

//LOGIN || POST
router.post('/login', loginController);

//ForgotPass || POST
router.post('/forgot-password',forgotPasswordController);

//test routers
router.get("/test", requireSignIn, isAdmin, testController);

//protected user route auth
router.get('/user-auth', requireSignIn, (req,res) => {
    res.status(200).send({ok: true});
});

//protected admin route auth
router.get('/admin-auth', requireSignIn, isAdmin, (req,res) => {
    res.status(200).send({ok: true});
});

//Get All users List
router.get('/all-users', requireSignIn, isAdmin, getAllUsersController);

//user profile update
router.put('/profile', requireSignIn, updateProfileController)

//user orders 
router.get("/orders", requireSignIn, getOrdersController);

//all admin orders 
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

//status update
router.put('/order-status/:orderId', requireSignIn, isAdmin, orderStatusController)

export default router;