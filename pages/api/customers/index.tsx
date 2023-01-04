import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import { Customer } from '../../customers';

type Return = {
	customers: Customer[];
};

export const getCustomers = async () => {
	const mongoClient = await clientPromise;
	const data = (await mongoClient
		.db()
		.collection('customers')
		.find()
		.toArray()) as Customer[];
	return JSON.parse(JSON.stringify(data));
};

export default async (req: NextApiRequest, res: NextApiResponse<Return>) => {
	const data = await getCustomers();
	res.status(200).json({ customers: data });
};
