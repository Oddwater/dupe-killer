import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// App-specific
import { AppComponent }  from './app.component';
import { EntryComponent } from './entry.component';
import { DisplayComponent } from './display.component';

//=================================================
// Route List
//=================================================
const routeList: Routes = [

	// Address Entry
	{
		path: 'entry',
		component: EntryComponent
	},

	// Results Display
	{
		path: 'display',
		component: DisplayComponent
	},

	// DEFAULT
	{
		path: '',
		redirectTo: '/entry',
		pathMatch: 'full'
	}
];


@NgModule({
  imports: [ 
  	RouterModule.forRoot(routeList)
  ],

  exports: [
  	RouterModule
  ],
})
export class AppRoutingModule{}