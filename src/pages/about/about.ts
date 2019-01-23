import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { Camera, CameraOptions } from "@ionic-native/camera";

@Component({
	selector: "page-about",
	templateUrl: "about.html"
})
export class AboutPage {

	image: string;
  // options: CameraOptions = {
  //     quality: 100,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     // saveToPhotoAlbum: true,
  //     mediaType: this.camera.MediaType.PICTURE
    //}

	constructor(public navCtrl: NavController, private camera: Camera) {}


  // async onTakePicture(): Promise<any>{
  //   try {
  //   this.image = await this.camera.getPicture(this.options)
  //   }
  //   catch(e){
  //     console.log(e);
  //   }
  // } 



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