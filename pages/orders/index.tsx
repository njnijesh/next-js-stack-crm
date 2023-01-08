import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Container } from '@mui/material';
import { GetStaticProps, NextPage } from 'next';
import { getCustomers } from '../api/customers';
import { Customer, Order } from '../customers';

const columns: GridColDef[] = [
	{ field: 'id', headerName: 'ID', width: 220 },
	{
		field: 'customer',
		headerName: 'Customer',
		width: 150,
		editable: true,
	},
	{
		field: 'description',
		headerName: 'Description',
		width: 500,
		editable: true,
	},
	{
		field: 'price',
		headerName: 'Price',
		type: 'number',
		width: 110,
		editable: true,
		sortable: true,
	},
	// {
	// 	field: 'fullName',
	// 	headerName: 'Full name',
	// 	description: 'This column has a value getter and is not sortable.',
	// 	sortable: false,
	// 	width: 160,
	// 	valueGetter: (params: GridValueGetterParams) =>
	// 		`${params.row.firstName || ''} ${params.row.lastName || ''}`,
	// },
];

const rows = [
	{ id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
	{ id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
	{ id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
	{ id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
	{ id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
	{ id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
	{ id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
	{ id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
	{ id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export const getStaticProps: GetStaticProps = async () => {
	const data = await getCustomers();
	let orders: any = []; //Order[] = [];
	data.forEach((customer: Customer) => {
		if (customer.orders) {
			customer.orders.forEach((order: Order) => {
				console.log(order);
				orders.push({
					...order,
					customer: customer.name,
					id: order._id,
					price: Number(order.price.$numberDecimal),
				});
			});
		}
	});
	return {
		props: {
			orders: orders,
			// .map((customer: Customer) => {
			// 	return customer.orders || null;
			// })
			// .flat(1)
			// .filter((order: Order) => {
			// 	return order !== null;
			// }),
		},
		revalidate: 60,
	};
};

const Orders: NextPage = (props: any) => {
	console.log(props);
	return (
		<Container>
			<Box sx={{ height: 400, width: '100%' }}>
				<DataGrid
					rows={props.orders}
					columns={columns}
					pageSize={5}
					rowsPerPageOptions={[5]}
					checkboxSelection
					disableSelectionOnClick
					experimentalFeatures={{ newEditingApi: true }}
				/>
			</Box>
		</Container>
	);
};

export default Orders;
