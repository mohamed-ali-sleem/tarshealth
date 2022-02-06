import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs'; 
import { AppConstants } from 'src/app/core/config/constants';

@Injectable({
	providedIn: 'root'
})
@Injectable()
export class CatalogService {
	constructor(private _httpClient: HttpClient) {
	}

	getFilters(filter): Observable<any> {
		const url =  `${AppConstants.API.FILTERS_API}/?filterBy=${filter}`;
		return this._httpClient.get(url, {});
	}

	getPatientList(filters): Observable<any> {
		const url = `${AppConstants.API.PATIENTS_LIST}`;
		return this._httpClient.post(url, filters);
	}

}


