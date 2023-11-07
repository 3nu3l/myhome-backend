const { transporter } = require('../middlewares/config/email');

exports.send = async (email, subject, text) => {
    try {
        let info = await transporter.sendMail({
            from: '"My Home App"',
            to: email,
            subject: subject,
            text: text
            //html: "<b>Hello world?</b>", // html body
        });
    }
    catch (error) {
        console.log("error al enviar el email: " + error.message);
    }
};