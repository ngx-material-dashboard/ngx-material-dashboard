import { SelectionModel } from '@angular/cdk/collections';
import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JsonModel } from '@ngx-material-dashboard/base-json';
import { JsonDatastore } from '@ngx-material-dashboard/base-json';

import {
    Datastore,
    Task
} from '@ngx-material-dashboard/base-json/test/public-api';
import { ToolbarButton } from '../../toolbar/interfaces/toolbar-button.interface';
import {
    DELETE_TOOLBAR_BUTTON,
    EDIT_TOOLBAR_BUTTON
} from '../../toolbar/shared/toolbar-buttons';
import { SelectionService } from './selection.service';
import { getTaskData } from '@ngx-material-dashboard/testing';

describe('SelectionService', () => {
    let jsonApiDatastore: JsonDatastore;
    let service: SelectionService<JsonModel>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [{ provide: JsonDatastore, useValue: Datastore }]
        });
        service = TestBed.inject(SelectionService);
        jsonApiDatastore = TestBed.inject(JsonDatastore);
    });

    describe('No Selections Initially', () => {
        it('should return empty selection by default', () => {
            expect(service.selectionValue.selected).toEqual([]);
        });

        it('should disable given buttons when toggleButtons called', () => {
            // given: an array of toolbar buttons
            const buttons: ToolbarButton[] = [EDIT_TOOLBAR_BUTTON];

            // when: the toggleButtons method is called
            service.toggleButtons(true, buttons);

            // then: the buttons should be disabled
            buttons.forEach((button: ToolbarButton) => {
                expect(button.disabled).toBeTrue();
            });
        });

        it('should enable given buttons when toggleButtons called', () => {
            // given: an array of disabled toolbar buttons
            const editButton: ToolbarButton = EDIT_TOOLBAR_BUTTON;
            editButton.disabled = true;
            const buttons: ToolbarButton[] = [editButton];

            // when: the toggleButtons method is called
            service.toggleButtons(false, buttons);

            // then: the buttons should be enabled
            buttons.forEach((button: ToolbarButton) => {
                expect(button.disabled).toBeFalse();
            });
        });

        it('should disable buttons that do not allow multiple selections if enabling buttons', () => {
            // given: an array of enabled toolbar buttons that do not allow multiple selections
            const editButton: ToolbarButton = EDIT_TOOLBAR_BUTTON;
            editButton.multiSelectDisabled = true;
            const buttons: ToolbarButton[] = [editButton];

            // and: some dummy data
            const data: Task[] = getTaskData(2);

            // and: multiple selections
            service.selectionSubject.next(new SelectionModel<any>(true, data));

            // when: the toggleButtons method is called
            service.toggleButtons(false, buttons);

            // then: the buttons that do not allow multiple selections should be disabled
            buttons.forEach((button: ToolbarButton) => {
                expect(button.disabled).toBeTrue();
            });
        });

        // it('should not enable delete button if any selected values cannot be deleted', () => {
        //     // given: an array of toolbar buttons
        //     const buttons: ToolbarButton[] = [DELETE_TOOLBAR_BUTTON];

        //     // and: some dummy data that contains values that cannot be deleted
        //     const o1 = new Task('1');
        //     o1.deletable = false;
        //     const data: Task[] = [o1, new Task('2')];
        //     service.selectionSubject.next(new SelectionModel<JsonModel>(true, data));

        //     // when: the toggleButtons method is called
        //     service.toggleButtons(false, buttons);

        //     // then: the delete button should be disabled
        //     buttons.forEach((button: ToolbarButton) => {
        //         expect(button.disabled).toBeTrue();
        //     });
        // });

        // it('should only enable delete button if all selected values can be deleted', () => {
        //     // given: an array of toolbar buttons
        //     const buttons: ToolbarButton[] = [DELETE_TOOLBAR_BUTTON];

        //     // and: some dummy data
        //     const data: Task[] = [new Task('1'), new Task('2')];
        //     service.selectionSubject.next(new SelectionModel<JsonModel>(true, data));

        //     // when: the toggleButtons method is called
        //     service.toggleButtons(false, buttons);

        //     // then: the delete button should be disabled
        //     buttons.forEach((button: ToolbarButton) => {
        //         expect(button.disabled).toBeFalse();
        //     });
        // });
    });
});
