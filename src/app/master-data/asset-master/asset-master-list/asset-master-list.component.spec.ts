import {ComponentFixture, TestBed,
               async, inject, fakeAsync, tick} from '@angular/core/testing';
import { FormSubmitEvent } from '../../../shared/custom-events/form-submit-event';
import { Headers, Http, RequestOptions } from '@angular/http';

import { AssetMasterListComponent } from './asset-master-list.component';
//import { CustomerMasterService } from '../customer-master.service';

describe('Component: AssetMasterListComponent', () => {
    let comp: AssetMasterListComponent;
    //let _aslc: AssetSupplierListComponent;
    let formSubmitEvent: FormSubmitEvent;

    beforeEach(() => {
       // _aslc = new StubService as any as CustomerMasterService;
        //comp = new CustomerListComponent(_cms);
        formSubmitEvent = new FormSubmitEvent();
        comp.ngOnInit();
    });

    it('should create an instance', () => {
        expect(comp).toBeTruthy();
    });

    it('Should fetch the customer list', () => {
        expect(comp.columns[0].name).toBe('Customer Name');
        expect(comp.columns[0].attr).toBe('name');
        
        expect(comp.columns.length).toBe(1);
    });
});

class StubService {
    customer: any;

    constructor() {
        this.customer = [
            {
                id: 2,
                name: 'Name 1'
            },
            {
                id: 3,
                name: "name 2",
            }
        ];
    }

    all(): Promise<any> {
        return Promise.resolve(this.customer);
    }
}











// describe('AssetMasterListComponent', () => {
//   let component: AssetMasterListComponent;
//   let fixture: ComponentFixture<AssetMasterListComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ AssetMasterListComponent ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(AssetMasterListComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should be created', () => {
//     expect(component).toBeTruthy();
//   });
// });
