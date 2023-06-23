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
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongodbUserRepository = exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }
});
exports.User = (0, mongoose_1.model)('User', userSchema);
class mongodbUserRepository {
    echo(user) {
        return user;
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const usr = new exports.User({
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            });
            yield usr.save();
            user._id = usr._id.toString();
            return user;
        });
    }
}
exports.mongodbUserRepository = mongodbUserRepository;