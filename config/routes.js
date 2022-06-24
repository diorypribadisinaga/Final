
const express = require('express')
const upload = require("../upload");
const {Users} = require("../app/models")
const uploadOnMemory = require("../uploadOnMemory");
const cloudinary = require("../cloudinary");

// const{UserController} = require("./controllers")
const controllers = require("../app/controllers"); 
const router = express.Router();
const apiRouter = express.Router();

router.get("/",controllers.api.v1.usercontrollers.handleListUser)

// router.get("/whoami",usercontroller.whoAmI)

router.get("/user", controllers.api.v1.usercontrollers.authorize,controllers.api.v1.usercontrollers.whoAmI);
// router.get("/users", controllers.api.v1.usercontrollers.verifyToken,controllers.api.v1.usercontrollers.handleListUser);
router.get("/user/:id",controllers.api.v1.usercontrollers.handleGetUser)
router.get("/usernama/:email",controllers.api.v1.usercontrollers.handleGetUserNama)
router.post("/login", controllers.api.v1.usercontrollers.handleLogin);
router.post("/register",controllers.api.v1.usercontrollers.handleCreateUser)
router.put("/update/:id",controllers.api.v1.usercontrollers.handleUpdateuser)
// router.get("/user/:id",controllers.api.v1.usercontrollers.handleGetUser)
router.delete("/deleteuser/:id",controllers.api.v1.usercontrollers.handleDeleteUser)
router.get("/token",controllers.api.v1.usercontrollers.refreshToken)
router.delete("/logout",controllers.api.v1.usercontrollers.logout)

router.put("/gambar/:id",upload.single("image"),async (req,res)=>{
    try {
        const {nama,kota,alamat,nomor_hp} = req.body
        // let user = {nama:nama,password:password,kota:kota,alamat:alamat,nomor_hp:nomor_hp,image:image}
        // user =  JSON.stringify(user)
        const ada = await userService.find(req.params.id)
        if(ada==null){
            res.status(404).json({msg:"Data Tidak Ada"})
            return
        }
        await Users.update({
            nama:nama,
            kota:kota,
            alamat:alamat,
            nomor_hp:nomor_hp,
            image:req.body.image
        },{where:{id:req.params.id}})
        
        res.json({msg:"Berhasil di Updated"})
    } catch (error) {
        console.log(error)
        res.json({msg:error})
    }
})


router.put(
    "/api/v1/profiles/:id/image",
    upload.single("image"),
    (req, res) => {
    const url = `/uploads/${req.file.filename}`;
    res
        .status(200)
        .json({ message: "Foto berhasil di-upload, silahkan cek URL", url });
    }
);

router.put(
    "/api/v1/profiles/:id/image/cloudinary",
    uploadOnMemory.single("image"),
    (req, res) => {
    const fileBase64 = req.file.buffer.toString("base64");
    const file = `data:${req.file.mimetype};base64,${fileBase64}`;

    cloudinary.uploader.upload(file, function (err, result) {
        if (!!err) {
        console.log(err);
        return res.status(400).json({
            message: "Gagal upload file!",
        });
    }

    res.status(201).json({
        message: "Upload image berhasil",
        url: result.url,
        });
    });
    }
);

apiRouter.use(router);
apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter