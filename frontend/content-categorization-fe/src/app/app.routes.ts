import { Routes } from '@angular/router';
import { MainPageComponent } from './features/analysis/main-page/main-page.component';

export const routes: Routes = [
    { path: '', component: MainPageComponent },
    { path: '**', redirectTo: '' },
];