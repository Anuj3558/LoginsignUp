import UserInfo from "../models/user.js";
import { v4 as uuidv4 } from 'uuid';
import { setUniqueId, getUserFromId } from "../service/auth.js";
import bcrypt from "bcrypt";
import multer from "multer"
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./uploads");

    },
    filename:(req,file,cb)=>{
        const uniqueName = Date.now()+"-"+Math.round(Math.random() * 10)
        cb(null,file.feildname+'-'+uniqueName);
    }
})
const upload  = multer({storage});
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const HandelRegister = async (req, res) => {
    try {

        const { userEmail, userPassword, userName } = req.body;
        if (!userEmail || !userPassword) {
            res.status(400).send("All feilds are requried ");
        }
        else {
            try {
                bcrypt.hash(userPassword, saltRounds, async (err, hash) => {
                    const User = await UserInfo.create({
                        name: userName,
                        email: userEmail,
                        password: hash
                    })
                    console.log(User);
                    res.send(User);
                });

                
            }
            catch (err) {
                console.log(err)
                res.status(400).send(err);
            }

        }
    }
    catch (err) {
        console.log("Error : " + err);
        res.send("Error : " + err)
    }


}


const HandleLogin = async (req, res) => {
    try {
        // Destructure userEmail and userPassword from req.body
        const { userEmail, userPassword } = req.body;

        // Log the incoming request body for debugging
        console.log('Request Body:', req.body);

        // Fetch the user from the database
        const user = await UserInfo.find({ email: userEmail });

        // Check if user is found
        if (user.length === 0) {
            return res.status(404).send('User not found');
        }
//Anuj@2004
//anujloharkar3557@gmail.com
        // Log the fetched user object
        console.log('Fetched User:', user);

        // Check the password
        bcrypt.compare(userPassword,user[0].password , function(err, result) {
            console.log(result);
            if (result) {
                const uniqueId = uuidv4();
                console.log('Generated Unique ID:', uniqueId);
    
                // Set the unique ID in a cookie
                res.cookie('_id', uniqueId, { httpOnly: true, secure: true, sameSite: 'strict' });
                console.log('Cookie set:', uniqueId);
    
                // Send a success response
                res.status(200).json({ _id: uniqueId });
            } else {
                res.status(401).send('Incorrect password');
            }
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send(`Error: ${err.message}`);
    }
};

const handleAuth = async (req, res) => {
    if (!req.cookies._id) {
        res.send(false);
    }
    else { res.send(true); }
}
const handleforgotPass = async(req,res) =>{
    const email =req.body.email;
    console.log(email);
    const User = await UserInfo.find({email:email});
  
    if(User.length==0){
        res.status(401).send("User not found")
    }
    else {
        res.status(200).send("Request granted");
    }

}
const handlefileUpload =(req,res)=>{
    console.log(req.body);
    console.log(req.file);
    return res.status(200).redirect("http://localhost:3000");

}
export { HandelRegister, HandleLogin, handleAuth,handleforgotPass,handlefileUpload };