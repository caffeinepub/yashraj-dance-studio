import EnquiryLib "lib/enquiry";
import PhotoLib "lib/photo";
import EnquiryMixin "mixins/enquiry-api";
import PhotoMixin "mixins/photo-api";
import AuthMixin "mixins/auth-api";

actor {
  let enquiryState = EnquiryLib.newState();
  let photoState = PhotoLib.newState();
  let adminState = { var adminToken : Text = "" };

  include EnquiryMixin(enquiryState, adminState);
  include PhotoMixin(photoState, adminState);
  include AuthMixin(adminState);
};
