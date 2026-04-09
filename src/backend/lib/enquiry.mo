import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/enquiry";

module {
  public type State = {
    enquiries : List.List<Types.Enquiry>;
    var nextId : Nat;
  };

  public func newState() : State {
    {
      enquiries = List.empty<Types.Enquiry>();
      var nextId = 1;
    };
  };

  public func submit(state : State, input : Types.EnquiryInput) : Types.Enquiry {
    let id = state.nextId;
    let enquiry : Types.Enquiry = {
      id;
      name = input.name;
      phone = input.phone;
      email = input.email;
      classInterest = input.classInterest;
      message = input.message;
      submittedAt = Time.now();
    };
    state.enquiries.add(enquiry);
    state.nextId += 1;
    enquiry;
  };

  public func getAll(state : State) : [Types.Enquiry] {
    state.enquiries.toArray();
  };

  public func getById(state : State, id : Types.EnquiryId) : ?Types.Enquiry {
    state.enquiries.find(func(e) { e.id == id });
  };
};
