import { SelectionModel } from '@angular/cdk/collections';
import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JsonApiDatastore, JsonApiModel } from '@ngx-material-dashboard/json-api';

import { Datastore } from '../../../../../test/mocks/datastore.service';
import { DummyObject } from '../../../../../test/mocks/dummy-object.mock';
import { TableToolbarButton } from '../../interfaces/table-toolbar-button.interface';
import { DELETE_TOOLBAR_BUTTON, EDIT_TOOLBAR_BUTTON } from '../table-toolbar-buttons';
import { SelectionService } from './selection.service';

describe('SelectionService', () => {
    let jsonApiDatastore: JsonApiDatastore;
    let service: SelectionService<JsonApiModel>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                { provide: JsonApiDatastore, useValue: Datastore }
            ]
        });
        service = TestBed.inject(SelectionService);
        jsonApiDatastore = TestBed.inject(JsonApiDatastore);
    });

    describe('No Selections Initially', () => {
        it('should return empty selection by default', () => {
            expect(service.selectionValue.selected).toEqual([]);
        });

        it('should disable given buttons when toggleButtons called', () => {
            // given: an array of toolbar buttons
            const buttons: TableToolbarButton[] = [EDIT_TOOLBAR_BUTTON];

            // when: the toggleButtons method is called
            service.toggleButtons(true, buttons);

            // then: the buttons should be disabled
            buttons.forEach((button: TableToolbarButton) => {
                expect(button.disabled).toBeTrue();
            });
        });

        it('should enable given buttons when toggleButtons called', () => {
            // given: an array of disabled toolbar buttons
            const editButton: TableToolbarButton = EDIT_TOOLBAR_BUTTON;
            editButton.disabled = true;
            const buttons: TableToolbarButton[] = [editButton];

            // when: the toggleButtons method is called
            service.toggleButtons(false, buttons);

            // then: the buttons should be enabled
            buttons.forEach((button: TableToolbarButton) => {
                expect(button.disabled).toBeFalse();
            });
        });

        it('should disable buttons that do not allow multiple selections if enabling buttons', () => {
            // given: an array of enabled toolbar buttons that do not allow multiple selections
            const editButton: TableToolbarButton = EDIT_TOOLBAR_BUTTON;
            editButton.multiSelectDisabled = true;
            const buttons: TableToolbarButton[] = [editButton];

            // and: some dummy data
            const data: DummyObject[] = [new DummyObject(jsonApiDatastore, { id: '1' }), new DummyObject(jsonApiDatastore, { id: '2' })];

            // and: multiple selections
            service.selectionSubject.next(new SelectionModel<JsonApiModel>(true, data));

            // when: the toggleButtons method is called
            service.toggleButtons(false, buttons);

            // then: the buttons that do not allow multiple selections should be disabled
            buttons.forEach((button: TableToolbarButton) => {
                expect(button.disabled).toBeTrue();
            });
        });

        // it('should not enable delete button if any selected values cannot be deleted', () => {
        //     // given: an array of toolbar buttons
        //     const buttons: TableToolbarButton[] = [DELETE_TOOLBAR_BUTTON];

        //     // and: some dummy data that contains values that cannot be deleted
        //     const o1 = new DummyObject('1');
        //     o1.deletable = false;
        //     const data: DummyObject[] = [o1, new DummyObject('2')];
        //     service.selectionSubject.next(new SelectionModel<JsonApiModel>(true, data));

        //     // when: the toggleButtons method is called
        //     service.toggleButtons(false, buttons);

        //     // then: the delete button should be disabled
        //     buttons.forEach((button: TableToolbarButton) => {
        //         expect(button.disabled).toBeTrue();
        //     });
        // });

        // it('should only enable delete button if all selected values can be deleted', () => {
        //     // given: an array of toolbar buttons
        //     const buttons: TableToolbarButton[] = [DELETE_TOOLBAR_BUTTON];

        //     // and: some dummy data
        //     const data: DummyObject[] = [new DummyObject('1'), new DummyObject('2')];
        //     service.selectionSubject.next(new SelectionModel<JsonApiModel>(true, data));

        //     // when: the toggleButtons method is called
        //     service.toggleButtons(false, buttons);

        //     // then: the delete button should be disabled
        //     buttons.forEach((button: TableToolbarButton) => {
        //         expect(button.disabled).toBeFalse();
        //     });
        // });
    });
});
