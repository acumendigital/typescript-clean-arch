import {Logger, ILogObj } from "tslog";

export function initLogger(): Logger<ILogObj> {
    return new Logger();
}