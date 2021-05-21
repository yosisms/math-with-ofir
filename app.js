"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = __importStar(require("dotenv"));
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
dotenv.config({ path: __dirname + '../.env' });
var app = express_1.default();
app.use(express_1.default.static('public'));
app.get('/', function (req, res) {
    res.sendFile(path_1.default.join(__dirname, 'public', 'projects', 'math-with-ofir', 'index.html'));
});
app.get('/style.css', function (req, res) {
    res.sendFile(path_1.default.join(__dirname, 'public', 'projects', 'math-with-ofir', 'style.css'));
});
app.get('/script.js', function (req, res) {
    res.sendFile(path_1.default.join(__dirname, 'public', 'projects', 'math-with-ofir', 'script.js'));
});
var PORT = process.env.PORT || 4000;
app.listen(PORT, function () { return console.log('app listening on port ' + PORT); });
