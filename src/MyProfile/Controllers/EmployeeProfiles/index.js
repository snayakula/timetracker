const Images = require("../../Queries/EmployeeProfiles/index");

const GetProfileImages = async (req, res) => {
    let data = await Images.GetProfileImages()
    if (data.recordset.length === 0) {
        res.status(200).json({ isSuccess: false });
    } else {
        res.status(200).json({ isSuccess: true, Images: data.recordset });
    }
}

const GetProfilePictureById = async (req, res) => {
    if (req.body.FKId === null || req.body.FKId === undefined) {
        res.status(200).json({ isSuccess: false });
    } else {
        let data = await Images.GetProfileImageById(req.body.FKId)
        try {
            if (data.recordset.length !== 0) {
                res.status(200).json({
                    isSuccess: true,
                    profileimage: data.recordset,
                    message: "Image Found...!",
                });
            } else {
                res.status(200).json({ isSuccess: false, message: "Image Not Found...!" });
            }
        } catch (err) {
            res.status(200).json({ isSuccess: false });
        }
    }
}

const UploadProfilePicture = async (req, res) => {
    try {
        const { FKEmpId } = req.body;
        await Images.InsertProfileImage(req.file.filename, FKEmpId)
        res.status(200).json({ isSuccess: true, profileimage: req.file.filename });
    }
    catch (err) {
        console.log(err)
        res.status(422).json({ isSuccess: false, message: 'Please provide the correct file' })
    }
}

const UpdateProfilePicture = async (req, res) => {
    try {
        const { FKEmpId } = req.body;

        await Images.UpdateProfileImage(req.file.filename, FKEmpId)
        res.status(200).json({ isSuccess: true, profileimage: req.file.filename });
    }
    catch (err) {
        console.log(err)
        res.status(422).json({ isSuccess: false, message: 'Please provide the correct file' })
    }
}

const DeleteProfilePicture = async (req, res) => {
    await Images.DeleteProfileImageByFKId(req.body.FKEmpId)
    res.status(200).send({ isSuccess: true });
}

module.exports = {
    GetProfileImages,
    GetProfilePictureById,
    UploadProfilePicture,
    UpdateProfilePicture,
    DeleteProfilePicture
}