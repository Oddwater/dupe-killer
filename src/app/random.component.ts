//==================================================================================================
// Random data generator UI component
//==================================================================================================
import { Component, Output, EventEmitter } from '@angular/core';
import { AddressGeneratorService } from './address-generator.service';

//=================================================
// Component Meta-Data
//=================================================
@Component({
	moduleId: module.id,

	selector: 'generate-random',
	templateUrl: 'random.component.html',
})

//=================================================
// Component Definition
//=================================================
export class RandomComponent {

	//--------------------------------------------------
	// Constants
	//--------------------------------------------------
	DEFAULT_UNIQUE: number = 50;
	DEFAULT_DUPES: number = 10;
	MAX_UNIQUE: number = 10000;
	MAX_DUPES: number = 10000;

	//--------------------------------------------------
	// Vars
	//--------------------------------------------------
	unique: number;
	dupes: number;

	@Output() closeComponent = new EventEmitter<string[]>();

	//--------------------------------------------------
	// Constructor
	//--------------------------------------------------
	constructor(private generatorService: AddressGeneratorService) {
		this.unique = this.DEFAULT_UNIQUE;
		this.dupes = this.DEFAULT_DUPES;
	};

	//--------------------------------------------------
	// Restores the default controls.
	//--------------------------------------------------
	clearControls(sendData: boolean): void {
		let data: string[];

		if (sendData)
			data = this.generatorService.getAddresses(this.unique, this.dupes);

		this.closeComponent.emit(data);
	}

	//--------------------------------------------------
	// Validates the Generate Random input fields
	//
	// It would be cleaner to do individual validation
	// using Angular, but we'll take the easy way out
	// this time.
	//--------------------------------------------------
	validateFields(): void {
		this.unique = parseInt(this.unique + '', 10);
		if (isNaN(this.unique))
			this.unique = this.DEFAULT_UNIQUE;
		else if (this.unique < 1)
			this.unique = 1;
		else if (this.unique > this.MAX_UNIQUE)
			this.unique = this.MAX_UNIQUE;
		this.unique = Math.floor(this.unique);

		this.dupes = parseInt(this.dupes + '', 10);
		if (isNaN(this.dupes))
			this.dupes = this.DEFAULT_DUPES;
		if (this.dupes < 0)
			this.dupes = 0;
		else if (this.dupes > this.MAX_DUPES)
			this.dupes = this.MAX_DUPES;
		this.dupes = Math.floor(this.dupes);
	}

}
