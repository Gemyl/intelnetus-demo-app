import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { MetadataExtractionComponent } from './metadata-extraction.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { metadataExtractionReducer } from './store/reducers/metadata-extraction.reducer';
import { MetadataExtractionEffects } from './store/effects/metadata-extraction.effect';
import { MetadataSearchFormComponent } from './components/metadata-search-form/metadata-search-form.component';
import { GenericModalComponent } from '../core/components/generic-modal/generic-modal.component';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { MetadataTableComponent } from './components/metadata-table/metadata-table.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MetadataExtractionRoutingModule } from './metadata-extraction-routing.module';
import { VariantsModalComponent } from './components/variants-modal/variants-modal.component';
import { TabViewModule } from 'primeng/tabview';

@NgModule({
  declarations: [
    MetadataExtractionComponent,
    MetadataSearchFormComponent,
    MetadataTableComponent,
    GenericModalComponent,
    VariantsModalComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('metadataState', metadataExtractionReducer),
    EffectsModule.forFeature([MetadataExtractionEffects]),
    TableModule,
    FontAwesomeModule,
    PaginatorModule,
    MetadataExtractionRoutingModule,
    TabViewModule
  ]
})
export class MetadataExtractionModule { }
