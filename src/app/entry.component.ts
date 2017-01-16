//==================================================================================================
// Data Entry component
//==================================================================================================
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AddressListService } from './address-list.service';

//=================================================
// Component Meta-Data
//=================================================
@Component(
{
	moduleId: module.id,

	selector: 'entry-page',
	templateUrl: 'entry.component.html',
})

//=================================================
// Component Definition
//=================================================
export class EntryComponent {

	//--------------------------------------------------
	// Vars
	//--------------------------------------------------
	entryListString: string = '';

	randomMode: boolean = false;	// Display Random Data component?

	//--------------------------------------------------
	// Constructor
	//--------------------------------------------------
	constructor(
		private router: Router,
		private addressListModel: AddressListService,
	) {
		let addressList = addressListModel.getAddresses();
		if (addressList)
			this.entryListString = addressList.join('\n');
	};

	//--------------------------------------------------
	// Filter Out Duplicates Transition to the results view
	//--------------------------------------------------
	gotoResults(): void {
		if (this.allowFilter()) {

			this.addressListModel.setAddressesFromString(this.entryListString);

			let link = ['/display'];
			this.router.navigate(link);
		}
	}

	//--------------------------------------------------
	// Clear the input box
	//--------------------------------------------------
	clearEntries(): void {
		this.entryListString = '';
	}

	//--------------------------------------------------
	// Display the random generation controls.
	//--------------------------------------------------
	randomEntries(): void {
		this.randomMode = true;
	}

	//--------------------------------------------------
	// Restores the default controls.
	//--------------------------------------------------
	closeRandom(data: any): void {
		this.randomMode = false;

		if (data)
		{
			this.clearEntries();
			this.entryListString = data.join('\n');
		}
	}

	//--------------------------------------------------
	// Determines whether there are any valid entries
	// in the address list.
	//
	// NOTE: We're not currently validating the data in
	// any way. A more robust solution would validate 
	// individual addresses. However, that would work
	// best with improved UI and is beyond the scope
	// of what we're trying to achieve here.
	//--------------------------------------------------
	allowFilter(): boolean {
		return this.entryListString.length > 0;
	}

}