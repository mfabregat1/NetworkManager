import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MrouterComponent } from './pagines/mrouter/mrouter.component';
import { LoginComponent } from './pagines/login/login.component';
import { IrouterComponent } from './pagines/irouter/irouter.component';
import { LlusuarisComponent } from './pagines/llusuaris/llusuaris.component';
import { CusuariComponent } from './pagines/cusuari/cusuari.component';
import { MusuariComponent } from './pagines/musuari/musuari.component';

const routes: Routes = [
  { path: "", pathMatch: 'full',  component: LoginComponent },
  { path: "router", pathMatch: 'full',  component: IrouterComponent },
  { path: "gestionar-usuaris", pathMatch: 'full',  component: LlusuarisComponent },
  { path: "modificar-usuari/:id", pathMatch: 'full',  component: MusuariComponent },
  { path: "configurar-router", pathMatch: 'full',  component: MrouterComponent },
  { path: "crear-usuari", pathMatch: 'full',  component: CusuariComponent },
  { path: "**", pathMatch: 'full',  component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
