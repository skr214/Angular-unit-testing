import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";
import { TestBed } from "@angular/core/testing";

describe("calculator service",()=>{

    let logger : jasmine.SpyObj<LoggerService>;
    let calService : CalculatorService

    beforeEach(()=>{
        logger = jasmine.createSpyObj("LoggerService",['log']);
        // calService = new CalculatorService(logger);

        TestBed.configureTestingModule({
            providers:[
                CalculatorService,
                {provide:LoggerService,useValue:logger}
            ]
        })
        calService = TestBed.inject(CalculatorService);
    })

    it("add two number",()=>{
        const res = calService.add(4,5);
        expect(res).toBe(9);
        expect(logger.log).toHaveBeenCalledTimes(1);
    })

    it("multiply two number",()=>{
        const res = calService.multiply(2,3);
        expect(res).toBe(6);
        expect(logger.log).toHaveBeenCalledTimes(1);
    })
})