//==================================================================================================
// List Display component
//==================================================================================================
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AddressListService } from './address-list.service';

//=================================================
// Component Meta-Data
//=================================================
@Component({
	moduleId: module.id,

	selector: 'results',
	templateUrl: 'display.component.html',
})

//=================================================
// Component Definition
//=================================================
export class DisplayComponent {

	//--------------------------------------------------
	// Vars
	//--------------------------------------------------
	listData: any = {
		totalCnt: 0,
		uniqueCnt: 0,
		entries: [],
	};

	filterState: string = "unique";
	filterSettings = {
		all: {
			title: 'All Addresses',
			buttonText: 'Show Unique',
			buttonIcon: 'glyphicon-eye-close',
		},

		unique: {
			title: 'Unique Addresses',
			buttonText: 'Show All',
			buttonIcon: 'glyphicon-eye-open',
		}
	};

	//--------------------------------------------------
	// Constructor
	//--------------------------------------------------
	constructor(
		private router: Router,
		private addressListModel: AddressListService,
	) {
		let addressList = addressListModel.getAddresses();

		if (addressList && addressList.length)
			this.initListData(addressList);
		else
			this.gotoEntry();	// This isn't the best solution. Rerouting inside a constructor isn't good practice. Use CanActivate instead.
	};

	//--------------------------------------------------
	// Create the list data structure
	//--------------------------------------------------
	initListData(list: string[]): void {

		this.listData.totalCnt = list.length;

		// Filter out duplicate entries in a list without disturbing the list order.
		let usedList = {};

		// Step through entire input list
		for (let addr of list) {

			// Check for uniqueness
			let record: any = {addr};

			if (!usedList[addr])
			{
				usedList[addr] = true;
				this.listData.uniqueCnt++;
			}
			else
				record.dupe = true;

			this.listData.entries.push(record);
		}
	}

	//--------------------------------------------------
	// Route to the data entry page
	//--------------------------------------------------
	gotoEntry(): void {
		let link = ['/entry'];
		this.router.navigate(link);
	}

	//--------------------------------------------------
	// Toggle the filter between all and unique
	//--------------------------------------------------
	toggleFilter(): void {
		if (this.filterState === 'all')
			this.filterState = 'unique';
		else
			this.filterState = 'all';
	}

	//--------------------------------------------------
	// Display the list title based on the toggle state
	//--------------------------------------------------
	listTitle(): string {
		return this.filterSettings[this.filterState].title;
	}

	//--------------------------------------------------
	// Display the correct text on the toggle button
	//--------------------------------------------------
	buttonText(): string {
		return this.filterSettings[this.filterState].buttonText;
	}

	//--------------------------------------------------
	// Display the correct icon on the toggle button
	//--------------------------------------------------
	buttonIcon(): string {
		return this.filterSettings[this.filterState].buttonIcon;
	}

	//--------------------------------------------------
	// Display the list size string 
	//--------------------------------------------------
	listCount(): string {
		if (this.filterState === 'all')
			return `(${this.listData.totalCnt})`;
		else
			return `(${this.listData.uniqueCnt} / ${this.listData.totalCnt})`;
	}

	//--------------------------------------------------
	// Style helper for list entries
	//--------------------------------------------------
	getEntryClass(entry: any): string {
		if (entry.dupe && this.filterState === 'unique')
			return 'nonexistent';
		else if (entry.dupe && this.filterState === 'all')
			return 'bg-danger';	// Bootstrap coloring
		else
			return '';
	}

}
