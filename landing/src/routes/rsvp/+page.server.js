import { EMAIL } from "$env/static/private";
import transporter from "$lib/emailSetup.server.js";

export const actions = {
  create: async ({ request }) => {
    try {
      // Form data
      const formData = await request.formData()
      const name = formData.get('name');
      const surname = formData.get('surname');
      const email = formData.get('email');

      // Empty fields and wrong fields
      var emptyFields = [];
      var wrongFields = [];

      // Check if fields are empty
      if (!name) {
        emptyFields.push('name');
      }
      if (name && !/^[a-zA-Z\s]+$/.test(name)) { // Simple name validation for wrong input (optional)
        wrongFields.push('name');
      }

      if (!surname) {
        emptyFields.push('surname');
      }

      if (!email) {
        emptyFields.push('email');
      } else {
        // Check if email is valid using HTML email validation regex
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
          wrongFields.push('email');
        }
      }

      // Determine the response
      if (emptyFields.length > 0) {
        return {
          success: false,
          empty: true,
          emptyFields: emptyFields,
          wrongFields: wrongFields.length > 0 ? wrongFields : null,
        };
      } else if (wrongFields.length > 0) {
        return {
          success: false,
          empty: false,
          wrongFields: wrongFields,
        };
      }

      // Day and times
      var days = []
      if (formData.get('fri-morning')) {
        days.push('&entry.1478265756=Mattina')
      }
      if (formData.get('fri-afternoon')) {
        days.push('&entry.1478265756=Pomeriggio')
      }
      if (formData.get('sat-morning')) {
        days.push('&entry.999730728=Mattina')
      }
      if (formData.get('sat-afternoon')) {
        days.push('&entry.999730728=Pomeriggio')
      }
      if (formData.get('sun-morning')) {
        days.push('&entry.388765601=Mattina')
      }
      if (formData.get('sun-afternoon')) {
        days.push('&entry.388765601=Pomeriggio')
      }


      // Google form
      const googleFormLink = `https://docs.google.com/forms/d/e/1FAIpQLSexBuAIYTDyYchx0bOqvO6AYcrHR0BkQ-o-nVhdRAyvr67xQQ/formResponse?usp=pp_url&entry.357710031=${name}&entry.1181668538=${surname}&entry.1561570609=${email}${days.join().replace(/,/g, '')}&submit=Submit`


      // // Mail to owner
      // const bodyInfo = `RSVP from: ${name} ${surname}, email: ${email}`
      // const htmlInfo = `<p>You received an RSVP from: ${name} ${surname}, <a href="mailto:${email}">${email}</a></p>`
      // const mailInfo = {
      //   from: EMAIL,
      //   to: "hello@lucabunino.com",
      //   subject: `Edwin on Mars | RSVP from ${name} ${surname}, ${email}`,
      //   text: bodyInfo,
      //   html: htmlInfo,
      // };
      // const sendEmailInfo = async (mail) => {
      //   await new Promise((resolve, reject) => {
      //     transporter.sendMail(mail, (err, info) => {
      //       if (err) {
      //         console.error(err);
      //         reject(err);
      //       } else {
      //         resolve(info);
      //       }
      //     });
      //   });
      // };

      // // Mail to user
      // const bodyResponse = `Thank you ${name} ${surname}! We received your RSVP`
      // const htmlResponse = `<p>Thank you ${name} ${surname}! We received your RSVP</p>`
      // const mailResponse = {
      //   from: EMAIL,
      //   to: email,
      //   subject: `Edwin on Mars | RSVP`,
      //   text: bodyResponse,
      //   html: htmlResponse,
      // };
      // const sendEmailResponse = async (mail) => {
      //   await new Promise((resolve, reject) => {
      //     transporter.sendMail(mail, (err, info) => {
      //       if (err) {
      //         console.error(err);
      //         reject(err);
      //       } else {
      //         resolve(info);
      //       }
      //     });
      //   });
      // };

      // Await for success
      await fetch(googleFormLink);
      // await sendEmailInfo(mailInfo);
      // await sendEmailResponse(mailResponse);
      return {
        success: true,
      };
    } catch (error) {
      console.error(error);
    } return {
      success: false,
    };
  },
};