import AuthLib "../lib/auth";
import AuthTypes "../types/auth";

mixin (adminState : { var adminToken : Text }) {

  /// Admin login — returns a session token on success
  public shared func adminLogin(username : Text, password : Text) : async AuthTypes.LoginResult {
    AuthLib.login(adminState, username, password);
  };

  /// Validate an admin token
  public query func validateAdminToken(token : Text) : async Bool {
    AuthLib.validate(adminState, token);
  };
};
