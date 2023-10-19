import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
import { CreateCategoryController, categoryControlller, deleteCategoryCOntroller, singleCategoryController, updateCategoryController } from '../controllers/categoryController.js';

const router = express.Router();

//routes

//create-category
router.post('/create-category',requireSignIn, isAdmin, CreateCategoryController);

//update-category
router.put('/update-category/:id',requireSignIn, isAdmin, updateCategoryController);

//get All Category
router.get('/get-category', categoryControlller);

//Get single Category
router.get('/single-category:/slug', singleCategoryController);

//Delete Category
router.delete('/delete-category/:id',requireSignIn, isAdmin, deleteCategoryCOntroller);


export default router;