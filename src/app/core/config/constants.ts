
import { environment } from "src/environments/environment";

export const AppConstants = {
  API: {
    FILTERS_API: `${environment.baseURL}/filters`, 
    PATIENTS_LIST: `${environment.baseURL}/patients`
  },
};
