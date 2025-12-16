import { BrowserRouter, Routes, Route } from "react-router";

import {
	Home,
	NewVendor,
	NewCategory,
	EditVendor,
	EditCategory,
} from "./pages";

export const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/new-vendor" element={<NewVendor />} />
				<Route path="/edit-vendor/:id" element={<EditVendor />} />
				<Route path="/new-category" element={<NewCategory />} />
				<Route path="/edit-category/:id" element={<EditCategory />} />
			</Routes>
		</BrowserRouter>
	);
};
