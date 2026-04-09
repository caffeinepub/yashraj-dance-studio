module {
  public type EnquiryId = Nat;
  public type PhotoId = Nat;
  public type Timestamp = Int;

  public type PhotoSection = {
    #hero;
    #gallery;
    #services;
    #facilities;
    #testimonials;
  };
};
