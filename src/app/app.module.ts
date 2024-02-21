import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StudentTableComponent } from './StudentTable/StudentTable.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'StudentTable', component: StudentTableComponent },
  { path: '', redirectTo: 'StudentTable', pathMatch: 'full'},

];

@NgModule({
  declarations: [	
    AppComponent,
      StudentTableComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
