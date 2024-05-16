import { momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment-timezone';
import 'moment/locale/pt';  // Importar o locale de português

// Configura a zona horária padrão para Lisboa
moment.tz.setDefault('Europe/Lisbon');

// Configura o locale para português de Portugal
moment.locale('pt');

const localizer = momentLocalizer(moment);

export default localizer;


