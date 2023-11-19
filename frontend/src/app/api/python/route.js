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
  const data = await fetch(`http://127.0.0.1:8000/floorplan/${Math.random()*3}`);
  return Response.json(data);
}
