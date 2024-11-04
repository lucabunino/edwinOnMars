import { google } from 'googleapis';
import { EMAIL, GOOGLE_CREDENTIALS, GOOGLE_DRIVE_FOLDER_ID } from "$env/static/private";
import { Readable } from 'stream';
import transporter from '$lib/emailSetup.server.js';

const SCOPE = ['https://www.googleapis.com/auth/drive.file'];

// Authorization function
async function authorize() {
  const keys = JSON.parse(GOOGLE_CREDENTIALS);
  const jwtClient = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    SCOPE
  );
  await jwtClient.authorize();
  return jwtClient;
}

// File upload function
async function uploadFile(authClient, file, stream) {
  const drive = google.drive({ version: 'v3', auth: authClient });
  const fileMetaData = { name: file.name, parents: [GOOGLE_DRIVE_FOLDER_ID] };
  try {
    const response = await drive.files.create({
      resource: fileMetaData,
      media: { mimeType: file.type, body: stream },
      fields: 'id'
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error uploading file: ${error.message}`);
  }
}

// Helper to send email
async function sendEmail(mailOptions) {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) reject(err);
      else resolve(info);
    });
  });
}

export const actions = {
  create: async ({ request }) => {
    try {
      const formData = await request.formData();
      const fields = ['name', 'surname', 'email', 'treatment', 'terms'];
      const data = Object.fromEntries(fields.map(field => [field, formData.get(field)]));
      const emptyFields = fields.filter(field => !data[field]);
      const wrongFields = [];

      if (data.name && !/^[a-zA-Z\s]+$/.test(data.name)) wrongFields.push('name');
      if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) wrongFields.push('email');

      if (emptyFields.length || wrongFields.length) {
        const fieldTranslations = {
          name: 'nome',
          surname: 'cognome',
          email: 'email',
          terms: 'termini e condizioni',
          treatment: 'trattamento dei dati',
        };
        const emptyFieldsItalian = emptyFields.map(field => fieldTranslations[field]);
        return {
          success: false,
          empty: emptyFields.length > 0,
          emptyFields,
          emptyFieldsItalian,
          wrongFields: wrongFields.length ? wrongFields : null,
        };
      }

      // Mapping and checking for combined days
      const selectedDays = [];
      const dayMappings = {
        'fri': 'Venerdì 29.11',
        'sat': 'Sabato 30.11',
        'sun': 'Domenica 01.12'
      };

      Object.keys(dayMappings).forEach(day => {
        const morning = formData.get(`${day}-morning`);
        const afternoon = formData.get(`${day}-afternoon`);
        if (morning && afternoon) {
          selectedDays.push(`${dayMappings[day]}, mattina e pomeriggio`);
        } else if (morning) {
          selectedDays.push(`${dayMappings[day]}, mattina`);
        } else if (afternoon) {
          selectedDays.push(`${dayMappings[day]}, pomeriggio`);
        }
      });

      const daysText = selectedDays.length
        ? `<ul>${selectedDays.map(day => `<li>${day}</li>`).join('')}</ul>`
        : '<p>Non hai selezionato alcun giorno specifico.</p>';

      const mailToUser = {
        from: EMAIL,
        to: data.email,
        subject: `Edwin on Mars | RSVP`,
        text: `Thank you ${data.name} ${data.surname}! We received your RSVP`,
        html: `
          <p>Ciao ${data.name}! La tua registrazione è avvenuta con successo. Ti aspettiamo a casa di Edwin!</p>
          <p>Hai prenotato nei seguenti giorni e orari:</p>
          ${daysText}
        `
      };

      const mailToEdwin = {
        from: EMAIL,
        to: "hello@lucabunino.com",
        subject: `Edwin on Mars | RSVP from ${data.name} ${data.surname}`,
        text: `RSVP from: ${data.name} ${data.surname}, email: ${data.email}`,
        html: `<p>RSVP from: ${data.name} ${data.surname}, <a href="mailto:${data.email}">${data.email}</a></p>
        ${daysText}`
      };

      // Construct the Google Form link with selected days
      const days = Object.keys(dayMappings).flatMap(day => [
        formData.get(`${day}-morning`) ? `&entry.${day}_morning=${formData.get(`${day}-morning`)}` : '',
        formData.get(`${day}-afternoon`) ? `&entry.${day}_afternoon=${formData.get(`${day}-afternoon`)}` : ''
      ]).join('');
      const newsletter = formData.get('newsletter') ? '&entry.2008983739=Newsletter' : '';
      const googleFormLink = `https://docs.google.com/forms/d/e/1FAIpQLSexBuAIYTDyYchx0bOqvO6AYcrHR0BkQ-o-nVhdRAyvr67xQQ/formResponse?usp=pp_url&entry.357710031=${data.name}&entry.1181668538=${data.surname}&entry.1561570609=${data.email}${days}&entry.2008983739=Terms&entry.2008983739=Treatment${newsletter}&submit=Submit`;

      const sendTasks = [
        fetch(googleFormLink),
      ];

      const file = formData.get('file');
      if (file && file instanceof File) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const stream = Readable.from(buffer);

        mailToEdwin.attachments = [{ filename: file.name, content: buffer }];
        mailToUser.attachments = [{ filename: file.name, content: buffer }];

        const uploadTask = authorize()
          .then(authClient => uploadFile(authClient, file, stream))
          .catch(error => console.error('File upload failed:', error));

        sendTasks.push(uploadTask);
        sendTasks.push(sendEmail(mailToEdwin));
        sendTasks.push(sendEmail(mailToUser));
      } else {
        sendTasks.push(sendEmail(mailToEdwin));
        sendTasks.push(sendEmail(mailToUser));
      }

      await Promise.all(sendTasks);

      return { success: true, link: googleFormLink };

    } catch (error) {
      console.error('Error:', error);
      return { success: false, message: error.message };
    }
  }
};