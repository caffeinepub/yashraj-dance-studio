import PhotoLib "../lib/photo";
import PhotoTypes "../types/photo";
import AuthLib "../lib/auth";
import Runtime "mo:core/Runtime";

mixin (state : PhotoLib.State, adminState : { var adminToken : Text }) {

  /// Add photo metadata — admin only
  public shared ({ caller = _ }) func addPhotoMeta(input : PhotoTypes.PhotoMetaInput, token : Text) : async PhotoTypes.PhotoMeta {
    if (not AuthLib.validate(adminState, token)) {
      Runtime.trap("Unauthorized");
    };
    PhotoLib.addPhoto(state, input);
  };

  /// List all photo metadata — public
  public query func listAllPhotos() : async [PhotoTypes.PhotoMeta] {
    PhotoLib.listAll(state);
  };

  /// List photos by section — public
  public query func listPhotosBySection(section : PhotoTypes.PhotoSection) : async [PhotoTypes.PhotoMeta] {
    PhotoLib.listBySection(state, section);
  };

  /// Delete a photo — admin only
  public shared ({ caller = _ }) func deletePhoto(id : PhotoTypes.PhotoId, token : Text) : async Bool {
    if (not AuthLib.validate(adminState, token)) {
      Runtime.trap("Unauthorized");
    };
    PhotoLib.deletePhoto(state, id);
  };

  /// Update display order for a photo — admin only
  public shared ({ caller = _ }) func updatePhotoOrder(id : PhotoTypes.PhotoId, newOrder : Nat, token : Text) : async Bool {
    if (not AuthLib.validate(adminState, token)) {
      Runtime.trap("Unauthorized");
    };
    PhotoLib.updateOrder(state, id, newOrder);
  };
};
