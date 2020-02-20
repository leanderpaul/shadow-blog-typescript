import { Router, Request, Response } from 'express';

const router: Router = Router();

router.use('*', (_req: Request, res: Response) => res.status(404).json({ msg: 'Page not found !' }));

export default router;
