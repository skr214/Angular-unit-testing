import { LoggerService } from "./logger.service";

describe("Logger Service",()=>{

    it("should log the message",()=>{

        spyOn(console,"log");

        const message = "Angular";
        const logger = new LoggerService();
        logger.log(message);

        expect(console.log).toHaveBeenCalledTimes(1);
        expect(console.log).toHaveBeenCalledWith(`LOGGER LOG:${message}`);
    })

})