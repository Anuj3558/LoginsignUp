import express, { Router } from "express";

import {HandelRegister,HandleLogin,handleAuth,handleforgotPass,handlefileUpload} from "../controller/user.js"
const router =express.Router();
import multer from "multer"
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
     return   cb(null,"./uploads");

    },
    filename:(req,file,cb)=>{
        const uniqueName = Date.now()+"-"+file.originalname
      return  cb(null,file.feildname+'-'+uniqueName);
    }
})
const upload  = multer({storage});
router.post("/register",HandelRegister);
router.post("/login",HandleLogin);
router.get("/",handleAuth);
router.post('/upload',upload.single("ProfileImage"),handlefileUpload);



router.patch("/forgotpass",handleforgotPass);

export default router;