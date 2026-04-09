import EnquiryLib "../lib/enquiry";
import EnquiryTypes "../types/enquiry";
import AuthLib "../lib/auth";
import Runtime "mo:core/Runtime";

mixin (state : EnquiryLib.State, adminState : { var adminToken : Text }) {

  /// Submit a new enquiry — public, no auth required
  public shared func submitEnquiry(input : EnquiryTypes.EnquiryInput) : async EnquiryTypes.Enquiry {
    EnquiryLib.submit(state, input);
  };

  /// List all enquiries — admin only
  public shared ({ caller = _ }) func listEnquiries(token : Text) : async [EnquiryTypes.Enquiry] {
    if (not AuthLib.validate(adminState, token)) {
      Runtime.trap("Unauthorized");
    };
    EnquiryLib.getAll(state);
  };

  /// Get a single enquiry by ID — admin only
  public shared ({ caller = _ }) func getEnquiry(id : EnquiryTypes.EnquiryId, token : Text) : async ?EnquiryTypes.Enquiry {
    if (not AuthLib.validate(adminState, token)) {
      Runtime.trap("Unauthorized");
    };
    EnquiryLib.getById(state, id);
  };
};
