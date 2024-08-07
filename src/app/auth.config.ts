import { AuthConfig } from "angular-oauth2-oidc";
import { GOOGLE_ACCOUNTS_CLIENT_ID } from "../../values";

export const authConfig: AuthConfig = {
    issuer: 'https://accounts.google.com',
    redirectUri: globalThis.location?.origin + '/expenses',
    clientId: GOOGLE_ACCOUNTS_CLIENT_ID,
    strictDiscoveryDocumentValidation: false,
    scope: 'profile email'
}