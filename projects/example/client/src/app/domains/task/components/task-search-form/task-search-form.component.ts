import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faTag } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-task-search-form',
    templateUrl: './task-search-form.component.html',
    styleUrls: ['./task-search-form.component.scss']
})
export class TaskSearchFormComponent implements OnInit {
    @Input() parentForm!: FormGroup;
    faTag: IconProp = faTag;
    form!: FormGroup;

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            name: null,
            description: null,
            due: null,
            priority: null
        });

        this.parentForm.addControl('searchFilter', this.form);
    }
}
