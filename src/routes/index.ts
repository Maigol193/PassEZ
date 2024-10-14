import { Router } from 'express';
const router = Router();

router.get('', (req, res) => {
    res.send('api works');
});

export default router;