const express = require("express");
const mongoose = require("mongoose");
const EventModel = require('../Models/EventModel');
const VerifyToken = require('../Middleware/VerifyToken');
const EventImage = require('../Middleware/UploadImageEvent');

const router = express.Router();

/////// GET ////////
router.get("/events", async (req, res) => {
    try {
        const events = await EventModel.find();
        const totalEvents = await EventModel.countDocuments();

        res.status(200).send({
            statusCode: 200,
            meta: {
                totalEvents: totalEvents
            },
            events: events
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
router.get("/events/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const eventsById = await EventModel.findById(id)
        res.status(200).send({
            statusCode: 200,
            eventsById: eventsById
        })
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error",
            error,
        })
    }
});


/////////POST///////
router.post("/event/create", EventImage.single("image"), async (req, res) => {

    const newEvent = new EventModel({
        name: req.body.name,
        location: req.body.location,
        date: req.body.date,
        image: req.file.path,
        generalInfo: req.body.generalInfo,
    });
    try {
        const event = await newEvent.save();
        res.status(201).send({
            statusCode: 201,
            message: "Event saved successfully",
            payload: event
        })
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error",
            error,
        })
    }
});

///////////DELETE /////////////////
router.delete('/delete/event/:id', VerifyToken, async (req, res) => {
    const { id } = req.params;

    try {
        const event = await EventModel.findById(id);
        if (!event) {
            return res.status(404).send({
                statusCode: 404,
                message: `Event with id ${id} not found`,
            });
        }

        await EventModel.findByIdAndDelete(id);
        return res.status(200).send({
            statusCode: 200,
            message: `Event with id: ${id} deleted successfully`,
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