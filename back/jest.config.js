// "_moduleAliases": {
//   "@root": ".",
//   "@models": "./models",
//   "@routes": "./routes",
//   "@lib": "./lib",
//   "@config": "./config",
//   "@middlewares": "./middlewares"
// }

module.exports = {
  roots: ["<rootDir>/"],
  moduleNameMapper: {
    "@models/(.*)": "<rootDir>/models/$1",
    "@routes/(.*)": "<rootDir>/routes/$1",
    "@lib/(.*)": "<rootDir>/lib/$1",
    "@config/(.*)": "<rootDir>/config/$1",
    "@middlewares/(.*)": "<rootDir>/middlewares/$1",
    "@root/(.*)": "<rootDir>/$1",
  },
};
