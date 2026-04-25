import { Router } from 'express';
import * as bookingController from '../controllers/booking.controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.post('/', bookingController.createBooking);
router.get('/', authMiddleware, bookingController.getBookings);
router.delete('/:id', authMiddleware, bookingController.deleteBooking);

export default router;
