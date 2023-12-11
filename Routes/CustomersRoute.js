const express = require('express');
const router = express.Router();
const Customer  = require('../Models/CustomersModel');

// GET
router.get("/customers", async (req, res) => {
    try {
        const totalCustomers = await Customer.countDocuments();
        const customers = await Customer.find();

        res.status(200).send({
            statusCode: 200,
            meta: {
                totalCustomers: totalCustomers
            },
            customers: customers
        });
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error",
            error
        });
    }
});

// POST
router.post("/customers/create", async (req, res) => {
    const { name, surname, email, address, postal, city, purchases } = req.body;

    try {
        const existingCustomer = await Customer.findOne({
            name,
            surname,
            email,
            address,
            postal,
            city,
        });

        if (existingCustomer) {
            Object.keys(req.body).forEach(key => {
                if (existingCustomer[key] !== req.body[key]) {
                    existingCustomer[key] = req.body[key];
                }
            });

            existingCustomer.sent = false;
            const updatedCustomer = await existingCustomer.save();

            return res.status(200).send({
                statusCode: 200,
                message: "Customer updated successfully",
                payload: updatedCustomer
            });
        } else {
            const newCustomer = new Customer({
                name,
                surname,
                email,
                address,
                postal,
                city,
                purchases ,
                sent: false, 
            });

            const customer = await newCustomer.save();

            return res.status(201).send({
                statusCode: 201,
                message: "Customer saved successfully",
                payload: customer
            });
        }
    } catch (error) {
        return res.status(500).send({
            statusCode: 500,
            message: "Internal server error",
            error,
        });
    }
});


// DELETE
router.delete("/customers/:customerId", async (req, res) => {
    const customerId = req.params.customerId;

    try {
        const deletedCustomer = await Customer.findByIdAndDelete(customerId);

        if (!deletedCustomer) {
            return res.status(404).send({
                statusCode: 404,
                message: "Customer not found",
            });
        }

        await Merchandising.updateMany(
            { purchasedItems: customerId },
            { $pull: { purchasedItems: customerId } }
        );

        res.status(200).send({
            statusCode: 200,
            message: "Customer deleted successfully",
            payload: deletedCustomer
        });
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error",
            error,
        });
    }
});

//// PUT ////

router.put('/:customerId/markAsSent', async (req, res) => {
    const customerId = req.params.customerId;

    try {
        const customer = await Customer.findById(customerId);
        
        if (!customer) {
            return res.status(404).json({
                statusCode: 404,
                message: 'Customer not found',
            });
        }
        customer.sent = true;
        
        await customer.save();

        res.status(200).json({
            statusCode: 200,
            message: 'Order marked as sent',
            customer: customer,
        });
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: 'Internal server error',
            error: error,
        });
    }
});

module.exports = router;
