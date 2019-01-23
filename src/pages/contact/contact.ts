import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Http } from "@angular/http";
import { InAppBrowser } from "@ionic-native/in-app-browser";

declare var window: any;

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController,
  				private platform: Platform,
  				private http: Http) {}

  public login() {
		this.platform
			.ready()
			.then(this.googleLogin)
			.then(
				success => {
					console.log("Paul");
					alert(success.access_token);
				},
				error => {
					console.log("Max");
					alert(error);
				}
			);
	}

	public googleLogin(): Promise<any> {
		return new Promise(function(resolve, reject) {
			const clientId = "d96e7765-1e14-49ed-b2f1-17536ffa2939";
			const url =
				`https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${clientId}` +
				"&redirect_uri=https://52.166.177.92:8100" +
				"&scope=openid" +
				"&response_type=token";
			const browserRef = window.cordova.InAppBrowser.open(url);
			let responseParams: string;
			let parsedResponse: Object = {};
			browserRef.addEventListener("loadstart", evt => {
				if (evt.url.indexOf("https://52.166.177.92:8100") === 0) {
					console.log("Alex");
					browserRef.removeEventListener("exit", evt => {});
					browserRef.close();
					responseParams = evt.url.split("#")[1].split("&");
					for (var i = 0; i < responseParams.length; i++) {
						parsedResponse[
							responseParams[i].split("=")[0]
						] = responseParams[i].split("=")[1];
					}
					if (
						parsedResponse["access_token"] !== undefined &&
						parsedResponse["access_token"] !== null
					) {
						resolve(parsedResponse);
					} else {
						reject("Problème d’authentification avec Google");
					}
				}
			});
			browserRef.addEventListener("exit", function(evt) {
				reject(
					"Une erreur est survenue lors de la tentative de connexion à Google"
				);
			});
		});
	}

}
