import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular'; 
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { Camera } from '@ionic-native/camera';

@Component({
  selector: 'page-content',
  templateUrl: 'content.html',
  providers: [Contacts,Camera]
})
export class ContentPage {

private contactlist: any[];  
  constructor(public navCtrl: NavController, private contacts: Contacts) {
        //        this.contacts.find(["displayName", "phoneNumbers"], {multiple: true}).then((contacts) => {
        //            this.contactlist = contacts;
        //        });
        this.fetchDeviceContact();
  }
    fetchDeviceContact() {

        var options = {
            filter: "",
            multiple: true,
            hasPhoneNumber: true
        };
  

        this.contacts.find(["*"], options).then((res) => {

            for (var i = 0; i < Contacts.length; i++) {
                var contact = Contacts[i];
                var no = Contacts[i].name.formatted;
                var phonenumber = Contacts[i].phoneNumbers;
                if (phonenumber != null) {
                    for (var n = 0; n < phonenumber.length; n++) {
                        var type = phonenumber[n].type;
                        if (type == 'mobile') {
                            var phone = phonenumber[n].value;
                            var mobile;
                            if (phone.slice(0, 1) == '+' || phone.slice(0, 1) == '0') {
                                mobile = phone.replace(/[^a-zA-Z0-9+]/g, "");
}
                            else {
                                var mobile_no = phone.replace(/[^a-zA-Z0-9]/g, "");
                                mobile = mobile_no;
                            }

                            var contactData = {
                                "displayName": no,
                                "phoneNumbers": mobile,
                            }
                            this.contactlist.push(contactData);
                        }
                    }
                }
            }
            console.log("contactlist >>>", this.contactlist);
        }).catch((err) => {
            console.log('err', err);
        });
    }
}
