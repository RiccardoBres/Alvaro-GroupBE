const express = require('express');
const mongoose = require('mongoose');
const MerchandisingModel = require('../Models/MerchandisingModel');
const VerifyToken = require('../Middleware/VerifyToken');
const UploadMerchImage = require('../Middleware/UploadImageMerchandising')
const router = express.Router();

//////////////GET //////////////////
router.get('/merchandising', async (req, res) => {
    try {
        const merchandising = await MerchandisingModel.find();
        const totalMerchandising = await MerchandisingModel.countDocuments();
        res.status(200).send({
            statusCode: 200,
            meta: {
                totalMerchandising: totalMerchandising
            },
            merchandising: merchandising
        });
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error",
            error
        });
    }
});

//////////////GET BY ID //////////////////
router.get("/merchandising/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const merchById = await MerchandisingModel.findById(id)
        res.status(200).send({
            statusCode: 200,
            merchById: merchById
        })
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error",
            error,
        })
    }
});

///////// POST /////////
router.post("/merch/create",UploadMerchImage.single("image"), async (req, res) => {
    const newMerch = new MerchandisingModel({
        name: req.body.name,
        image: req.file.path,
        size: req.body.size,
        price: req.body.price,
    });

    try {
        const merch = await newMerch.save();

        res.status(201).send({
            statusCode: 201,
            message: "Merchandising saved successfully",
            payload: merch
        });
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error",
            error
        });
    }
});
/////////// DELETE /////////////////
router.delete('/delete/merchandising/:id', VerifyToken, async (req, res) => {
    const { id } = req.params;

    try {
        const merchandising = await MerchandisingModel.findById(id);
        if (!merchandising) {
            return res.status(404).send({
                statusCode: 404,
                message: `Merchandising with id ${id} not found`,
            });
        }
        await MerchandisingModel.findByIdAndDelete(id);
        return res.status(200).send({
            statusCode: 200,
            message: `Merchandising with id: ${id} deleted successfully`,
        });
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error",
            error,
        });
    }
});


module.exports = router;