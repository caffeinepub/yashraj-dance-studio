import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/photo";

module {
  public type State = {
    photos : List.List<Types.PhotoMeta>;
    var nextId : Nat;
  };

  public func newState() : State {
    {
      photos = List.empty<Types.PhotoMeta>();
      var nextId = 1;
    };
  };

  public func addPhoto(state : State, input : Types.PhotoMetaInput) : Types.PhotoMeta {
    let id = state.nextId;
    let photo : Types.PhotoMeta = {
      id;
      section = input.section;
      filename = input.filename;
      storageRef = input.storageRef;
      displayOrder = input.displayOrder;
      uploadedAt = Time.now();
    };
    state.photos.add(photo);
    state.nextId += 1;
    photo;
  };

  public func listAll(state : State) : [Types.PhotoMeta] {
    state.photos.toArray();
  };

  public func listBySection(state : State, section : Types.PhotoSection) : [Types.PhotoMeta] {
    state.photos.filter(func(p) { p.section == section }).toArray();
  };

  public func deletePhoto(state : State, id : Types.PhotoId) : Bool {
    let sizeBefore = state.photos.size();
    let kept = state.photos.filter(func(p) { p.id != id });
    state.photos.clear();
    state.photos.append(kept);
    state.photos.size() < sizeBefore;
  };

  public func updateOrder(state : State, id : Types.PhotoId, newOrder : Nat) : Bool {
    var found = false;
    state.photos.mapInPlace(
      func(p) {
        if (p.id == id) {
          found := true;
          { p with displayOrder = newOrder };
        } else {
          p;
        };
      }
    );
    found;
  };
};
