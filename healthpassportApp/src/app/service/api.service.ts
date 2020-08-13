import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  getDataResult = {
		status	: 0,
		data	: '',
	}

  constructor(
		public nativeHttp	: HTTP, 
		public hybridHttp	: HttpClient,
		public platform 	: Platform
  ) { }
  get(url)
	{
  		return new Promise(resolve => {
			if(this.platform.is('cordova'))
			{
				this.nativeHttp.sendRequest(Config.APIServer + url, {
					method : "get"
				}).then(respon => {
					this.getDataResult.status 	= respon.status;
					this.getDataResult.data 	= respon.data;
					resolve(this.getDataResult);
				})
				.catch(respon => {
					this.getDataResult.status = respon.status;
					this.getDataResult.data   = respon.error;
					resolve(this.getDataResult);
				});
			}
			else
			{
				const httpOptions = {
				  	headers: new HttpHeaders({
				    	'Content-Type'	:  'application/json',
				    	
				  	})
				};

              	this.hybridHttp.get(Config.APIServer + url).subscribe(
              		respon => {
              			this.getDataResult.status = 200;
              			this.getDataResult.data   = JSON.stringify(respon);
              			resolve(this.getDataResult);
              		},
              		error => {
              			this.getDataResult.status = error.status;
              			this.getDataResult.data   = JSON.stringify(error.error);              			
              			resolve(this.getDataResult);
              		}
              	);
			}
		});
	}
	getDispenser(url)
	{
  		return new Promise(resolve => {
			if(this.platform.is('cordova'))
			{
				this.nativeHttp.sendRequest(Config.APIDispenserInformation + url, {
					method : "get"
				}).then(respon => {
					this.getDataResult.status 	= respon.status;
					this.getDataResult.data 	= respon.data;
					resolve(this.getDataResult);
				})
				.catch(respon => {
					this.getDataResult.status = respon.status;
					this.getDataResult.data   = respon.error;
					resolve(this.getDataResult);
				});
			}
			else
			{
				const httpOptions = {
				  	headers: new HttpHeaders({
				    	'Content-Type'	:  'application/json',
				    	
				  	})
				};

              	this.hybridHttp.get(Config.APIDispenserInformation + url).subscribe(
              		respon => {
              			this.getDataResult.status = 200;
              			this.getDataResult.data   = JSON.stringify(respon);
              			resolve(this.getDataResult);
              		},
              		error => {
              			this.getDataResult.status = error.status;
              			this.getDataResult.data   = JSON.stringify(error.error);              			
              			resolve(this.getDataResult);
              		}
              	);
			}
		});
	}
	put(url, data = {})
	{
  		return new Promise(resolve => {
			if(this.platform.is('cordova'))
			{
				this.nativeHttp.sendRequest(Config.APIServer + url, {
					method  : "put",
					data	: data
				}).then(respon => {
					this.getDataResult.status 	= 200;
					this.getDataResult.data 	= respon.data;
					resolve(this.getDataResult);
				})
				.catch(respon => {
					this.getDataResult.status = respon.status;
					this.getDataResult.data   = respon.error;
					resolve(this.getDataResult);
				});
			}
			else
			{
				const httpOptions = {
				  	headers: new HttpHeaders({
				  		'Content-Type'	:  'application/json'
				  	})
				};

				this.hybridHttp.put(Config.APIServer + url, data, httpOptions).subscribe(
              		respon => {
              			this.getDataResult.status = 200;
              			this.getDataResult.data   = JSON.stringify(respon);
              			resolve(this.getDataResult);
              		},
              		error => {
              			this.getDataResult.status = error.status;
              			this.getDataResult.data   = JSON.stringify(error.error);              			
              			resolve(this.getDataResult);
              		}
              	);
			}
		});
	}
}
