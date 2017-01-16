//==================================================================================================
// Module Definition
//==================================================================================================
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

// Routing definitions
import { AppRoutingModule } from './app-routing.module';

// App-specific
import { AppComponent }  from './app.component';
import { EntryComponent } from './entry.component';
import { DisplayComponent } from './display.component';
import { RandomComponent } from './random.component';

import { AddressGeneratorService } from './address-generator.service';
import { AddressListService } from './address-list.service';


//=================================================
// Module Configuration
//=================================================
@NgModule({

	imports: [
		BrowserModule,
		FormsModule,
		AppRoutingModule,
	],

	declarations: [
  		AppComponent,
  		EntryComponent,
  		DisplayComponent,
  		RandomComponent,
  	],

	providers: [
		AddressGeneratorService,
		AddressListService,
	],

	bootstrap:    [ AppComponent ]
})
export class AppModule { }
