import { Router } from 'express';
import Razorpay from 'razorpay';
import { createHmac } from 'crypto';
import { Schema, model } from 'mongoose';

const payment_router = Router();

const PaymentDetailsSchema = Schema({
  razorpayDetails: {
    orderId: String,
    paymentId: String,
    signature: String,
  },
  success: Boolean,
});

const PaymentDetails = model('paymentDetails', PaymentDetailsSchema);

payment_router.post('/orders', async (req, res) => {
const {amt}=req.body;

  try {
    const instance = new Razorpay({
      key_id: 'rzp_test_VriOzbggcgpNkd', // YOUR RAZORPAY KEY
      key_secret:'usfengvZEIrGNA7ic9M3MN4e', // YOUR RAZORPAY SECRET
    });

    const options = {
      amount: amt*100,
      currency: 'INR',
      receipt: 'receipt_order_74394',
    };

    const order = await instance.orders.create(options);

    if (!order) return res.status(500).send('Some error occured');

    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

payment_router.post('/success', async (req, res) => {
  try {
    const {
      orderCreationId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
    } = req.body;

    const shasum = createHmac('sha256', 'usfengvZEIrGNA7ic9M3MN4e');
    shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
    const digest = shasum.digest('hex');

    if (digest !== razorpaySignature)
      return res.status(400).json({ msg: 'Transaction not legit!' });

    const newPayment = PaymentDetails({
      razorpayDetails: {
        orderId: razorpayOrderId,
        paymentId: razorpayPaymentId,
        signature: razorpaySignature,
      },
      success: true,
    });

    await newPayment.save();

    res.json({
      msg: 'success',
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

export default payment_router;
