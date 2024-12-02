import { ComponentFixture, TestBed } from "@angular/core/testing"
import { CommentComponent } from "./comment.component"
import { CommentsService } from "../../services/comments.service";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";

describe("Comment Component",()=>{

    let commentService : jasmine.SpyObj<CommentsService>;
    let fixture : ComponentFixture<CommentComponent>;
    let comment : CommentComponent;
    let el : DebugElement;

    beforeEach(async ()=>{
        const commentSpy = jasmine.createSpyObj('CommentsService',['postComment','getAllComments']);
        await TestBed.configureTestingModule({
            imports:[CommentComponent],
            providers:[
                {provide:CommentsService,useValue:commentSpy}
            ]

        }).compileComponents();

        commentService = TestBed.inject(CommentsService) as jasmine.SpyObj<CommentsService>;
        fixture = TestBed.createComponent(CommentComponent);
        comment = fixture.componentInstance;
        el = fixture.debugElement;
    })

    it("should have input,button,h1 element",()=>{

        // expect(fixture.nativeElement.querySelector("input")).withContext("Can't find input element").toBeTruthy();
        // expect(fixture.nativeElement.querySelector("button")).withContext("Can't find button element").toBeTruthy();
        // expect(fixture.nativeElement.querySelector("h1").innerText).withContext("Text is not matching").toBe("welcome to comments section");

        //Other way to write above code with the help of jasmin DebugElement
        expect(el.query(By.css("input")).nativeElement).withContext("Can't find input element").toBeTruthy();
        expect(el.query(By.css("button")).nativeElement).withContext("Can't find button element").toBeTruthy();
        expect(el.query(By.css("h1")).nativeElement.innerText).withContext("Text is not matching").toBe("welcome to comments section");

    })

    it("should load comments on initialization",()=>{
        const comments = [
            {
            "id": "1",
            "text": "a comment about post 1"
            },
            {
            "id": "2",
            "text": "another comment about post 1"
            }
        ]

        commentService.getAllComments.and.returnValue(of(comments));
        fixture.detectChanges();
        expect(el.queryAll(By.css("li")).length).toBe(2);

    })

    it("should dispaly alert if comment text is empty on submition",()=>{

        spyOn(window,'alert');
        comment.text = "";
        comment.handleSubmit();
        expect(window.alert).toHaveBeenCalledOnceWith("Please add a comment");
        expect(commentService.postComment).not.toHaveBeenCalled();
    })

    it("should add comment on UI when user type and click on post btn",()=>{

        const comment = {id:1,text:"Comment for test"};

        //Prerequisite
        commentService.postComment.and.returnValue(of(comment));
        spyOn(Date,"now").and.returnValue(comment.id);

        commentService.getAllComments.and.returnValues(of([]));
        fixture.detectChanges();

        
        //Simulate user typing a comment(Step1)
        const inputElement : HTMLInputElement = fixture.nativeElement.querySelector("input");
        inputElement.value = comment.text;
        inputElement.dispatchEvent(new Event("input"));

        //Simulate user clicking on button(Step2)
        const btnElement:HTMLButtonElement = fixture.nativeElement.querySelector("button");
        btnElement.click();
        fixture.detectChanges();

        //Taking li count which is display all comments(Step3)
        const liElement = fixture.nativeElement.querySelectorAll("li");
        

        expect(liElement.length).toBe(1);
        expect(liElement[0].innerText).toBe("Comment for test");

    })
})