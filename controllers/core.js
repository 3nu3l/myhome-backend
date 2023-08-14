exports.healthcheck = async (req, res) => {
    return res.status(200).json({ success: true, message: 'Backend OK' });
};