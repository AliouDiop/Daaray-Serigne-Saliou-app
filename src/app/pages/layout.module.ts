import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg';
import { PagesRoutingModule } from './pages-routing.module';
import {
  NgbDropdownModule,
  NgbProgressbarModule,
  NgbTooltipModule,
  NgbModule,
  NgbNavModule,
} from '@ng-bootstrap/ng-bootstrap';
import { TranslationModule } from '../modules/i18n/translation.module';
import { LayoutComponent } from './_layout/layout.component';
import { ScriptsInitComponent } from './_layout/init/scipts-init/scripts-init.component';
import { HeaderMobileComponent } from './_layout/components/header-mobile/header-mobile.component';
import { AsideComponent } from './_layout/components/aside/aside.component';
import { FooterComponent } from './_layout/components/footer/footer.component';
import { HeaderComponent } from './_layout/components/header/header.component';
import { HeaderMenuComponent } from './_layout/components/header/header-menu/header-menu.component';
import { TopbarComponent } from './_layout/components/topbar/topbar.component';
import { ExtrasModule } from '../_metronic/partials/layout/extras/extras.module';
import { LanguageSelectorComponent } from './_layout/components/topbar/language-selector/language-selector.component';
import { CoreModule } from '../_metronic/core';
import { SubheaderModule } from '../_metronic/partials/layout/subheader/subheader.module';
import { AsideDynamicComponent } from './_layout/components/aside-dynamic/aside-dynamic.component';
import { HeaderMenuDynamicComponent } from './_layout/components/header/header-menu-dynamic/header-menu-dynamic.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CRUDTableModule } from '../_metronic/shared/crud-table';
import { DropdownMenusModule } from '../_metronic/partials/content/dropdown-menus/dropdown-menus.module';
import { UserProfileRoutingModule } from '../modules/user-profile/user-profile-routing.module';
import { WidgetsModule } from '../_metronic/partials/content/widgets/widgets.module';
import { GeneralModule } from '../_metronic/partials/content/general/general.module';
import { HighlightModule } from 'ngx-highlightjs';

@NgModule({
  declarations: [
    LayoutComponent,
    ScriptsInitComponent,
    HeaderMobileComponent,
    AsideComponent,
    FooterComponent,
    HeaderComponent,
    HeaderMenuComponent,
    TopbarComponent,
    LanguageSelectorComponent,
    AsideDynamicComponent,
    HeaderMenuDynamicComponent,

  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    TranslationModule,
    ExtrasModule,
    NgbDropdownModule,
    NgbProgressbarModule,
    CoreModule,
    SubheaderModule,
    HttpClientModule,
    CRUDTableModule,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
    UserProfileRoutingModule,
    DropdownMenusModule,
    FormsModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    WidgetsModule,
    CommonModule,
    InlineSVGModule,
    GeneralModule,
    HighlightModule,
    NgbNavModule,
    GeneralModule,
    NgbModule,
    ReactiveFormsModule,
    NgbNavModule,
    NgbTooltipModule,
    CommonModule,
    InlineSVGModule,
    GeneralModule,
    HighlightModule,
    NgbModule,
    ReactiveFormsModule,
    NgbNavModule,
    InlineSVGModule,
    NgbTooltipModule,
  ],
})
export class LayoutModule { }
