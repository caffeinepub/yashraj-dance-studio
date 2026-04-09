import Types "../types/auth";
import Time "mo:core/Time";

module {
  let ADMIN_USERNAME = "admin";
  let ADMIN_PASSWORD = "bhakti2024";

  public func verifyAdmin(username : Text, password : Text) : Bool {
    username == ADMIN_USERNAME and password == ADMIN_PASSWORD;
  };

  public func generateToken() : Text {
    let t = Time.now();
    "admin-session-" # debug_show(t);
  };

  public func login(adminState : { var adminToken : Text }, username : Text, password : Text) : Types.LoginResult {
    if (verifyAdmin(username, password)) {
      let token = generateToken();
      adminState.adminToken := token;
      #ok(token);
    } else {
      #err("Invalid credentials");
    };
  };

  public func validate(adminState : { var adminToken : Text }, token : Text) : Bool {
    token != "" and adminState.adminToken == token;
  };
};
