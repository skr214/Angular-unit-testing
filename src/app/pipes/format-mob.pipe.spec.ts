import { FormatMobPipe } from "./format-mob.pipe"

describe("FormatMobileNumberPipe",()=>{

    it("should format number bydefault to INR",()=>{
        const pipe = new FormatMobPipe();
        const res = pipe.transform(123456);
        expect(res).toEqual("+91-123456");
    })

    it("should format number to USA",()=>{
        const pipe = new FormatMobPipe();
        const res = pipe.transform(987654,'USA');
        expect(res).toEqual("+1-987654");
    })

})