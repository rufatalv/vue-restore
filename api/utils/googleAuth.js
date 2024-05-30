import {OAuth2Client} from "google-auth-library";

export async function getGoogleOAuthTokens(code) {
    const client = new OAuth2Client(process.env.GOOGLE_OAUTH_CLIENT_ID, process.env.GOOGLE_OAUTH_CLIENT_SECRET, process.env.GOOGLE_OAUTH_REDIRECT_URL);
    const response = await client.getToken(code);
    console.log(response)
    return response.tokens;
}