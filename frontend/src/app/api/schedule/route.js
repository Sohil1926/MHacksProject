import fsPromises from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';

// export default async function handler(req, res) {
//   // // Construct the file path
//   // const filePath = path.join(process.cwd(), 'src', 'assets', 'schedule.json');

//   // // Read the file
//   // const jsonData = await fsPromises.readFile(filePath, 'utf8');

//   // // Parse the JSON data
//   // const data = JSON.parse(jsonData);
//   // console.log(data);
//   console.log('printed');
//   res.send({ path: process.cwd() });
// }
export const dynamic = 'force-dynamic';
export async function GET() {
  // // Construct the file path
  const filePath = path.join(process.cwd(), 'src', 'assets', 'schedule.json');

  // Read the file
  const jsonData = await fsPromises.readFile(filePath, 'utf8');

  // Parse the JSON data
  const data = JSON.parse(jsonData);
  // console.log(data);
  // console.log('printed');
  return Response.json(data);
}
