const { transporter } = require('../middlewares/config/email');

exports.send = async (email, subject, text) => {
    try {
        await transporter.sendMail({
            from: '"My Home App"',
            to: email,
            subject: subject,
            text: text
        });
    } catch (error) {
        console.log("error al enviar el email: " + error.message);
        throw error;
    }
};
