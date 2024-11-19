import { Request, Response } from 'express';
import logger from '../logger';

export const loginOne = async (req: Request, res: Response) => {
  try {
    const foundUser = await userServices.login(req.body);
    return res.status(202).send(foundUser);
  } catch (error) {
    logger.error('servor error');
    return res.status(500).send('errorServer');
  }
};

export const registerOne = async (req: Request, res: Response) => {
  try {
    await userServices.register(req.body);
    res.status(200).send('Inserted successfully');
  } catch (error) {
    return res.status(500).send('error server');
  }
};
