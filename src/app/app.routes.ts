import { Routes } from '@angular/router';

export const routes: Routes = [
    { 
        path: '', 
        redirectTo: 'heroes/list', 
        pathMatch: 'full' 
    },
    {
        path: 'heroes/list',
        loadComponent: () => 
            import('./heroes/pages/heroes-list/heroes-list.component').then(c => c.HeroesListComponent)
    },
    {
        path: 'heroes/detail/:id',
        loadComponent: () =>
            import('./heroes/pages/hero-details/hero-details.component').then(c => c.HeroDetailsComponent)
    },

    {
        path: '**',
        redirectTo: 'heroes/list',
        pathMatch: 'full'
    }
];
