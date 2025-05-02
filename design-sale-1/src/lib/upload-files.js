// import { service } from '$lib/service';

// const upload = async function post({ request }) {
//     const body = request.body;
//     const drive = service();
//     const folderId = import.meta.env.VITE_GOOGLE_DRIVE_FOLDER_ID;
//     const file = await drive.files.create({
//         resource: { parents: [folderId] },
//         media: { mimeType: 'application/pdf', body },
//         fields: 'id'
//     });
//     const { id } = file.data;

//     return { statusCode: 200, body: { id } };
// }

// export default upload

import { service } from '$lib/service';

const upload = async ({ request }) => {
    try {
        const formData = await request.formData();
        const file = formData.get('file'); // Get the file from FormData

        if (!file) {
            throw new Error('No file uploaded');
        }

        // Convert the file to a readable stream
        const drive = service();
        const folderId = import.meta.env.VITE_GOOGLE_DRIVE_FOLDER_ID;

        // Use the file stream directly
        const response = await drive.files.create({
            resource: {
                name: file.name,
                parents: [folderId]
            },
            media: {
                mimeType: file.type,
                body: file.stream() // Use the stream from the File object
            },
            fields: 'id'
        });

        const { id } = response.data;

        return {
            statusCode: 200,
            body: { id }
        };
    } catch (error) {
        console.error('Upload error:', error);
        return {
            statusCode: 500,
            body: { error: error.message || 'Failed to upload file' }
        };
    }
};

export default upload;
