"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const account_1 = __importDefault(require("./routes/account"));
const cv_1 = __importDefault(require("./routes/cv"));
const profile_1 = __importDefault(require("./routes/profile"));
const auth_1 = __importDefault(require("./routes/auth"));
const errorHandling_1 = require("./middlewares/errorHandling");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
app.use('/account', account_1.default);
app.use('/cv', cv_1.default);
app.use('/profile', profile_1.default);
app.use('/auth', auth_1.default);
app.use(errorHandling_1.errorHandler);
app.use(errorHandling_1.notFoundHandler);
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
mongoose_1.default
    .connect(uri)
    .then(() => app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)))
    .catch(error => {
    throw error;
});
