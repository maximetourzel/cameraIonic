import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { Camera, CameraOptions } from "@ionic-native/camera";

@Component({
	selector: "page-about",
	templateUrl: "about.html"
})
export class AboutPage {
	public image: string;

	constructor(public navCtrl: NavController, private camera: Camera) {}

onTakePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      saveToPhotoAlbum: true,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.image = 'data:image/jpeg;base64,' + imageData;
      this.navCtrl.push('add-feed');
      }, (err) => {
        //this.displayErrorAlert(err);
      });
}
}