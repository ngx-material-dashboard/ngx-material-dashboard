import {
    Component,
    EventEmitter,
    HostBinding,
    Input,
    OnInit,
    Output
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import { Task } from '../../../../shared/models/task.model';
import { JsonApiService } from '../../../../shared/services/json-api.service';
import { Subscription } from 'rxjs';
import { Priority } from '../../../../shared/models/priority.model';
import { JsonApiQueryData } from '@ngx-material-dashboard/base-json';
import { ValidationMessages } from '@ngx-material-dashboard/widgets';

@Component({
    selector: 'app-task-form',
    templateUrl: './task-form.component.html',
    styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
    @HostBinding('class.marker-task-form') classMarker: boolean = true;
    @Input() parentForm!: FormGroup;
    /** The Task to edit. */
    @Input() set task(val: Task | undefined) {
        if (val && this.mainPropertiesForm) {
            this.task$ = val;
            this.setTask(val);
        }
    }
    /** Event emitted when form is checked*/
    @Output() formValid: EventEmitter<boolean> = new EventEmitter<boolean>();
    /** The form for the dateCompleted property. */
    dateCompletedForm!: FormGroup;
    faTag: IconProp = faTag;
    /** The form for the main properties (name, priority, description, and dueDate). */
    mainPropertiesForm!: FormGroup;
    mainPropertiesValidationMessages: ValidationMessages = {
        name: [{ type: 'required', message: 'Name is required' }],
        description: [{ type: 'required', message: 'Description is required' }],
        due: [{ type: 'required', message: 'Due date is required' }],
        priority: [{ type: 'required', message: 'Priority is required' }]
    };
    /** The form for the repeat properties (repeats, after). */
    repeatPropertiesForm!: FormGroup;
    repeatPropertiesValidationMessages: ValidationMessages = {
        repeats: [
            {
                type: 'required',
                message: "Must select an option (even if task doesn't repeat)"
            }
        ],
        after: [{ type: 'required', message: 'You must enter a number' }]
    };
    // /** Boolean to indicate if the screen size is medium or smaller (true if screen is medium or smaller). */
    isMediumScreen: boolean = false;
    /** The minimum date the Task can be marked due (defaults to todays date if Task creating Task). */
    minDueDate!: Date;
    priorityOptions: Priority[] = [];
    /** The subscriptions for the component. */
    sub: Subscription;
    task$?: Task;

    constructor(
        private formBuilder: FormBuilder,
        private jsonApiService: JsonApiService
    ) {
        this.sub = new Subscription();
    }

    /**
     * Unsubscribe from any subscriptions.
     */
    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    /**
     * Initialize the component. Creates the formGroups required for the component.
     */
    ngOnInit() {
        if (!this.task$) {
            // if the @Input task is not defined then create a dummy task to initialize the form data
            this.task$ = this.jsonApiService.createRecord(Task, {});
            // and set the minDueDate to todays date (not sure it makes sense to allow due dates in past)
            this.minDueDate = new Date();
        } else if (this.task$.dueDate) {
            // otherwise set the minDueDate to the dueDate for the Task
            this.minDueDate = this.task$.dueDate;
        }

        // initialize the form with the dateCompleted property
        this.dateCompletedForm = this.formBuilder.group({
            dateCompleted: [
                {
                    value: this.task$.dateCompleted,
                    disabled: true
                }
            ]
        });

        // initialize the form with the main properties (name, priority, description, and dueDate)
        this.mainPropertiesForm = this.formBuilder.group({
            name: [
                {
                    value: this.task$.name,
                    disabled: false
                },
                [Validators.required]
            ],
            priority: [
                {
                    value:
                        this.priorityOptions.find(
                            (it) => it.id === this.task$?.id
                        ) || null,
                    disabled: false
                },
                [Validators.required]
            ],
            description: [
                {
                    value: this.task$.description,
                    disabled: false
                },
                [Validators.required]
            ],
            due: [
                {
                    value: this.task$.dueDate,
                    disabled: this.task$.isComplete
                },
                [Validators.required]
            ]
        });

        // initialize the form with the repeat properties (repeats and after)
        this.repeatPropertiesForm = this.formBuilder.group({
            repeats: [
                {
                    value: this.task$.repeats || 'noRepeat',
                    disabled: false
                },
                [Validators.required]
            ],
            after: [
                {
                    value: this.task$.endsAfter || '',
                    disabled:
                        this.task$.id === undefined ||
                        this.task$.repeats === 'noRepeat'
                }
            ]
        });

        this.parentForm.addControl('main', this.mainPropertiesForm);
        this.parentForm.addControl('repeat', this.repeatPropertiesForm);
        this.parentForm.addControl('dateCompleted', this.dateCompletedForm);

        this.jsonApiService
            .findAll(Priority)
            .subscribe((res: JsonApiQueryData<Priority>) => {
                this.priorityOptions = res.getModels();
                this.mainPropertiesForm.controls['priority'].setValue(
                    this.priorityOptions.find(
                        (it) => it.id === this.task$?.priority?.id
                    )
                );
            });

        // const sub = this.utilsService.isMediumScreen.subscribe((isMediumScreen: boolean) => {
        //     this.isMediumScreen = isMediumScreen;
        // });
        // this.sub.add(sub);
    }

    /**
     * Set the Task for the component and update the form values accordingly. This
     * method is meant to be called from the parent (when paging through Tasks).
     *
     * @param task The Task to set for the form.
     */
    setTask(task: Task) {
        this.task$ = task;

        this.mainPropertiesForm.controls['name'].setValue(this.task$.name);
        this.mainPropertiesForm.controls['priority'].setValue(
            this.priorityOptions.find(
                (it) => it.id === this.task$?.priority?.id
            )
        );
        this.mainPropertiesForm.controls['description'].setValue(
            this.task$.description
        );
        this.mainPropertiesForm.controls['due'].setValue(this.task$.dueDate);

        this.repeatPropertiesForm.controls['repeats'].setValue(
            this.task$.repeats
        );
        // set the repeat properties if the Task repeats
        if (this.task$.repeats !== 'noRepeat') {
            this.repeatPropertiesForm.controls['after'].setValue(
                this.task$.endsAfter
            );
        }
        this.update('repeats');

        // set the date completed if the Task is complete
        if (this.task$.isComplete) {
            this.dateCompletedForm.controls['dateCompleted'].setValue(
                this.task$.dateCompleted
            );
        }
    }

    /**
     * Handles updating the form validity when a property is updated on the form and emits the formValid
     * event.
     *
     * @property property The form field that was updated
     */
    update(property: string) {
        if (property == 'repeats') {
            // enable or disable the repeatPropertiesForm based on the repeats value
            const after = this.repeatPropertiesForm.get('after');
            if (this.repeatPropertiesForm.get(property)?.value === 'noRepeat') {
                // disable the repeatPropertiesForm if the repeats value is "noRepeat"
                after?.disable();
                after?.clearValidators();
                after?.updateValueAndValidity();
            } else {
                // otherwise enable the repeatProperties form
                after?.enable();
                after?.setValidators([Validators.required]);
                after?.updateValueAndValidity();
            }
        }

        // update the form validity and emit the formValid event
        let formsValid: boolean;
        if (
            this.task$?.isComplete ||
            (!this.task$?.isComplete &&
                this.repeatPropertiesForm.get('repeats')?.value == 'noRepeat')
        ) {
            // only need to check mainPropertiesForm is valid when task is complete or it does not repeat
            formsValid = this.mainPropertiesForm.valid;
        } else {
            // otherwise check both the mainPropertiesForm and repeatPropertiesForm
            formsValid =
                this.mainPropertiesForm.valid &&
                this.repeatPropertiesForm.valid;
        }
        this.formValid.emit(formsValid);
    }
}
