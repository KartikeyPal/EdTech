const {mailSender} = require('../utils/mailSender');

exports.contactUs = async (req,res)=>{
    try {
        const {firstName,lastName,phoneNo, message,email,countryCode} = req.body;
        if(!firstName || !lastName || !phoneNo || !message || !email || !countryCode){
            return res.status(403).json({
                success: false,
                message: "all fields are required",

            })
        }
        const res = await mailSender(email,"Mail send Successfully","ThankYou for contacting us")
        if(!res){
            return res.status(401).json({
                success:false,
                message: "error while sending email",
            })
        }
        return res.status(200).json({
            success:true,
            message: "Email send successfully",
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: error.message,
            error: error
        })
        
    }
}