import { AfterViewChecked, ChangeDetectorRef, Component, ContentChild, ElementRef, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { JsonModel } from '@ngx-material-dashboard/base-json';

import { CollectionComponent } from '../../../collection/components/collection/collection.component';
import { ScreenSizeService } from '../../../shared/services/screen-size.service';
import { SelectionService } from '../../../shared/services/selection.service';

@Component({
    selector: 'ngx-material-dashboard-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.css']
})
export class GridComponent<T extends JsonModel> 
    extends CollectionComponent<T> implements AfterViewChecked {

    @ContentChild('model', { static: false }) template!: TemplateRef<any>;
    /** A reference to the grid list in the component. */
    @ViewChild(MatGridList, { read: ElementRef }) grid!: ElementRef;
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
