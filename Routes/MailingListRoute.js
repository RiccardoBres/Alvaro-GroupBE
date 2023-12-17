const express = require('express');
const mongoose = require('mongoose');
const validator = require('validator');
const MailingList = require('../Models/MailingList');

const router = express.Router();

///////// GET Mailing List /////////
router.get('/mailing-list', async (req, res) => {
    try {
        const mailingList = await MailingList.find();
        res.status(200).send({
            statusCode: 200,
            mailingList: mailingList,
        });
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal server error',
            error,
        });
    }
});

///////// POST Subscribe to Mailing List /////////
router.post('/mailing-list/subscribe', async (req, res) => {
    try {
        const { email } = req.body;
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }
        const existingEntry = await MailingList.findOne({ email });
        if (existingEntry) {
            return res.status(400).json({ error: 'EMAIL_ALREADY_SUBSCRIBED', message: 'Email is already subscribed' });
        }
        const newMailingListEntry = new MailingList({
            email,
            isSubscribed: true, 
        });
        const savedEntry = await newMailingListEntry.save();
        res.status(201).json({
            statusCode: 201,
            message: 'Email successfully subscribed',
            savedEntry
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

///////// PUT Unsubscribe from Mailing List /////////
router.put('/mailing-list/unsubscribe/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const existingEntry = await MailingList.findOne({ email });
        if (!existingEntry) {
            return res.status(404).json({ error: 'EMAIL_NOT_FOUND', message: 'Email not found in the mailing list' });
        }

        existingEntry.isSubscribed = false;
        await existingEntry.save();

        res.status(200).json({
            statusCode: 200,
            message: 'Email unsubscribed successfully',
            updatedEntry: existingEntry,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
