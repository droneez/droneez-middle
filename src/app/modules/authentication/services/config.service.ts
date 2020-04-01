import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ConfigService {

	private _apiUrl: string;

	constructor() { }

	public get apiUrl(): string {
		return this._apiUrl;
	}
	public set apiUrl(apiUrl: string) {
		this._apiUrl = apiUrl;
	}
}
