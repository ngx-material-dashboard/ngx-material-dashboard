import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

/**
 * The `BaseJsonModule` defines needed imports and exports for this library.
 * Simply import this module once into your app.
 * (TODO prevent multiple imports...)
 */
@NgModule({
    imports: [HttpClientModule],
    exports: [HttpClientModule]
})
export class BaseJsonModule {}
