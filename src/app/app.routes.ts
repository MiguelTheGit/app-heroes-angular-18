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
        path: 'heroes/new',
        loadComponent: () =>
            import('./heroes/pages/hero-form/hero-form.component').then(c => c.HeroFormComponent)
    },
    {
        path: 'heroes/edit/:id',
        loadComponent: () =>
            import('./heroes/pages/hero-form/hero-form.component').then(c => c.HeroFormComponent)
    },
    {
        path: '**',
        redirectTo: 'heroes/list',
        pathMatch: 'full'
    }
];
