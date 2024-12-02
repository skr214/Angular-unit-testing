import { HttpErrorResponse, provideHttpClient } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { CommentsService } from "./comments.service";
import { API_URL } from "../utils/resources";

describe("Commaents service",()=>{

    let commentsSevice : CommentsService;
    let httpTesting : HttpTestingController;

    beforeEach(()=>{
        TestBed.configureTestingModule({
        providers: [
            CommentsService,
            provideHttpClient(),
            provideHttpClientTesting(),
        ],
        });
        commentsSevice = TestBed.inject(CommentsService);
        httpTesting = TestBed.inject(HttpTestingController);
    })

    afterEach(()=>{
        httpTesting.verify();
    })

    it("should get comments",()=>{

        const commentData = [
            {
            "id": "1",
            "text": "a comment about post 1"
            },
            {
            "id": "2",
            "text": "another comment about post 1"
            }
        ]

        commentsSevice.getAllComments().subscribe((allComment:any)=>{
            expect(allComment).toBeTruthy();
            expect(allComment.length).toBe(2);
        })
        const req = httpTesting.expectOne(`${API_URL}/comments`);
        expect(req.request.method).toBe('GET');
        req.flush(commentData);
    })

    it("should get comment by id",()=>{

        const comment = {
            "id": "1",
            "text": "a comment about post 1"
        }

        const id = 1;
        
        commentsSevice.getCommentById(id).subscribe((comment:any)=>{
            expect(comment).toBeTruthy();
            expect(comment.text).toBe("a comment about post 1");
        })
        const req = httpTesting.expectOne(`${API_URL}/comments/${id}`);
        expect(req.request.method).toBe('GET');
        req.flush(comment);
    })

    it("should save comment",()=>{

        const payload = {
            "id": 10,
            "text": "a comment about post 10"
        }
        
        commentsSevice.postComment(payload).subscribe((comment:any)=>{
            expect(comment).toBeTruthy();
            expect(comment.text).toBe("a comment about post 10");
        })
        const req = httpTesting.expectOne(`${API_URL}/comments`);
        expect(req.request.method).toBe('POST');
        req.flush(payload);
    })

    it("should give error",()=>{

        const payload = {
            "id": 10,
            "text": "a comment about post 10"
        }
        
        commentsSevice.postComment(payload).subscribe(
            {
                next:()=>{
                    fail("Save comment should have failed");
                },

                error:(err:HttpErrorResponse)=>{
                    expect(err.status).toBe(500);
                    expect(err.statusText).toEqual("Internal Server Error!");
                }
            }
        )
        const req = httpTesting.expectOne(`${API_URL}/comments`);
        expect(req.request.method).toBe('POST');
        req.flush("Failed",{status:500,statusText:"Internal Server Error!"});
    })

    

})