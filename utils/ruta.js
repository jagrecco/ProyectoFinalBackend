import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rutaIMG=path.join(__dirname, '/public','profile-img')

export default rutaIMG;