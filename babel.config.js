const path = require("path");

// module.exports = (env, options) => ({
// 	resolve: {
// 		alias: {
// 			"@": path.resolve(__dirname, "./src"),
// 		},
// 		extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
// 	},
// });

module.exports = {
	presets: ["module:metro-react-native-babel-preset"],
	plugins: [
		[
			require.resolve("babel-plugin-module-resolver"),
			{
				root: ["./src/"],
				alias: {
					"@": path.resolve(__dirname, "./src"), // This works for me in my project
					// "pages": "./Page", // This is as per documentation
				},
			},
		],
	],
};
