import React, { ReactNode, createContext, useState } from "react";

const AppContext = React.createContext<any>(null);

interface Props {
	children?: ReactNode;
}

function AppContextProvider({ children }: Props) {
	const [loading, setLoading] = useState(false);

	return (
		<AppContext.Provider
			value={{
				loading,
				setLoading,
			}}
		>
			{children}
		</AppContext.Provider>
	);
}

export { AppContextProvider, AppContext };
