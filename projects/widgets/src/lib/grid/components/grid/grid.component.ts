import { AfterViewChecked, ChangeDetectorRef, Component, ContentChild, ElementRef, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { JsonModel } from '@ngx-material-dashboard/base-json';

import { CollectionComponent } from '../../../collection/components/collection/collection.component';
import { SelectionService } from '../../../collection/services/selection.service';
import { ScreenSizeService } from '../../../layout/services/screen-size.service';
import { SorterComponent } from '../../../toolbar/pages/sorter/sorter.component';

/**
 * The `Grid` extends `Collection`, and is meant for rendering items in a grid
 * layout. The component dynamically calculates the width of each item in the
 * grid and determines how many items to display in each row based on the space
 * available. You must define the template for each item in the grid in the
 * template where you intend to include this component. A `Sorter` is rendered
 * above the data grid, which is meant to allow users to well sort the data in
 * the grid based on the provided `field` options users should be able to sort
 * the data on.
 *
 * @usageNotes
 * ## Basic Usage Example
 * ```html
 * <ngx-material-dashboard-grid [data]="data" [fields]="fields">
 *     <ng-template #model let-model="model">
 *        <mat-card>
 *            <mat-card-title>
 *                {{model.id}} Title
 *            </mat-card-title>
 *            <mat-card-content>
 *                Content for dummy object {{model.id}}
 *            </mat-card-content>
 *       </mat-card>
 *     </ng-template>
 * </ngx-material-dashboard-grid>
 * ```
 * ```typescript
 * @Component({
 *     selector: 'basic-grid-usage-example',
 *     templateUrl: './basic-grid-usage-example.html'
 * }) export class BasicGridUsageExample {
 *     data: DummyObject[] = [...];
 *     fields: string[] = ['id'];
 * }
 * ```
 */
@Component({
    selector: 'ngx-material-dashboard-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.css']
})
export class GridComponent<T extends JsonModel> 
    extends CollectionComponent<T> implements AfterViewChecked {

    /** A reference to the grid list in the component. */
    @ViewChild(MatGridList, { read: ElementRef }) grid!: ElementRef;
    @ViewChild(SorterComponent) override sort$?: SorterComponent;
    /** A reference to the grid tiles in the component. */
    @ViewChildren(MatGridTile, { read: ElementRef }) tiles!: QueryList<ElementRef>;
    /** The number of columns to render in the grid. */
    cols: number = 2;

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private screenSizeService: ScreenSizeService,
        selectionService: SelectionService<T>
    ) {
        super(selectionService);
    }

    ngAfterViewChecked(): void {
        // calculate the number of columns that can fit comfortably in the grid
        // using the width of the grid and each grid tile once all children and
        // content have rendered; this seems really hackish since this lifecycle
        // hook is run quite a bit, the way tileWidth is determined, and need
        // for detectChanges to fix ExpressionChangedAfterItHasBeenCheckedError
        this.screenSizeService.screenSize.subscribe(() => {
            if (this.tiles.first) {
                // get the width of the grid element
                const width = this.grid.nativeElement.offsetWidth;
                // first child of MatGridTile is figure, then it is component passed
                // in in template (i.e. the component we are looking for when calculating
                // number of columns)
                const tileWidth = this.tiles.first.nativeElement.children[0].children[0].offsetWidth;

                this.cols = Math.floor(width / (tileWidth + 2));
                this.changeDetectorRef.detectChanges();
            }
        });
    }
}
