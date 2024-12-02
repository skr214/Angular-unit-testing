import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HighlightDirective } from "./highlight.directive";


@Component({
    selector:"test-component",
    standalone:true,
    imports: [HighlightDirective],
    template:`<div appHighlight>Testing</div>`
})
class TestComponent{}

describe("HighlightDirective",()=>{

    let fixture : ComponentFixture<TestComponent>;
    let component : TestComponent;
    let divElement:HTMLElement;

    beforeEach(async ()=>{

        await TestBed.configureTestingModule({
            imports:[TestComponent]

        }).compileComponents();

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        divElement = fixture.nativeElement.querySelector("div");
        fixture.detectChanges();
    })

    it("should check color of text is red",()=>{
        expect(divElement.style.backgroundColor).toBe("red");
    })

    it("should check size of text should be 20px on mouseleave",()=>{
        divElement.dispatchEvent(new Event('mouseleave'));
        expect(divElement.style.fontSize).toBe("20px");
    })

    it("should check size of text should be 30px on mouseenter",()=>{
        divElement.dispatchEvent(new Event('mouseenter'));
        expect(divElement.style.fontSize).toBe("30px");
    })

})