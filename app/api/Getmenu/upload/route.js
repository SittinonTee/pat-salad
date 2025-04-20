import { NextResponse } from 'next/server';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { Readable } from 'stream';


export const config = {
  api: {
    bodyParser: false,
  },
};

function getHeaders(req) {
  const headers = {};
  for (const [key, value] of req.headers.entries()) {
    headers[key.toLowerCase()] = value;
  }
  return headers;
}

function ReadableStreamToNodeStream(buffer, headers) {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  stream.headers = headers;
  return stream;
}

export async function POST(req) {
  const body = await req.arrayBuffer();
  const buffer = Buffer.from(body);
  const fakeReq = new ReadableStreamToNodeStream(buffer, getHeaders(req));

  return new Promise((resolve, reject) => {
    const form = formidable({ keepExtensions: true, multiples: false });

    form.parse(fakeReq, async (err, fields, files) => {
      if (err) {
        console.error(err);
        return resolve(NextResponse.json({ message: 'Upload failed' }, { status: 500 }));
      }

      const file = files.image?.[0];
      const menuName = fields.menuname?.[0] || 'default';
      const type = fields.type?.[0] || 'general';

      const uploadDir = path.join(process.cwd(), `/public/img/${type}`);

      const ext = path.extname(file.originalFilename); 
      const safeMenuName = menuName.trim().toLowerCase().replace(/\s+/g, '_'); 
      const newFilename = `${safeMenuName}${ext}`;
      const newPath = path.join(uploadDir, newFilename);

      await fs.promises.rename(file.filepath, newPath);

      return resolve(
        NextResponse.json({
          message: 'Upload success',
          filename: newFilename,
          url: `/img/${type}/${newFilename}`,
        })
      );
    });
  });
}
