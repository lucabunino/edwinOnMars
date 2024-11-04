import { google } from 'googleapis';

const getDriveService = () => {
    const SCOPES = ['https://www.googleapis.com/auth/drive.file'];
    const credentials = import.meta.env.VITE_GOOGLE_CREDENTIALS;    

    const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: SCOPES
    });
    const driveService = google.drive({ version: 'v3', auth });
    return driveService;
};

export default getDriveService;