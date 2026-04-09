import Common "common";

module {
  public type PhotoId = Common.PhotoId;
  public type PhotoSection = Common.PhotoSection;
  public type Timestamp = Common.Timestamp;

  public type PhotoMeta = {
    id : PhotoId;
    section : PhotoSection;
    filename : Text;
    storageRef : Text;
    displayOrder : Nat;
    uploadedAt : Timestamp;
  };

  public type PhotoMetaInput = {
    section : PhotoSection;
    filename : Text;
    storageRef : Text;
    displayOrder : Nat;
  };
};
