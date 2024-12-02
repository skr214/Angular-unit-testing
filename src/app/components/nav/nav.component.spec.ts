import { ComponentFixture, fakeAsync, flush, TestBed } from "@angular/core/testing";
import { NavComponent } from "./nav.component";
import { routes } from '../../app.routes';
import { provideRouter, Router, RouterLink } from "@angular/router";
import { By } from "@angular/platform-browser";

//Routing testing
describe("NavComponent",()=>{

    let fixture : ComponentFixture<NavComponent>;
    let component : NavComponent;
    let router : Router;
    let linkDes : any;
    let routerLinks : any;

    beforeEach(async ()=>{

        await TestBed.configureTestingModule({
            imports:[NavComponent],
            providers:[
                provideRouter(routes)
            ]

        }).compileComponents();

        fixture = TestBed.createComponent(NavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        router = TestBed.inject(Router);

        // find DebugElements with an attached RouterLinkStubDirective
        linkDes = fixture.debugElement.queryAll(By.directive(RouterLink));
        // get attached link directive instances
        // using each DebugElement's injector
        routerLinks = linkDes.map((de:any) => de.injector.get(RouterLink));

    })

    it("should have 2 route",()=>{
        expect(routerLinks.length).withContext("should have 2 route").toBe(2);
    })

    it("should have each route correct href",()=>{
        expect(routerLinks[0].href).toBe('/');
        expect(routerLinks[1].href).toBe('/about');
    })

    it("should have bydefault route is home ",()=>{
        expect(router.url).toBe('/');
    })

    it("should redirect to about page on clicking on About button ",fakeAsync(()=>{

        const aboutButton = linkDes[1];
        aboutButton.triggerEventHandler('click',{button:0});
        flush();
        expect(router.url).toBe('/about');
    }))


})