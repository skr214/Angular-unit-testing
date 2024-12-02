import { ComponentFixture, fakeAsync, flush, TestBed, tick, waitForAsync } from "@angular/core/testing";
import { UserComponent } from "./user.component";

describe("User Component",()=>{

    let fixture : ComponentFixture<UserComponent>;
    let comment : UserComponent;

    beforeEach(async ()=>{
        
        await TestBed.configureTestingModule({
            imports:[UserComponent],

        }).compileComponents();

        fixture = TestBed.createComponent(UserComponent);
        comment = fixture.componentInstance;
        
    })

    //Handeling asynchronous data
    it("should show usename after button click with the help of passing argumant to the function",(open)=>{
        const btnElement : HTMLButtonElement = fixture.nativeElement.querySelector("button");
        btnElement.click();

        setTimeout(()=>{
            expect(comment.username).toBe("Leanne Graham");
            open()
        },1000)
    })

    // it("should show usename after button click with fackAsyn() and tick()",fakeAsync(()=>{
    //     const btnElement : HTMLButtonElement = fixture.nativeElement.querySelector("button");
    //     btnElement.click();

    //     tick(1000);
    //     expect(comment.username).toBe("SKR");
    // }))

    // it("should show usename after button click with fackAsyn() and flush()",fakeAsync(()=>{
    //     const btnElement : HTMLButtonElement = fixture.nativeElement.querySelector("button");
    //     btnElement.click();

    //     flush();
    //     expect(comment.username).toBe("SKR");
    // }))

    //Difference between tick and flush is flush will work for promise as well

    //If you want to test http async call than we need to use waitForAsync()
    it("should show usename after button click with waitForAsync()",waitForAsync(()=>{
        const btnElement : HTMLButtonElement = fixture.nativeElement.querySelector("button");
        btnElement.click();

        fixture.whenStable().then(()=>{
            expect(comment.username).toBe("Leanne Graham");
        })
    
    }))
    
})

