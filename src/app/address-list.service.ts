//==================================================================================================
// Stores our parsed list of addresses, for access across routes
//
// NOTE: Maintains internal data integrity by cloning incoming and outgoing arrays.
//       There is a bit of overhead using this method, but without it data corruption is likely.
//==================================================================================================
import { Injectable } from '@angular/core';
import * as _ from "lodash";

@Injectable()
export class AddressListService {

	//--------------------------------------------------
	// Vars
	//--------------------------------------------------
	private addrList: string[] = [];

	//--------------------------------------------------
	// SETTER
	//--------------------------------------------------
	public setAddresses(list: string[]): void {
		this.addrList = _.clone(list);
	}

	//--------------------------------------------------
	// Converts our raw entryListString into an array
	// of individual addresses.
	//
	// SETTER -- Unformatted data
	//--------------------------------------------------
	public setAddressesFromString(data: string): void {
		// Convert commas to newlines
		data = data.replace(/,/g, '\n');

		// Split into an array
		let list = data.split('\n');

		// Trim
		list = list.map(entry => entry.trim());

		// Remove empty entries
		this.addrList = list.filter(entry => entry && entry.length > 0);
	}

	//--------------------------------------------------
	// GETTER
	//--------------------------------------------------
	public getAddresses(): string[] {
		return _.clone(this.addrList);
	}

}