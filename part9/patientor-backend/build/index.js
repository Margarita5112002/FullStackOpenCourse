"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const diagnoses_1 = __importDefault(require("./routes/diagnoses"));
const PORT = 3001;
const app = (0, express_1.default)();
app.use(express_1.default.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use((0, cors_1.default)());
app.get('/api/ping', (_req, res) => {
    res.send('pong');
});
app.use('/api/diagnosis', diagnoses_1.default);
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
