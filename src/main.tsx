import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "@/api/client";
import { Toaster } from "@/components";

import { App } from "./App";
import "./main.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<Toaster />
			<App />
		</QueryClientProvider>
	</StrictMode>
);
