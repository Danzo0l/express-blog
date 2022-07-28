export const loadFile = (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
}