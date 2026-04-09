import Common "common";

module {
  public type EnquiryId = Common.EnquiryId;
  public type Timestamp = Common.Timestamp;

  public type Enquiry = {
    id : EnquiryId;
    name : Text;
    phone : Text;
    email : Text;
    classInterest : Text;
    message : Text;
    submittedAt : Timestamp;
  };

  public type EnquiryInput = {
    name : Text;
    phone : Text;
    email : Text;
    classInterest : Text;
    message : Text;
  };
};
