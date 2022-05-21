import { AfterViewChecked, ChangeDetectorRef, Component, ContentChild, ElementRef, Input, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { JsonModel } from '@ngx-material-dashboard/base-json';
import { ScreenSizeService } from '../../../services/screen-size.service';

@Component({
  selector: 'ngx-material-dashboard-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements AfterViewChecked {

    /** The models to display in grid list. */
    @Input() models: JsonModel[] = [];
    @Input() modelType: string = 'data';
    @ContentChild('model', { static: false }) template!: TemplateRef<any>;
    @ViewChild(MatGridList, { read: ElementRef }) grid!: ElementRef;
    @ViewChildren(MatGridTile, { read: ElementRef }) tiles!: QueryList<ElementRef>;
    cols: number = 2;

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private screenSizeService: ScreenSizeService
    ) {}

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
