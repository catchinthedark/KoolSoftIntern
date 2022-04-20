"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployee = exports.updateEmployee = exports.addEmployee = exports.getEmployees = void 0;
const employee_1 = __importDefault(require("../../models/employee"));
const getEmployees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employees = yield employee_1.default.find();
        res
            .status(200)
            .json(employees);
    }
    catch (err) {
        throw err;
    }
});
exports.getEmployees = getEmployees;
const addEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const employee = new employee_1.default({
            name: body.name,
            username: body.username,
            email: body.email,
            address: body.address,
            phone: body.phone,
            website: body.website,
            company: body.company
        });
        const newEmployee = yield employee.save();
        const allEmployees = yield employee_1.default.find();
        res
            .status(201)
            .json({ message: "Employee added", employee: newEmployee, employees: allEmployees });
    }
    catch (err) {
        throw err;
    }
});
exports.addEmployee = addEmployee;
const updateEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id }, body } = req;
        const updatedEmployee = yield employee_1.default.findByIdAndUpdate({ _id: id }, body);
        const allEmployees = yield employee_1.default.find();
        res
            .status(200)
            .json({ message: "Employee updated", employee: updatedEmployee, employees: allEmployees });
    }
    catch (err) {
        throw err;
    }
});
exports.updateEmployee = updateEmployee;
const deleteEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedEmployee = yield employee_1.default.findByIdAndDelete(req.params.id);
        const allEmployees = yield employee_1.default.find();
        res.status(200)
            .json({ message: "Employee deleted", employee: deletedEmployee, employees: allEmployees });
    }
    catch (err) {
        throw err;
    }
});
exports.deleteEmployee = deleteEmployee;
